var map, mylat, mylng;
var imageVar = 'row-image-';
var titleVar = 'row-title-';
var descriptionVar = 'row-description-';

console.log("Loading Map...")

function initMap() {
	var infowindow = new google.maps.InfoWindow();

	function placeMarker(trail){
		var marker = new google.maps.Marker({
			position: {lat: trail.latitude, lng: trail.longitude},
			map: map,
			icon: 'img/mountain.png'
		});
		marker.addListener('click', function(){
			infowindow.setContent( "<div id='infowindow'>"+ "<p>"+trail.name+"</p>"+ "Longitude: " + trail.longitude + "<div></div>" + "Latitude: " + trail.latitude +"</div>");
			infowindow.open(map, this);
		});
	}

	function newTrail(trail,i){
		var indexNumber = i+1;
		document.getElementById('row-image-'+indexNumber).src = trail.imgMedium;
		document.getElementById('row-image-'+indexNumber).style.height = 'auto';
		document.getElementById('row-image-'+indexNumber).style.width = '100vh';
		document.getElementById('row-title-'+indexNumber).textContent = trail.name;
		document.getElementById('row-description-'+indexNumber).textContent = trail.summary;
	}

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
							if(i<6)newTrail(data.trails[i],i);
						}
					});
				}
			)
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
	});
}

var mapstyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
