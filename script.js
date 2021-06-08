let rewind=document.querySelector(".rewind")
let playpausebtn=document.querySelector(".play-pause")
let forward=document.querySelector(".forward")
let timer=document.querySelector(".timer")
let volume=document.querySelector(".volume")

let startmin=document.querySelector(".minute")
let startsec=document.querySelector(".second")
let endmin=document.querySelector(".end-minute")
let endsec=document.querySelector(".end-second")

let volumeBtn = document.querySelector(".volume")
let volumeSliderContainer=document.querySelector(".volumeSliderContainer")
let volumeSlider=document.querySelector("#volumeSlider")
// let volslidervisible=false;

volumeBtn.addEventListener("mouseover",function(){
    volumeSliderContainer.style.visibility = "visible";
})

volumeBtn.addEventListener("mouseleave",function(){
    volumeSliderContainer.style.visibility = "hidden";
})

volumeSliderContainer.addEventListener("click",function(e){
    console.log(e)
    // source.volume=
})

let songplaying=false;


let source=document.querySelector("#player")

playpausebtn.addEventListener("click",function(){
    if(!songplaying){
        songplaying=true;
        playpausebtn.innerText="pause_circle_outline"
        source.play()
        console.log("play")

    }
    else{
        songplaying=false;
        playpausebtn.innerText="play_circle_filled"
        source.pause()
        console.log("pause")

    }

})

function createSongList(){

    let list=document.createElement("div")
    list.classList.add("song-list");
    // let heading=document.createElement("h2") 
    // heading.appendChild(document.createTextNode("Songs"))
    // list.appendChild(heading)
  
    for(let i=0;i<allSongs.length;i++){

        let songinfo=document.createElement("div") 
        songinfo.classList.add("songinfo") 
        songinfo.classList.add(`${i}`) 

        let title=document.createElement("div")
        // title.classList.add("title")
        title.appendChild(document.createTextNode(allSongs[i]["Title"]))
        songinfo.appendChild(title)

        let artist=document.createElement("div")
        // artist.classList.add(artist)
        artist.appendChild(document.createTextNode(allSongs[i]["Artist"]))
        songinfo.appendChild(artist)

        list.appendChild(songinfo)
    }
    return list
}
document.querySelector(".right-container").appendChild(createSongList())
// createSongList()

document.querySelectorAll('.songinfo').forEach(item => {
    item.addEventListener('click',function(e){
        // let source=document.querySelector("#player")
        let i=e.currentTarget.classList[1];  //getting id of current song to get its url
        let url=source.src=allSongs[i]["URL"]
        console.log(source)
        playmusic(url);
        // let player=document.querySelector("#player")
        // console.log(player)
        // player.load()
        // source.play()

    } )
})

let timerInterval;
let second = 0;
let minute = 0;


let progbar=document.querySelector(".progress-bar-container")

progbar.addEventListener("click",function(e){
    console.log("a "+(e.offsetX/progbar.offsetWidth)*source.duration)
    source.currentTime=((e.offsetX/progbar.offsetWidth)*source.duration);
})


function updateProgressBar(e){

    //updating progress bar
    let {currentTime,duration} = e.srcElement;
    timer.style.width=Math.floor((currentTime/duration)* 100) + "%";

    // Calculate display for duration
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
        // durationEl.textContent = `${durationMinutes}:${durationSeconds}`;    
        if (durationMinutes < 10) {
            durationMinutes=`0${durationMinutes}`;
        }
        endmin.innerText=durationMinutes;
        endsec.innerText=durationSeconds
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
    
    startmin.innerText=currentMinutes;
    startsec.innerText=currentSeconds

}

source.addEventListener("timeupdate",updateProgressBar)


// async function playmusic(url){
//     await tab.goto(url)
//     await tab.click(".s_l.artworkload ")
// }









