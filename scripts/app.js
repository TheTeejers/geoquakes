// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!

//use ajax to obtain the data
//data needed: coordinates (features, geometry[0,1])
//data needed: magnitude (features, properties)
//data needed: time since earthquake
//data needed: number of quakes on list (metadat, count)

$.ajax({
  method: 'GET',
  url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
  dataType: 'json',
  // data: {param1: 'value1'},
  success: function(html){
    onSuccess(html);
    initMap(html);
  }
  // error: onError


});

function onSuccess(data){
  for(var i =0; i < (data.features.length); i++){
    // console.log(data.features[i].properties.title);

    $(".list").append($("<li>").append(data.features[i].properties.title));

  }
  initMap(data);
  console.log(data)
};

var map;
function initMap(data) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 1,
    mapTypeId: 'terrain'
  });
// $('#map').append(google.maps.Map);
console.log('yoyoyo');


  for(var i = 0; i < data.features.length; i++){
    var icon = {
      url: '../geoquakes/images/earthquake.png',
      scaledSize: new google.maps.Size(20,20),
      orgin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0,0),
      stylers: [{"color": 'red'}],

    }
    var coords = data.features[i].geometry.coordinates;
    var mag = data.features[i].mag;
      if(mag > 4.5 && mag <= 6.0){
        var icon = {
          url: '../geoquakes/images/earthquake.png',
          scaledSize: new google.maps.Size(50,50),
          orgin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0,0),
    }
      }
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: latLng,
    map: map,
    icon: icon
});
  }


}

// function mapSuccess(data){
//   console.log('SUCCESS FOR MAP');
// }

});


