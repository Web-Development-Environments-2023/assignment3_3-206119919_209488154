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
  },
  // created() {
    // this.$store.dispatch("setUsername", this.$root.store.username);
    // this.$store.dispatch('setRandomRecipes');
    // if (this.$store.state.username) {
    //   this.$store.dispatch("setFavoriteRecipes");
    //   this.$store.dispatch("setWatchedRecipes");
    //   this.$store.dispatch("setCreatedRecipes");
    // }
  // }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
</style>
