<template>
  <div class="container">
    <h1 class="m">Перетащите или прикрепите файл, для обновления данных</h1>
    <fileinput accept=".csv" usedrag="true"></fileinput>
  </div>
</template>
<script>

import Fileinput from "@/components/fileinput.component";

export default {
  name: "panel",
  components: {Fileinput},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  padding-top: 78px;
  @media screen and (max-width: 768px) {
    padding-top: 104px;
  }
  gap: 32px;
  flex-direction: column;
}
</style>
