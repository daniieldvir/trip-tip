export const mapService = {
    initMap,
    addMarker,
    panTo,
    getInfoWindow
}

var gMap;
let infoWindow

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);

            infoWindow = new google.maps.InfoWindow({
                content: "Click the map to save the location!",
                position: { lat, lng },
            });
            infoWindow.open(gMap);
            gMap.addListener("click", (mapsMouseEvent) => {
                infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(
                    `<p>What is the name?</p>
                    <p> </p>
                    <input class="gmap-input" data-lat="${mapsMouseEvent.latLng.lat()}" data-lng="${mapsMouseEvent.latLng.lng()}" hidden/>
                    <input class="user-input" type="text" value="" />
                    <button class="save-user-input" onclick="onSaveLocation(this.value)">save</button>` 
                );
                infoWindow.close()
                infoWindow.open(gMap);
            });
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAiwks8bz483lqJ9B_71_Q0LqoN6LKT5LE'; //Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAiwks8bz483lqJ9B_71_Q0LqoN6LKT5LE`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getInfoWindow() {
    return infoWindow
}