let currentSong = new Audio();
let song;
let songArr = [];
let count = 0;
let currFolder;

async function getSongs(folder) {
  currFolder = folder
  let a = await fetch(`${currFolder}`); 
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  let songs = [];


  for (let index = 0; index < as.length; index++) {
    let element = as[index]
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href)
      songArr.push(element.href.split(`/${currFolder}/`)[1].replace(/%20/g, " "))
    }

  }

  return songs;
}
function secondsToMinuts(time) {
  if (isNaN(time) || time < 0) {
    return "00:00"
  }

  let min = Math.floor(time / 60)
  let remaningSec = Math.floor(time % 60)

  let formateMin = String(min).padStart(2, '0')
  let formateSec = String(remaningSec).padStart(2, '0')

  return `${formateMin}:${formateSec}`
}
let playMusic = (music, pause = false) => {

  currentSong.src = `/${currFolder}/` + music 
  if (pause == true) {
    // play.src = "player.svg" 
    if (play.src = "player.svg") {
      currentSong.pause()
    }
    // play.src = "player.svg"
    document.querySelector(".songInfo").innerHTML = music
    document.querySelector(".songTime").innerHTML = "00:00/00:00"
  }

  else { 

    play.src = "playImg.svg"
    currentSong.play() // iske liye upper let currentSong = new Audio() ye karne padega 
    document.querySelector(".songInfo").innerHTML = music
    document.querySelector(".songTime").innerHTML = "00:00/00:00"

  }

  // // if(currentSong) ye karne ke liye upper sirf let currentSong likhna hai
  // // {
  // //   currentSong.pause()
  // //   currentSong.currentTime = 0
  // // }
  // currentSong = new Audio("/newSong/"  + music)
  // // currentSong.src = "/newSong/" + music
  // currentSong.play()

}
async function main() {
  song = await getSongs("latestSong")

  playMusic(song[0].split(`/${currFolder}/`)[1].replace(/%20/g, " "), true)


  let songUl = document.querySelector(".songList")
  for (const songs of song) {
    songUl.getElementsByTagName("ul")[0].innerHTML = songUl.getElementsByTagName("ul")[0].innerHTML + `<li><img class="invert" src="music.svg" alt="">
                            <div class="info"> 
                                <div class="song-name">
                                
                                    ${songs.split(`/${currFolder}/`)[1].replace(/%20/g, " ")} 
                                </div>
                                <div class="artist-name">
                                    vikram prajapat
                                </div>

                            </div>
                               <div class="playNow">
                                <p>Play Now</p>
                                 <img class="invert" src="player.svg" alt=""></div> </li>`

  }

  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", () => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })


  });

  play.addEventListener("click", () => {
    if (currentSong.paused) {

      currentSong.play()
      play.src = "playImg.svg"

    }
    else {
      currentSong.pause()
      play.src = "player.svg"

    }
  })

  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songTime").innerHTML = `${secondsToMinuts(currentSong.currentTime)}/${secondsToMinuts(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"

  })
  document.querySelector(".seekBar").addEventListener("click", e => {
    percentage = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    document.querySelector(".circle").style.left = percentage + "%"

    currentSong.currentTime = (percentage * currentSong.duration) / 100
  })

  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"
  })
  document.querySelector(".cross").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%"
  })

  previos.addEventListener("click", () => {
    let index = songArr.indexOf(currentSong.src.split(`/${currFolder}/`)[1].replace(/%20/g, " "))


    if (index > 0) {
      playMusic(songArr[index - 1])

    }
    // if(index==0)
    // {
    //   playMusic(songArr[3])
    // }
    // else{
    //   playMusic(songArr[index-1])
    // }

  })

  next.addEventListener("click", () => {
    let index = songArr.indexOf(currentSong.src.split(`/${currFolder}/`)[1].replace(/%20/g, " "))
    console.log(songArr, index)

    if ((index + 1) < songArr.length) {
      playMusic(songArr[index + 1])

    }
    // if(index>=songArr.length-1){
    //   playMusic(songArr[0])
    // }
    // else{
    //    playMusic(songArr[index+1]) 
    // }

  })

  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    currentSong.volume = parseInt(e.target.value) / 100 // current song ke liye volume 0 se 1 ke bitch hi hota hai to ise 0 to 1 ke range me set karenge
  })

  volume.addEventListener("click", () => {
    if (currentSong.muted) {
      volume.src = "volume.svg"
      document.querySelector(".range").getElementsByTagName("input")[0].value = currentSong.volume * 100


      currentSong.muted = false

    }
    else {
      document.querySelector(".range").getElementsByTagName("input")[0].value = 0
      currentSong.muted = true
      volume.src = "mute.svg"


    }

  })
  Array.from(document.getElementsByClassName("card")).forEach(e => {
    e.addEventListener("click",async(e)=>
    {
      console.log(e.target.dataset.folder);
     currFolder = e.target.dataset.folder
      
    })
    
  });
  



  //  audio.addEventListener("loadeddata",()=> //lodeddata ka matlab hai ki audio ke pass song ko data aane par ye event trigged hoga
  //  // isme data ek hi baar upDate hota hai
  //  {
  //   let duration = audio.duration
  //   console.log(duration)
  //  }
  //  )

}
main()
