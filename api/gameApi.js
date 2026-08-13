import { apiGet, apiPost, apiDelete } from "./client";

async function getGames(){
    return apiGet("/games");
}

async function getGameById(id){
    return apiGet("/games/" + id);
}

async function addGame(gameRequest){
    return apiPost("/games", gameRequest);
}

async function deleteGame(id) {
    return apiDelete("/games/" + id);
}

export { getGames, getGameById, addGame, deleteGame }