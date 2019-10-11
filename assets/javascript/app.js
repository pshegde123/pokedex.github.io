$(document).ready(function () {

  var allPokeURL = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20";
  //console.log(allPokeURL);
  $.getJSON(allPokeURL, function (data) {
    //console.log(data);
    for (var i = 0; i < 20; i++) {
      //console.log(data.results[i].name);
      var pokeName = data.results[i].name;
      //console.log("pokeName=",pokeName);
      $.getJSON(data.results[i].url, function (response) {
        var imageURL = response.sprites.front_default;
        //console.log("image url=", imageURL);
        var newDiv = $("<div>")
        /*newDiv.addClass("card");
        var card = $("<div>");
        card.addClass('card-image');
        var sprite = $("<img>");
        sprite.attr("src",imageURL);

        card.append(sprite);
        newDiv.append(card);*/
        newDiv.html("\
        <div class='col s12 m6'>\
          <div class='card'>\
            <div class='card-image'>\
              <img src="+ imageURL + ">\
              <span class='card-title'></span>\
              <a class='btn-floating halfway-fab waves-effect waves-light red'><i class='material-icons'>add</i></a>\
            </div>\
            <div class='card-content'>\
              <p>"+ pokeName + "</p>\
            </div>\
          </div>\
        </div>");

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
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + myAPIKey + "&tag=" + param + "&rating=G";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#pokeGif").empty();
      console.log(response);
      console.log(response.data.images.fixed_height.url);
      var newDiv = $("<div>");
      newDiv.addClass('col-xs-12');

      // Retrieving the URL for the image
      var stillImage = response.data.images.fixed_height_still.url;
      var animatedImage = response.data.images.fixed_height.url;

      var image = $("<img class='gif'>");
      image.attr("src", response.data.images.fixed_height.url);
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