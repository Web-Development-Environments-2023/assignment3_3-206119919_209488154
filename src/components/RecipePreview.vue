<template>
  <div class="recipe">
    <div class="recipe-body">
      <div class="recipe-properties">
        <b-button
          @click="addToFavorites"
          :class="{ 'text-danger': recipe.isFavorite}">
          ♡
        </b-button>
        <div class="recipe-indicators">
          <img v-if="recipe.vegan" src="@/assets/vegan.png" />
          <img v-else-if="recipe.vegetarian" src="@/assets/vegetarian.png" />
          <img v-if="recipe.glutenFree" src="@/assets/gluten-free.png" />
          <img v-else src="@/assets/contains-gluten.png" />
          <img v-if="recipe.isWatched" src="@/assets/watched.png" />
        </div>
      </div>
      <div class="recipe-details">
        <router-link
          :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
          <div class="recipe-image-container">
            <img v-if="image_load" :src="recipe.image" class="recipe-image" />
          </div>
          <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
          </div>
        </router-link>
        <div class="recipe-overview">
          {{ recipe.readyInMinutes }} minutes | {{ recipe.aggregateLikes }} likes
        </div>
      </div>
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
  },
  data() {
    return {
      image_load: false
    };
  },
   props: {
    recipe: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    recipeListType: {
      type: String,
      required: true
    }
  },
  methods: {
    async addToFavorites() {
      if (!this.recipe.isFavorite) {
        try {
          const response = await addRecipeToUserFavorites(this.recipe.id);
          if (response.status === 200) {
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
