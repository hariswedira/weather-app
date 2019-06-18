window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/d79b7d5eb7983c147a65bf8e74c69e6e/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    //set DOM
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //set
                    setIcons(icon, document.querySelector(".icon"));
                });
        });
    }

    function setIcons(icon, iconid) {
        const skycon = new skycons({ color: "white" });
        const currentIcon = icon.replace(/-/, "_").toUpperCase();
        skycons.play();
        return skycon.set(iconid, Skycons[currentIcon]);
    }
});