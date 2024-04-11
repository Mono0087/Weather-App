const apiKey = 'd99db5078b9de54907fc002e6b5e179a'

const currentWeather = {
  locationName: undefined,
  localTime: undefined,
  country: undefined,
  iconURL: undefined,
  status: undefined,
  description: undefined,
  currTemp: undefined,
  feelsLikeTemp: undefined,
  humidity: undefined,
  windSpeed: undefined,
  days: [],
}

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const openWeatherApi = {
  async getForecast(location) {
    const sortAndFormatByDays = (timestamps) => {
      const days = []
      let dayComponent = timestamps[0].dt_txt.split(' ')[0]
      const currWeather = {}

      let i = 0
      timestamps.forEach((timestamp) => {
        const [currDayComponent, currHourComponent] =
          timestamp.dt_txt.split(' ')
        if (currDayComponent !== dayComponent) {
          if (!days[i].eveningTemp) days[i].eveningTemp = timestamp.main.temp
          if (!days[i].dayTemp) days[i].dayTemp = timestamp.main.temp
          if (!days[i].iconURL)
            days[
              i
            ].iconUrl = `https://openweathermap.org/img/wn/${timestamp.weather[0].icon}@2x.png`
          if (!days[i].description)
            days[i].description = timestamp.weather[0].description
          i += 1
          dayComponent = currDayComponent
        }

        currWeather.date = `${new Date(dayComponent).getDate()} ${
          months[new Date(dayComponent).getMonth()]
        }`
        currWeather.dayOfWeek = weekDays[new Date(dayComponent).getDay()]

        if (currHourComponent === '09:00:00') {
          currWeather.dayTemp = timestamp.main.temp
          currWeather.iconUrl = `https://openweathermap.org/img/wn/${timestamp.weather[0].icon}@2x.png`
          currWeather.description = timestamp.weather[0].description
        } else if (currHourComponent === '21:00:00') {
          currWeather.eveningTemp = timestamp.main.temp
        }
        days[i] = { ...currWeather }
      })
      return days
    }

    const currentWeatherResp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    )
    const forecastResp = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
    )
    const weatherDataRaw = await currentWeatherResp.json()
    currentWeather.locationName = weatherDataRaw.name
    currentWeather.localTime = new Date(
      weatherDataRaw.dt * 1000 + weatherDataRaw.timezone * 1000
    )
      .toISOString()
      .split('T')[1]
      .substring(0, 5)
    currentWeather.country = weatherDataRaw.sys.country
    currentWeather.iconURL = `https://openweathermap.org/img/wn/${weatherDataRaw.weather[0].icon}@2x.png`
    currentWeather.status = weatherDataRaw.weather[0].main
    currentWeather.description = weatherDataRaw.weather[0].description
    currentWeather.currTemp = weatherDataRaw.main.temp
    currentWeather.feelsLikeTemp = weatherDataRaw.main.feels_like
    currentWeather.humidity = weatherDataRaw.main.humidity
    currentWeather.windSpeed = weatherDataRaw.wind.speed

    const daysData = await forecastResp.json()
    const days = sortAndFormatByDays(daysData.list)
    currentWeather.days = days

    return currentWeather
  },
}

const Weather = {
  convertMeasure(temp, measure) {
    if (measure === 'far') {
      const far = temp * 1.8 + 32
      return `${Math.round(far)} °F`
    }
    const cel = (temp - 32) / 1.8
    return `${Math.round(cel)} °C`
  },

  async getWeatherProxy(location, api) {
    let weather
    switch (api) {
      case 'openWeather': {
        weather = await openWeatherApi.getForecast(location)
        break
      }

      default:
        break
    }
    return weather
  },
}

export default Weather
