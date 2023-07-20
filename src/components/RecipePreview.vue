<template>
  <div class="recipe">
    <router-link
      :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
      class="recipe-preview"
    >
      <div class="recipe-body">
        <img v-if="image_load" :src="recipe.image" class="recipe-image" />
      </div>
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
      </div>
    </router-link>
    <button
      @click="addToFavorites"
      :class="{ 'text-danger': isFavorite}">
      ♡
    </button>
    <ul class="recipe-overview">
      <li>{{ recipe.readyInMinutes }} minutes</li>
      <li>{{ recipe.aggregateLikes }} likes</li>
    </ul>
    <div class="recipe-properties">
      <img v-if="recipe.vegan" src="@/assets/vegan.png" />
      <img v-else-if="recipe.vegetarian" src="@/assets/vegetarian.png" />
      <img v-if="recipe.glutenFree" src="@/assets/gluten-free.png" />
      <img v-else src="@/assets/contains-gluten.png" />
      <img v-if="isWatched" src="@/assets/watched.png" />
    </div>
  </div>
</template>

<script>
import { addRecipeToUserFavorites } from "../services/users";

export default {
  name: "RecipePreview",
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
    this.isWatched = this.$store.state.watchedRecipes.indexOf(this.recipe) !== -1,
    this.isFavorite = this.$store.state.favoriteRecipes.indexOf(this.recipe) !== -1
  },
  data() {
    return {
      image_load: false,
      isWatched: false,
      isFavorite: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addToFavorites() {
      if (!this.isFavorite) {
        try {
          const response = await addRecipeToUserFavorites(this.recipe.id);
          if (response.status === 200) {
            this.isFavorite = true;
            this.$root.toast("Favorites", "Added recipe to favorites", "success");
            this.$store.dispatch('setFavoriteRecipes');
          }
          else {
            this.$root.toast("Favorites", response.data.message, "fail");
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/recipePreview-style.scss";
</style>
