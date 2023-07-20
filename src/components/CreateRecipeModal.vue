<template>
    <div class="container">
      <h1 class="title">Create Recipe Modal</h1>
      <b-form @submit.prevent="onCreate" @reset.prevent="onReset">
        <b-form-group
          id="input-group-title"
          label-cols-sm="3"
          label="Title:"
          label-for="title"
        >
          <b-form-input
            id="title"
            v-model="$v.form.title.$model"
            type="text"
            :state="validateState('title')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Title is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-readyInMinutes"
          label-cols-sm="3"
          label="Preperation time (in minutes):"
          label-for="readyInMinutes"
        >
          <b-form-input
            id="readyInMinutes"
            v-model="$v.form.readyInMinutes.$model"
            type="number"
            :state="validateState('readyInMinutes')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.required">
            Preperation time is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.readyInMinutes.integer">
            Preperation time can include only whole numbers
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-image"
          label-cols-sm="3"
          label="Image:"
          label-for="image"
        >
          <b-form-input
            id="image"
            v-model="$v.form.image.$model"
            type="text"
            :state="validateState('image')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Image is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-vegan"
          label-cols-sm="3"
          label="Vegan:"
          label-for="vegan"
        >
          <b-form-checkbox
            id="vegan"
            :value="true"
            :unchecked-value="false"
            v-model="$v.form.vegan.$model"
            name="check-button"
            switch />
        </b-form-group>

        <b-form-group
          id="input-group-vegetarian"
          label-cols-sm="3"
          label="Vegetarian:"
          label-for="vegetarian"
        >
          <b-form-checkbox
            id="vegetarian"
            :value="true"
            :unchecked-value="false"
            v-model="$v.form.vegetarian.$model"
            name="check-button"
            switch />
        </b-form-group>

        <b-form-group
          id="input-group-glutenFree"
          label-cols-sm="3"
          label="Gluten-free:"
          label-for="glutenFree"
        >
          <b-form-checkbox
            id="glutenFree"
            :value="true"
            :unchecked-value="false"
            v-model="$v.form.glutenFree.$model"
            name="check-button"
            switch />
        </b-form-group>

        <b-form-group
          id="input-group-instructions"
          label-cols-sm="3"
          label="Instructions:"
          label-for="instructions"
        >
          <b-form-input
            id="instructions"
            type="text"
            v-model="$v.form.instructions.$model"
            :state="validateState('instructions')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Instructions are required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-servings"
          label-cols-sm="3"
          label="Servings:"
          label-for="servings"
        >
          <b-form-input
            id="servings"
            v-model="$v.form.servings.$model"
            type="number"
            :state="validateState('servings')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.servings.required">
            Servings is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.servings.integer">
            Servings can include only whole numbers
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          id="input-group-extendedIngredients"
          label-cols-sm="3"
          label="Extended Ingredients:"
          label-for="extendedIngredients"
        >
          <b-form-input
            id="extendedIngredients"
            type="text"
            v-model="$v.form.extendedIngredients.$model"
            :state="validateState('extendedIngredients')"
          ></b-form-input>
          <b-form-invalid-feedback>
            Extended ingredients are required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button 
          type="reset" 
          variant="danger"
        >
          Reset
        </b-button>
        <b-button
          id="submit"
          type="submit"
          variant="primary"
          class="ml-5 w-55"
        >
          Create
        </b-button>
      </b-form>
      
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Creation failed: {{ form.submitError }}
      </b-alert>
    </div>
</template>

<script>
import { addRecipeCreatedByUser } from "../services/users";
import {
  required,
  integer
} from "vuelidate/lib/validators";

export default {
  name: "CreateRecipeModal",
  data() {
    return {
      form: {
        title: "",
        readyInMinutes: 0,
        image: "",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: "",
        servings: 0,
        extendedIngredients: "",
        submitError: undefined
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      title: {
        required
      },
      readyInMinutes: {
        required,
        integer
      },
      image: {
        required
      },
      vegan: {
        required
      },
      vegetarian: {
        required
      },
      glutenFree: {
        required
      },
      instructions: {
        required
      },
      servings: {
        required, 
        integer
      },
      extendedIngredients: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async create() {
      try {
        const response = await addRecipeCreatedByUser(
          {
            title: this.form.title,
            readyInMinutes: parseInt(this.form.readyInMinutes),
            image: this.form.image,
            vegan: this.form.vegan,
            vegetarian: this.form.vegetarian,
            glutenFree: this.form.glutenFree,
            aggregateLikes: 0,
            instructions: this.form.instructions,
            servings: parseInt(this.form.servings),
            extendedIngredients: this.form.extendedIngredients
          }
        );
        if (response.status === 200) {
          this.$root.toast("Create Recipe", "Created recipe", "success");
          this.$store.dispatch("setCreatedRecipes");
          this.$router.push("/");
        }
        else {
          this.form.submitError = response.data.message;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onCreate() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.create();
    },
    onReset() {
      this.form = {
        title: "",
        readyInMinutes: 0,
        image: "",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        instructions: "",
        servings: 0,
        extendedIngredients: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/createRecipeModal-style.scss";
</style>