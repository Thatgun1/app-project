$(document).ready(function () {

    $("#newSearchBtn").on("click", function () {
        console.log("hey");
        var units = "imperial";
        var userInput = $("#userInput").val().trim();
        var apiKey = "da5c46eeeb2ee9f1a5dabd07c4651964";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + userInput + "&APPID=" + apiKey + "&units=" + units;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $(".weatherText").show();
            $("#cityName").text(response.name);
            $("#tempData").text(Math.round(response.main.temp));
            $("#windData").text(Math.round(response.wind.speed));
            $("#visibilityData").text(response.visibility);

            function backgroundImg() {
                if (response.weather.main == "Rain", "Drizzle", "Mist") {
                    document.getElementById("weatherWindow").style.backgroundImage = "url('assets/images/rain.jpg')";
                }

                if (response.weather.main == "Clouds") {
                    document.getElementById("weatherWindow").style.backgroundImage = "url('assets/images/cloudy.jpg')";
                }

                if (response.weather.main == "Thunderstorm") {
                    document.getElementById("weatherWindow").style.backgroundImage = "url('assets/images/thunderstorm.jpg')";
                }

                if (response.weather.main == "Snow") {
                    document.getElementById("weatherWindow").style.backgroundImage = "url('assets/images/snow.jpg')";
                }

                if (response.weather.main == "Clear") {
                    document.getElementById("weatherWindow").style.backgroundImage = "url('assets/images/clear.jpg')";
                }
            }
            backgroundImg();
        })
    })
})

// Map
function initMap() {
    console.log('asd');
    // Map Options
    var options = {
        zoom: 8,
        center: { lat: 39.0997, lng: -94.5786 }
    }
    var mapElement = document.getElementById('map');
    // New Map
    var map = new google.maps.Map(mapElement, options);

    var infoWindow = new google.maps.InfoWindow({
        content: name
    });

    // Add Marker
    var looseMarker = new google.maps.Marker({
        position: { lat: 39.0314, lng: -94.5945 },
        map: map
    })

    var penguinMarker = new google.maps.Marker({
        position: { lat: 39.1875, lng: -94.5310 },
        map: map
    })

    var swopeMarker = new google.maps.Marker({
        position: { lat: 39.0079, lng: -94.5373 },
        map: map
    })

    // Park Labels
    var looseLabel = new google.maps.InfoWindow({
        content: '<h1>Loose Park</h1>'
    })

    looseMarker.addListener('click', function () {
        looseLabel.open(map, looseMarker);
    })

    var penguinLabel = new google.maps.InfoWindow({
        content: '<h1>Penguin Park</h1>'
    })

    penguinMarker.addListener('click', function () {
        penguinLabel.open(map, penguinMarker);
    })

    var swopeLabel = new google.maps.InfoWindow({
        content: '<h1>Swope Park</h1>'
    })

    swopeMarker.addListener('click', function () {
        swopeLabel.open(map, swopeMarker);
    })

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
