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

export { getAllItems, getItemById, deleteItem }