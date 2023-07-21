<template>
  <div class="container">
    <div class="myTitle animated-title">
      <h1>About</h1>
    </div>
    <p class="animated-paragraph-1">
      WELCOME to "Sanji's Social Recipes"!
      This web platform was developed in order to share uniuqe recieps among users around the web.
      "Sanji's Social Recipes" is a platform that we developed in "Web develpoment inviorments" course at
      the department for software and information systems engineering at Ben_gurion University of the Negev.
    </p>
    <p class="animated-paragraph-2">
      "Sanji's Social Recipes" allows you to add your own recipes, search for existing
      recipes,  show your family recipes and claiming your favorite recipes and share them with the world.
    </p>
    <p class="animated-paragraph-3">
      
    </p>
    <p class="animated-paragraph-4">
      We hope you enjoy using our recipe site as both a resource for finding
      great recipes and a social network for connecting with other food lovers.
      If you have any feedback or suggestions, we would love to hear from you.
    </p>
    
    <div class="container">
      <div class="animated-title">
        <h2>About the Authors</h2>
      </div>
      <p class="animated-paragraph-5">
        The authors are Shaked Ben-Aharon & Omer Cohen, two 3rd year students studying Software and Information Systems at Ben-Gurion University.
        Our passion lies in web development, where we strive to craft user-friendly and visually captivating websites.
        This project has been an invaluable learning journey, and we sincerely hope that you relish using our recipe site!
      </p>

      <footer class="footer animated" ref="footerRef">
        <div class="previous-assignments">
          <p id="previous-assignments">Previous assignments</p>
            <a href="https://web-development-environments-2023.github.io/assignment2-209488154_206119919/">
            Pizza Invaders Game&#169;
            </a>
        </div>
        <div class="contect-us">
          <p id="contect-us">Contact us</p>
            <a href="mailto:benahash@post.bgu.ac.il">&#9813; benahash@post.bgu.ac.il &#10096; Shaked &#10097;</a>
            <br>
            <a href="mailto:omer6@post.bgu.ac.il">&#9812; omer6@post.bgu.ac.il &#10096; Omer &#10097;</a>
        </div>
      </footer>
  </div>
  </div>
</template>

<script>
export default {
  name: "about",
};
</script>


<style lang="scss" scoped>
@import "@/scss/aboutPage-style.scss";
</style>