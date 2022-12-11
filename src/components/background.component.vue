<template>
  <div class="background">
    <img class="circle" src="@/assets/circle.svg" alt="">
    <img class="noise" src="@/assets/noise.png" alt="">
    <div class="round-dark"></div>
    <div class="round-light"></div>
  </div>
</template>

<script>

export default {
  name: "background",
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.background{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  .circle{
    position: absolute;
    left: 0;
    top: 100vh;
    transform: translate(-50%, -50%);
    width: 500px;
    aspect-ratio: 1/1;
    object-fit: contain;
    z-index: 3;
    user-select: none;
    pointer-events: none;
  }
  .round-dark{
    position: absolute;
    left: 30vw;
    top: 80vh;
    transform: translate(-50%,-50%);
    width: 200px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: var(--bg-dark-color);
    z-index: 1;
    filter: blur(5px);
  }
  .round-light {
    position: absolute;
    left: 100vw;
    top: 55vh;
    transform: translate(-50%, -50%);
    width: 300px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background: var(--bg-light-color);
    filter: blur(120px);
    z-index: 1;
  }
  .noise {
    user-select: none;
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    z-index: 2;
    backdrop-filter: blur(20px);
  }
}
</style>
