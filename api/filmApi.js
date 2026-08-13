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

async function searchByDirector(director) {
    return apiGet("/films/search/director?director=" + director);
}

async function searchByActor(actor) {
    return apiGet("/films/search/actor?actor=" + actor)
}

async function searchByMediaFormat(format) {
    return apiGet("/films/search/format?format=" + format);
}

async function searchByTranslation(info) {
    return apiGet("/films/search/translation?info=" + info);
}

export { getFilms, getFilmById, addFilm, deleteFilm, searchByDirector, searchByActor,
    searchByMediaFormat, searchByTranslation }