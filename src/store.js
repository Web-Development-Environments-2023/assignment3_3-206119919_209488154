// const state = {

//     server_domain: "http://localhost:3000",

//     // server_domain: "http://132.72.65.211/",
    

// };

import Vue from 'vue';
import Vuex from 'vuex';
import * as auth from './services/auth';
import * as user from './services/users';
import * as recipes from './services/recipes';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: localStorage.getItem("username"),
        watchedRecipes: [],
        favoriteRecipes: [],
        createdRecipes: [],
        randomRecipes: [],
        previousSearch: ''
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },
        setFavoriteRecipes(state, favoriteRecipes) {
            state.favoriteRecipes = favoriteRecipes;
        },
        setWatchedRecipes(state, watchedRecipes) {
            state.watchedRecipes = watchedRecipes;
        },
        setCreatedRecipes(state, createdRecipes) {
            state.createdRecipes = createdRecipes;
        },
        setRandomRecipes(state, randomRecipes) {
            state.randomRecipes = randomRecipes;
        },
        setSearchNumber(state, searchNumber) {
            state.searchNumber = searchNumber;
        }
    },
    actions: {
        async login({ commit }, { username, password }) {
        try {
            const response = await auth.loginUser({ username, password });
            if (response.status === 200) {
                commit('setUsername', username);
                localStorage.setItem("username", username);
            }
            return response;
        } catch (error) {
            console.log(error);
        }
        },
        async logout({ commit }) {
            try {
                const response = await auth.logoutUser();
                if (response.status === 200) {
                    commit('setUsername', null);
                    localStorage.removeItem("username");
                }
                return response;
            } catch (error) {
                console.log(error);
            }
        },
        async setFavoriteRecipes({ commit }) {
            try {
                const response = await user.getUserFavoriteRecipes();
                if (response.status === 200) {
                    commit('setFavoriteRecipes', response.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async setWatchedRecipes({ commit }) {
            try {
                const response = await user.getRecipesWatchedByUsers();
                if (response.status === 200) {
                    commit('setWatchedRecipes', response.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async setCreatedRecipes({ commit }) {
            try {
                const response = await user.getRecipesCreatedByUser();
                if (response.status === 200) {
                    commit('setCreatedRecipes', response.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async setRandomRecipes({ commit }) {
            try {
                const response = await recipes.getThreeRandomRecipes();
                if (response.status === 200) {
                    commit('setRandomRecipes', response.data);
                }
            } catch (error) {
                console.log(err);
            }
        }
    }
});

export default store;