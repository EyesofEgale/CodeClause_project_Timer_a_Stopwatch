$(".stopwatch-btn").click(function(){
   //hide all other wrappers
   $(".outer-wrapper > div").slideUp();
   //show stopwatch wrapper
   $(".stopwatch").slideDown();
   //update type text
   $(".type").html("Stopwatch");
});

$(".back-btn").click(function(){
    //hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    //show clock wrapper
    $(".clock").slideDown();
    //update type text
    $(".type").html("Stopwatch");
 });

$(".timer-btn").click(function(){
    //hide all other wrappers
    $(".outer-wrapper > div").slideUp();
    //show timer wrapper
    $(".timer").slideDown();
    //update type text
    $(".type").html("Stopwatch");
 });

const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};
const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    //converting 24 hrs to 12
    hours = hours % 12 || 12;

    //add trailing zeros if less than 10
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);

};

updateTime();

setInterval(updateTime, 1000);


//stopwatch
let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

const stopwatch = () => {
    stopwatchMiliSeconds++;

    if (stopwatchMiliSeconds === 100) {
        stopwatchSeconds++;
        stopwatchMiliSeconds = 0;
    }

    if (stopwatchSeconds === 60) {
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }

    if (stopwatchMinutes === 60) {
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    // Show values on the document 
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
};

// Function to start stopwatch
const startStopwatch = () => {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
};

const stopStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
};

//reset stoptwatch function
const restStopwatch = () => {
    //clear interval and set all values to default
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    stopwatchRunning = false;
    laps = 0;

    //update values on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
};

// Start stopwatch on start button click
$(".start-stopwatch").click(function () {
    startStopwatch();

    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
});

$(".rest-stopwatch").click(function () {
    restStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function () {
    //on lap button click
    laps++;
    //   //remove active class
    $(".lap").removeClass("active");
    $(".laps").prepend(
        `<div class="lap active">
                <p>lap ${laps}</p>
                <p>
                ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)};
                ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliSeconds)};
                </p>
            </div>`
    );
});


//Timer

let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliSeconds = 0,
    timerInterval;

const getTime = () => {
    time = prompt("Enter time in minutes");
    //convert time to seconds
    time = time * 60;
    //update timer defaults
    setTime();
};

const setTime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);

    // show user entered time on document 

    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliSeconds));
};

const timer = () => {
    timerMiliSeconds--;
    if (timerMiliSeconds === -1) {
        timerMiliSeconds = 99;
        timerSeconds--;
    }
    if (timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
    }
    if (timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
    }

    //update time
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliSeconds));

    //check time up on every interval
    timeUp();
};

const startTimer = () => {
    if (
        (timerHours === 0) & (timerMinutes === 0) &&
        timerSeconds === 0 &&
        timerMiliSeconds === 0
    ) {
        getTime();
    } else {
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
};
const stopTimer = () => { 
clearInterval(timerInterval);
     $(".start-timer").show();
     $(".stop-timer").hide();
};

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
};

//check if time remaining 0
const timeUp = () => {
    if(
    timerHours === 0 && 
    timerMinutes === 0 &&
    timerSeconds === 0 &&
    timerMiliSeconds === 0
    ){
       resetTimer();
       alert("Time's up");
    }
};



$(".start-timer").click(function () {
    startTimer();
});

$(".stop-timer").click(function () {
    stopTimer();
});

$(".reset-timer").click(function () {
    resetTimer();

});