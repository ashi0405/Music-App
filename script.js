window.onload = function () {
  Particles.init({
    selector: ".background",
    maxParticles: 150,
    color: "white",
    sizeVariations: 3,
  });
};

let rewind = document.querySelector(".rewind");
let playpausebtn = document.querySelector(".play-pause");
let forward = document.querySelector(".forward");
let timer = document.querySelector(".timer");
let volume = document.querySelector(".volume");

let startmin = document.querySelector(".minute");
let startsec = document.querySelector(".second");
let endmin = document.querySelector(".end-minute");
let endsec = document.querySelector(".end-second");

let volumeBtn = document.querySelector(".volume");
let volumeSliderContainer = document.querySelector(".volumeSliderContainer");
let volumeSlider = document.getElementById("volumeSlider");

let trackindex = 0;
let current;

forward.addEventListener("click", function () {
  songplaying = false;
  playpausebtn.innerText = "play_circle_filled";
  player.load();
  setTimeout(() => {
    playpausebtn.click();
  }, 300);
  document.querySelector(".active").classList.remove("active");
  nextTrack();
});

rewind.addEventListener("click", function () {
  songplaying = false;
  playpausebtn.innerText = "play_circle_filled";
  player.load();
  setTimeout(() => {
    playpausebtn.click();
  }, 300);
  document.querySelector(".active").classList.remove("active");
  prevTrack();
});
function nextTrack() {
  if (trackindex < Songs.length - 1) {
    trackindex += 1;
  } else trackindex = 0;
  source.src = Songs[trackindex]["URL"];
  var nexttarget = document.getElementsByClassName(trackindex);
  nexttarget[0].classList.add("active");
}

function prevTrack() {
  console.log("prevtrack " + typeof trackindex);
  if (trackindex > 0) trackindex -= 1;
  else trackindex = Songs.length - 1;
  source.src = Songs[trackindex]["URL"];
  console.log(trackindex);
  var nexttarget = document.getElementsByClassName(trackindex);
  nexttarget[0].classList.add("active");
}


volumeSlider.addEventListener("change", function (e) {
  const volume = e.target.value;
  volumeSlider.value = volume;
  player.volume = volume;
});

let songplaying = false;

let source = document.querySelector("#source");
let player = document.querySelector("#player");

playpausebtn.addEventListener("click", function () {
  if (!songplaying) {
    songplaying = true;
    playpausebtn.innerText = "pause_circle_outline";
    player.play();
    console.log("play in playpausebtn");
  } else {
    songplaying = false;
    playpausebtn.innerText = "play_circle_filled";
    player.pause();
    console.log("pause in playpausebtn");
  }
});

function createSongList() {
  let list = document.createElement("div");
  list.classList.add("song-list");
  for (let i = 0; i < Songs.length; i++) {
    let songinfo = document.createElement("div");
    songinfo.classList.add("songinfo");
    songinfo.classList.add(`${i}`);
    if (i == 0) songinfo.classList.add("active");

    let title = document.createElement("div");
    title.appendChild(document.createTextNode(Songs[i]["Title"]));
    songinfo.appendChild(title);

    let artist = document.createElement("div");
    artist.appendChild(document.createTextNode(Songs[i]["Artist"]));
    songinfo.appendChild(artist);

    list.appendChild(songinfo);
  }
  return list;
}
document.querySelector(".right-container").appendChild(createSongList());


function addactive(e) {
  current = document.querySelector(".active");
  console.log(current);
  if (current) current.classList.remove("active");
  e.currentTarget.classList.add("active");
}

document.querySelectorAll(".songinfo").forEach((item) => {
  item.addEventListener("click", function (e) {
    addactive(e);
    let i = e.currentTarget.classList[1]; //getting id of current song to get its url
    trackindex = parseInt(i);
    source.src = Songs[i]["URL"];
    songplaying = false;
    playpausebtn.innerText = "play_circle_filled";
    player.load();
    setTimeout(() => {
      playpausebtn.click();
    }, 100);
    updateProgressBar(e);
  });
});

let timerInterval;
let second = 0;
let minute = 0;

let progbar = document.querySelector(".progress-bar-container");

progbar.addEventListener("click", function (e) {
  player.currentTime = (e.offsetX / progbar.offsetWidth) * player.duration;
});

function updateProgressBar(e) {
  //updating progress bar

  let { currentTime, duration } = e.srcElement;
  timer.style.width = Math.floor((currentTime / duration) * 100) + "%";

  // Calculate display for duration
  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  // Delay switching duration Element to avoid NaN
  if (durationSeconds) {
    if (durationMinutes < 10) {
      durationMinutes = `0${durationMinutes}`;
    }
    endmin.innerText = durationMinutes;
    endsec.innerText = durationSeconds;
  }

  // Calculate display for currentTime
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  startmin.innerText = currentMinutes;
  startsec.innerText = currentSeconds;
}

player.addEventListener("timeupdate", updateProgressBar);
