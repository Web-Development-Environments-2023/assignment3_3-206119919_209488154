<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
</style>
