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

async function searchByAuthor(author) {
    return apiGet("/books/search/author?author=" + author);
}

async function searchByFormat(bookFormat) {
    return apiGet("/books/search/format?bookFormat=" + bookFormat);
}

async function searchByFanficType(fanficType) {
    return apiGet("/books/search/fanfictype?fanficType=" + fanficType)
}

async function searchByFandom(fandom) {
    return apiGet("/books/search/fandom?fandom=" + fandom)
}

export {getBooks, getBookById, addBook, deleteBook, searchByAuthor, 
    searchByFormat, searchByFanficType, searchByFandom}