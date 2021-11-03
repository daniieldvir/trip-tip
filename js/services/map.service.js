import { axios } from "../../lib/axios";

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getInfoWindow,
    searchLocation
}

var gMap;
let infoWindow

function initMap(lat = 32.06694, lng = 34.77778) {
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
                    `<p>Under what name do you want to save this location?</p>
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

function getInfoWindow() {
    return infoWindow
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAUa9etRbJHXatY5NPGcT4Qej9HqCsTqTg'; //Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAUa9etRbJHXatY5NPGcT4Qej9HqCsTqTg`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function searchLocation() {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${val}=AIzaSyAUa9etRbJHXatY5NPGcT4Qej9HqCsTqTg`)
        .then(res => {
            let data = res.data.results[0].geometry.searchLocation
            var laLenLng = new google.maps.LatLng(dana.lat, data.lng);
            gMap.panTo(laLenLng)
        }) 
}

