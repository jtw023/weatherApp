window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position  => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';

      const api = proxy + 'https://api.darksky.net/forecast/8951a04f1393254c1405eb57a2114fd9/' + lat + ',' + long;

      fetch(api)
      .then(data => {
        return data.json();
      })
      .then(data => {
        const { temperature, summary, icon } = data.currently;

        //Set DOM elements from the api
        temperatureDegree.textContent = Math.floor(temperature);
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;

        //Formula for Celsius
        let celsius = (temperature - 32) * (5 / 9);

        //Set icon
        setIcons(icon, document.querySelector('.icon'));

        //Change Temperature to Celsius/Farenheit
        temperatureSection.addEventListener('click', () => {
          if (temperatureSpan.textContent === 'C') {
            temperatureSpan.textContent = 'F';
            temperatureDegree.textContent = Math.floor(temperature);
          } else {
            temperatureSpan.textContent = 'C';
            temperatureDegree.textContent = Math.floor(celsius);
          }
        });
      });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

/*if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(position => {
  console.log(position)
} else {
  console.log('Please allow geolocation for me to find the weather patterns in your area.')
})
}
*/
