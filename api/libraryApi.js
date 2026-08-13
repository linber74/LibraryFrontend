import { apiGet, apiDelete } from "./client";

async function getAllItems() {
    return apiGet("/library");
}

async function getItemById(id) {
    return apiGet("/library/" + id);    
}

async function deleteItem(id) {
    return apiDelete("/library/" + id);   
}

async function searchByType(itemType) {
    return apiGet("/library/search/type?itemType=" + itemType);
}

async function searchByLanguage(language) {
    return apiGet("/library/search/language?language=" + language);
}

async function searchByTitle(title) {
    return apiGet("/library/search/title?title=" + title);
}

async function searchByYear(year) {
    return apiGet("/library/search/year?year=" + year);
}

async function getAllSeriesInfo() {
    return apiGet ("/library/series");
}

export { getAllItems, getItemById, deleteItem, searchByType,
    searchByLanguage, searchByTitle, searchByYear, getAllSeriesInfo }