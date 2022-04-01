var mapQuestApiKey = "pz5UbtNqHGRFZY8OHcGGAeZmK7sxjab5";
var cityString = "Atlanta";
var buttonLocation = document.getElementById("placeSearch");

function getMapApiInfo() {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl = "https://api.github.com/users/octocat/repos";
  cityString = document.getElementById("enterLocation").value;
  console.log({ cityString });
  fetch(
    "https://www.mapquestapi.com/search/v4/place?q=" +
      cityString +
      "%20grocery%20store" +
      "&key=" +
      mapQuestApiKey +
      "&sort=relevance"
  )
    .then(function (response) {
      console.log("---------------");
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data.results);
      var groceryStoreList = data.results;
      groceryOptions(groceryStoreList);
    });
}

// loops through grocery options
function groceryOptions(groceryStoreList) {
  var resultsElement = document.getElementById("groceryResults");
  while (resultsElement.firstChild) {
    resultsElement.removeChild(resultsElement.firstChild);
  }
  for (var i = 0; i < groceryStoreList.length; i++) {
    console.log(groceryStoreList[i]);

    var groceryDisplay = document.createElement("button");
    groceryDisplay.classList.add("button");
    groceryDisplay.innerText = groceryStoreList[i].name;
    var groceryLat = groceryStoreList[i].place.geometry.coordinates[1];
    var groceryLon = groceryStoreList[i].place.geometry.coordinates[0];
    // stores data
    groceryDisplay.setAttribute("data-lat", groceryLat);
    groceryDisplay.setAttribute("data-lon", groceryLon);
    groceryDisplay.onclick = function () {
      storeChosen(this.getAttribute("data-lat"), this.getAttribute("data-lon"));
      return false;
    };

    resultsElement.appendChild(groceryDisplay);
  }
}

function storeChosen(placeLat, placeLon) {
  var mapResults = document.getElementById("mapImages");
  while (mapResults.firstChild) {
    mapResults.removeChild(mapResults.firstChild);
  }
  console.log(placeLat);
  console.log(placeLon);
  console.log("store click");
  var userLocation = document.getElementById("enterLocation").value;
  console.log(userLocation);
  // map directions api
  fetch(
    "https://www.mapquestapi.com/staticmap/v5/map?start=" +
      userLocation +
      "&end=" +
      placeLat +
      "," +
      placeLon +
      "&size=1000,400@2x&key=" +
      mapQuestApiKey
  ).then(function (response) {
    console.log("---------------");
    console.log(response);
    var groceryDisplay = document.createElement("img");
    groceryDisplay.src = response.url;
    mapResults.appendChild(groceryDisplay);
  });
}

buttonLocation.addEventListener("click", getMapApiInfo);
