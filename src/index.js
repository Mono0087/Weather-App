import app from './app/app'
import DOM from './app/modules/DOM'
import './SCSS/style.scss'

// CACHE DOM /////////////////////////////////////////////////////////////
const container = document.querySelector('.container')
const nav = container.querySelector('nav')
const main = container.querySelector('main')

// FUNCTIONS ///////////////////////////////////////////////////////////////

// INIT //////////////////////////////////////////////////////////////////

app
  .getForecast('perm')
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })

// BIND EVENTS ///////////////////////////////////////////////////////////
