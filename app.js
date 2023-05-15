let workTime = 1800
let restTime = 300
const animation = document.querySelector('.description')


function formattedTime(time){
    return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

const displayWork = document.querySelector('.work-time')
const displayPause = document.querySelector('.work-pause')

displayWork.textContent = formattedTime(workTime)
displayPause.textContent = formattedTime(restTime)


const togglePlay = document.querySelector('.button-play')
togglePlay.addEventListener('click', togglePomodoro);

let currentInterval = false
let timerID

function togglePomodoro(){
    handlePlayPause()

    if(currentInterval) return;
    currentInterval = true

    workTime--;
    displayWork.textContent = formattedTime(workTime)
    timerID = setInterval(handleTicks, 1000)
}

let pause = true
function handlePlayPause(){
    if(togglePlay.getAttribute('data-toggle') === "play"){
        pause = false
        togglePlay.firstElementChild.src = "ressources/pause.svg"
        togglePlay.setAttribute('data-toggle', "pause")

        if(workTime){
            handleAnimation({work: true, rest: false})
        }else{
            handleAnimation({work: false, rest: true})
        }

    }else{
        pause = true
        togglePlay.firstElementChild.src = "ressources/play.svg"
        togglePlay.setAttribute('data-toggle', "play")
        handleAnimation({work: false, rest: false})
    }
}

function handleAnimation(itemState){
    for(const item in itemState){
        if(itemState[item]){
            document.querySelector(`.${item}`).classList.add('active')
        }else{
            document.querySelector(`.${item}`).classList.remove('active')
        }
    }
}

const cycles = document.querySelector('.cycle')
let cyclesNumber = 0;

function handleTicks(){
    if(!pause && workTime > 0){
        workTime--;
        displayWork.textContent = formattedTime(workTime)
        handleAnimation({work: true, rest: false})

    }else if(!pause && !workTime && restTime > 0){
        restTime--;
        displayPause.textContent = formattedTime(restTime)
        handleAnimation({work: false, rest: true})

    }else if(!pause && !workTime && !restTime){
        workTime = 1799
        restTime = 300
        displayWork.textContent = formattedTime(workTime)
        displayPause.textContent = formattedTime(restTime)
        cyclesNumber++;
        cycles.textContent = `Cycle(s) : ${cyclesNumber}`
        handleAnimation({work: true, rest: false})
    }
}

const reset = document.querySelector('.button-repeat')
reset.addEventListener('click', handleReset)

function handleReset(){
    pause = true
    togglePlay.firstElementChild.src = "ressources/play.svg"
    togglePlay.setAttribute('data-toggle', "play")
    workTime = 1800;
    restTime = 300;
    displayWork.textContent = formattedTime(workTime)
    displayPause.textContent = formattedTime(restTime)
    cyclesNumber = 0;
    cycles.textContent = `Cycle(s) : ${cyclesNumber}`
    handleAnimation({work: false, rest: false})

}

