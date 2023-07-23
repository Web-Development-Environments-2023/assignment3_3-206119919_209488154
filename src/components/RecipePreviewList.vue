<template>
  <b-container>
    <div style="display: flex;justify-content: center;">
      <b-button
        v-if="isRandom()"
        @click="updateRandomRecipes">
        <i class="bi bi-arrow-repeat" style="width:50px;height:50px"></i>
      </b-button>
      <h3>{{ title }}:</h3>
  </div>
    <b-row v-if="isWatched()">
      <b-col v-for="r in watchedRecipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
    <b-row v-if="isRandom()">
      <b-col v-for="r in randomRecipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
    <b-row v-if="isCreated()">
      <b-col v-for="r in createdRecipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r"/>
      </b-col>
    </b-row>
    <b-row v-if="isFavorites()">
      <b-col v-for="r in favoriteRecipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
    <b-row v-if="isSearch()">
      <b-col v-for="r in searchRecipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
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
