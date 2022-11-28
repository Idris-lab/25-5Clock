const breakLength = document.getElementById("break-length");
const sessionLength = document.getElementById("session-length");
const breakIncrement = document.getElementById("break-increment");
const sessionIncrement = document.getElementById("session-increment");
const breakDecrement = document.getElementById("break-decrement");
const sessionDecrement = document.getElementById("session-decrement");
const timeLeft = document.getElementById("time-left");
const timerLabel = document.getElementById("timer-label");
const startStop = document.getElementById("start_stop");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const audio = document.getElementById("beep");

reset.addEventListener("click", () => {
    stopTimer();
    audio.pause();
    audio.currentTime = 0;
    isStart = false;
    breakLength.textContent = "5";
    hour = sessionLength.textContent = hours[25];
    second = 60;
    timeLeft.textContent = `${hours[25]}:${seconds[0]}`;
    timerLabel.textContent = timerHeader[0];
});

pause.addEventListener("click", () => {
    stopTimer();
    isStart = false;
});

function incrementBounds(value, elementContent) {
    return elementContent = +elementContent + value;
}

function decrementBounds(value, elementContent) {
    return elementContent = +elementContent - value;
}

function formatBelowTenContent(elementContent) {

    timeLeft.textContent = `0${elementContent}:00`;
    hour = +elementContent;
    second = 60;
    return elementContent;
}

function formatHigherThanNineContent(elementContent) {

    timeLeft.textContent = `${elementContent}:00`;
    hour = +elementContent;
    second = 60;
    return elementContent;
}

function formatMinuteAndSecond(elementContent) {
    if (+elementContent < 10) {
        elementContent = formatBelowTenContent(elementContent);
        return elementContent;
    } else {
        elementContent = formatHigherThanNineContent(elementContent);
        return elementContent;
    }
}

breakDecrement.addEventListener("click", () => {

    if (+breakLength.textContent === 1) return false;

    breakLength.textContent = decrementBounds(1, breakLength.textContent);

    if (!(timerLabel.textContent === timerHeader[0])) {
        breakLength.textContent = formatMinuteAndSecond(breakLength.textContent);
    }
    changeColor();
});


breakIncrement.addEventListener("click", () => {

    if (+breakLength.textContent === 60) return false;

    breakLength.textContent = incrementBounds(1, breakLength.textContent);

    if (!(timerLabel.textContent === timerHeader[0])) {
        breakLength.textContent = formatMinuteAndSecond(breakLength.textContent);
    }

    changeColor();
});

sessionIncrement.addEventListener("click", () => {

    if (+sessionLength.textContent === 60) return false;

    sessionLength.textContent = incrementBounds(1, sessionLength.textContent);

    if (!(timerLabel.textContent === timerHeader[1])) {
        sessionLength.textContent = formatMinuteAndSecond(sessionLength.textContent);
    }

    changeColor();
});

sessionDecrement.addEventListener("click", () => {

    if (+sessionLength.textContent === 1) return false;

    sessionLength.textContent = decrementBounds(1, sessionLength.textContent);

    if (!(timerLabel.textContent === timerHeader[1])) {
        sessionLength.textContent = formatMinuteAndSecond(sessionLength.textContent);
    }

    changeColor();

});


startStop.addEventListener("click", () => {

    if (isStart) {
        isStart = false;
        stopTimer();
    } else {
        isStart = true;
        startTimer();
    }
});

function enableButtons(){
    sessionIncrement.disabled = false;
    sessionDecrement.disabled = false;
    breakIncrement.disabled = false;
    breakDecrement.disabled = false;
}

function disableButtons(){
    sessionIncrement.disabled = true;
    sessionDecrement.disabled = true;
    breakIncrement.disabled = true;
    breakDecrement.disabled = true;
}

function stopTimer() {
    clearInterval(intervalId);

    // release our intervalID from the variable
    intervalId = null;

    enableButtons();    
}

function startTimer() {

    // check if an interval has already been set up
    if (!intervalId) {
        intervalId = setInterval(runTimer, 1000);
    }

    disableButtons();

}

function beep() {

    const audioURL = "https://assets.mixkit.co/sfx/download/mixkit-alarm-clock-beep-988.wav";
    audio.setAttribute("src", audioURL);
    audio.play();
}


function runTimer() {

    if ((timerLabel.textContent === timerHeader[0])
        && (seconds[second] === seconds[0])
        && (hours[hour] === hours[0])) {

        beep();
        hour = +breakLength.textContent;
        timerLabel.textContent = timerHeader[1];

    } else if ((timerLabel.textContent === timerHeader[1])
        && (seconds[second] === seconds[0])
        && (hours[hour] === hours[0])) {

        beep();
        hour = +sessionLength.textContent;
        timerLabel.textContent = timerHeader[0];

    } else {

        if (bool === false) {
            hour--;
            second = 59;
        } else {
            if (second === 60) hour--;

            second--;
        }
        bool = (second === 0) ? false : true;
    }

    timeUpColor();
    timeLeft.textContent = `${hours[hour]}:${seconds[second]}`;
    second = +seconds[second];

}

function timeUpColor(){
    if(hour < 1){
        timeLeft.style.color = "#cc0000";
    }else{
        timeLeft.style.color = "#ffffff";
    } 
}

 function changeColor(){
    timeLeft.style.color = "#ffffff";
}

let isStart = false;
let intervalId;
let second = 60;
let hour = 25;
let bool = true;

const seconds = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22",
    "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33",
    "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
];

const hours = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33",
    "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
];

const timerHeader = ["Session", "Break"];
timeLeft.textContent = `${hours[25]}:${seconds[0]}`;


