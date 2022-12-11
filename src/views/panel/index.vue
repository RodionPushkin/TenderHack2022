<template>
  <div :class="isloading ? 'loading':''" class="container">
    <h1 v-if="!isloading" class="m">Перетащите или прикрепите файл, для обновления данных</h1>
    <h1 v-else class="m">Подождите сервис обрабатывает данные (примерно осталось: {{ time }}сек)</h1>
    <form v-if="!isloading" @submit.prevent="submit">
      <fileinput accept=".csv" usedrag="true" @change="file = $event"></fileinput>
      <button v-if="!!file" type="submit">загрузить</button>
    </form>
  </div>
</template>
<script>

import Fileinput from "@/components/fileinput.component";
import api from "@/api";

export default {
  name: "panel",
  components: {Fileinput},
  data() {
    return {
      isloading: false,
      file: undefined,
      time: 300
    }
  },
  mounted() {
  },
  methods: {
    submit() {
      this.isloading = true
      let interval = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          clearInterval(interval)
          this.time = 300
          this.isloading = false
        }
      }, 1000)
      let data = new FormData()
      data.append('file', this.file.target.files[0])
      api.post('/upload', undefined,).then(res => {

      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  padding-top: 78px;

  &.loading {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      text-align: center;
    }
  }

  @media screen and (max-width: 768px) {
    padding-top: 104px;
  }
  gap: 32px;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }
}
</style>
