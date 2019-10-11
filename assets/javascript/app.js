$(document).ready(function () {

  var myLimit = 12;
  var allPokeURL = "https://pokeapi.co/api/v2/pokemon/?limit="+myLimit+"&offset=20";
  //console.log(allPokeURL);
  $.getJSON(allPokeURL, function (data) {
    //console.log(data);
    for (var i = 0; i < myLimit; i++) {
      //console.log(data.results[i]);
      //console.log(data.results[i].name);
      let pokeName = data.results[i].name;
      console.log("pokeName1 = ",pokeName);
      //console.log(data.results[i].url);
      var statsURL = data.results[i].url;
      $.getJSON(statsURL,function (response) {
        var imageURL = response.sprites.front_default;
        var newDiv = $("<div>")
        newDiv.addClass("col s12 m6");
        var card = $("<div>");
        card.addClass('card');
        var cardImage = $("<div>");
        cardImage.addClass("card-image");
        var sprite = $("<img>");
        sprite.attr("src",imageURL);
        var addIcon ="<a class='btn-floating halfway-fab waves-effect waves-light red'><i class='material-icons'>add</i></a>";
        //addIcon.addClass("btn-floating halfway-fab waves-effect waves-light red");
        //addIcon.text("<i class='material-icons'>add</i>");
        cardImage.append(addIcon);
        var content = $("<div>");
        content.addClass("card-content truncate");
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

  function getSearchDetails() {
    var param = document.getElementById("pokeInput").value;
    console.log(param);
    var pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;
    console.log(pokeURL);
    $.getJSON(pokeURL, function (data) {
      console.log(data);
      //console.log(JSON.stringify(data, null, ""));

    });
  }
  $(".ui-btn").on("click", function () {
    event.preventDefault();
    var param = document.getElementById("pokeInput").value;
    var myAPIKey = "5gZiOMKs2QZinGl65iznaAkJkNwQXkz1";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + myAPIKey + "&q=" + param + "&limit=1&rating=G";
    console.log(queryURL);

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
    });
  })

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
  }

  //onClick event handeler for submit button
  $(document).on("click", ".gif", stillAnimate);
});