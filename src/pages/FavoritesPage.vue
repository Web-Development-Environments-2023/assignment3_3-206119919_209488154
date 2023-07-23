<template>
  <div class="container">
    <h1 class="title">Favorites</h1>
    <RecipePreviewList
      title="Favorite Recipes"
      recipeListType="favorites"
      :class="{
          center: true
      }"/>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mapState } from "vuex";
export default {
  name: "FavoriteRecipes",
  components: {
    RecipePreviewList
  },
  computed: {
    ...mapState({
      username: state => state.username,
      favoriteRecipes: state => state.favoriteRecipes
    }),
  },
};
</script>
  