<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="recipes-preview-container">
      <div>
        <RecipePreviewList title="Randome Recipes" :recipes="randomRecipes" class="RandomRecipes center" ref="randomeRecipes"/>
        <button @click="updateRandomRecipes">Update Recipes</button>
      </div>
      <div>
        <RecipePreviewList
          title="Last Viewed Recipes"
          :recipes="watchedRecipes"
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
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() { // TODO: remove
    return {
      randomRecipes:
      [
        {
          aggregateLikes: 5,
          glutenFree: false,
          id: 665540,
          image: "https://spoonacular.com/recipeImages/665540-556x370.jpg",
          readyInMinutes: 45,
          title: "Yogurt Cake",
          vegan: false,
          vegetarian: true,
        },
        {
          aggregateLikes: 82,
          glutenFree: false,
          id: 658357,
          image: "https://spoonacular.com/recipeImages/658357-556x370.jpg",
          readyInMinutes: 45,
          title: "Rigatoni With Sweet Sausages In Creamy Tomato Sauce",
          vegan: false,
          vegetarian: false,
        },
        {
          aggregateLikes: 57,
          glutenFree: true,
          id: 715446,
          image: "https://spoonacular.com/recipeImages/715446-556x370.jpg",
          readyInMinutes: 490,
          title: "Slow Cooker Beef Stew",
          vegan: false,
          vegetarian: false
        }
      ],
    }
  },
  computed: {
    ...mapState({
      username: state => state.username,
      // randomRecipes: state => state.randomRecipes, TODO: uncomment this
      watchedRecipes: state => state.watchedRecipes
    })
  },
  mounted() {
    this.updateRandomRecipes();
    if (this.username) {
      this.updateWatchedRecipes()
    }
  },
  methods: {
    updateRandomRecipes() {
      this.$store.dispatch('setRandomRecipes');
    },
    updateWatchedRecipes() {
      this.$store.dispatch('setWatchedRecipes');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/main-style.scss";
</style>
