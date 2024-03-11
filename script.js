

const noofmonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const date = new Date();
var current_date = date.getDate() + " " + noofmonth[date.getMonth()] + " " + date.getFullYear();
document.getElementById("date").innerHTML = current_date;

// const noofday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// var day = noofday[date.getDay()];
// document.getElementById("day").innerHTML = day;

let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
    let currentTime = new Date();

    hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();

}, 1000)




const content = document.querySelector('.content');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const windDetails = document.querySelector('.wind');
const humidityDetails = document.querySelector('.humidity');
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');
const error404 = document.querySelector('.not-found');



search.addEventListener('click', () => {

    const APIKey = '2ba5661fd2015c95463aafb3f184e117';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            content.style.height = '300px';
            box1.classList.remove('active');
            box2.classList.remove('active');
            box3.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        content.style.height = '300px';
        box1.classList.add('active');
        box2.classList.add('active');
        box3.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const wind = document.querySelector('.weather-details .wind span');
        const humidity = document.querySelector('.weather-details .humidity span');

        switch (json.weather[0].main) {
            case 'clear':
                image.src = 'clear.png';
                break;

            case 'rain':
                image.src = 'rain.png';
                break;

            case 'snow':
                image.src = 'snow.png';
                break;

            case 'clouds':
                image.src = 'cloud.png';
                break;

            case 'mist':
                image.src = 'mist.png';
                break;

            case 'haze':
                image.src = 'mist.png';
                break;

            default:
                image.src = 'cloud.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    });
});