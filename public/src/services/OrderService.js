import {get, post} from "./HttpService";

export default class CartService {

    placeOrder(orederDTO) {
        return (post(orederDTO ,`order`));
    }

    fetchOrders() {
        return (get(`order`));
    }
}
