<template>
  <div id="nav">
    <router-link :to="{ name: 'main' }">Sanji's Social Recipes</router-link>|
    <router-link :to="{ name: 'search' }">Search</router-link>|
    <router-link :to="{ name: 'about' }">About</router-link>|
    <span v-if="!username">
      Hello Guest! 
      <router-link :to="{ name: 'register' }"> Register </router-link>|
      <router-link :to="{ name: 'login' }"> Login </router-link>
    </span>
    <span v-else class="logged-in">
      Hello {{ username }}! 
      <b-dropdown
        id="dropdown"
        text="Profile"
        toggle-class="nav-link-custom"
        left
      >
        <b-dropdown-item>
            <router-link :to="{ name: 'favorites' }"> Favorites </router-link>
        </b-dropdown-item>
        <b-dropdown-item>
            <router-link :to="{ name: 'myRecipes' }"> My Recipes </router-link>
        </b-dropdown-item>
        <b-dropdown-item>
            <router-link :to="{ name: 'family' }"> Family Recipes </router-link>
        </b-dropdown-item>
      </b-dropdown>
      <b-button @click="Logout">Logout</b-button>
      <b-button @click="showModal">Create Recipe</b-button>|
      <b-modal ref="create-recipe-modal">
        <CreateRecipeModal />
      </b-modal>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CreateRecipeModal from './CreateRecipeModal.vue';
export default {
  name: "NavBar",
  components: {
  CreateRecipeModal
  },
  computed: {
    ...mapState({
        username: state => state.username
    })
  },
  methods: {
    async Logout() {
      try {
        const response = await this.$store.dispatch("logout");
        if (response.status === 200) {
          this.$root.toast("Logout", "User logged out", "success");
          this.$router.push("/").catch(() => {
            this.$forceUpdate();
          });
        }
        else {
          this.$root.toast("Logout", response.data.message, "fail");
        }
      }
      catch (error) {
        console.log(error);
      }
    },
    showModal() {
      this.$refs['create-recipe-modal'].show();
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
</style>
