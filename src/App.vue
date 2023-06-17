<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'main' }">Sanji's Social Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <router-link :to="{ name: 'about' }">About</router-link>|
      <!-- {{ !$root.store.username }} -->
      <span v-if="!$root.store.username">
        Hello Guest! 
        <router-link :to="{ name: 'register' }"> Register </router-link>|
        <router-link :to="{ name: 'login' }"> Login </router-link>
      </span>
      <span v-else class="logged-in">
        Hello {{ $root.store.username }}! 
        <b-dropdown
          id="dropdown"
          text="Profile"
          toggle-class="nav-link-custom"
          left
        >
          <b-dropdown-item>Favorite recipes</b-dropdown-item>
          <b-dropdown-item>My recipes</b-dropdown-item>
          <b-dropdown-item>Family recipes</b-dropdown-item>
        </b-dropdown>
        <button @click="Logout">Logout</button>|
      </span>
      <router-link :to="{ name: 'createRecipe' }">Create Recipe</router-link>|
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
</style>
