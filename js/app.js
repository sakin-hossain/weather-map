const inputText =  document.getElementById('input-text');
const showTemp = document.getElementById('show-temp');
const loader = document.getElementById('loader');


const loading = () => {
    loader.style.display = "block"
    showTemp.style.display = "none"
}

const complete = () => {
    loader.style.display = "none"
    showTemp.style.display = "block"
}

const loadWeatherApi = async () => {
    const searchText = inputText.value;
    inputText.value = '';
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=1ab58c3fb965731e05319e4acee68a32`)
        const data = await res.json()
        displayWeather(data);
    }
    catch(err){
        console.log(err);
    }
}
    const displayWeather = (data) => {
        loading();
        showTemp.textContent = '';
        const div = document.createElement('div');
        div.classList.add('temp-style')
        div.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="">
        <h1>${data.name}</h1>
        <h2>${data.main.temp}&#176;C</h2>
        <p>${data.weather[0].main}</p>
        `
        showTemp.appendChild(div);
        complete();
    }