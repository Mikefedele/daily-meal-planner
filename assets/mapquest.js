console.log("javascript load");
var mapQuestApiKey = "pz5UbtNqHGRFZY8OHcGGAeZmK7sxjab5";
var cityString = "Atlanta";
var buttonLocation = document.getElementById("placeSearch");
// sort = drop down
// enter city/zip then enter what you are looking for ie grocery store
// then gives closest locations
// pops up when you get food list

function getMapApiInfo() {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl = "https://api.github.com/users/octocat/repos";
  cityString = document.getElementById("enterLocation").value;
  console.log({ cityString });
  fetch(
    "https://www.mapquestapi.com/search/v4/place?q=" +
      cityString + "%20grocery%20store" + "&key=" + mapQuestApiKey +"&sort=relevance"
  )
    .then(function (response) {
      console.log("---------------");
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data.results);
      var groceryStoreList = data.results;
      groceryOptions(groceryStoreList)
    });
}

// loops through grocery options
function groceryOptions(groceryStoreList) {
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
     
    document.getElementById("groceryResults").appendChild(groceryDisplay);

    // var putCardContent = $("#card" + i);

    // putCardContent.children().children().eq(0).text(dateString);
    // putCardContent.children().children().eq(1)[0].src = iconURL;
    // putCardContent.children().children().eq(2).text(`Temp: ${dayTemp}  °F`);
  }
}

function storeChosen(placeLat,placeLon) {
  console.log(placeLat);
  console.log(placeLon);
 console.log("store click");
var userLocation = document.getElementById("enterLocation").value;
console.log(userLocation);
}


// directions api
function mapDirApi() {
var requestUrl = "https://api.github.com/users/octocat/repos";
  fetch("https://www.mapquestapi.com/directions/v2/route?key=" + mapQuestApiKey + "&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA")
  .then(function(response){
    console.log("---------");
    console.log(response);
    return response.json();
  })
  .then(function(data){
    console.log(data);
  })
} 
// http://www.mapquestapi.com/directions/v2/route?key=KEY&from=Clarendon Blvd,Arlington,VA&to=2400+S+Glebe+Rd,+Arlington,+VA


buttonLocation.addEventListener("click", getMapApiInfo);
