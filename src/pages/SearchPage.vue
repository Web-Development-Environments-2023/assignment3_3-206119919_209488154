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
            :options="cuisines"
          ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-diets"
        label-cols-sm="3"
        label="Diets:"
        label-for="diets">
          <b-form-select
            id="diets"
            :options="diets"
          ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-intolerances"
        label-cols-sm="3"
        label="Intolerances:"
        label-for="intolerances">
          <b-form-select
            id="intolerances"
            :options="intolerances"
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
      v-if="searchResults.length > 0"
      class="centeredDiv">
        <b-button-group>
          <b-button
            @click="sortByPrepTime"
            variant="outline-primary">
              Sort By Preperation Time
          </b-button>
          <b-button
            @click="sortByPopularity"
            variant="outline-primary">
              Sort By Popularity
          </b-button>
        </b-button-group>
        <RecipePreviewList
          title="Search Results"
          :recipes="searchResults"
          :class="{
            center: true
          }">
        </RecipePreviewList>
    </div>
    <div
      v-if="!searchResults.length"
      class="centeredDiv">
        <span>No results found</span>
    </div>

  </div>

  
</template>

<script>

import { searchRecipes } from '../services/recipes.js';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { required } from "vuelidate/lib/validators";
import { cuisines, diets, intolerances, searchDefaultValues } from "../assets/consts.js";

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
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],      
      searchResults: [],
      previousSearch: this.$store.state.previousSearch
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
    }
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async onSearch() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.form.submitError = undefined;
      this.searchResults = [];
      this.$store.dispatch("setPreviousSearch", this.form.query);
      this.previousSearch = this.form.query;

      const { query, number, cuisines, diets, intolerances } = this.form;
      const response = await searchRecipes({ query, number, cuisines, diets, intolerances });    
      
      if (!response) {
        this.form.submitError = "Server error";
      } else if (response.status !== 200) {
        this.form.submitError = response.data.message;
      } else if (response.status === 200) {
        this.searchResults.push(...response.data);
      }
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
      this.searchResults.sort((a, b) => {
        return a.readyInMinutes - b.readyInMinutes;
      })
    },
    sortByPopularity() {
      this.searchResults.sort((a, b) => {
        return b.popularity - a.popularity;
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import "@/scss/searchPage-style.scss";
</style>