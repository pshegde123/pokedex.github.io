let currentCardName = "";
let count = 0;

$(document).ready(function () {

  // Web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAHGMj8An1Hye3IiSR2BcRFc07RyFBQLa4",
    authDomain: "pokedex-1b2e4.firebaseapp.com",
    databaseURL: "https://pokedex-1b2e4.firebaseio.com",
    projectId: "pokedex-1b2e4",
    storageBucket: "pokedex-1b2e4.appspot.com",
    messagingSenderId: "158330970279",
    appId: "1:158330970279:web:702924e28e992c4841fb82"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var dataRef = database.ref();

  //Initial database variable values
  var db_name = "";
  var db_id = "";
  var db_url = "";

  // Retrieve data from Poke API to display in the left-panel
  var myLimit = 12;
  var allPokeURL = "https://pokeapi.co/api/v2/pokemon/?limit=" + myLimit + "&offset=20";
  //console.log(allPokeURL);
  $.getJSON(allPokeURL, function (data) {
    //console.log(data);
    for (var i = 0; i < myLimit; i++) {
      //console.log(data.results[i]);
      //console.log(data.results[i].name);
      let pokeName = data.results[i].name;
      //console.log("pokeName = ", pokeName);
      //console.log(data.results[i].url);
      var statsURL = data.results[i].url;
      $.getJSON(statsURL, function (response) {
        var imageURL = response.sprites.front_default;
        var newDiv = $("<div>")
        newDiv.addClass("col s12 m6");
        var card = $("<div>");
        card.addClass('card');
        var cardImage = $("<div>");
        cardImage.addClass("card-image");
        var sprite = $("<img class='cardImage'>");
        sprite.attr("src", imageURL);
        sprite.attr("data-name", pokeName);
        sprite.attr("data-url", imageURL);
        var content = $("<div style='border-top:1px solid;padding:1px;'>");
        content.addClass("card-content center-align truncate");
        content.text(pokeName);
        cardImage.append(sprite);
        card.append(cardImage);
        card.append(content);
        //console.log("pokeName2 = ",pokeName);
        newDiv.append(card);
        $(".left-panel").append(newDiv);
      });
    }
  });

  //when image is clicked , display gif and stats 
  function displayStats() {
    $("#pokeGif").empty();
    var name = $(this).attr("data-name");
    var url = $(this).attr("data-url");
    //generateGif(name);
    //Get data from Giphy API
    var myAPIKey = "5gZiOMKs2QZinGl65iznaAkJkNwQXkz1";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + myAPIKey + "&q=" + name + "&limit=1&rating=G";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#pokeGif").empty();
      //console.log(response);
      //console.log(response.data.images.fixed_height.url);
      var newDiv = $("<div>");
      newDiv.addClass('col-xs-12');

      // Retrieving the URL for the image
      //var stillImage = response.data.images.fixed_height_still.url;
      //var animatedImage = response.data.images.fixed_height.url;
      var stillImage = response.data[0].images.fixed_height_still.url;
      var animatedImage = response.data[0].images.fixed_height.url;


      var image = $("<img class='gif'>");
      image.attr("src", response.data[0].images.fixed_height.url);
      image.attr("data-state", "animated");
      image.attr("data-still", stillImage);
      image.attr("data-animated", animatedImage);

      //var addIcon = "<a class='btn-floating halfway-fab waves-effect waves-light red'><i class='material-icons'>add</i></a>";

      newDiv.append(image);
      //newDiv.append(addIcon);
      $("#pokeGif").prepend(newDiv);
      //show stats in <div> pokeDetails
      showStatDetails(name);
    });
  }

  function showStatDetails(charName) {
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + charName.trim().toLowerCase();
    $.getJSON(pokeURL, function (data) {
      //console.log(data);
      //console.log(data.id)
      $("#pokeDetails").empty();

      //var detailsDiv = $("<div id='stats'>");
      var newList = $("<ul>");
      
      //pokemon description
      var listItemDescription=$("<li>");
      var descURL = data.species.url;
      $.getJSON(descURL,function(result){
        var flavor_count = result.flavor_text_entries.length;
        for (let m=0;m<flavor_count;m++){
         if(result.flavor_text_entries[m].language.name == "en"){
            listItemDescription.text("Description:"+result.flavor_text_entries[m].flavor_text);
         }
        }
      });

      var listItemName = $("<li>Name: " + data.name + "</li>");
      currentCardName = data.name;

      var listItemID = $("<li>");
      listItemID.text("Id: " + data.id);

      var listItemWeight = $("<li>");
      listItemWeight.text("Weight: " + data.weight);

      var listItemHeight = $("<li>");
      listItemHeight.text("Height: " + data.height);

      //show abilities of selected pokemon
      var listOfAbilities = [];
      var ability_count = data.abilities.length;
      for (let i = 0; i < ability_count; i++) {
        listOfAbilities.push(data.abilities[i].ability.name);
      }
      //console.log(listOfAbilities);
      var listItemAbility = $("<li>");
      var totalAbilities = listOfAbilities.toString();
      listItemAbility.text("Abilities: " + totalAbilities);

      //show 'held-items' for the selected pokemon.
      var heldItems = [];
      var items_count = data.held_items.length;
      for (let j = 0; j < items_count; j++) {
        heldItems.push(data.held_items[j].item.name);
      }
      var listItemHeldItems = $("<li>");
      var allHeldItems = heldItems.toString();
      if (allHeldItems.length > 0) {
        listItemHeldItems.text("Held items: " + allHeldItems);
      }
      
      newList.append(listItemName);
      newList.append(listItemDescription);
      newList.append(listItemID);
      newList.append(listItemWeight);
      newList.append(listItemHeight);
      newList.append(listItemAbility);
      if (allHeldItems.length > 0) {
        newList.append(listItemHeldItems);
      }

      //detailsDiv.append(newList);
      $("#pokeDetails").append(newList);
      var favButton = $("<button>");
      favButton.addClass('btn fav');
      //favButton.attr("onClick",addToFavorite);
      //addButton.text("<i class='material-icons left'>favorite</i>Favorite</button>");
      favButton.html("<i class='material-icons'>favorite</i> Collect the card");
      $("#pokeDetails").append(favButton);
    });
  }

  //add selected card to database
  function saveToDatabase() {
    //Save the details of favorite card to database
    dataRef.push({
      db_id: currentCardName + count,
      db_name: currentCardName,
      db_url: "https://pokeapi.co/api/v2/pokemon/" + currentCardName
    });
  }

  //when a child node is added to dabase, 
  // save node key value for future reference
  dataRef.on("child_added", function (childSnapShot) {
    var child_name = childSnapShot.val().db_name;
    var child_id = childSnapShot.val().db_id;
    var child_url = childSnapShot.val().db_url;
    //console.log(child_name, child_id, child_url);

    //var favURL = "https://pokeapi.co/api/v2/pokemon/" + currentCardName;
    var favURL = child_url;
    //console.log(favURL);
    $.getJSON(favURL, function (data) {
      var newDiv = $("<div>")
      newDiv.addClass("col s12 m6");

      var card = $("<div>");
      card.addClass('card');

      var cardImage = $("<div>");
      cardImage.addClass("card-image");

      var sprite = $("<img class='cardImage'>");
      sprite.attr("src", data.sprites.front_default);

      var content = $("<div style='border-top:1px solid;padding:1px;'>");
      content.addClass("card-content center-align truncate");
      content.text(child_name);
      card.attr("id", child_id);
      //console.log("card id=", currentCardName + count);
      cardImage.append(sprite);
      card.append(cardImage);
      card.append(content);

      var deleteButton = $("<a class='btn-floating btn-small waves-effect waves-light close-button'><i class='material-icons'>close</i></a>");
      deleteButton.attr("name", child_id);
      deleteButton.attr("data-key", childSnapShot.key);

      card.prepend(deleteButton);
      newDiv.append(card);

      count++;
      $(".right-panel").append(newDiv);
    }); //getJSON

  });

  function removeFromFavorites() {
    //console.log("Remove this card");
    //console.log($(this).attr('name'));
    var cardToRemove = $(this).attr('name');
    //console.log("delete card id=", cardToRemove);
    var element = document.getElementById(cardToRemove);
    element.remove();

    //delete database record
    var childNode = dataRef.child($(this).attr("data-key"));
    //console.log(childNode);
    childNode.remove();
  }

  //Submit button onClick handler
  $(".ui-btn").on("click", function () {
    event.preventDefault();
    var param = document.getElementById("pokeInput").value;

    // param may be a pokemon name or number
    // pass it to poke api and get pokemon name
    let pokemonName = "";  //default name
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + param.trim().toLowerCase();
    $.getJSON(pokeURL, function (data) {
      //console.log("data=", data);
      pokemonName = data.name;
      //console.log("pokemonName=",pokemonName);
      var myAPIKey = "5gZiOMKs2QZinGl65iznaAkJkNwQXkz1";
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + myAPIKey + "&q=" + pokemonName + "&limit=1&rating=G";
      //console.log("queryURL=",queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        $("#pokeGif").empty();
        //console.log(response);
        //console.log(response.data.images.fixed_height.url);
        var newDiv = $("<div>");
        newDiv.addClass('col-xs-12');

        // Retrieving the URL for the image
        //var stillImage = response.data.images.fixed_height_still.url;
        //var animatedImage = response.data.images.fixed_height.url;
        var stillImage = response.data[0].images.fixed_height_still.url;
        var animatedImage = response.data[0].images.fixed_height.url;

        var image = $("<img class='gif'>");
        image.attr("src", response.data[0].images.fixed_height.url);
        image.attr("data-state", "animated");
        image.attr("data-still", stillImage);
        image.attr("data-animated", animatedImage);
        newDiv.append(image);
        $("#pokeGif").prepend(newDiv);
        //now show the stats for the selected Pokemon
        showStatDetails(param);
      });
    }); // $.getJSON(pokeURL, function (data) 
  });

  //When called this method checks value of image attribute 'data-state'
  //if 'data-state' is still, animated image is displayed
  //else if 'data-state' is animated, still image is displayed
  function stillAnimate() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animated"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

  //still or animated image?
  $(document).on("click", ".gif", stillAnimate);

  //when image is clicked display gif and stats
  $(document).on("click", ".cardImage", displayStats);

  //When 'Add to Favorites' button is clicked save details to database.
  $(document).on("click", ".fav", saveToDatabase);

  //remove this card from favorites and database.
  $(document).on("click", ".close-button", removeFromFavorites);
});