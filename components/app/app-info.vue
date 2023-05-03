<template>
  <div class="app-info">
    <div class="tw-flex tw-flex-col tw-mr-4">
      <img src="~/assets/logoDash.svg" class="tw-object-contain tw-w-[78%]" />
      <v-btn class="btn-web tw-mt-7 tw-mr-2" to="/" append-icon="mdi-arrow-right">
        View Website
      </v-btn>
    </div>
    <!-- <h2 class="app-info-text">Native UI</h2> -->
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.btn-web {
  :hover {
    color: #FFCC00;
  }
}
.app-info {
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
}

.dashboard-layout.miniSized {
  .app-info {
    svg {
      width: 2rem;
    }
  }
}
</style>
