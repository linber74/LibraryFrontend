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

export { getTvSeries, getTvSeriesById, addTvSeries, deleteTvSeries }