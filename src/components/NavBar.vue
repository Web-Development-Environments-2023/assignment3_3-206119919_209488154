<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand :to="{ name: 'main' }">
        Sanji's Social Recipes
      </b-navbar-brand>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
      
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
          <b-nav-item @click="showModal">Create Recipe</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="nav-properties">
          <div class="nav-property">
            <img src="@/assets/vegan.png" class="nav-img"/>
            <b-nav-text class="nav-title">Vegan</b-nav-text>
          </div>
          <div class="nav-property">
            <img src="@/assets/vegetarian.png" class="nav-img"/>
            <b-nav-text class="nav-title">Vegetarian</b-nav-text>
          </div>
          <div class="nav-property">
            <img src="@/assets/gluten-free.png" class="nav-img"/>
            <b-nav-text class="nav-title">Gluten Free</b-nav-text>
          </div>
          <div class="nav-property">
            <img src="@/assets/contains-gluten.png" class="nav-img"/>
            <b-nav-text class="nav-title">Gluten</b-nav-text>
          </div>
          <div class="nav-property">
            <img src="@/assets/watched.png" class="nav-img"/>
            <b-nav-text class="nav-title">Seen</b-nav-text>
          </div>
        </b-navbar-nav>

        <b-navbar-nav v-if="!username">
          <b-nav-text>Hello Guest!</b-nav-text>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-else class="ml-auto">
          <b-nav-text>Hello {{ username }}!</b-nav-text>
          <b-nav-item-dropdown text="Profile" right>
            <b-dropdown-item :to="{ name: 'favorites' }">Favorites</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'myRecipes' }">My Recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'family' }">Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item @click="Logout">Logout</b-nav-item>
          <b-modal ref="create-recipe-modal">
            <CreateRecipeModal />
          </b-modal>
        </b-navbar-nav>
        
      </b-collapse>
    </b-navbar>
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
@import "@/scss/navBar-style.scss";
</style>
