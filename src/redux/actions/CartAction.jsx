export const ADD_CARTLIST = 'ADD_CARTLIST';
export const ADD_USER_DETAILS = 'ADD_USER_DETAILS';
export const ADD_CUSTOMER_DETAILS = 'ADD_CUSTOMER_DETAILS';

export function addCartList(cartList){
    return {
        type: ADD_CARTLIST,
        payload: cartList
    }
}

export function addUserDetails(userDetails){
    return {
        type: ADD_USER_DETAILS,
        payload: userDetails
    }
}

export function addCustomerDetails(customerDetails){
    return {
        type: ADD_CUSTOMER_DETAILS,
        payload: customerDetails
    }
}