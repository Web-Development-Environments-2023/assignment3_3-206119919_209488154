<template>
  <div class="container">
    <h1 class="title">Search Page</h1>

    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
      <div>Previous Search: <b>{{ previousSearch }}</b></div>
      <b-form-group
        id="input-group-Query"
        label-cols-sm="3"
        label="Search Query:"
        label-for="query">
          <b-form-input
            id="searchQuery"
            v-model="$v.form.query.$model"
            type="text"
            :state="validateState('query')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Search Query is required
          </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-cuisines"
        label-cols-sm="3"
        label="Cuisines:"
        label-for="cuisines">
          <b-form-select
            id="cuisines"
            v-model="form.cuisine"
            :options="cuisinesOptions"
            multiple 
          ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-diets"
        label-cols-sm="3"
        label="Diets:"
        label-for="diets">
          <b-form-select
            id="diets"
            v-model="form.diet"
            :options="dietsOptions"
            multiple
          ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-intolerances"
        label-cols-sm="3"
        label="Intolerances:"
        label-for="intolerances">
          <b-form-select
            id="intolerances"
            v-model="form.intolerances"
            :options="intolerancesOptions"
            multiple
          ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-number"
        label-cols-sm="3"
        label="Search Results Amount:"
        label-for="number">
          <b-form-select
            id="searchResultAmount"
            v-model="$v.form.number.$model"
            :options="numberOptions"
            :state="validateState('number')"
          ></b-form-select>
          <b-form-invalid-feedback v-if="!$v.form.number.required">
            Search Results Amount is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.number.isValidNumberOption">
            Search Results Amount must be 5, 10 or 15
          </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="reset"
        variant="danger">
          Reset
      </b-button>
      
      <b-button
        type="submit"
        variant="primary">
          Search
      </b-button>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show>
      Search failed: {{ form.submitError }}
    </b-alert>
    <div
      v-if="searchRecipes.length > 0"
      class="centeredDiv">
        <b-button-group>
          <b-button
            @click="sortByPrepTime"
            variant="outline-primary">
              Sort By Preperation Time
          </b-button>
          <b-button
            @click="sortByLikes"
            variant="outline-primary">
              Sort By Likes
          </b-button>
        </b-button-group>
        <RecipePreviewList
          title="Search Results"
          recipeListType="search"
          :class="{
            center: true
          }">
        </RecipePreviewList>
    </div>
    <div
      v-if="!searchRecipes.length"
      class="centeredDiv">
        <span>No results found</span>
    </div>

  </div>

  
</template>

<script>

import { mapState } from "vuex";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { required } from "vuelidate/lib/validators";
import { cuisinesOptions, dietsOptions, intolerancesOptions, searchDefaultValues } from "../assets/consts.js";

export default {
  name: "Search",
  components: {
    RecipePreviewList
  },
  data() {
    return {
      form: {
        ...searchDefaultValues,
        submitError: undefined
      },
      cuisinesOptions: [{ value: null, text: "", disabled: true }],
      dietsOptions: [{ value: null, text: "", disabled: true }],
      intolerancesOptions: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    }
  },
  validations: {
    form: {
      query: {
        required
      },
      number: {
        required,
        isValidNumberOption(value) {
          return ["5", "10", "15"].includes(value);
        }
      }
    }
  },
  computed: {
    numberOptions() {
      return [
        { value: 5, text: '5' },
        { value: 10, text: '10' },
        { value: 15, text: '15' }
      ];
    },
    ...mapState({
      searchRecipes: state => state.searchRecipes,
      previousSearch: state => state.previousSearch
    })
  },
  mounted() {
    this.cuisinesOptions.push(...cuisinesOptions);
    this.dietsOptions.push(...dietsOptions);
    this.intolerancesOptions.push(...intolerancesOptions);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async search() {
      try {
        this.$store.dispatch("setPreviousSearch", this.form.query);
        this.previousSearch = this.form.query;

        let { query, number, cuisine, diet, intolerances } = this.form;
        cuisine = cuisine.join();
        diet = diet.join();
        intolerances = intolerances.join();
        this.$store.dispatch("setSearchRecipes", { query, number, cuisine, diet, intolerances });
      } catch (error) {
        console.log(error);
      }
    },
    async onSearch() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.search();
    },
    onReset() {
      this.form = {
        ...searchDefaultValues      
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    sortByPrepTime() {
      this.searchRecipes.sort((a, b) => {
        return a.readyInMinutes - b.readyInMinutes;
      });
      this.$store.commit("setSearchRecipes", this.searchRecipes);
    },
    sortByLikes() {
      this.searchRecipes.sort((a, b) => {
        return b.aggregateLikes - a.aggregateLikes;
      });
      this.$store.commit("setSearchRecipes", this.searchRecipes);
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/scss/searchPage-style.scss";
</style>