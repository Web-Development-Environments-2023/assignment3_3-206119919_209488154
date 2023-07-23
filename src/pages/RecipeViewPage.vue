<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <div>
          <h1>{{ recipe.title }}</h1>
          <div class="mb-3">
            <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
            <div>Likes: {{ recipe.aggregateLikes }} likes</div>
          </div>
        </div>
        <div class="recipe-info">
          <div class="recipe-properties">
            <b-button pill variant="outline-success"
              @click="addToFavorites">
              <i class="bi bi-heart-fill" :class="recipe.isFavorite ? 'red' : '' "></i>
            </b-button>
            <div class="recipe-indicators">
              <img v-if="recipe.isWatched" src="@/assets/watched.png" />
              <img v-if="recipe.vegan" src="@/assets/vegan.png" />
              <img v-else-if="recipe.vegetarian" src="@/assets/vegetarian.png" />
              <img v-if="recipe.glutenFree" src="@/assets/gluten-free.png" />
              <img v-else src="@/assets/contains-gluten.png" />
            </div>
          </div>
          <img :src="recipe.image" class="center recipe-image" />
        </div>
        
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <b>Ingredients:</b><br>
            {{ recipe.extendedIngredients.replaceAll("\"", "") }}
          </div>
          <div class="wrapped">
            <b>Instructions:</b><br>
            {{ recipe.instructions.replaceAll("\"", "") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecipeById } from '../services/recipes';
import { addRecipeToUserFavorites, addRecipeWatchedByUser } from '../services/users';

export default {
  name: "RecipeView",
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      // "https://test-for-3-2.herokuapp.com/recipes/info",
      const response = await getRecipeById(this.$route.params.recipeId);
       
      if (response.status !== 200) {
        this.$router.replace("/NotFound");
      }
      let recipe = response.data;
      
      // let {instructions} = recipe;
      // instructions = instructions.split(/<.*>/);
      // let _instructions = [];
      // for (let i = 0; i < instructions.length; i++) {
      //   if (instructions[i] !== '') {
      //     _instructions.push(instructions[i]);
      //   }
      // }
      // recipe.instructions = _instructions;

      this.recipe = recipe;
      await this.addToWatched();
    } catch (error) {
      this.$router.replace("/NotFound");
      console.log(error);
    }
  },
  methods: {
    async addToWatched() {
      if (!this.recipe.isWatched) {
        try {
          const response = await addRecipeWatchedByUser(this.recipe.id);
          if (response.status === 200) {
            this.$store.dispatch('setWatchedRecipes');
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async addToFavorites() {
      if (!this.recipe.isFavorite) {
        try {
          const response = await addRecipeToUserFavorites(this.recipe.id);
          if (response.status === 200) {
            this.$root.toast("Favorites", "Added recipe to favorites", "success");
            this.$store.dispatch('setFavoriteRecipes');
            this.recipe.isFavorite = true;
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
@import "@/scss/recipeViewPage-style.scss";
</style>
