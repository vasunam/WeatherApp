window.addEventListener("load",()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let locationCity = document.querySelector(".location-city");
    let locationIcon = document.querySelector(".location-Icon");

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https:/cors-anywhere.herokuapp.com/';
            const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=7005037c3e644f5983f530fe47a8cc71`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp,timezone, city_name} = data.data[0];
                    const description = data.data[0].weather.description;
                    const icon_name = data.data[0].weather.icon;
                    console.log(icon_name);
                    //Set DOM elements from API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = timezone;
                    locationCity.textContent = city_name;
                    // Set icon
                    // locationIcon.textContent = icon;
                    setIcons(icon_name);
                    
                })
        });

        

    }else{
        h1.textContent ="Accept location finder"
    }

    function setIcons(icon_name){
        var myImage = new Image(128,128);
        myImage.src = 'https://www.weatherbit.io/static/img/icons/'+icon_name+'.png'
        locationIcon.appendChild(myImage);
    };
});
