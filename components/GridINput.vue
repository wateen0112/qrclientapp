<script setup lang="ts">
const rows = ref([["", ""]]);

const rowsCount = computed(() => rows.value.length);
const colsCount = computed(() => rows.value[0].length);

const appendRow = () => {
  const newCol = [];
  for (let i = 0; i < colsCount.value; i++) {
    newCol.push("");
  }
  rows.value.push(newCol);
};
const deleteRow = () => {
  rows.value.pop();
};

const appendCol = () => {
  if (colsCount.value < 4) {
    rows.value.forEach((row) => {
      row.push("");
    });
    emit("update:modelValue", rows.value);
  }
};

const deleteCol = () => {
  if (colsCount.value < 4) {
    rows.value.forEach((col) => {
      col.pop();
    });
    emit("update:modelValue", rows.value);
  }
};

const props = defineProps(["modelValue", "readonly"]);

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  rows.value = props.modelValue;
});

watch(
  props.modelValue,
  (nv: string[][]) => {
    rows.value = nv;
  },
  { deep: true }
);

watch(
  rows,
  (nv) => {
    if (nv) {
      emit("update:modelValue", nv);
    }
  },
  { deep: true }
);
</script>
<template>
  <div class="tw-mb-10">
    <div class="grid-wrapper tw-overflow-auto tw-relative">
      <div class="tw-flex tw-justify-center items-center tw-gap-3 tw-mb-4">
        <!-- style="position: absolute; transform: rotate(270deg); top: 3rem; left: -2rem" -->
        <v-btn @click="appendRow" v-if="!readonly" prepend-icon="mdi-plus">Add Row</v-btn>
        <v-btn @click="appendCol" v-if="!readonly" prepend-icon="mdi-plus">Add Col {{ colsCount }}</v-btn>
        <v-btn @click="deleteRow()" v-if="!readonly" prepend-icon="mdi-trash-can-outline">Delete Row</v-btn>
        <v-btn @click="deleteCol()" v-if="!readonly" prepend-icon="mdi-trash-can-outline">Delete Col</v-btn>
      </div>

      <div v-for="(row, i) in rows" :key="i" class="my-2 relative tw-flex">

        <button v-if="!readonly" icon="mdi-close" class="mr-3" :class="{ 'tw-invisible ': (i === 0) }"><v-icon
            class="tw-text-gray-300 hover:tw-text-red-500">mdi-close</v-icon></button>

        <div :style="{
          display: 'grid',
          gridTemplateColumns: `repeat(${colsCount} , 1fr)`,
        }" class="tw-gap-3 tw-flex-grow">
          <div v-for="(col, j) in row" class="tw-flex tw-flex-col tw-justify-center">
            <button v-if="!readonly" icon="mdi-close" class="mr-3" :class="{ 'tw-hidden': (i > 0) }"><v-icon
                class="tw-text-gray-300 hover:tw-text-red-500">mdi-close</v-icon></button>

            <v-text-field :readonly="readonly" variant="filled" color="primary" class="tw-min-w-[150px]"
              :class="i === 0 ? 'tw-bg-primary tw-rounded tw-overflow-hidden  tw-bg-opacity-80' : 'tw-bg-white tw-bg-opacity-80'"
              v-model="rows[i][j]">
            </v-text-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
