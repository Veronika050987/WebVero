// JavaScript source code
function setImage() {
    let filename = document.getElementById("image-file");
    let reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("photo").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
}
function setBackground() {
    let color_tool = document.getElementById('choose-color');
    let color = color_tool.value;
    //document.body.style.backgroundImage = "none";
    //document.body.style.backgroundColor = color;
    document.getElementById('color-sample').style.backgroundColor = inverse_color;
    document.getElementById('color-sample').style.width = "200px";
    document.getElementById('color-sample').style.height = "200px";
}
function switchBackground()
{
    //let target = document.getElementById("switch-background").src;
    //let path = target.split('/');
    //let file = path[path.length - 1];
    /////////////////////////////////////
    //console.log(file);
    //if (file === "moon.png") document.getElementById("switch-background").src = "img/sun.png";
    //else document.getElementById("switch-background").src = "img/moon.png";
    //document.getElementById("switch-background").src = file === "moon.png" ? "img/sun.png" : "img/moon.png";
    //document.body.style.backgroundImage = "none";
    let delay = document.getElementById("delay").value;
    document.body.style.transition = `background-image ${delay}s, color ${delay}s`;
    document.getElementById("switch-background").style.transition = `background-image ${delay}s, filter ${delay}s`;
    document.body.className = document.body.className === "dark" ? "white" : "dark";
    /*document.body.className = file === "moon.png" ? "dark" : "white";*/
    //document.body.style.backgroundColor = file === "moon.png" ? "black" : "white";
    //document.body.style.color = file === "moon.png" ? "white" : "black";
    /*document.getElementById("switch-background").src = `img/${file === "moon.png" ? "sun.png" : "moon.png"}`;*/
    /*
    ---------------------
    5 == "5":true;
    5 === "5":false;
    ---------------------
    */
}

document.addEventListener
(
        "mousemove",
        function (event)
        {
            let x = event.clientX;
            let y = event.clientY;
            document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;
        }
);
///////////////////////////////////////////////////////////////////////////////////
//DOM - Document Object Model
function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
}
document.body.onload = function tick_timer()
{
    let time = new Date();
    document.getElementById("full-time").innerHTML = time;
    document.getElementById("hours").innerHTML = addLeadingZero(time.getHours());
    document.getElementById("minutes").innerHTML = addLeadingZero(time.getMinutes());
    document.getElementById("seconds").innerHTML = addLeadingZero(time.getSeconds());

    document.getElementById("years").innerHTML = addLeadingZero(time.getFullYear());
    document.getElementById("months").innerHTML = addLeadingZero(time.getMonth() + 1);
    document.getElementById("days").innerHTML = addLeadingZero(time.getDate());

    document.getElementById("day-of-week").innerHTML = time.toLocaleDateString("ru", { weekday: 'long' });

    document.getElementById('current-date').style.visibility = document.getElementById('show-date').checked ? "visible" : "hidden";
    document.getElementById('day-of-week').style.visibility = document.getElementById('show-weekday').checked ? "visible" : "hidden";

    setTimeout(tick_timer, 100);
}

document.getElementById("btn-start").onclick = function startCountdownTimer()
{
    let targetDate = document.getElementById("target-date");
    let targetTime = document.getElementById("target-time");
    let btnStart = document.getElementById("btn-start");
    if (btnStart.value === "Start") {
        btnStart.value = "Stop";
        targetDate.disabled = targetTime.disabled = true;
        tickCountdown();
    }
    else {
        btnStart.value = "Start";
        targetDate.disabled = targetTime.disabled = false;
    }
}
function tickCountdown()
{
    let now = new Date();

    let targetDateControl = document.getElementById("target-date");
    let targetTimeControl = document.getElementById("target-time");

    let targetDateValue = targetDateControl.valueAsDate;
    let targetTimeValue = targetTimeControl.valueAsDate;
    //Выравниваем часовой пояс:
    targetDateValue.setHours(targetDateValue.getHours() + targetDateValue.getTimezoneOffset() / 60);
    targetTimeValue.setHours(targetTimeValue.getHours() + targetTimeValue.getTimezoneOffset() / 60);

    document.getElementById("duration").innerHTML = typeof (targetTimeValue);
    targetTimeValue.setFullYear(targetDateValue.getFullYear());
    targetTimeValue.setMonth(targetDateValue.getMonth());
    targetTimeValue.setDate(targetDateValue.getDate());

    document.getElementById("target-date-value").innerHTML = targetDateValue;
    document.getElementById("target-time-value").innerHTML = targetTimeValue;
    document.getElementById("current-time-value").innerHTML = now;

    //console.log(`${targetDateValue}\t${targetTimeValue}`);

    let duration = targetTimeValue - now;
    document.getElementById("duration").innerHTML = duration;

    let timestamp = Math.trunc(duration / 1000);
    document.getElementById("timestamp").innerHTML = timestamp;

    const SECONDS_PER_MINUTE = 60;
    const SECONDS_PER_HOUR = 3600;  //kmph - Kilometers per Hour;
    const SECONDS_PER_DAY = 86400;
    const SECONDS_PER_WEEK = SECONDS_PER_DAY * 7;
    const DAYS_PER_MONTH = 365.25 / 12;
    const SECONDS_PER_MONTH = SECONDS_PER_DAY * DAYS_PER_MONTH;
    const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365 + SECONDS_PER_HOUR * 6;



    setTimeout(tickCountdown, 100);
}