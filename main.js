// coordinaten: 63.19140339833968, 14.559341823522049 landcode: sv

// Data voor de map van mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZXp6b2x0amUiLCJhIjoiY2tta2w4N3ptMTI0NTMxczFuYWs5NW5nZiJ9.vwpixDi8jqXmSacGr5gIJQ';
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
center: [14.559341823522049, 63.19140339833968], // starting position [lng, lat]
zoom: 3 // starting zoom
});

// using flyTo options
map.flyTo({
center: [14.559341823522049, 63.19140339833968],
zoom: 12,
speed: 0.8,
curve: 1,
easing(t){
return t;
}
});

// Create a default Marker and add it to the map.
var popup = new mapboxgl.Popup().setHTML('<h4>Hier gaat de SpaceX raket binnenkort landen.</h4>');
var marker = new mapboxgl.Marker({ color: '#C04FFA'})
.setLngLat([14.559341823522049, 63.19140339833968])
.setPopup(popup)
.addTo(map);


function getAPIdata() {
	// construct request
	var request = 'https://restcountries.eu/rest/v2/name/sweden?fullText=true';

	// get current weather
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
		// show full JSON object
		console.log(response[0]);

        var country = document.getElementById('country').innerHTML = response[0].translations.nl;
        var flag = document.getElementById('flag').style.backgroundImage="url('https://restcountries.eu/data/swe.svg')";
        var language = document.getElementById('language').innerHTML = response[0].languages[0].name;
	});
}

// init data stream
getAPIdata();