// would make secure if app was hosted on a server
let appId = 'd89b2b42611bfaf4efea038d863778c2';
// imperial for F, metric for C
let units = 'imperial';
let searchMethod = 'zip';

// searchTerm is the zip code entered
function searchWeather(searchTerm) {
    // fetch the url for the call we're making to the API
    // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key} 
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
        .then(result => {
            return result.json();
        })
        .then(result => {
            init(result);
        })
    // fetch is calling to the api and the api will return JSON data
}

function init(serverResult) {
    console.log(serverResult);

    var d = new Date();
    document.getElementById("currentTimeHolder").innerHTML = 'Last Updated On ' + d;

    let locationHeader = document.getElementById('locationHeader');
    let tempElement = document.getElementById('temperature');
    let descriptionHeader = document.getElementById('descriptionHeader');
    let weatherIcon = document.getElementById('iconImage');
    let windElement = document.getElementById('windSpeed');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + serverResult.weather[0].icon + '.png';

    let resultDesc = serverResult.weather[0].description;
    // descriptionHeader.innerText = resultDesc.charAt(0).toUpperCase() + resultDesc.slice(1);
    descriptionHeader.innerText = resultDesc.toUpperCase()

    tempElement.innerHTML = Math.floor(serverResult.main.temp) + '&#176' + 'F';

    windElement.innerHTML = 'Wind speed of ' + Math.floor(serverResult.wind.speed) + ' m/s '
        + 'at ' + serverResult.wind.deg + '&#176';

    locationHeader.innerHTML = serverResult.name;

    weatherHolder.style.visibility = 'visible';

}

document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})

// zip code verifier
