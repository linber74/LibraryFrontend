import { apiGet, apiPost, apiDelete } from "./client";

async function getBooks(){
    return apiGet("/books");
}

async function getBookById(id){
    return apiGet("/books/" + id);
}

async function addBook(bookRequest){
    return apiPost("/books", bookRequest);
}

async function deleteBook(id) {
    return apiDelete("/books/" + id);
}

export {getBooks, getBookById, addBook, deleteBook}