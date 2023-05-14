let workTime = 1800
let restTime = 300

function formattedTime(time){
    return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

const displayWork = document.querySelector('.work-time')
const displayPause = document.querySelector('.work-pause')

displayWork.textContent = formattedTime(workTime)
displayPause.textContent = formattedTime(restTime)


const togglePlay = document.querySelector('.button-play')

togglePlay.addEventListener('click', togglePomodoro);

function togglePomodoro(){
    handlePlayPause()
}

let pause = true
function handlePlayPause(){
    if(togglePlay.getAttribute('data-toggle') === "play"){
        pause = false
        togglePlay.firstElementChild.src = "ressources/pause.svg"
        togglePlay.setAttribute('data-toggle', "pause")
    }else{
        pause = true
        togglePlay.firstElementChild.src = "ressources/play.svg"
        togglePlay.setAttribute('data-toggle', "play")
    }
}