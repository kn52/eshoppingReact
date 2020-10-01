export const ADD_WISHLIST = 'ADD_WISHLIST';

export function addWishList(wishList){
    return {
        type: ADD_WISHLIST,
        payload: wishList
    }
}