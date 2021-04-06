// coordinaten: 63.19140339833968, 14.559341823522049 landcode: sv

// Data voor de map van mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZXp6b2x0amUiLCJhIjoiY2tta2w4N3ptMTI0NTMxczFuYWs5NW5nZiJ9.vwpixDi8jqXmSacGr5gIJQ';
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
center: [14.559341823522049, 63.19140339833968], // starting position [lng, lat]
zoom: 3 // starting zoom
});

// De zoekbalk moet als taal Engels hebben, zodat deze op een correcte manier kan samenwerken met de andere API
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    language: 'en-GB', // Specify the language as English.
    mapboxgl: mapboxgl
    });

    map.addControl(geocoder);

// Hiermee kun je in- en uitzoomen en draaien op de map
map.addControl(new mapboxgl.NavigationControl());

// Een flyto optie die bij het inladen van de pagina inzoomt op een startlocatie
map.flyTo({
center: [14.559341823522049, 63.19140339833968],
zoom: 12,
speed: 0.8,
curve: 1,
easing(t){
return t;
}
});

// Dit is een default marker in Zweden. Dit is de voorkeurs-landingsplek
var popup = new mapboxgl.Popup().setHTML('<h4>Hier gaat de SpaceX raket binnenkort landen.</h4>');
var marker = new mapboxgl.Marker({ color: '#C04FFA'})
.setLngLat([14.559341823522049, 63.19140339833968])
.setPopup(popup)
.addTo(map);

var searchbar = document.querySelector('.mapboxgl-ctrl-geocoder--input');
searchbar.addEventListener('change', getSearchResult);

//Variabelen voor de functie getSearchResults
var searchTerm;
var searchCountry;

// In deze functie sla ik de data op en maak ik er een array van. Ik heb met dit stuk echt veel gekloot. Op het internet veel over gevonden. Het geeft in de console nog steeds een error, maar in principe werkt het gewoon. De error komt alleen als je iets anders dan een land in de zoekbalk intikt. Dit heeft te maken met dat de andere API alleen maar land-info weergeeft. Als je dus bijv. een adres of stad intikt krijg je een error, terwijl hij erna wel direct herkent om welk land het gaat & dus werkt het.
function getSearchResult(e) {
    searchTerm = e.target.value;
    var searchArray = searchTerm.split(', ');
    searchCountry = searchArray[searchArray.length - 1];
    getAPIdata();
}

// Met deze functie haal ik de data op uit de tweede API en plaats ik deze in de html
function getAPIdata() {
    // Dit is de standaard input: Zweden. Omdat ik wil dat de voorkeurs-landingsplek Zweden wel blijft bestaan. 
    var country = searchCountry ? searchCountry : 'Sweden';
	// construct request. Met ${} kan je met de input de link veranderen. Dit is een kortere manier dan te werken met een optelsom van stukjes link code. Gevonden op internet hoe het moet en werkt super chill :)
	var request = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;

	// get current country
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
        // Verander de html tekst naar de landnaam
        var country = document.getElementById('country').innerHTML = response[0].name;
        // Verander de html image afhankelijk van het land
        var flag = document.getElementById('flag').style.backgroundImage=`url(${response[0].flag})`;
        // verander de html tekst naar de gesproken taal
        var language = document.getElementById('language').innerHTML = response[0].languages[0].name;
	});
}

// init data stream
getAPIdata();


