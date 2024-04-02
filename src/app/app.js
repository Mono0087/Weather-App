const apiKey = 'd99db5078b9de54907fc002e6b5e179a'

const sortByDays = (timestamps) => {
  const days = {}
  days.day1 = []
  let dayComponent = timestamps[0].dt_txt.split(' ')[0]
  let i = 1
  for (const dayPart of timestamps) {
    const currentDayComponent = dayPart.dt_txt.split(' ')[0]
    if (currentDayComponent === dayComponent) {
      days[`day${i}`].push(dayPart)
    } else {
      i += 1
      if (!days[`day${i}`]) days[`day${i}`] = []
      days[`day${i}`].push(dayPart)
      dayComponent = currentDayComponent
    }
  }
  return days
}

const app = {
  convertMeasure(temp, unit) {
    if (unit === 'cel') {
      return (temp - 32) / 1.8
    }
    return temp * 1.8 + 32
  },

  async getForecast(location) {
    const forecastResp = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
    )
    const forecastData = await forecastResp.json()

    const generalInfo = forecastData.city
    const days = sortByDays(forecastData.list)

    const weather = { generalInfo, days }
    return weather
  },
}

app.getForecast('perm')

export default app
