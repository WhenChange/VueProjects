<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BHeader from './components/BHeader.vue'
import CountBookAPI from './views/CountBookAPI.vue'
import GetAllBookAPI from './views/GetAllBookAPI.vue';

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI,
    GetAllBookAPI
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'CountBookAPI' && this.$route.name !== 'GetAllBookAPI'
    }
  }
}
</script>

<style scoped></style>
