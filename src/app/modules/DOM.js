/* eslint-disable no-param-reassign */
import Weather from '../app'
import createElement from '../utils/createElement'

const container = document.querySelector('body')
const locationInput = container.querySelector('[data-location-search-input]')
const locationName = container.querySelector('[data-location-name]')
const localTime = container.querySelector('[data-local-time]')
const currentTemp = container.querySelector('[data-current-temp]')
const currentTempIcon = container.querySelector('[data-current-temp-icon-box]')
const currentTempDescription = container.querySelector(
  '[data-current-temp-desc]'
)
const currentFeelsLikeTemp = container.querySelector(
  '[data-current-feels-like-temp]'
)
const currentWindSpeed = container.querySelector('[current-wind-speed]')
const currentHumidity = container.querySelector('[data-current-humidity]')
const generalInfoError = container.querySelector('[data-general-info-error]')
const generalInfoWaitScreen = container.querySelector(
  '[data-general-info-waiting-screen]'
)
const forecastContainer = container.querySelector('[data-forecast-container]')

let currentMeasurement = 'C'

const showWaitMessage = async () => {
  generalInfoWaitScreen.classList.remove('hidden')
  generalInfoWaitScreen.classList.add('show')
  return new Promise((resolve) => {
    setTimeout(() => {
      generalInfoWaitScreen.classList.add('hidden')
      generalInfoWaitScreen.classList.remove('show')
      resolve()
    }, 2000)
  })
}

const closeWaitMessage = async () => {
  generalInfoWaitScreen.classList.remove('show')
  generalInfoWaitScreen.classList.add('hidden')
}

const showErrorMessage = (error) => {
  generalInfoError.classList.remove('hidden')
  generalInfoError.classList.add('show')
  generalInfoError.querySelector('p').innerHTML = error
}

const closeErrorMessage = async () => {
  generalInfoError.classList.add('hidden')
  generalInfoError.classList.remove('show')
  generalInfoError.querySelector('p').innerHTML = ''
}

const renderWeather = (weather) => {
  locationName.innerHTML = `${weather.locationName} ${weather.country}`
  localTime.innerHTML = weather.localTime
  currentTempIcon.innerHTML = `<img src='${weather.iconURL}' alt='${weather.status}'>`
  currentTemp.innerHTML = `${Math.round(weather.currTemp)} °C`
  currentTempDescription.innerHTML = weather.description
  currentFeelsLikeTemp.innerHTML = `Feels like: <span  data-temp>${Math.round(
    weather.feelsLikeTemp
  )} °C</span>`
  currentWindSpeed.innerHTML = `Wind speed: ${weather.windSpeed} m/s`
  currentHumidity.innerHTML = `Humidity: ${weather.humidity}%`

  forecastContainer.innerHTML = ''
  weather.days.forEach((day) => {
    const h3WeekDay = createElement('h3', null, null, null, day.dayOfWeek)
    const pDay = createElement('p', null, null, null, day.date)
    const image = createElement('img', ['dayIcon'])
    image.src = day.iconUrl
    image.alt = day.description
    const imageBox = createElement('div', ['image-box'], null, [image])
    const dayTemp = createElement(
      'p',
      ['day-temp'],
      null,
      null,
      `${Math.round(day.dayTemp)} °C`,
      [{ dataKey: 'temp' }]
    )
    const eveningTemp = createElement(
      'p',
      ['evening-temp'],
      null,
      null,
      `${Math.round(day.eveningTemp)} °C`,
      [{ dataKey: 'temp', dataValue: '' }]
    )
    const description = createElement(
      'p',
      ['day-description'],
      null,
      null,
      day.description
    )
    const weatherInfo = createElement('div', ['weather-info'], null, [
      dayTemp,
      eveningTemp,
      description,
    ])
    const weatherContainer = createElement('div', ['weather-container'], null, [
      imageBox,
      weatherInfo,
    ])
    const dayElement = createElement('div', ['day'], null, [
      h3WeekDay,
      pDay,
      weatherContainer,
    ])
    forecastContainer.append(dayElement)
  })
}

const DOM = {
  changeTemperatureMeasure() {
    const allTempElements = container.querySelectorAll('[data-temp]')
    if (currentMeasurement === 'C') {
      ;[...allTempElements].forEach((el) => {
        const temp = Number.parseInt(el.innerHTML, 10)
        el.innerHTML = Weather.convertMeasure(temp, 'far')
        currentMeasurement = 'F'
      })
    } else {
      ;[...allTempElements].forEach((el) => {
        const temp = Number.parseInt(el.innerHTML, 10)
        el.innerHTML = Weather.convertMeasure(temp, 'cel')
        currentMeasurement = 'C'
      })
    }
  },
  renderWeather(location) {
    Weather.getWeatherProxy(location, 'openWeather')
      .then(async (response) => {
        closeErrorMessage()
        await showWaitMessage()
        generalInfoWaitScreen.addEventListener('animationend', () => {
          renderWeather(response)
          locationInput.innerHTML = ''
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
        showErrorMessage(
          'Something went wrong... Please, check your query or try again later.'
        )
      })
      .finally(() => {
        closeWaitMessage()
      })
  },
}

export default DOM
