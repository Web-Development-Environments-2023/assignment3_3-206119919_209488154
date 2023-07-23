<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <RecipePreviewList
      title="My Recipes"
      recipeListType="created"
      :class="{
          center: true
      }"/>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { mapState } from "vuex";
export default {
  name: "MyRecipes",
  components: {
    RecipePreviewList
  },
  computed: {
    ...mapState({
      createdRecipes: state => state.createdRecipes
    })
  }
};  
</script>    