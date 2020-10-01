export const ADD_BOOKS='ADD_BOOKS';

export function addBooks(books){
    return {
        type: ADD_BOOKS,
        payload: books
    }
}