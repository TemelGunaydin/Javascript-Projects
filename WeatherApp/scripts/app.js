const form = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time"); //içinde time tanımlı img elemanını seçiyor
const icon = document.querySelector(".icon img"); //icon clasının altında tanımlı img elemenaını seçiyor.

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  details.innerHTML = `
         <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
      `;
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  //üstteki daha sade
  // if (weather.IsDayTime) {
  //   timeSrc = "img/day.svg";
  // } else {
  //   timeSrc = "img/night.svg";
  // }

  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (userInput) => {
  const cityDetails = await getCityData(userInput);
  const weather = await getConditionData(cityDetails.Key);

  //   return {
  //     cityDetails: cityDetails,
  //     conditionDetails: conditionDetails,
  //   };

  //üstteki ile aynıdır
  return { cityDetails, weather };
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = form.city.value.trim();
  form.reset();

  updateCity(userInput)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });

  localStorage.setItem("city", userInput);
});

const cityValue = localStorage.getItem("city");
if (cityValue) {
  updateCity(cityValue)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log("No city found in local storage");
    });
}
