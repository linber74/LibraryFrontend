import axios from "axios";


const BASE_URL = "http://192.168.1.190:8080/api"

async function apiGet(path){

    try {

        const response = await axios.get(BASE_URL + path);
        return response.data;

    }catch (error) {

        console.error(error);
    }
}

async function apiPost(path, body){
    try {
        const response = await axios.post(BASE_URL + path, body);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function apiDelete(path){
    try {
        const response = await axios.delete(BASE_URL + path);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export { apiGet, apiPost, apiDelete };