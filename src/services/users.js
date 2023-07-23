import axios from "axios";

const server_domain = "http://localhost:80/users";

/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
export async function addRecipeToUserFavorites(recipeId) {
    try {
        const response = await axios.post(
            server_domain + '/favorites', 
            { recipeId }, 
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
export async function getUserFavoriteRecipes() {
    try {
        const response = await axios.get(
            server_domain + '/favorites', 
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This path gets body with recipeId and save this recipe in the watched list of the logged-in user
 */
export async function addRecipeWatchedByUser(recipeId) {
    try {
        const response = await axios.post(
            server_domain + '/watched', 
            { recipeId }, 
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This path returns the watched recipes that were watched by the logged-in user
 */
export async function getRecipesWatchedByUsers() {
    try {
        const response = await axios.get(
            server_domain + '/watched', 
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This path gets body with a recipe and save it in the list of recipes created by the logged-in user
 */
export async function addRecipeCreatedByUser(recipe) {
    try {
        const response = await axios.post(
            server_domain + '/created', 
            { recipe }, 
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This path returns the recipes that were created by the logged-in user
 */
export async function getRecipesCreatedByUser() {
    try {
        const response = await axios.get(
            server_domain + '/created', 
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}