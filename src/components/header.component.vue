<template>
  <header class="header">
    <div class="container" ref="container">
      <router-link class="logo" to="/" @click="isMenuOpened = false">
        <span>t</span>
        <span>e</span>
        <span>n</span>
        <span>d</span>
        <span>e</span>
        <span>r</span>
        <span>h</span>
        <span>a</span>
        <span>c</span>
        <span>k</span>
        <span class="active">.</span>
      </router-link>
      <input id="burger" v-model="isMenuOpened" type="checkbox">
      <label for="burger">
        <svg class="feather feather-menu" fill="none" height="24" stroke="currentColor" stroke-linecap="round"
             stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
             xmlns="http://www.w3.org/2000/svg">
          <line x1="3" x2="21" y1="12" y2="12"></line>
          <line x1="3" x2="21" y1="6" y2="6"></line>
          <line x1="3" x2="21" y1="18" y2="18"></line>
        </svg>
      </label>
      <nav class="nav">
        <router-link to="/" @click="isMenuOpened = false">главная</router-link>
        <router-link to="/panel" @click="isMenuOpened = false">панель</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "header.component",
  data() {
    return {
      isMenuOpened: false
    }
  },
  mounted() {
    setInterval(()=>{
      this.animation()
    },7000)
  },
  methods:{
    animation(){
      let spans = this.$refs.container.querySelector('.logo').querySelectorAll('span')
      let i = 0
      let interval = setInterval(()=>{
        let span = spans[i]
        span.classList.toggle('active',true)
        i++
        if(i>=spans.length){
          clearInterval(interval)
        }else{
          setTimeout(()=>{
            span.classList.toggle('active',false)
          },250)
        }
      },300)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  background: rgba(255, 255, 255, 0.001);
  backdrop-filter: blur(4px);
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 997;
  padding: 24px 0;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    font-size: 24px;
    font-weight: 500;
    user-select: none;
    span{
      transition: 0.3s;
    }
    .active{
      color: var(--main-color);
      transform: scaleY(1.5);
    }
  }

  .nav {
    display: flex;
    gap: 32px;
    align-items: center;
    font-size: 18px;

    a {
      user-select: none;
    }

    @media screen and (max-width: 768px) {
      color: var(--font-color4);
      font-weight: 600;
      font-size: 20px;
    }
  }

  input {
    display: none;
  }

  label {
    display: none;
  }

  @media screen and (max-width: 768px) {
    background: var(--bg-color);
    backdrop-filter: none;
    .logo {
      z-index: 999;
    }
    .nav {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100vw;
      height: 100vh;
      left: 100vw;
      top: 0;
      opacity: 0;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(22px);
    }
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      position: relative;
      z-index: 999;
      cursor: pointer;
    }
    input:checked ~ label {
      transform: rotate(-90deg);
    }
    input:checked ~ .nav {
      display: flex;
      left: 0;
      opacity: 1;
      transition: opacity 0.4s linear, left 0.3s linear;
      z-index: 998;
    }
  }
}
</style>
<style lang="scss">
.header .nav a {
  user-select: none;
  transition: opacity 0.2s linear;
  padding: 6px;

  &.router-link-active {
    //border-bottom: 1px solid var(--font-color);
    //color: var(--main-color);
  }

  @media screen and (max-width: 768px) {
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
