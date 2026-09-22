import { apiGet, apiPost, apiDelete } from "./client"

const BASE = "/shortdramas";

async function getShortDramas() {
    return apiGet(BASE);
}

async function getShortDramaById(id){
    return apiGet(BASE + '/' +id);
}

async function addShortDrama(shortDramaRequest) {
    return apiPost(BASE, shortDramaRequest);
}

async function deleteShortDrama(id) {
    return apiDelete(BASE + '/' + id );
}

async function searchByDuration(min, max) {
    return apiGet(BASE + '/search/duration?min=' + min + '&max=' + max);
}

export {getShortDramas, getShortDramaById, addShortDrama,
    deleteShortDrama, searchByDuration}