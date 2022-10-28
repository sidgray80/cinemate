var apiKey = "3c52eb6185be360b0965e24023804a4d";
var currentDay = (moment().format("DD-MM-YYYY"));
console.log(currentDay)

  var actionDropEl = document.getElementById("25");
  var adventureDropEl = document.getElementById("12");
  var comedyDropEl = document.getElementById("35");
  var dramaDropEl = document.getElementById("18");
  var horrorDropEl = document.getElementById("27");
  var romanceDropEl = document.getElementById("10749");
  var scienceFictionDropEl = document.getElementById("878");
  var fantasyDropEl = document.getElementById("14");
  var historicalDropEl = document.getElementById("36");
  var crimeDropEl = document.getElementById("80");
 


function handleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

window.onclick = function (event) {
  if (event.target.matches(".genre-type0"))
    var genreSelect = $(".genre-type0").attr("id");
  else if (event.target.matches(".genre-type1"))
    var genreSelect = $(".genre-type1").attr("id");
  else if (event.target.matches(".genre-type2"))
    var genreSelect = $(".genre-type2").attr("id");
  else if (event.target.matches(".genre-type3"))
    var genreSelect = $(".genre-type3").attr("id");
  else if (event.target.matches(".genre-type4"))
    var genreSelect = $(".genre-type4").attr("id");
  else if (event.target.matches(".genre-type5"))
    var genreSelect = $(".genre-type5").attr("id");
  else if (event.target.matches(".genre-type6"))
    var genreSelect = $(".genre-type6").attr("id");
  else if (event.target.matches(".genre-type7"))
    var genreSelect = $(".genre-type7").attr("id");
  else if (event.target.matches(".genre-type8"))
    var genreSelect = $(".genre-type8").attr("id");
  else if (event.target.matches(".genre-type9"))
    var genreSelect = $(".genre-type9").attr("id");
    else {
      return
    }

  
  fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&include_adult=false&with_genres=${genreSelect}`
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);

      var movieTitle = $("#movieTitle");
      var releaseDate = $("#releaseDate");
      var movieRating = $("#movieRating");
      var movieOverview = $("#movieOverview");

      movieTitle.text(data.results[0].title);
      releaseDate.text(data.results[0].release_date);
      movieRating.text(data.results[0].vote_average/2);
      movieOverview.text(data.results[0].overview);
    });


var youtubeSearch = (data.results[0].title)

//youtube stuff
fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${youtubeSearch}trailer&key=AIzaSyCNnN9L5rV02WBTOATM8j0uAWUSQtMn90k`)
.then(response => response.json())
.then(function (data){
  var videoId = (data.items[0].id.videoId)
  console.log(videoId)
})

};
//https:www.youtube.com/watch?v=videoId