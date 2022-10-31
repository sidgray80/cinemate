//Global Variables
var apiKeyTmdb = "3c52eb6185be360b0965e24023804a4d";
var apiKeyYt = "AIzaSyCxcfePxYwFPi4vIK2xuiRgLTDvmgYCDrY";
var currentDay = moment().format("DD-MM-YYYY");
var globalVideoId;

var zeroStarEl = document.getElementById("zeroStar");
var oneStarEl = document.getElementById("oneStar");
var twoStarEl = document.getElementById("twoStar");
var threeStarEl = document.getElementById("threeStar");
var fourStarEl = document.getElementById("fourStar");
var fiveStarEl = document.getElementById("fiveStar");

zeroStarEl.style.display = "none";
oneStarEl.style.display = "none";
twoStarEl.style.display = "none";
threeStarEl.style.display = "none";
fourStarEl.style.display = "none";
fiveStarEl.style.display = "none";

// _______________________________________________________________________________
// _______________________________________________________________________________

//Window Drop-down genre select that parses to TMDB fetch
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
    return;
  }

  // _______________________________________________________________________________
  // _______________________________________________________________________________

  //fetching TMDB API for title, release date, rating, and overview for DOM
  fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKeyTmdb}&language=en-US&include_adult=false&with_genres=${genreSelect}`
  )
    .then((response) => response.json())
    .then(function (data) {
      // console.log(data);

      var movieTitle = $("#movieTitle");
      var releaseDate = $("#releaseDate");
      var movieOverview = $("#movieOverview");

      var posterBaseUrl = "https://image.tmdb.org/t/p/original/";
      var posterSpecificUrl = data.results[0].poster_path;

      var img = document.createElement("img");
      img.src = posterBaseUrl + posterSpecificUrl;
      var src = document.getElementById("moviePoster");
      src.appendChild(img);

      movieTitle.text(data.results[0].title);
      releaseDate.text(data.results[0].release_date);
      movieOverview.text(data.results[0].overview);

      //Setting local storage with an array from the TMDB fetch call

      $("#saveButton").on("click", function () {
        savedMovie = data.results[0].title;
        var movieHistArr = JSON.parse(localStorage.getItem("savedMovie"));
        if (!movieHistArr) {
          movieHistArr = [];
        }
        if (!movieHistArr.includes(savedMovie)) {
          movieHistArr.push(savedMovie);
        }
        localStorage.setItem("savedMovie", JSON.stringify(movieHistArr));
        console.log(movieHistArr);

        // _______________________________________________________________________________

        for (var i = 0; i < movieHistArr.length; i++) {
          var storedMovieEl = $(
            '<button class= "bg-slate-800 hover:bg-red-500 w-full px-4 py-2 text-reg text-slate-400 rounded">'
          );
          var storedMovie = storedMovieEl
            .text(movieHistArr[i])
            .val(movieHistArr[i]);
          storedMovie.click(function () {
            console.log($(this).val());
            handleSubmit($(this).val());
          });
          $("#myList").append(storedMovie);
        }
      });

      // _______________________________________________________________________________
      // _______________________________________________________________________________

      //Setting a visible rating through a five star rating system
      function assignStars() {
        if (data.results[0].vote_average / 2 < 1) {
          zeroStarEl.style.display = "block";
        } else if (
          data.results[0].vote_average / 2 >= 1 &&
          data.results[0].vote_average / 2 < 2
        ) {
          oneStarEl.style.display = "block";
        } else if (
          data.results[0].vote_average / 2 >= 2 &&
          data.results[0].vote_average / 2 < 3
        ) {
          twoStarEl.style.display = "block";
        } else if (
          data.results[0].vote_average / 2 >= 3 &&
          data.results[0].vote_average / 2 < 4
        ) {
          threeStarEl.style.display = "block";
        } else if (
          data.results[0].vote_average / 2 >= 4 &&
          data.results[0].vote_average / 2 < 5
        ) {
          fourStarEl.style.display = "block";
        } else {
          fiveStarEl.style.display = "block";
        }
      }
      assignStars();
      // _______________________________________________________________________________
      // _______________________________________________________________________________

      //YouTube API call for Trailer access, pulling title from TMDB fecth
      var youtubeSearch = data.results[0].title;

      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${youtubeSearch}trailer&key=${apiKeyYt}`
      )
        .then((response) => response.json())
        .then(function (data) {
          localVideoId = data.items[0].id.videoId;

          globalVideoId = localVideoId;
          getGlobalID();
          // console.log(localVideoId)
        });
    });
};
// _______________________________________________________________________________
// _______________________________________________________________________________

//IFrame YouTube video player pulled from YouTube iFrame API documentation

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {}
function getGlobalID() {
  // var player;
  player = new YT.Player("player", {
    height: "100%",
    width: "100%",
    videoId: globalVideoId,
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}

// My List modal

var modal = document.getElementById("my-list");
var myListBtn = document.getElementById("my-list-btn");
var returnToResults = document.getElementById("return-to-results");

var openModal = function () {
  modal.classList.remove("hidden");
};

myListBtn.addEventListener("click", openModal);

var closeModal = function () {
  modal.classList.add("hidden");
};

returnToResults.addEventListener("click", closeModal);

// Next/Previous Arrows

var prevMobile = document.getElementById("prev-mobile");
prevMobile.classList.add("hidden");
if (screen.width < 640) {
  prevMobile.classList.remove("hidden");
}