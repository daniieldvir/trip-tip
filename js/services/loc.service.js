import { utils } from './utils.service.js'
import { storageService } from './storage.service.js'
export const locService = {
    getLocs,
    saveLocation,
    deleteLoc,
}

const KEY = 'locationDb'
let locs;

function getLocs() {
    locs = storageService.loadFromStorage(KEY)
    if (!locs || !locs.length) locs = [
        {
            id: utils.makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384,
            createdAt: new Date(), updatedAt: new Date()
        },
        {
            id: utils.makeId(), name: 'Neveragain', lat: 32.047104, lng: 34.832384,
            createdAt: new Date(), updatedAt: new Date()
        },
    ]
    return new Promise((resolve, reject) => {
        resolve(locs);
    });
}

function saveLocation(name, lat, lng) {
    const location = getEmptyLocation(name, lat, lng)
    locs.push(location)
    storageService.saveToStorage(KEY, locs)
}

function getEmptyLocation(name, lat, lng) {
    return {
        id: utils.makeId(), name, lat, lng,
        createdAt: Date.now(), updatedAt: Date.now()
    }
}

function deleteLoc(id) {
    let idx = locs.findIndex((loc) => loc.id === id)
    locs.splice(idx, 1)
    storageService.saveToStorage(KEY, locs)
}
