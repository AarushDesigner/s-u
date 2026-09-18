const WEATHER_API_KEY = '';

const buildWeatherCard = (temperature, humidity, condition, suggestion) => {
  const weatherCard = document.getElementById('weather-card');
  if (!weatherCard) return;

  const conditionLabel = condition || 'Cool & Clear';
  const suggestionText = suggestion || 'A relaxing spa or maintenance beauty service will suit the day perfectly.';
  const iconMap = {
    clear: 'sun',
    clouds: 'cloud',
    rain: 'cloud-rain',
    mist: 'cloud-fog',
    snow: 'cloud-snow',
    default: 'sparkles'
  };

  const iconName = iconMap[condition.toLowerCase()] || iconMap.default;

  weatherCard.innerHTML = `
    <div class="weather-grid">
      <div class="weather-temp">
        <div class="weather-icon"><i data-lucide="${iconName}"></i></div>
        <div>
          <p class="eyebrow accent">Shimla</p>
          <p class="temp-value">${Math.round(temperature)}°C</p>
          <div class="weather-meta">
            <span>Humidity ${humidity}%</span>
            <span>${conditionLabel}</span>
          </div>
        </div>
      </div>
      <div class="weather-suggestion">
        <h3>Beauty Recommendation</h3>
        <p>${suggestionText}</p>
      </div>
    </div>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }
};

const fallbackWeather = () => {
  const options = [
    { temp: 11, humidity: 58, condition: 'Cool & Clear', suggestion: 'Cool / Clear Weather → Relaxing spa or maintenance beauty service.' },
    { temp: 15, humidity: 66, condition: 'Cloudy', suggestion: 'Cloudy Weather → Hydration-focused facial or nourishing hair spa.' },
    { temp: 18, humidity: 75, condition: 'Humid', suggestion: 'Humid Weather → Frizz-control hair care or lightweight skincare.' },
    { temp: 9, humidity: 52, condition: 'Cold & Dry', suggestion: 'Cold / Dry Weather → Hydration-focused facial or nourishing hair spa.' }
  ];

  const today = options[new Date().getDay() % options.length];
  buildWeatherCard(today.temp, today.humidity, today.condition, today.suggestion);
};

document.addEventListener('DOMContentLoaded', () => {
  const weatherCard = document.getElementById('weather-card');
  if (!weatherCard) return;

  if (WEATHER_API_KEY) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Shimla&units=metric&appid=${WEATHER_API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Weather request failed');
        }
        return response.json();
      })
      .then((data) => {
        const temp = data.main?.temp ?? 14;
        const humidity = data.main?.humidity ?? 60;
        const condition = data.weather?.[0]?.main ?? 'Clear';
        const suggestion =
          condition.toLowerCase().includes('rain')
            ? 'Humid Weather → Frizz-control hair care or lightweight skincare.'
            : condition.toLowerCase().includes('clear')
              ? 'Sunny Weather → Gentle skincare and a sun-care reminder.'
              : 'Cool / Clear Weather → Relaxing spa or maintenance beauty service.';
        buildWeatherCard(temp, humidity, condition, suggestion);
      })
      .catch(() => fallbackWeather());
  } else {
    fallbackWeather();
  }
});
