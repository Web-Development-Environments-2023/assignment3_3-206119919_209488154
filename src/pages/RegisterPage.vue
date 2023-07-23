<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username can include only English letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-firstname"
        label-cols-sm="3"
        label="First Name:"
        label-for="firstname"
      >
        <b-form-input
          id="firstname"
          v-model="$v.form.firstname.$model"
          type="text"
          :state="validateState('firstname')"
        ></b-form-input>
        <b-form-invalid-feedback>
          First Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-lastname"
        label-cols-sm="3"
        label="Last Name:"
        label-for="lastname"
      >
        <b-form-input
          id="lastname"
          v-model="$v.form.lastname.$model"
          type="text"
          :state="validateState('lastname')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Last Name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length of between 5-10 characters
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.containsNumber"
        >
          Contain at least 1 number
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.containsSpecial"
        >
          Contain at least 1 special character
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>
      
      <b-form-group
        id="input-group-email"
        label-cols-sm="3"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          type="email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required">
         Email is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.email.email"
        >
          Invalid email address
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
        class="ml-5 w-75"
      >
        Register
      </b-button>

      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import countries from "../assets/countries";
import { registerUser } from "../services/auth";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstname: {
        required
      },
      lastname: {
        required
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        containsNumber: (p) => /[0-9]/.test(p),
        containsSpecial: (p) => /[ !"#$%&'()*+,-./:;<=>?@\[/\]^_`{|}~]/.test(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required, 
        email
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async register() {
      // "https://test-for-3-2.herokuapp.com/user/Register",
      try {
        const response = await registerUser(
          {
            username: this.form.username,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            password: this.form.password,
            email: this.form.email,
            country: this.form.country
          }
        );
        if (response.status === 201) {
          this.$router.push("/login");
        }
        else {
          this.form.submitError = response.data.message;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/register-style.scss";
</style>
