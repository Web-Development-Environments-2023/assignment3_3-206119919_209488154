<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        // let response;
        // if (this.type === "random") {
        //   response = await this.axios.get(
        //     this.$root.store.server_domain + "/recipes/random",
        //     // "https://test-for-3-2.herokuapp.com/recipes/random"
        //   );
        // }
        // else if (this.type === "last-seen") {
        //   response = await this.axios.get(
        //     this.$root.store.server_domain + "/users/watched",
        //   );
        // }
        // const recipes = response.data;
        const recipes = [
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
        ];
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/recipePreviewList-style.scss";
</style>
