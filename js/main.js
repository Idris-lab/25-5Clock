const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const breakIncrement = document.getElementById('break-increment');
const sessionIncrement = document.getElementById('session-increment');
const breakDecrement = document.getElementById('break-decrement');
const sessionDecrement = document.getElementById('session-decrement');
const timeLeft = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');
const startStop = document.getElementById('start-stop');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');

reset.addEventListener('click', () => {

});

breakDecrement.addEventListener('click', () => {

    if ((+breakLength.textContent === 1) || (timerLabel.textContent === timerHeader[0]))
            return false;

    breakLength.textContent = +breakLength.textContent - 1;

    if (+breakLength.textContent < 10) {
        timeLeft.textContent = `0${breakLength.textContent}:00`;
        hoursDecrement = +breakLength.textContent;
    } else {
        timeLeft.textContent = `${breakLength.textContent}:00`;
        hoursDecrement = +timeLeft.textContent;
        
    }
    secondsDecrement = 0;

    //preventTimerHeaderChange();
});

breakIncrement.addEventListener('click', () => {

    if ((+breakLength.textContent === 60) || (timerLabel.textContent === timerHeader[0]))
            return false;

    breakLength.textContent = +breakLength.textContent + 1;

    if (+breakLength.textContent < 10) {
        timeLeft.textContent = `0${breakLength.textContent}:00`;
        hoursDecrement = +breakLength.textContent;
    } else {
        timeLeft.textContent = `${breakLength.textContent}:00`;
        hoursDecrement = +breakLength.textContent;

    }
    secondsDecrement = 0;


});

sessionIncrement.addEventListener('click', () => {

    if ((+sessionLength.textContent === 60) || (timerLabel.textContent === timerHeader[1]))
             return false;
    
    sessionLength.textContent = +sessionLength.textContent + 1;

    if (+sessionLength.textContent < 10) {
        timeLeft.textContent = `0${sessionLength.textContent}:00`;
        hoursDecrement = +sessionLength.textContent;
    } else {
        timeLeft.textContent = `${sessionLength.textContent}:00`;
        hoursDecrement = +sessionLength.textContent;
    }
    secondsDecrement = 0;
});

sessionDecrement.addEventListener('click', () => {

    if ((+sessionLength.textContent === 1) || (timerLabel.textContent === timerHeader[1]))
            return false;

    sessionLength.textContent = +sessionLength.textContent - 1;

    if (+sessionLength.textContent < 10) {
        timeLeft.textContent = `0${sessionLength.textContent}:00`;
        hoursDecrement = +sessionLength.textContent;
    } else {
        timeLeft.textContent = `${sessionLength.textContent}:00`;
        hoursDecrement = +sessionLength.textContent;
    }
    secondsDecrement = 0;

});

function preventTimerHeaderChange(){
    timerLabel.textContent = timerLabel.textContent === timerHeader[0] ? timerHeader[1] : timerHeader[0];
}

startStop.addEventListener('click', () => {
        
        if(isStart){
            isStart = false;
            stopTimer();
        }else{
            isStart = true;
            startTimer();
        }
});

function stopTimer(){
    clearInterval(intervalId);
    		
    // release our intervalID from the variable
    intervalId = null;

    sessionIncrement.disabled = false;
    sessionDecrement.disabled = false;
    breakIncrement.disabled = false;
    breakDecrement.disabled = false;
}

function startTimer(){
    
    // check if an interval has already been set up
    if (!intervalId) {
        intervalId = setInterval(runTimer, 1000);
    }

    sessionIncrement.disabled = true;
    sessionDecrement.disabled = true;
    breakIncrement.disabled = true;
    breakDecrement.disabled = true;

}

function beep(){
    const alarmSoundUrl = 'alarm-clock-short-6402.mp3';
    const audio = document.getElementById('beep');
    audio.setAttribute('src', alarmSoundUrl);
    document.body.prepend(audio);
}
function runTimer() {

    if ((seconds[secondsDecrement] === seconds[0]) && !(hours[hoursDecrement] === hours[0])) {
        timeLeft.textContent = `${hours[--hoursDecrement]}:${seconds[secondsDecrement]}`;
        hoursDecrement = +hours[hoursDecrement--];
        secondsDecrement = 60;
    } else if ((timerLabel.textContent === timerHeader[0])
                 && (seconds[secondsDecrement] === seconds[0]) 
                 && (hours[hoursDecrement] === hours[0])) {
                    beep();
        hoursDecrement = +breakLength.textContent - 1;
        secondsDecrement = 60;
        timerLabel.textContent = timerHeader[1];
        

    }else if((timerLabel.textContent === timerHeader[1])
            && (seconds[secondsDecrement] === seconds[0]) 
            && (hours[hoursDecrement] === hours[0])){
                beep();
            hoursDecrement = +breakLength.textContent - 1;
            secondsDecrement = 60;
            timerLabel.textContent = timerHeader[0];
            
    }

    timeLeft.textContent = `${hours[hoursDecrement]}:${seconds[--secondsDecrement]}`;
    secondsDecrement = +seconds[secondsDecrement--];

}

let isStart = false;
let intervalId;
let secondsDecrement = 60;
let hoursDecrement = 25;
const seconds = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33',
    '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
];

const hours = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33',
    '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
];

const timerHeader = ['Session', 'Break'];
timeLeft.textContent = `${hours[25]}:${seconds[0]}`;

