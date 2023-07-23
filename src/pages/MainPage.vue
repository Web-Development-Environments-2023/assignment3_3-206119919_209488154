<template>
  <div class="recipes-preview-container" >
    <div class="list-container">
      <RecipePreviewList
        title="Checkout These Recipes"
        recipeListType="random"
        class="RandomRecipes center"/>
    </div>
    <!-- <div class="lists-separator"></div> -->
    <div class="list-container">
      <RecipePreviewList
        title="Your Last Viewed Recipes"
        recipeListType="watched"
        :class="{
          RandomRecipes: true,
          blur: !username,
          center: true
        }"
        disabled>
      </RecipePreviewList>
      <router-link v-if="!username" to="/login" tag="button">Login to View</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "Main",
  components: {
    RecipePreviewList
  },
  computed: {
    ...mapState({
      username: state => state.username
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/main-style.scss";
</style>
