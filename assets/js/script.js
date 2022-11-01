//Global Variables
var apiKeyTmdb = "3c52eb6185be360b0965e24023804a4d";
var apiKeyYt = "AIzaSyCNnN9L5rV02WBTOATM8j0uAWUSQtMn90k";
var globalVideoId;
var savedMovieObj;
var tmdbMovieData;
var currentMovieIndex;
var player;

var zeroStarEl = document.getElementById("zeroStar");
var oneStarEl = document.getElementById("oneStar");
var twoStarEl = document.getElementById("twoStar");
var threeStarEl = document.getElementById("threeStar");
var fourStarEl = document.getElementById("fourStar");
var fiveStarEl = document.getElementById("fiveStar");
var starEl = document.getElementsByClassName("star");
var nextEl = $("#next")[0];
var prevEl = $("#prev")[0];

zeroStarEl.style.display = "none";
oneStarEl.style.display = "none";
twoStarEl.style.display = "none";
threeStarEl.style.display = "none";
fourStarEl.style.display = "none";
fiveStarEl.style.display = "none";
nextEl.style.visibility = "hidden";
prevEl.style.visibility = "hidden";

// _______________________________________________________________________________
// _______________________________________________________________________________

//Window Drop-down genre select that parses to TMDB fetch
function handleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.addEventListener("click", function (event) {
  console.log(event.target);
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
});
function onYouTubeIframeAPIReady() {}
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
      console.log(data);
      
      tmdbMovieData = data
      var movieTitle = $("#movieTitle");
      var releaseDate = $("#releaseDate");
      var movieOverview = $("#movieOverview");
      var nextEl = $("#next")[0];
      var prevEl = $("#prev")[0];
      console.log(nextEl);

       currentMovieIndex = 0;
      function writeContent() {
        movieTitle.text(tmdbMovieData.results[currentMovieIndex].title);
        releaseDate.text(tmdbMovieData.results[currentMovieIndex].release_date);
        movieOverview.text(tmdbMovieData.results[currentMovieIndex].overview);

        var posterBaseUrl = "https://image.tmdb.org/t/p/original/";
        var posterSpecificUrl = tmdbMovieData.results[currentMovieIndex].poster_path;

        var img = document.createElement("img");
        img.src = posterBaseUrl + posterSpecificUrl;
        var src = document.getElementById("moviePoster");
        src.replaceChild(img, src.childNodes[0]);

        if (currentMovieIndex === 0) {
          nextEl.style.visibility = "visible";
          prevEl.style.visibility = "hidden";
        } else if (currentMovieIndex === 9) {
          nextEl.style.visibility = "hidden";
          prevEl.style.visibility = "visible";
        } else {
          nextEl.style.visibility = "visible";
          prevEl.style.visibility = "visible";
        }
      }
      writeContent();

      nextEl.addEventListener("click", function () {
        paginate("next");
      });
      prevEl.addEventListener("click", function () {
        paginate("prev");
      });

      function paginate(dir) {
        if (dir === "next") {
          currentMovieIndex++;
        } else if (dir === "prev") {
          currentMovieIndex--;
        }
        writeContent();

        console.log(currentMovieIndex);
      }

      
      //Setting a visible rating through a five star rating system
      function assignStars() {
        if (tmdbMovieData.results[0].vote_average / 2 < 1) {
          zeroStarEl.style.display = "block";
          oneStarEl.style.display = "none";
          twoStarEl.style.display = "none";
          threeStarEl.style.display = "none";
          fourStarEl.style.display = "none";
          fiveStarEl.style.display = "none";
        } else if (
          tmdbMovieData.results[0].vote_average / 2 >= 1 &&
          tmdbMovieData.results[0].vote_average / 2 < 2
        ) {
          zeroStarEl.style.display = "none";
          oneStarEl.style.display = "block";
          twoStarEl.style.display = "none";
          threeStarEl.style.display = "none";
          fourStarEl.style.display = "none";
          fiveStarEl.style.display = "none";
        } else if (
          tmdbMovieData.results[0].vote_average / 2 >= 2 &&
          tmdbMovieData.results[0].vote_average / 2 < 3
        ) {
          zeroStarEl.style.display = "none";
          oneStarEl.style.display = "none";
          twoStarEl.style.display = "block";
          threeStarEl.style.display = "none";
          fourStarEl.style.display = "none";
          fiveStarEl.style.display = "none";
        } else if (
          tmdbMovieData.results[0].vote_average / 2 >= 3 &&
          tmdbMovieData.results[0].vote_average / 2 < 4
        ) {
          zeroStarEl.style.display = "none";
          oneStarEl.style.display = "none";
          twoStarEl.style.display = "none";
          threeStarEl.style.display = "block";
          fourStarEl.style.display = "none";
          fiveStarEl.style.display = "none";
        } else if (
          tmdbMovieData.results[0].vote_average / 2 >= 4 &&
          tmdbMovieData.results[0].vote_average / 2 < 5
        ) {
          zeroStarEl.style.display = "none";
          oneStarEl.style.display = "none";
          twoStarEl.style.display = "none";
          threeStarEl.style.display = "none";
          fourStarEl.style.display = "block";
          fiveStarEl.style.display = "none";
        } else {
          zeroStarEl.style.display = "none";
          oneStarEl.style.display = "none";
          twoStarEl.style.display = "none";
          threeStarEl.style.display = "none";
          fourStarEl.style.display = "none";
          fiveStarEl.style.display = "block";
        }
      }
      assignStars();
      // _______________________________________________________________________________
      // _______________________________________________________________________________

      //YouTube API call for Trailer access, pulling title from TMDB fecth
      var youtubeSearch = tmdbMovieData.results[currentMovieIndex].title;

      fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${youtubeSearch}trailer&key=${apiKeyYt}`
      )
        .then((response) => response.json())
        .then(function (data) {
          localVideoId = data.items[0].id.videoId;

          globalVideoId = localVideoId;
          player.loadVideoById({ videoId: globalVideoId });
          
          // getGlobalID();
          // console.log(localVideoId)
        });
    });
};
// end of the window.onclick function
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

function onYouTubeIframeAPIReady() {

  player = new YT.Player("player", {
    height: "300",
    width: "460",
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
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED && done) {
    console.log("load another video");
      player.loadVideoById([globalVideoId], ctr);
      ctr++;
  }
}
 
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  
  var done = false;
  
    
   
      
    
  


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

$("#saveButton").on("click", function () {
 
  savedMovieObj = {
    Title: tmdbMovieData.results[currentMovieIndex].title,
    Release: tmdbMovieData.results[currentMovieIndex].release_date,
    Overview: tmdbMovieData.results[currentMovieIndex].overview,
    Stars: tmdbMovieData.results[currentMovieIndex].vote_average / 2,
    Poster: tmdbMovieData.results[currentMovieIndex].poster_path,
    VideoID: globalVideoId,
  };

  var movieHistArr = JSON.parse(localStorage.getItem("savedMovieObj"));
  if (!movieHistArr) {
    movieHistArr = [];
  }

  var hasMovie = movieHistArr.find(function (movie) {
    return movie.Title === savedMovieObj.Title;
  });

  if (!hasMovie) {
    movieHistArr.push(savedMovieObj);
  }

  localStorage.setItem("savedMovieObj", JSON.stringify(movieHistArr));
  console.log(movieHistArr);

  
   $("#myList").empty()
  for (var i = 0; i < movieHistArr.length; i++) {
    var storedMovieEl = $(
      '<button class= "bg-slate-800 hover:bg-red-500 w-full px-4 py-2 text-reg text-slate-400 rounded">'
    );
    var storedMovie = storedMovieEl
      .text(movieHistArr[i].Title)
  
    $("#myList").append(storedMovie);
  }
});



