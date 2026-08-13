import { apiGet, apiPost, apiDelete } from "./client";

async function getTvSeries(){
    return apiGet("/tvseries");
}

async function getTvSeriesById(id){
    return apiGet("/tvseries/" + id);
}

async function addTvSeries(tvSeriesRequest){
    return apiPost("/tvseries", tvSeriesRequest);
}

async function deleteTvSeries(id) {
    return apiDelete("/tvseries/" + id);
}

async function addSeason(id, seasonRequest){
    return apiPost("/tvseries/" + id + "/season", seasonRequest);
}

async function searchBySeasonNumber(nr) {
    return apiGet("/tvseries/search/season?nr=" + nr);
}

async function getSeasonByTvSeries(id) {
    return apiGet("/tvseries/" + id + "/season");
}

export { getTvSeries, getTvSeriesById, addTvSeries, deleteTvSeries,
    addSeason, searchBySeasonNumber, getSeasonByTvSeries }