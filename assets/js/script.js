function getWeather(){
    var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=90ac920db1a030031ba4827cb665fd3b"

    $.ajax({
        url: openWeatherAPI,
        method: "GET"
    }).then(function (response){
        
        var iconVal = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconVal + ".png";

        var date = moment().format(" MM/DD/YYYY");
        $(".current-weather #city-date").html(city + date);

        $(".current-weather").append($("<img>").attr("src", iconURL));

        var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32);
        $(".current-weather #temp").html("Temperature: " + temp + " &#8457");

        var humidity = response.main.humidity;
        $(".current-weather #hum").html("Humidity: " + humidity); 

        var windSpeed = response.wind.speed;
        ($(".current-weather #wind").html("Wind Speed: " + windSpeed));

        var lat = response.coord.lat;
        var lon = response.coord.lon;
    
    

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=90ac920db1a030031ba4827cb665fd3b&lat=" + lat + "&lon=" + lon, 
        method: "GET"
    }).then(function (response) {
        $(".current-weather #uvi").html("UV index: "+ response.value)
        if(response.value <= 2){
            $(".current-weather #uvi").attr('style','color: green')
        } else if(response.value <= 5){
            $(".current-weather #uvi").attr('style','color: orange')
        } else if(response.value > 5){
            $(".current-weather #uvi").attr('style','color: red')
        }
    })

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=90ac920db1a030031ba4827cb665fd3b", 
        method: "GET"
    
    }).then(function (response) {
        for (let i = 0; i < 5; i++) {

            var cardDate = new Date(response.list[i * 8].dt * 1000)
            $(".weather-cards #"+i.toString()).html(cardDate.toLocaleDateString);
        }
    })

})
}

var recentCities = [];

$("#city-input-search").click(function() {
    city = $("#city-input").val().trim();
    getWeather();
    var checkRecentCities = recentCities.includes(city)
    if (checkRecentCities == true){
        return
    } else {
        recentCities.push(city);
        localStorage.setItem("recentCities", JSON.stringify(recentCities));
        
        var cityListAdd = $("<a>").text(city);
        $(".cities-list").append(cityListAdd);
    }

    console.log(recentCities);

});
