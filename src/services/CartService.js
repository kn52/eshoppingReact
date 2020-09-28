import {deleteData, get, post, update} from "./HttpService";

export default class CartService {

    async addToCart(cart) {
        return (await post(cart, `cart`));
    }

    updateCart = (id, quantity) => {
        return (update(`cart/${id}/${quantity}`))
    }

    deleteCart(id) {
        return (deleteData(`cart/${id}`))
    }

    fetchCart() {
        return (get(`cart`));
    }

}
