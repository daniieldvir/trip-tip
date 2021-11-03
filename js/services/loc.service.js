
export const locService = {
    getLocs
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]


const locs = [
    { id:_makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384, 
    weather, createdAt: Date.now() , updatedAt: Date.now()}, 

    { id:_makeId(), name: 'Neveragain', lat: 32.047104, lng: 34.832384,
     weather, createdAt: Date.now() , updatedAt: Date.now()}, 
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


