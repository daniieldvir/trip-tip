import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSaveLocation = onSaveLocation;
window.onDelete = onDelete;
window.onSearchLocation = onSearchLocation

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            locService.getLocs()
           onGetLocs()
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            var strHtml = locs.map((loc) => {
                return `
                <div class="saved-location"> 
                <p class:"id">Location id: ${loc.id}</p>
                <p class:"name">Location Name: ${loc.name}</p>
                <p class:"lat">Location Lat: ${loc.lat}</p>
                <p class:"lng">Location Lng: ${loc.lng}</p>
                <p class:"createdAt"> Location created At: ${(new Date(loc.createdAt) + '').slice(0, 24)}</p>
                <p class:"updatedAt">Location updated At: ${(new Date(loc.updatedAt) + '').slice(0, 24)}</p>
                <button onclick="onPanTo(${loc.lat},${loc.lng})" class="btn-pan btn-design">Go</button>
                <button onclick="onDelete('${loc.id}')" class="btn-pan btn-design">Delete</button>
                </div>`
            })  
            document.querySelector('.locs').innerHTML = strHtml.join('')
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(lat, lng) {
    mapService.panTo(lat, lng);
}

function onDelete(id) {
    locService.deleteLoc(id)
    onGetLocs()
}

function onSaveLocation() {
    const name = document.querySelector('.user-input').value
    const lat = document.querySelector('.gmap-input').dataset.lat
    const lng = document.querySelector('.gmap-input').dataset.lng

    locService.saveLocation(name, lat, lng)
    const infoWindows = mapService.getInfoWindow()
    infoWindows.close()
}

function onSearchLocation(val) {
    mapService.searchLocation(val)
    document.querySelector('.user-pos').innerHTML = val
}
