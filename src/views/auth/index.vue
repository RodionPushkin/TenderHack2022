<template>
  <form class="container" @submit.prevent="submit">
    <h1 class="m">Вход в панель</h1>
    <textinput ref="email" placeholder="почта" required="true" type="email" value="email@email.com"></textinput>
    <textinput ref="password" placeholder="пароль" required="true" type="password" value="password"></textinput>
    <button type="submit">войти</button>
  </form>
</template>
<script>

import Textinput from "@/components/textinput.component";
import api from "@/api";

export default {
  name: "auth",
  components: {Textinput},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    async submit() {
      await api.put(`user/auth`).then(r => r).then((res) => {
        console.log(res)
        localStorage.token = res[0]
        this.$router.push('/panel')
      }).catch((err) => {
        console.log(err)
      })
      console.log(this.$refs.email.value, this.$refs.password.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  gap: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
