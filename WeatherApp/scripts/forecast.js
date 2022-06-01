const key = "bTmxF1YNrHEQgjdKZuirBnvXbpENpCA8";

const getConditionData = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json(); //data bir objectir. ve içinde bir çok bilgi içermektedir. sadece 0.elemana ihtiyacımız var.
  return data[0];
};

const getCityData = async (city) => {
  const query = `?apikey=${key}&q=${city}`;
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0]; //result kullanılsaydı dizi halinde izmir dahil birçok ili içeren bir dizi olacaktı.
};

// getCityData("izmir")
//   .then((data) => {
//     return getConditionData(data.Key);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
