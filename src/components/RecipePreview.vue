<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
    class="recipe-preview"
  >
  <div class="recipe">
    <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
      <div class="recipe-allergens">
        <img v-if="recipe.vegan" src="@/assets/vegan.png" />
        <img v-else-if="recipe.vegetarian" src="@/assets/vegeterian.png" />
        <img v-if="recipe.glutenFree" src="@/assets/gluten-free.png" />
        <img v-else src="@/assets/contains-gluten.png" />
      </div>
    </div>
  </div>
  </router-link>
</template>

<script>
export default {
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/recipePreview-style.scss";
</style>
