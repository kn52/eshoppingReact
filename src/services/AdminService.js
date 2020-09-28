import {deleteData, post} from "./HttpService";

export default class AdminService {

    addBook(bookData) {
        return (post(bookData, 'admin/book'))
    }

    uploadImage = (formData) => {
        return (post(formData, 'admin/image'))
    }

    updateBook(bookData, bookId) {
        return (post(bookData, `admin/book/${bookId}`))
    }

    deleteBook(bookId) {
        return (deleteData(`admin/book/${bookId}`))
    }

    adminLogin(loginDetails) {
        return (post(loginDetails, 'admin/login'))
    }
}
