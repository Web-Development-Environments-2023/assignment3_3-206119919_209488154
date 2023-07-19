<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <button
          @click="addToFavorites"
          :class="{ 'text-danger': isFavorite}">
          ♡
        </button>
        <div class="recipe-properties">
          <img v-if="recipe.vegan" src="@/assets/vegan.png" />
          <img v-else-if="recipe.vegetarian" src="@/assets/vegeterian.png" />
          <img v-if="recipe.glutenFree" src="@/assets/gluten-free.png" />
          <img v-else src="@/assets/contains-gluten.png" />
          <img src="@/assets/watched.png" />
        </div>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.id"
              >
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecipeById } from '../services/recipes';

export default {
  mounted() {
    this.isFavorite = this.$store.state.favoriteRecipes.indexOf(this.recipe) !== -1
  },
  data() {
    return {
      recipe: null,
      isFavorite: false
    };
  },
  async created() {
    try {
      // "https://test-for-3-2.herokuapp.com/recipes/info",
      const response = await getRecipeById(this.$route.params.recipeId);
      if (response.status !== 200) {
        this.$router.replace("/NotFound");
      }
      console.log(response.data);
      let {
        id,
        title,
        readyInMinutes,
        image,
        aggregateLikes,
        vegan,
        vegetarian,
        glutenFree,
        servings,
        extendedIngredients,
        instructions
      } = response.data;
      console.log(instructions);
      instructions = instructions.split('<li>');
      let _instructions = [];
      for (let i = 0; i < instructions.length; i++) {
        instructions[i] = instructions[i].replace('<ol>', '').replace('</li>', '').replace('</ol>', '');
        if (instructions[i] !== '') {
          _instructions.push(instructions[i]);
        }
      }
      const _recipe = {
        id,
        title,
        readyInMinutes,
        image,
        aggregateLikes,
        vegan,
        vegetarian,
        glutenFree,
        servings,
        extendedIngredients,
        instructions: _instructions,
      };
      this.recipe = _recipe;
    } catch (error) {
      this.$router.replace("/NotFound");
      console.log(error);
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
@import "@/scss/recipeViewPage-style.scss";
</style>
