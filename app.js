let id = '3eae192a8b653d7bd511c99afbe82714';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

// Add an error message element
let errorMessage = document.createElement('p');
errorMessage.classList.add('error-message');
main.appendChild(errorMessage);
errorMessage.style.display = 'none';

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value != ''){
        searchWeather();
    }
});

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                // Hide error message on success
                errorMessage.style.display = 'none';
                
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                // Display error message for invalid city
                showError("City not found. Please check your input and try again.");
            }
            valueSearch.value = '';
        })
        .catch(() => {
            // Handle network or fetch errors
            showError("Something went wrong. Please try again later.");
        });
}

// Show error function
const showError = (message) => {
    errorMessage.innerText = message;
    errorMessage.style.display = 'block';
    errorMessage.style.color = '#ff4c4c';
    errorMessage.style.fontWeight = 'bold';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.padding = '10px';
    errorMessage.style.backgroundColor = '#ffecec';
    errorMessage.style.borderRadius = '10px';
    errorMessage.style.marginTop = '20px';
    errorMessage.style.animation = 'fade-in 0.5s ease-in-out';
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// search Default
const initApp = () => {
    city.querySelector('figcaption').innerHTML = 'Enter your city name';
    city.querySelector('img').src = ''; // Remove flag on load
    temperature.querySelector('img').src = ''; // Remove weather icon
    temperature.querySelector('span').innerText = ''; // Clear temperature
    description.innerText = ''; // Clear weather description
    clouds.innerText = ''; // Clear clouds
    humidity.innerText = ''; // Clear humidity
    pressure.innerText = ''; // Clear pressure
}
initApp();
