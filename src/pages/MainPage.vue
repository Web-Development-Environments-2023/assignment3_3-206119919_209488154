<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="recipes-preview-container" >
      <div>
        <RecipePreviewList
          title="Random Recipes"
          recipeListType="random"
          class="RandomRecipes center"/>
      </div>
      <div class="lists-separator"></div>
      <div>
        <RecipePreviewList
          title="Last Viewed Recipes"
          recipeListType="watched"
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
