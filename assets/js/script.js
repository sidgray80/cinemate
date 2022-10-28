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



//var userInputGenre = 'from drop down'
var apiKey = '3c52eb6185be360b0965e24023804a4d'



// var actionDropEl = document.getElementById("25");
// var adventureDropEl = document.getElementById("12");
// var comedyDropEl = document.getElementById("35");
// var dramaDropEl = document.getElementById("18");
// var horrorDropEl = document.getElementById("27");
// var romanceDropEl = document.getElementById("10749");
// var scienceFictionDropEl = document.getElementById("878");
// var fantasyDropEl = document.getElementById("14");
// var historicalDropEl = document.getElementById("36");
// var crimeDropEl = document.getElementById("80");



//change with_genre=37 to with_genre=' + userInput
fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate&with_genres=28`)
    .then(response => response.json())
    .then(function (data){
      console.log(data)

var movieTitle = $("#movieTitle");
var releaseDate = $("#releaseDate")
var movieRating = $("#movieRating")
var movieOverview =$("#movieOverview")
var youtubeSearch = (data.results[0].title)
movieTitle.text(data.results[0].title);
releaseDate.text(data.results[0].release_date);
movieRating.text(data.results[0].popularity);
movieOverview.text(data.results[0].overview);

//youtube stuff
fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${youtubeSearch}trailer&key=AIzaSyCNnN9L5rV02WBTOATM8j0uAWUSQtMn90k`)
.then(response => response.json())
.then(function (data){
  var videoId = (data.items[0].id.videoId)
  console.log(videoId)
})
})

//https:www.youtube.com/watch?v=videoId

