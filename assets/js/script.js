var foodAPIKey = "f1d8bb5060f667390aea5bdedc8729b1";
var foodID = "636d33a1";
var protein;
body = document.body;
var choiceOne = "";
var choiceTwo = "";
var choiceThree = "";
var inputUrl = "";



var buttonEl = document.getElementById("displayPage");
console.log(buttonEl);
function getRecipes(e) {
  e.preventDefault();
  choiceOne = document.querySelector("#mealType").value;
  choiceTwo = document.querySelector("#dayMeal").value;
  choiceThree = document.querySelector("#kcal").value;
  inputUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${choiceTwo}&app_id=636d33a1&app_key=f1d8bb5060f667390aea5bdedc8729b1&mealType=${choiceOne}&calories=0-${choiceThree}`;
  // https://api.edamam.com/api/recipes/v2?type=public&q=beans&app_id=636d33a1&app_key=f1d8bb5060f667390aea5bdedc8729b1&mealType=Breakfast&calories=0-500

  console.log(inputUrl);
  pageRecipe(inputUrl);
}
if (buttonEl) {
  buttonEl.addEventListener("click", getRecipes);
}
// var foodpref = userinput"", drop down with food suggestions

// "https://api.edamam.com/api/recipes/v2?type=public&q=" + foodpref + "&app_id" +foodID +"&app_key="+foodAPI+"&mealType=" + mealType + "&calories=" calCount

function pageRecipe(url) {
  var fetchResponse = fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      
      console.log(fetchResponse);

      


      function getRecipe(recipeArray) {
        // array for recipes
        recipeArray = data.hits;
        localStorage.setItem("recipeArray", JSON.stringify(recipeArray));

        for (var i = 0; i < 6; i++) {
          var recipeEl = recipeArray[i];
          console.log(recipeEl);
          var ingredients = recipeArray[i].recipe.ingredientLines;
          console.log({ ingredients });
          for (var j = 0; j < ingredients.length; j++) {
            var ingList = ingredients[j];
            console.log({ ingList });
            // }
          }
          var thumbnails = recipeArray[i].recipe.images.THUMBNAIL.url;
          console.log(thumbnails);
          // thumbs.setAttribute("src", "recipe.images.THUMBNAIL.url");

          // var ingString = JSON.stringify(ingredients);
          var label = recipeArray[i].recipe.label;
          console.log(label);
          cardsEL = document.createElement("div");
          console.log(cardsEL);
          var cardHeadEl = document.createElement("div");
          cardsEL.setAttribute("class", "card");
          console.log(cardHeadEl);
          cardHeadEl.setAttribute("class", "card-header");
          var cardContentEl = document.createElement("div");
          cardContentEl.setAttribute("class", "card-content");
          console.log(cardContentEl);
          var p1 = document.createElement("p");
          p1.setAttribute("class", "card-content");
          console.log(p1);

          cardsEL.appendChild(cardHeadEl);
          cardHeadEl.textContent = label;
          cardHeadEl.appendChild(cardContentEl);
          cardContentEl.appendChild(p1);
          p1.textContent = ingredients;
        }

        

        // //todo textContent 1st
      }
      getRecipe(fetchResponse);
      // fetchResponse();

      // var ingredients = data.hits[i].recipe.ingredientLines[i];
      // console.log(ingredients);

      nextPage();
    });
}
// let btnSwitch = document.getElementById("displayPage");

function nextPage() {
  window.location.href = "./recipe.html";

  cardRowEl.appendChild(cardsEL);
}

// btnSwitch.addEventListener("click", nextPage);

var dropdown = document.querySelector(".dropdown");

if (dropdown) {
  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("is-active");
  });
}
