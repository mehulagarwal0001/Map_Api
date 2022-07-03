mapboxgl.accessToken = 'pk.eyJ1IjoiYWtzaGF5LWFkaGFuYSIsImEiOiJja3lidjNoOW8wajZlMm9xb3QxaGo2MW5wIn0.d3-byCvalXyvUT6swhWkQA';
var map = new mapboxgl.Map({
	zoom: 16,
	center: [86.47472132080998, 23.8121817595987],
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11'
});
let lat,lang,marker2;
map.on('click',function(e){
	if (marker2) {
		marker2.remove();
	}
	lang = e.lngLat.lng;
	lat = e.lngLat.lat;
	console.log(lang);
	console.log(lat);
	map.flyTo({
		center: [lang, lat]
	})
	// map.setZoom(12);
	marker2 = new mapboxgl.Marker()
		.setLngLat([lang, lat])
		.addTo(map);
	// map = new mapboxgl.Map({
	// 	zoom: 10,
	// });
})
map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl
	})
,"top-left");

const nav = new mapboxgl.NavigationControl();
map.addControl(nav);


function ajaxCall() {
    this.send = function(data, url, method, success, type) {
        type = type||'json';
        var successRes = function(data) {
            success(data);
        }

        var errorRes = function(e) {
            console.log(e);
        }
        jQuery.ajax({
            url: url,
            type: method,
            data: data,
            success: successRes,
            error: errorRes,
            dataType: type,
            timeout: 60000
        });

    }

}


jQuery(".cities").on("change", function(ev) {
	var cityId = jQuery("option:selected", this).val();

	var rootUrl="https://geodata.solutions/restapi?";
  var url=rootUrl+'country='+ jQuery('#countryId option:selected').attr('value') +'&state=' + jQuery('#stateId option:selected').attr('value') + '&city=' + cityId+ '&limit=1';
console.log(url);
  var call = new ajaxCall();
  var method = "get";
  var data = {};
  call.send(data, url, method, function(data) {
	if (marker2) {
		marker2.remove();
	}
	var lat=data.latit;
	var lang=data.longit;
	map.flyTo({
		center: [lang, lat]
	})
	// map.setZoom(12);
	marker2 = new mapboxgl.Marker()
		.setLngLat([lang, lat])
		.addTo(map);
  });

});