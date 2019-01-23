//Longitude & Latitude


//Map
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
//Astronomy API
getEphemTable();
function getEphemTable() {

    //Longitude and Latitude
    function getLatLong(callback) {
        $.getJSON('https://ipinfo.io', function (data) {
            var location = data.loc;
            lat = location.split(",")[0];
            lon = location.split(",")[1];
            callback(lat, lon);
        });
    }

    $(document).ready(function () {
        getLatLong(function (lat, lon) {
            console.log(lat + "yes");
            console.log(lon + "yes");
        });
    });
    //calls Longitude and Latitude into Parent Function
    var local_latitude = this.lat;
    var local_longitude = this.lon;

    var api_url = "https://www.astropical.space/astrodb/api-ephem.php?lat=" + local_latitude + "&lon=" + local_longitude;
    $.ajax({
        url: api_url,
        success: function (result) {
            console.log(result);
            var data = $.parseJSON(result); 
            console.log(data);
            var dt = new Date(data.info.timestamp * 10000);
            $("#headinfo").html(dt.toUTCString() + "<br>Latitude: " + data.info.latitude + "°<br>Longitude: " + data.info.longitude + "°<br>Sidereal time: " + data.info.lst + "hrs<br>Julian Date: " + data.info.jd + "<br><br>");
        }
    });
    var htm = "<h4>Your Local Sightings</h4>";
    htm += "<table class='table'>";
    htm += "<tr><th>Name</th><th>Const</th><th>RA [hms]</th><th>Decl [dms]</th><th>Size ['] </th><th>Mag</th>";
    htm += "<th>Phase [°]</th><th>Dist [AU]</th><th>Elevation [°]</th></tr>";
    $.getJSON(api_url, function (data) {
        data['response'].forEach(function (arr) {
            htm += "<tr><td>" + arr['name'] + "</td><td>" + arr['const'] + "</td><td>" + (arr['ra_hms']) + "</td><td>";
            htm += arr['de_dms'] + "</td><td>" + arr['size'] + "</td><td>" + arr['mag'] + "</td><td>" + arr['phase'] + "</td>";
            htm += "<td>" + arr['au_earth'] + "</td><td>" + arr['alt'] + "</td></tr>";
        });
        htm += "</table>";
        $("#ephemtable").html(htm);
    });
    setTimeout(getEphemTable, 100000);

    //Star Chart
    getstarChart();
    function getstarChart() {
        var starapi_url = "https://www.astropical.space/astrodb/starchart.php?planis=1&lat=" + local_latitude + "&lon=" + local_longitude + "&width=800";
        console.log(starapi_url);
        var starimg = "<h4>A Snapshot of Your Stars<h4>";
        starimg += "<img src='" + starapi_url + "'>";
        $("#starchart").html(starimg);
    }


}
