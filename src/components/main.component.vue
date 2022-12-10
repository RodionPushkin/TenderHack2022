<template>
  <main class="main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: "main.component"
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  //padding-top: 78px;
  @media screen and (max-width: 768px) {
    //padding-top: 104px;
  }
}
</style>
