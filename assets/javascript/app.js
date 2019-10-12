let currentCardName = "";

$(document).ready(function () {

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
      var listItemName = $("<li>Name: " + data.name + "</li>");
      currentCardName = data.name;

      var listItemID = $("<li>");
      listItemID.text("Id: " + data.id);

      var listItemWeight = $("<li>");
      listItemWeight.text("Weight: " + data.weight);

      var listItemHeight = $("<li>");
      listItemHeight.text("Height: " + data.height);

      newList.append(listItemName);
      newList.append(listItemID);
      newList.append(listItemWeight);
      newList.append(listItemHeight);
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

  //add selected card to pokedex
  //$("#fav").on("click", function ()
  function addToFavorite(){
    console.log("Add to Pokedex.");
    console.log(currentCardName);
    var favURL = "https://pokeapi.co/api/v2/pokemon/" + currentCardName;
    console.log(favURL);
    console.log("here 3");
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
      content.text(currentCardName);
      cardImage.append(sprite);
      card.append(cardImage);
      card.append(content);
      newDiv.append(card);
      $(".right-panel").append(newDiv);
    });
  }

  //Submit button onClick handler
  $(".ui-btn").on("click", function () {
    event.preventDefault();
    var param = document.getElementById("pokeInput").value;;
    var myAPIKey = "5gZiOMKs2QZinGl65iznaAkJkNwQXkz1";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + myAPIKey + "&q=" + param + "&limit=1&rating=G";
    //console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#pokeGif").empty();
      console.log(response);
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
  $(document).on("click", ".fav", addToFavorite);
});