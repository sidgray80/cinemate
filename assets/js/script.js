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
var ApiKey = '3c52eb6185be360b0965e24023804a4d'

//change with_genre=37 to with_genre=' + userInput
fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + ApiKey + '&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate&with_genres=37')
    .then(response => response.json())
    .then(data => console.log(data))
