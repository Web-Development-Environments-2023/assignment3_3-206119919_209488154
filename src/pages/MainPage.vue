<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="recipes-preview-container">
      <div>
        <RecipePreviewList title="Random Recipes" :recipes="randomRecipes" class="RandomRecipes center" ref="randomeRecipes"/>
        <button @click="updateRandomRecipes">Update Recipes</button>
      </div>
      <div>
        <RecipePreviewList
          title="Last Viewed Recipes"
          :recipes="watchedRecipes"
          :class="{
            RandomRecipes: true,
            blur: !username,
            center: true
          }"
          disabled
        ></RecipePreviewList>
        <router-link v-if="!username" to="/login" tag="button">Login to View</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  computed: {
    ...mapState({
      username: state => state.username,
      randomRecipes: state => state.randomRecipes,
      watchedRecipes: state => state.watchedRecipes
    })
  },
  mounted() {
    this.updateRandomRecipes();
    if (this.username) {
      this.updateWatchedRecipes()
    }
  },
  methods: {
    updateRandomRecipes() {
      this.$store.dispatch('setRandomRecipes');
    },
    updateWatchedRecipes() {
      this.$store.dispatch('setWatchedRecipes');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/main-style.scss";
</style>
