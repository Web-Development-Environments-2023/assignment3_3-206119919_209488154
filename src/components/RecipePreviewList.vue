<template>
  <b-card-group class="recipe-preview-list-container" deck>
    <b-card>
      <template #header>
        <div class="random-header">
          <b-button pill variant="success"
            v-if="isRandom()"
            @click="updateRandomRecipes">
            <i class="bi bi-arrow-repeat"></i>
          </b-button>
          <h3>{{ title }}:</h3>
        </div>
      </template>
      <b-list-group v-if="isWatched()">
        <b-list-group-item v-for="r in watchedRecipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r"/>
        </b-list-group-item>
      </b-list-group>
        
      <b-list-group v-if="isRandom()">
        <b-list-group-item v-for="r in randomRecipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r"/>
        </b-list-group-item>
      </b-list-group>

      <b-list-group v-if="isCreated()">
        <b-list-group-item v-for="r in createdRecipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r"/>
        </b-list-group-item>
      </b-list-group>

      <b-list-group v-if="isFavorites()">
        <b-list-group-item v-for="r in favoriteRecipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-list-group-item>
      </b-list-group>

      <b-list-group v-if="isSearch()" horizontal>
        <b-list-group-item v-for="r in searchRecipes.slice(0, 5)" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-list-group-item>
      </b-list-group>

      <b-list-group v-if="isSearch() && searchRecipes.length === 10" horizontal>
        <b-list-group-item v-for="r in searchRecipes.slice(5, 10)" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-list-group-item>
      </b-list-group>

      <b-list-group v-if="isSearch() && searchRecipes.length === 15" horizontal>
        <b-list-group-item v-for="r in searchRecipes.slice(10, 15)" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-list-group-item>
      </b-list-group>
      
    </b-card>
  </b-card-group>
</template>

<script>
import { mapState } from 'vuex';
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
    recipeListType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      randomRecipes: state => state.randomRecipes,
      watchedRecipes: state => state.watchedRecipes,
      favoriteRecipes: state => state.favoriteRecipes,
      createdRecipes: state => state.createdRecipes,
      searchRecipes: state => state.searchRecipes
    })
  },
  methods: {
    updateRandomRecipes() {
      this.$store.dispatch('setRandomRecipes');
    },
    isRandom() {
      return this.recipeListType === 'random';
    },
    isFavorites() {
      return this.recipeListType === 'favorites';
    },
    isCreated() {
      return this.recipeListType === 'created';
    },
    isSearch() {
      return this.recipeListType === 'search';
    },
    isWatched() {
      return this.recipeListType === 'watched';
    }
  },
  mounted() {
    if(this.isRandom()) {
      this.$store.dispatch('setRandomRecipes');
    } 
    if(this.isFavorites()) {
      this.$store.dispatch('setFavoriteRecipes');
    } 
    if(this.isCreated()) {
      this.$store.dispatch('setCreatedRecipes');
    } 
    if(this.isCreated()) {
      this.$store.dispatch('setSearchRecipes');
    } 
    else if (this.$root.store.username) {
      this.$store.dispatch('setWatchedRecipes');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/recipePreviewList-style.scss";
</style>
