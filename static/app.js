$(document).ready(function(){
	$('#init-modal').openModal();
    $('#settings-trigger').leanModal();
});


var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var filter = [];
var marker;

function onMapClick(e){
	if(marker != null){
		map.removeLayer(marker);
	}
	marker = L.marker(e.latlng).addTo(map);
}

function initmap() {
	// set up the map
	map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, Icon by <a href="https://icons8.com">Icon8</a>';
	var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 17, attribution: osmAttrib});

	// start the map in Central USA
	map.setView(new L.LatLng(39.1, -94),5);
	map.addLayer(osm);
	map.on('click', onMapClick);
}

function find_pos(){
	navigator.geolocation.getCurrentPosition(function(location) {
		console.log("Allowed")
		map.setView(new L.LatLng(location.coords.latitude, location.coords.longitude), 15);
	    if(marker != null){
			map.removeLayer(marker);
		}
	  	marker = L.marker([location.coords.latitude, location.coords.longitude]).addTo(map);
	});
}

initmap()
