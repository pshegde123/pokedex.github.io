$(document).ready(function () {
  //Load PokeAPI , Giphy and Plotly API
  //Configure Firebase database
  //Initialize the firebase app
  //Get database reference

  //Store all the retrieved pokemon data in firebase

  //when a navbar element is clicked , display images for that category

  //when an image is clicked retrieve the stats from PokeAPI and display on screen
  //Input the same stats to Ploytly API and generate a bar graph, display graph on screen

  //on exit remove all the userdata from firebase 

  function pokeSubmit() {
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
    //pokeSubmit();
    event.preventDefault();
    var param = document.getElementById("pokeInput").value;
    var myAPIKey = "5gZiOMKs2QZinGl65iznaAkJkNwQXkz1";
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=" + myAPIKey + "&tag=" + param + "&rating=G";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#pokeDetails").empty();
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
      $("#pokeDetails").prepend(newDiv);
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