const key = "fde76c6c5562406288f191707241410";
let defaultlocation = "dhaka";


document.getElementById("time")
setInterval(() => {
    time.innerHTML = `${new Date().toLocaleTimeString()}`
}, 1000)


const weatherForcast = function (key, city) {
    return (
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=14`)
            .then(res => res.json())
            .then(data => data)
            .catch(error => error)

    )
}


// seter fuction 

const setTodayData = function (data) {
    let dataCard = document.querySelector("#data-card");
    if (data.error) {
        dataCard.innerHTML = `
            <h1 id="error-message">${data?.error?.message}</h1>
            <p id="error-code">Stop FIx -> Server Error Code ${data?.error?.code}</p>
        `
    }
    else {
        const { location, current, forecast } = data;
        defaultlocation = location?.name;

        var x = document.getElementById("btn-div");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        document.getElementById("today").setAttribute("class", "active")

        document.getElementById("tommorow").removeAttribute("class", "active")
        document.getElementById("monthly").removeAttribute("class", "active")

        dataCard.innerHTML = `
                <div >

                    <h2>${location?.name && location?.name}</h2>
                    <p>${location?.localtime && location?.localtime.slice(0, 10)}</p>
                    <div class="temp">
                        <span>${current?.temp_c && current?.temp_c}°C</span>
                        <img src="${current?.condition?.icon && current?.condition?.icon}" alt="Cloudy Icon">
                    </div>
                    <div class="details">
                        <p><span>${current?.condition?.text && current?.condition?.text}</span></p>
                        <p>HUMIDITY: <span>${current?.humidity && current?.humidity}%</span></p>
                        <p>VISIBILITY: <span>${current?.vis_km && current?.vis_km}km</span></p>
                        
                        <p>AIR PRESSURE: <span>${current?.pressure_mb && current?.pressure_mb}hPa</span></p>
                        <p>WIND: <span>${current?.wind_kph && current?.wind_kph}kph</span></p>
                    </div>
                </div> 
    `
    }
}

const setTommorowData = function (data) {
    const { location, current, forecast } = data;
    let dataCard = document.querySelector("#data-card");
    if (data.error) {
        dataCard.innerHTML = `
            <h1 id="error-message">${data?.error?.message}</h1>
            <p id="error-code">Stop FIx -> Server Error Code ${data?.error?.code}</p>
        `
    }
    else {
        const forecastday = forecast?.forecastday[1];
        var x = document.getElementById("btn-div");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        document.getElementById("tommorow").setAttribute("class", "active")
        document.getElementById("today").removeAttribute("class", "active")
        document.getElementById("monthly").removeAttribute("class", "active")
        dataCard.innerHTML = `
                <div>

                    <h2>${location?.name && location?.name}</h2>
                    <p>${forecastday?.date && forecastday?.date.slice(0, 10)}</p>
                    <div class="temp">
                        <span>${forecastday?.day?.maxtemp_c && forecastday?.day?.maxtemp_c}°C</span>
                        <img src="${forecastday?.day?.condition?.icon && forecastday?.day?.condition?.icon}" alt="Cloudy Icon">
                    </div>
                    <div class="details">
                        <p>HUMIDITY: <span>${forecastday?.day?.avghumidity && forecastday?.day?.avghumidity}%</span></p>
                        <p>VISIBILITY: <span>${forecastday?.day?.avgvis_km && forecastday?.day?.avgvis_km}km</span></p>
                        <p>SUNRISE: <span>${forecastday?.astro?.sunrise && forecastday?.astro?.sunrise}</span></p>
                        <p>SUNSET: <span>${forecastday?.astro?.sunset && forecastday?.astro?.sunset}</span></p>
                        <p>WIND: <span>${forecastday?.day?.maxwind_kph && forecastday?.day?.maxwind_kph}kph</span></p>
                    </div>
                    
                    
                </div> 
    `
    }
}


const setMonthData = function (data) {
    const { location, current, forecast } = data;
    let dataCard = document.querySelector("#data-card");
    if (data.error) {
        dataCard.innerHTML = `
            <h1 id="error-message">${data?.error?.message}</h1>
            <p id="error-code">Stop FIx -> Server Error Code ${data?.error?.code}</p>
        `
    }
    else {
        let forecastday = forecast.forecastday
        console.log(forecastday)
        var x = document.getElementById("btn-div");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        document.getElementById("monthly").setAttribute("class", "active")
        document.getElementById("tommorow").removeAttribute("class", "active")
        document.getElementById("today").removeAttribute("class", "active")
        dataCard.innerHTML = `
                <div class="weather-card-calendar">
                    <h2>Weather Calendar</h2>
                    <div class="weather-calendar">
                        ${forecastday?.map((day) =>
            `<div class="weather-day">
                                                <span class="weather-date">${day?.date?.slice(8, 10)}</span>
                                                <span class="weather-temp">${Math.ceil(parseInt(day?.day?.avgtemp_c))}°C</span>
                                                <img src="${day?.day?.condition?.icon}" class="weather-icon" alt="weather icon"/>

                            </div>`).join('')
            }
                    </div>
                </div>

    `
    }

}

const setweatherForcast = function (key, city, setData) {
    weatherForcast(key, city)
        .then(data => setData(data))
}

let Input = document.getElementById("search")
Input.addEventListener("change", (e) => {
    setweatherForcast(key, e.target?.value ? e.target?.value : "dhaka", setTodayData);
})
document.querySelector('form').addEventListener('submit', (e) => e.preventDefault()
);

document.querySelector('#today').addEventListener("click", (e) => {
    setweatherForcast(key, defaultlocation, setTodayData);
})
document.querySelector('#tommorow').addEventListener("click", (e) => {
    setweatherForcast(key, defaultlocation, setTommorowData);
})
document.querySelector('#monthly').addEventListener("click", (e) => {
    setweatherForcast(key, defaultlocation, setMonthData);
})


// always execute
setweatherForcast(key, defaultlocation, setTodayData)

