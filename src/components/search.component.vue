<template>
  <div class="search">
    <input type="text" placeholder="поиск" @keyup="search" maxlength="200">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    <!--    <div class="settings" @click="isFiltersOpened = !isFiltersOpened">-->
    <!--      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"-->
    <!--           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"-->
    <!--           class="feather feather-settings">-->
    <!--        <circle cx="12" cy="12" r="3"></circle>-->
    <!--        <path-->
    <!--          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>-->
    <!--      </svg>-->
    <!--    </div>-->
  </div>
  <transition name="fade">
    <div class="filters" v-if="isFiltersOpened">
      <p>Фильтры</p>
      <textinput placeholder="ОКПД2"></textinput>
      <textinput placeholder="КПГЗ"></textinput>
      <textinput placeholder="Регион"></textinput>
      <textinput placeholder="НМЦК"></textinput>
      <textinput placeholder="Дата" type="date"></textinput>
      <textinput placeholder="ИНН"></textinput>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from "vuex";
import Textinput from "@/components/textinput.component";

export default {
  name: "Search",
  components: {Textinput},
  emits: ["searchinput"],
  data() {
    return {
      isFiltersOpened: true,
      timer: 0,
      filters: {},
    }
  },
  methods: {
    search({target}) {
      let text = String(target.value)
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        text = text.slice(0, 200)
        this.$emit('searchinput', text)
      }, 700);
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>

.search {
  width: 100%;
  position: relative;

  > svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--font-color4);
    z-index: 1;
    pointer-events: none;
    left: 16px;
    transition: color 0.3s linear;
  }

  .settings {
    right: 0;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--font-color4);
    z-index: 1;
    height: 56px;
    width: 56px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: var(--font-color4);
      transform: rotate(0deg);
      transition: 0.6s ease-in-out, color 0.3s linear;
    }

    @media screen and (min-width: 768px) {
      &:hover {
        svg {
          transform: rotate(360deg);
        }
      }
    }
  }

  > input {
    width: 100%;
    padding: 0 56px;
    position: relative;
    z-index: 0;
    font-weight: 500;

    &::placeholder {
      user-select: none;
    }
  }

  > input:focus {
    ~ svg {
      color: var(--main-color);
    }

    ~ div > svg {
      color: var(--main-color);
    }
  }
}

.filters {
  width: 100%;
  padding: 16px;
  background: var(--font-color);
  color: var(--font-color4);
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  > p {
    width: 100%;
    font-weight: 600;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  label {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    input[type="checkbox"] {
      min-height: 32px;
      min-width: 32px;
    }

    input[type="number"] {
      border-bottom: 1px solid var(--bg-color);
      border-radius: 0px;
      min-height: 20px;
    }
  }
}

</style>
<style lang="scss">
.filters {
  label {
    color: var(--font-color4) !important;
  }
}
</style>
