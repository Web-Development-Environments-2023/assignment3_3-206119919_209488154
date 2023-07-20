<template>
    <div class="container">
      <h1 class="title">My Recipes</h1>
      <RecipePreviewList
        title="My Recipes"
        :recipes="createdRecipes"
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
        // username: state => state.username,
        createdRecipes: state => state.createdRecipes
      }),
    },
    // mounted() {
    //   if (this.username) {
    //     this.$store.dispatch("setCreatedRecipes", this.username);
    //   }
    // },
  };  
</script>    