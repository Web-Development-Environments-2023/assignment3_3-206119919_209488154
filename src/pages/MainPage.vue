<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="recipes-preview-container">
      <div>
        <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" ref="randomeRecipes"/>
        <button @click="updateRecipes">Different Recipes</button>
      </div>
      <div>
        <!-- {{ !$root.store.username }} -->
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true
          }"
          disabled
        ></RecipePreviewList>
        <router-link v-if="!$root.store.username" to="/login" tag="button">Login to View</router-link>
      </div>
    </div>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  methods: {
    updateRecipes() {
      this.$refs.randomeRecipes.updateRecipes();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/main-style.scss";
</style>
