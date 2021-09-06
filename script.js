// refferences
let MusicThumbnail = document.querySelector("#MusicThumbnail");
let progressBar = document.querySelector("#progressBar");
let ProgressBarContainer = document.querySelector("#ProgressBarContainer");
let TitleOfSong = document.querySelector("#TitleOfSong");
let previousSong = document.querySelector("#previousSong");
let playOrPause = document.querySelector("#playOrPause");
let playOrPauseIcon = document.querySelector("#playOrPause > img");
let NextSong = document.querySelector("#NextSong");
let progressbarThumb = document.querySelector("#progressbarThumb");

//playlist design
let playlistDisplay = document.querySelector(".playlist");
//music files
let song = new Audio
let playlist = [{ title: "Lonely By Akon", AudioSource: "./music files/Akon-Lonely.mp3", ImageSource: "./thumbnails/Akon-Lonely.jpg" },
    { title: "Bandeya Rey Bandeya", AudioSource: "./music files/Bandeya Rey Bandeya.mp3", ImageSource: "./thumbnails/Bandeya Rey Bandeya.jpg" }
]


//display playlist
for (let i = 0; i < playlist.length; i++) {
    let SongDisplayContainer = document.createElement("div");
    SongDisplayContainer.setAttribute("id", i)
    let SongDisplayImageDiv = document.createElement("div");
    let SongDisplayTitleDiv = document.createElement("div");
    SongDisplayTitleDiv.classList.add("text")
    SongDisplayContainer.classList.add("songContainer");
    // if(i==index){
    //     SongDisplayContainer.classList.add("active")

    // }
    let SongImageDisplay = document.createElement("img")
    SongImageDisplay.src = playlist[i].ImageSource
    SongDisplayTitleDiv.innerText = playlist[i].title
    SongImageDisplay.classList.add("img")
    SongDisplayImageDiv.appendChild(SongImageDisplay);
    SongDisplayContainer.appendChild(SongDisplayImageDiv);
    SongDisplayContainer.appendChild(SongDisplayTitleDiv);
    playlistDisplay.appendChild(SongDisplayContainer)


}



// variables or const

let IsAudioPlaying = false
const animate = "rotate 15s linear infinite;"
let index = 0
LoadNewSong(0)
    //to load song as soon as document loads
song.preload = "auto";

// avoiding auto play stop

var autoplaydiv = document.querySelector('#autoPlay');
var autoplaybtn = document.querySelector('#autoPlaybtn');
autoplaybtn.addEventListener('click', () => {
        autoplaydiv.style.display = "none";
        const audioContext = new AudioContext()


        //Audio web API for visulization and effecs

        const track = audioContext.createMediaElementSource(song)
        track.crossOrigin = "anonymous";

        track.connect(audioContext.destination);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0;
        track.connect(gainNode).connect(audioContext.destination);

    })
    // event listener
playOrPause.addEventListener("click", PlayorPauseFunction);
previousSong.addEventListener("click", previousSongFunction);
NextSong.addEventListener("click", NextSongFunction);

//seeking song
ProgressBarContainer.addEventListener("click", seekSong)
    //update progress bar
song.addEventListener("timeupdate", updateProgressBar);
//when song ends
song.addEventListener("ended", NextSongFunction)



//update Progress bar Function
function updateProgressBar() {
    progressBar.style.width = (song.currentTime / song.duration) * 100 + "%";

}
//seeking
function seekSong(e) {

    let percentageClickedLentgh = (e.offsetX / ProgressBarContainer.offsetWidth)
    song.currentTime = (song.duration * percentageClickedLentgh)

}

// functions
function LoadNewSong(index) {
    song.src = playlist[index].AudioSource
        // song.crossOrigin = "anonymous";
    MusicThumbnail.src = playlist[index].ImageSource
    TitleOfSong.innerHTML = playlist[index].title;
}

function PlayorPauseFunction() {
    if (IsAudioPlaying) {
        song.pause()
        IsAudioPlaying = false;
        playOrPauseIcon.src = "./controls icons/play.png";
        MusicThumbnail.style.animationPlayState = "paused"


    } else {
        song.play()
        playOrPauseIcon.src = "./controls icons/pause.png";
        MusicThumbnail.style.animationPlayState = "running";
        IsAudioPlaying = true;

    }

    // MusicThumbnail.classList.toggle("animation")
}

function previousSongFunction() {

    if (index === 0) {
        index = playlist.length - 1

    } else {
        index--

    }
    LoadNewSong(index)
    IsAudioPlaying = false
    PlayorPauseFunction()
}

function NextSongFunction() {



    if (index == playlist.length - 1) {
        index = 0
    } else {
        index++
    }


    LoadNewSong(index)
    IsAudioPlaying = false
    PlayorPauseFunction()

}