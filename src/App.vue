<template>
  <div id="app">
    <NavBar />
    <keep-alive exclude="RecipeViewPage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: "App",
  components: {
    NavBar
  },
  created() {
    if (this.$store.state.username) {
      this.$store.dispatch("setFavoriteRecipes");
      this.$store.dispatch("setWatchedRecipes");
      this.$store.dispatch("setCreatedRecipes");
      this.$store.dispatch("setFamilyRecipes");
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
</style>
