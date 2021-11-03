import { utils } from './utils.service.js'
import { storageService } from './storage.service.js'
export const locService = {
    getLocs,
    saveLocation
}
const KEY = 'locationDb'

let locs;

function getLocs() {
    locs = storageService.loadFromStorage(KEY)
    if (!locs || !locs.length) locs = [
        {
            id: utils.makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384,
            createdAt: Date.now(), updatedAt: Date.now()
        },

        {
            id: utils.makeId(), name: 'Neveragain', lat: 32.047104, lng: 34.832384,
            createdAt: Date.now(), updatedAt: Date.now()
        },
    ]
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function saveLocation(name, lat, lng){
    const location = getEmptyLocation(name, lat, lng)
    locs.push(location)
    storageService.saveToStorage(KEY, locs)
}

function getEmptyLocation(name, lat, lng){
    return {
        id: utils.makeId(), name, lat, lng,
        createdAt: Date.now(), updatedAt: Date.now()
    }
}
