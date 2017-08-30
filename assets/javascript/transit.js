$(document).ready(function() {
console.log($('#map').get());
console.log(document.getElementById('map'));

var userInputFrom;
var userInputTo;
$('#submit').on("click", function(event) {
	event.preventDefault();
	userInputFrom = $('#input-text').val().trim();
	userInputTo = $('#input-text-to').val().trim();
	console.log(userInputFrom);
	calcRoute();
});

function calcRoute() {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
//  var map = new google.maps.Map($('#map'), {
//    zoom: 7,
//    mapTypeId: google.maps.MapTypeId.ROADMAP,
//  });
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  directionsDisplay.setMap(map);
  var request = {
    origin: userInputFrom,
    destination: userInputTo,
    travelMode: google.maps.DirectionsTravelMode.TRANSIT,
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      writeDirectionsSteps(directionsDisplay.directions.routes[0].legs[0].steps);
    }
    else {
      console.error('DirectionsStatus is ' + status);
    }
  });
}

function writeDirectionsSteps(steps) {
  var directions = $('#panel');
  directions.html('');
  for (var i = 0; i < steps.length; i++) {
    directions.append('<br/><br/>' + steps[i].instructions + '<br/>' + steps[i].distance.text);
    if (typeof steps[i].transit !== "undefined") {
      directions.append('<br/>' + steps[i].transit.arrival_stop.name);
    }
  }
}	






});