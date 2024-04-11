(()=>{"use strict";const e="d99db5078b9de54907fc002e6b5e179a",t={locationName:void 0,localTime:void 0,country:void 0,iconURL:void 0,status:void 0,description:void 0,currTemp:void 0,feelsLikeTemp:void 0,humidity:void 0,windSpeed:void 0,days:[]},n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a=["January","February","March","April","May","June","July","August","September","October","November","December"],r={async getForecast(r){const o=await fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(r,"&units=metric&appid=").concat(e)),c=await fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(r,"&units=metric&appid=").concat(e)),i=await o.json();t.locationName=i.name,t.localTime=new Date(1e3*i.dt+1e3*i.timezone).toISOString().split("T")[1].substring(0,5),t.country=i.sys.country,t.iconURL="https://openweathermap.org/img/wn/".concat(i.weather[0].icon,"@2x.png"),t.status=i.weather[0].main,t.description=i.weather[0].description,t.currTemp=i.main.temp,t.feelsLikeTemp=i.main.feels_like,t.humidity=i.main.humidity,t.windSpeed=i.wind.speed;const d=(e=>{const t=[];let r=e[0].dt_txt.split(" ")[0];const o={};let c=0;return e.forEach((e=>{const[i,d]=e.dt_txt.split(" ");i!==r&&(t[c].eveningTemp||(t[c].eveningTemp=e.main.temp),t[c].dayTemp||(t[c].dayTemp=e.main.temp),t[c].iconURL||(t[c].iconUrl="https://openweathermap.org/img/wn/".concat(e.weather[0].icon,"@2x.png")),t[c].description||(t[c].description=e.weather[0].description),c+=1,r=i),o.date="".concat(new Date(r).getDate()," ").concat(a[new Date(r).getMonth()]),o.dayOfWeek=n[new Date(r).getDay()],"09:00:00"===d?(o.dayTemp=e.main.temp,o.iconUrl="https://openweathermap.org/img/wn/".concat(e.weather[0].icon,"@2x.png"),o.description=e.weather[0].description):"21:00:00"===d&&(o.eveningTemp=e.main.temp),t[c]={...o}})),t})((await c.json()).list);return t.days=d,t}},o={convertMeasure(e,t){if("far"===t){const t=1.8*e+32;return"".concat(Math.round(t)," °F")}const n=(e-32)/1.8;return"".concat(Math.round(n)," °C")},async getWeatherProxy(e,t){let n;return"openWeather"===t&&(n=await r.getForecast(e)),n}};function c(e,t,n,a,r,o){const c=document.createElement(e);t&&c.classList.add(...t),n&&(c.id=n),r&&(c.innerText=r),a&&a.forEach((e=>{const t=e.cloneNode(!0);c.appendChild(t)})),o&&o.forEach((e=>{c.dataset[e.dataKey]=e.dataValue}));for(var i=arguments.length,d=new Array(i>6?i-6:0),s=6;s<i;s++)d[s-6]=arguments[s];return d.forEach((e=>{var t;c.setAttribute(e.key,null!==(t=e.value)&&void 0!==t?t:"")})),c}const i=document.querySelector("body"),d=i.querySelector("[data-location-search-input]"),s=i.querySelector("[data-location-name]"),l=i.querySelector("[data-local-time]"),u=i.querySelector("[data-current-temp]"),p=i.querySelector("[data-current-temp-icon-box]"),m=i.querySelector("[data-current-temp-desc]"),y=i.querySelector("[data-current-feels-like-temp]"),h=i.querySelector("[current-wind-speed]"),w=i.querySelector("[data-current-humidity]"),T=i.querySelector("[data-general-info-error]"),g=i.querySelector("[data-general-info-waiting-screen]"),L=i.querySelector("[data-forecast-container]");let v="C";const M={changeTemperatureMeasure(){const e=i.querySelectorAll("[data-temp]");"C"===v?[...e].forEach((e=>{const t=Number.parseInt(e.innerHTML,10);e.innerHTML=o.convertMeasure(t,"far"),v="F"})):[...e].forEach((e=>{const t=Number.parseInt(e.innerHTML,10);e.innerHTML=o.convertMeasure(t,"cel"),v="C"}))},renderWeather(e){o.getWeatherProxy(e,"openWeather").then((async e=>{(async()=>{T.classList.add("hidden"),T.classList.remove("show"),T.querySelector("p").innerHTML=""})(),await(async()=>(g.classList.remove("hidden"),g.classList.add("show"),new Promise((e=>{setTimeout((()=>{g.classList.add("hidden"),g.classList.remove("show"),e()}),2e3)}))))(),g.addEventListener("animationend",(()=>{var t;t=e,s.innerHTML="".concat(t.locationName," ").concat(t.country),l.innerHTML=t.localTime,p.innerHTML="<img src='".concat(t.iconURL,"' alt='").concat(t.status,"'>"),u.innerHTML="".concat(Math.round(t.currTemp)," °C"),m.innerHTML=t.description,y.innerHTML="Feels like: <span  data-temp>".concat(Math.round(t.feelsLikeTemp)," °C</span>"),h.innerHTML="Wind speed: ".concat(t.windSpeed," m/s"),w.innerHTML="Humidity: ".concat(t.humidity,"%"),L.innerHTML="",t.days.forEach((e=>{const t=c("h3",null,null,null,e.dayOfWeek),n=c("p",null,null,null,e.date),a=c("img",["dayIcon"]);a.src=e.iconUrl,a.alt=e.description;const r=c("div",["image-box"],null,[a]),o=c("p",["day-temp"],null,null,"".concat(Math.round(e.dayTemp)," °C"),[{dataKey:"temp"}]),i=c("p",["evening-temp"],null,null,"".concat(Math.round(e.eveningTemp)," °C"),[{dataKey:"temp",dataValue:""}]),d=c("p",["day-description"],null,null,e.description),s=c("div",["weather-info"],null,[o,i,d]),l=c("div",["weather-container"],null,[r,s]),u=c("div",["day"],null,[t,n,l]);L.append(u)})),d.innerHTML=""}))})).catch((e=>{console.error(e),T.classList.remove("hidden"),T.classList.add("show"),T.querySelector("p").innerHTML="Something went wrong... Please, check your query or try again later."})).finally((()=>{(async()=>{g.classList.remove("show"),g.classList.add("hidden")})()}))}},f=document.querySelector(".container").querySelector("[data-location-search-form]"),S=document.querySelector("[data-change-measure-btn]");f.addEventListener("submit",(e=>{e.preventDefault();const t=e.target.querySelector("[data-location-search-input]").value;M.renderWeather(t)})),S.addEventListener("click",(e=>{"°F"!==e.target.innerHTML?S.innerHTML="°F":S.innerHTML="°C",M.changeTemperatureMeasure()})),M.renderWeather("pekin")})();