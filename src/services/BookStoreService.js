import {get} from "./HttpService";

export default class BookStoreService {

    fetchBooks(pageNumber, searchText, sortType) {
        return (get(`books/?filterattributes=${sortType}&pageno=${pageNumber}&searchtext=${searchText}`));
    }
}
