<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useFoodDynamic } from "~/store/qrCodes/dynamic/food";
import { FoodDynamicController } from "~/api/endpoints/foodDynamic";
import { AddFoodDto } from "~/api/dto/qrCodes/dynamic/Food";
import { useRoute } from "vue-router";
const { getFileUrl } = useFile();
const foodStore = useFoodDynamic();
const route = useRoute();
const { foodDto, qualities,coinPrice } = storeToRefs(foodStore);
definePageMeta({ layout: "fullscreen" });
const props = defineProps({
  fetchData: {
    type: Boolean,
    default: true,
  },
});
if (props.fetchData) {
  const { data } = await useCustomFetch<AddFoodDto>(
    FoodDynamicController.Get_Food_Dynamic + `?id=${route.params.id}`
  );
  if (data.value) {
    foodDto.value = data.value;
  }
}
const shareData = async () => {
  try {
    await navigator.share({
      title: "Share",
      text: "",
      url: route.fullPath,
    });
  } catch (error) {}
};
</script>

<style scoped>
#fix{
  border: 0.5px solid #dddbdb  ;
}
</style>

<template>
  <div class="tw-relative">
    <header
      class="tw-flex tw-px-3 tw-pb-4 tw-justify-content-center tw-flex-col tw-items-center"
      :style="{ backgroundColor: foodDto.buttonColor }"
    >
      <div class="tw-flex tw-justify-center">
        <img
          :src="getFileUrl(foodDto.companyLogoUrl)"
          height="150"
          width="150"
          class="tw-mt-3 tw-object-cover"
          v-if="foodDto.companyLogoUrl"
        />
      </div>

      <h4 class="tw-text-center tw-mt-3">{{ foodDto.productName }}</h4>
      <h4 class="tw-text-center">{{ foodDto.productFeatures.join(", ") }}</h4>
      <p class="tw-mb-3">{{ foodDto.simpleExplanation }}</p>
      <!-- {{ foodDto.button.url }} -->
      <a
        v-if="foodDto.button.name"
        class="tw-bg-white tw-rounded tw-p-2 tw-px-5"
        target="_blank"
        :href="foodDto.button.url"
        >{{ foodDto.button.name }}
      </a>
    </header>
    <section 
    :style="{ backgroundColor: foodDto.primaryColor }"
    class="tw-flex tw-flex-col tw-gap-3 tw-p-5">
      <div
        :class="
          route.meta.layout == 'fullscreen' ? ' md:tw-mx-40 tw-mx-10' : ''
        "
      >
        <div>
          <div class="tw-w-full">
            <img
              v-if="foodDto.imageUrl"
              :class="
                route.meta.layout == 'fullscreen'
                  ? 'tw-w-full tw-h-[500px] tw-object-cover'
                  : 'tw-w-full tw-h-[300px] tw-object-cover'
              "
              :src="getFileUrl(foodDto.imageUrl)"
            />
          </div>
          <div class="tw-mt-4">
            <h2 class="tw-text-xl" v-if="foodDto.price">
              {{ $t("dynamicQr.foodDynamic.price") }} : {{ foodDto.price }} {{ coinPrice }}
            </h2>
            <span v-if="foodDto.productWeight"
              >{{ $t("dynamicQr.foodDynamic.wheight") }} :
              {{ foodDto.productWeight }}</span
            >
          </div>
          <div class="tw-mt-6" v-if="foodDto.allergene.length >0 ">
            <h2>{{ $t("dynamicQr.foodDynamic.allergene") }}:</h2>
            <span>{{ foodDto.allergene.join(",") }}</span>
          </div>

          <div class="tw-mt-4" v-if="foodDto.productComponents.length > 1">
            <h2>{{ $t("dynamicQr.foodDynamic.productComponents") }}:</h2>
            <ul class="tw-px-4">
              <li
                v-for="(comp, i) in foodDto.productComponents"
                :key="i"
                :class="comp.isBold ? 'tw-font-bold' : ''"
                class="tw-list-disc"
              >
                {{ comp.component }}
              </li>
            </ul>
          </div>
          <div class="tw-mt-4" v-if="foodDto.expirationDate">
            <h2>{{ $t("dynamicQr.foodDynamic.expiration") }}:</h2>
            <span>{{ foodDto.expirationDate }}</span>
          </div>

          <div class="tw-mt-4" v-if="foodDto.productPrivateUrl.length > 0">
            <h2>{{ $t("dynamicQr.foodDynamic.productPrivate") }}:</h2>
            <div
              v-if="foodDto.productPrivateUrl.length > 0"
              class="tw-mt-5 tw-flex tw-justify-start tw-items-start tw-gap-3"
            >
              <img
                v-for="(productImg, i) in foodDto.productPrivateUrl"
                :key="i"
                :src="getFileUrl(foodDto.productPrivateUrl[i])"
                class="tw-object-cover"
                height="100"
                width="100"
              />
            </div>
          </div>
        </div>
        <!-- route.meta.layout == 'fullscreen' ? 'tw-flex tw-justify-center' : -->
        <div v-if="foodDto.nutritionalValues.length > 1" class="tw-overflow">
          <h2>{{$t("dynamicQr.foodDynamic.nutritional")}}:</h2>
          <p class="text-center tw-max-w-[500px]">
          
            <GridINput
              :readonly="true"
              v-model="foodDto.nutritionalValues"
            ></GridINput>
          </p>
          

        </div>
       
        <div class="more-details">
          <div
            class="description tw-flex  tw-justify-start tw-flex-col tw-items-start"
          >
            <div v-if="foodDto.description">
              <h2>{{ $t("dynamicQr.foodDynamic.description") }}</h2>
              <p>{{ foodDto.description }}</p>
            </div>
             <div v-if="foodDto.referenceQuantity">
          <h4>Reference Quantity :</h4>
          <span>{{ foodDto.referenceQuantity }}</span>
        </div>
 
        <div   v-if="foodDto.productQualityGrade" id="fix"
        class=" tw-flex tw-justify-center tw-flex-col tw-items-center tw-p-4 tw-mx-auto tw-my-4   ">
                  <p class="tw-mb-2 tw-text-slate-400"> NUTRI-SCORE</p>
            <p
              v-if="foodDto.productQualityGrade"
              class="tw-flex tw-gap-1 tw-justify-center tw-items-center"
            >
            
              <div v-if="foodDto.productQualityGrade === 'A'" class=" tw-flex tw-gap-1 tw-justify-center tw-items-center">
                <span
                v-if="foodDto.productQualityGrade === 'A'"
                class="tw-bg-lime-700 tw-text-3xl tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"
              >
                {{ foodDto.productQualityGrade }}</span
              >
               <span class=" tw-bg-lime-400 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> B</span>
               <span class=" tw-bg-orange-300 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> C</span>
               <span class=" tw-bg-orange-500 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md">D</span>
               <span class=" tw-bg-red-500 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> E</span>
              </div>   
               <div v-if="foodDto.productQualityGrade === 'B'" class=" tw-flex tw-gap-1 tw-justify-center tw-items-center">
               <span  class="tw-bg-lime-700 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> A</span>

              <span
                v-if="foodDto.productQualityGrade === 'B'"
                class="tw-bg-lime-400 tw-text-3xl tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"
              >
                {{ foodDto.productQualityGrade }}</span
              >
            
               <span class=" tw-bg-orange-300 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> C</span>
               <span class=" tw-bg-orange-500 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md">D</span>
               <span class=" tw-bg-red-500 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> E</span>
              </div>
                <div v-if="foodDto.productQualityGrade === 'C'" class=" tw-flex tw-gap-1 tw-justify-center tw-items-center">
               <span  class="tw-bg-lime-700 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> A</span>
               <span class=" tw-bg-lime-400 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> B</span>

              <span
                v-if="foodDto.productQualityGrade === 'C'"
                class=" tw-bg-orange-300 tw-text-3xl tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"
              >
                {{ foodDto.productQualityGrade }}</span
              >
            
               <span class=" tw-bg-orange-500 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md">D</span>
               <span class=" tw-bg-red-500 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> E</span>
              </div>
                 <div v-if="foodDto.productQualityGrade === 'D'" class=" tw-flex tw-gap-1 tw-justify-center tw-items-center">
               <span  class="tw-bg-lime-700 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> A</span>
                   <span class=" tw-bg-lime-400 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> B</span>
               <span class=" tw-bg-orange-300 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md">C</span>

              <span
                v-if="foodDto.productQualityGrade === 'D'"
                class=" tw-bg-orange-500 tw-text-3xl tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"
              >
                {{ foodDto.productQualityGrade }}</span
              >
            
          
               <span class=" tw-bg-red-500 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> E</span>
              </div>
                   <div v-if="foodDto.productQualityGrade === 'E'" class=" tw-flex tw-gap-1 tw-justify-center tw-items-center">
               <span  class="tw-bg-lime-700 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> A</span>
                   <span class=" tw-bg-lime-400 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> B</span>
               <span class=" tw-bg-orange-300 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md">C</span>
               <span class=" tw-bg-orange-500 tw-text-lg tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"> D</span>


              <span
                v-if="foodDto.productQualityGrade === 'E'"
                class=" tw-bg-red-500 tw-text-3xl tw-px-2 tw-py-1 tw-text-emerald-50 tw-rounded-md"
              >
                {{ foodDto.productQualityGrade }}</span
              >
            
          
              </div>
            </p>
        </div>
          </div>
          <!-- :class="
            route.meta.layout == 'fullscreen'
              ? 'tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center'
              :  -->
          <!-- <div
            class="location tw-flex tw-gap-2 tw-mt-4 tw-justify-start tw-flex-col tw-items-start"
          >
            <h2 v-if="foodDto.address.city">
              {{ $t("dynamicQr.foodDynamic.addressName") }}
            </h2>
            <p v-if="foodDto.address.city">
              {{ foodDto.address.streetName }} {{ foodDto.address.city }},
              <br />
              {{ foodDto.address.country }} {{ foodDto.address.regionNumber }},
              <br />
              {{ foodDto.address.storeNumber }}
            </p>
          </div> -->
                 <div
            v-if="foodDto.address.city"
            class="tw-flex tw-flex-col tw-gap-2  tw-mt-2"
          >
            <div class="tw-flex">
              <v-icon>mdi-map-marker-outline</v-icon>
              <h1 class="tw-mx-1">Address</h1>
            </div>
            <div class="tw-flex tw-flex-col tw-mx-6 ">
             <p v-if="foodDto.address.streetName" class=" tw-flex tw-gap-6 ">
                 <span>{{ foodDto.address.streetName }}</span> <span>{{ foodDto.address.storeNumber }}</span>
              </p>
                     <p v-if="foodDto.address.storeNumber" class=" tw-flex tw-gap-6 ">
                     <span>{{ foodDto.address.regionNumber }}</span>
                     <span>{{ foodDto.address.city }}</span>
              </p>
          
    
              <p v-if="foodDto.address.country">
              {{ foodDto.address.country }}
              </p>
             
       
          
            </div>
          </div>
          <!-- :class="route.meta.layout == 'fullscreen' ? 'tw-flex tw-justify-center' : ''" -->
          <section v-if="foodDto.socialMediaChannels.length > 0" class="mt-8">
            <h4>
              <v-icon>mdi-link</v-icon>
              {{ $t("dynamicQr.foodDynamic.socialMedias") }}
            </h4>

            <ul
            v-if="
            foodDto.socialMediaChannels &&
            foodDto.socialMediaChannels.length > 0
            "
            class="tw-flex tw-flex-wrap tw-gap-4 tw-mt-4"
          >
            <li
              v-for="item in foodDto.socialMediaChannels"
              :key="item.url"
              class="tw-flex tw-flex-row"
            >
              <v-icon size="x-large" class="tw-text-gray-600 tw-my-auto tw-mx-3">{{
                item.iconName
              }}</v-icon>
              <div class="tw-flex tw-flex-col ">
                <a variant="plain" :href="item.url" class="tw-font-bold tw-text-lg" >
                  {{ item.name }}
                </a>
                <span>{{ item.text }}</span>
              </div>
            </li>
          </ul>
          </section>
        </div>
      </div>
    </section>
    <div class="tw-absolute" style="right: 10px; bottom: 10px">
      <v-btn
        class="ma-2 text-white"
        :color="foodDto.buttonColor"
        icon="mdi-share-variant-outline"
        @click="shareData"
      ></v-btn>
    </div>
  </div>
</template>
