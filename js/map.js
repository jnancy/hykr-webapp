var map, mylat, mylng;
var imageVar = 'row-image-';
var titleVar = 'row-title-';
var descriptionVar = 'row-description-';
var infowindow = new google.maps.InfoWindow();

console.log("Loading Map...")

function initMap() {
	var infowindow = new google.maps.InfoWindow();
	navigator.geolocation.getCurrentPosition(function (position) {
		console.log(position.coords.latitude, position.coords.longitude);
		mylat = position.coords.latitude;
		mylng = position.coords.longitude;
		map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: mylat,
				lng: mylng
			},
			zoom: 12
		});
    var marker = new google.maps.Marker({
      position: {lat: position.coords.latitude, lng: position.coords.longitude},
      map: map,
      icon: 'img/dot.png'
    });
		fetch('https://www.hikingproject.com/data/get-trails?lat=' + mylat + '&lon=' + mylng + '&maxDistance=10'+'&key=200374350-e954741ee27b3d305a1cb6138f1aebfd')
			.then(
				function (response) {
					if (response.status !== 200) {
						console.log('Looks like there was a problem. Status Code: ' +
							response.status);
						return;
					}
					// Examine the text in the response
					response.json().then(function (data) {
						console.log(data);
						for (var i = 0; i < data.trails.length; i++){
							placeMarker(data.trails[i]);
						}
						for (var i = 0; i < 6; i++) {
							var trail = data.trails[i];
							console.log(trail);
							var indexNumber = i+1;
							document.getElementById('row-image-'+indexNumber).src = trail.imgMedium;
							document.getElementById('row-image-'+indexNumber).style.height = 'auto';
							document.getElementById('row-image-'+indexNumber).style.width = '100vh';
							document.getElementById('row-title-'+indexNumber).textContent = trail.name;
							document.getElementById('row-description-'+indexNumber).textContent = trail.summary;
						}
					});
				}
			)
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	});
}

function placeMarker(trail){
	var marker = new google.maps.Marker({
		position: {lat: trail.latitude, lng: trail.longitude},
		map: map,
		icon: 'img/mountain.png'
	});
	google.maps.event.addListener(marker, 'click', function(){
		infowindow.setContent( "<div id='infowindow'>"+ trail.name +"</div>");
		infowindow.open(map, this);
	});
}

function newTrail(trail){
	var indexNumber = i+1;
	document.getElementById('row-image-'+indexNumber).src = trail.imgMedium;
	document.getElementById('row-image-'+indexNumber).style.height = 'auto';
	document.getElementById('row-image-'+indexNumber).style.width = '100vh';
	document.getElementById('row-title-'+indexNumber).textContent = trail.name;
	document.getElementById('row-description-'+indexNumber).textContent = trail.summary;
}
