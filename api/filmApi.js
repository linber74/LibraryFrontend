import { apiGet, apiPost, apiDelete } from "./client";

async function getFilms(){
    return apiGet("/films");
}

async function getFilmById(id){
    return apiGet("/films/" + id);
}

async function addFilm(filmRequest){
    return apiPost("/films", filmRequest);
}

async function deleteFilm(id) {
    return apiDelete("/films/" + id);
}

export {getFilms, getFilmById, addFilm, deleteFilm}