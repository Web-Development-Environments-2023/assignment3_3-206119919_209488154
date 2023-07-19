import axios from "axios";

const server_domain = "http://localhost:3000/recipes";

/**
 * This path returns all the family recipes
 */
export async function getFamilyRecipes() {
    try {
        const response = await axios.get(
            server_domain + '/family', 
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(err);
    }
}

/**
 * This path returns 3 random recipes
 */
export async function getThreeRandomRecipes() {
    try {
        const response = await axios.get(
            server_domain + '/random',
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This path returns x recipes
 */
export async function searchRecipes(searchDetails) {
    try {
        const response = await axios.get(
            server_domain + '/search',
            searchDetails,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

/**
 * This path returns the full details of a recipe by its id
 */
export async function getRecipeById(recipe_id) {
    try {
        const response = await axios.get(
            server_domain + `/${recipe_id}`,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}