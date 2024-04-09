import DOM from './app/modules/DOM'
import './SCSS/style.scss'

// CACHE DOM /////////////////////////////////////////////////////////////
const container = document.querySelector('.container')
const searchForm = container.querySelector('[data-location-search-form]')
const changeMeasureBtn = document.querySelector('[data-change-measure-btn]')

// FUNCTIONS ///////////////////////////////////////////////////////////////

// INIT //////////////////////////////////////////////////////////////////
searchForm.addEventListener('submit', (Event) => {
  Event.preventDefault()
  const location = Event.target.querySelector(
    '[data-location-search-input]'
  ).value
  DOM.renderWeather(location)
})

changeMeasureBtn.addEventListener('click', (Event) => {
  if (Event.target.innerHTML !== '°F') changeMeasureBtn.innerHTML = '°F'
  else changeMeasureBtn.innerHTML = '°C'
  DOM.changeTemperatureMeasure()
})

DOM.renderWeather('pekin')

// BIND EVENTS ///////////////////////////////////////////////////////////
