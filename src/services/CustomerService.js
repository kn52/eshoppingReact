import {get, post} from "./HttpService";

export default class CustomerService {

    addCustomer(customer) {
        return (post(customer, `customer`));
    }

    getCustomerDetails(addressType) {
        return (get(`/customer/${addressType}`))
    }

    addFeedback(data){
        return (post(data,`comment`));
    }

    getAllFeedback(isbnNumber){
        return(get(`comments/?isbnNumber=${isbnNumber}`));
    }

    getCustomerFeedback(bookId){
        return(get(`/customer/feedback/?bookId=${bookId}`))
    }
}
