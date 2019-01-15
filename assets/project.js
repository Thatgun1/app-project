// Map
function initMap() {
    console.log('asd');
    // Map Options
    var options = {
        zoom:8, 
        center:{lat:39.0997, lng:-94.5786}
    }
    var mapElement = document.getElementById('map');
    // New Map
    var map = new google.maps.Map(mapElement, options);
    
    // Add Marker
    var looseMarker = new google.maps.Marker({
        position:{lat:39.0314, lng:-94.5945},
        map:map
    })
    
    var penguinMarker = new google.maps.Marker({
        position:{lat:39.1875, lng:-94.5310},
        map:map
    })
    
    var swopeMarker = new google.maps.Marker({
        position:{lat:39.0079, lng:-94.5373},
        map:map
    })
    
    // Park Labels
    var looseLabel = new google.maps.InfoWindow({
        content:'<h1>Loose Park</h1>'
    })
    
    looseMarker.addListener('click', function(){
        looseLabel.open(map, looseMarker);
    })
    
    var penguinLabel = new google.maps.InfoWindow({
        content:'<h1>Penguin Park</h1>'
    })
    
    penguinMarker.addListener('click', function(){
        penguinLabel.open(map, penguinMarker);
    })
    
    var swopeLabel = new google.maps.InfoWindow({
        content:'<h1>Swope Park</h1>'
    })
    
    swopeMarker.addListener('click', function(){
        swopeLabel.open(map, swopeMarker);
    })
       
}