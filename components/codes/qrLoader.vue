<template>
  <div class="loader">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<style lang="scss">
.loader {
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(10, 10, 10, 0.712);
  backdrop-filter: blur(4px);
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid theme("colors.primary");
  border-color: theme("colors.primary") transparent theme("colors.primary") transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
