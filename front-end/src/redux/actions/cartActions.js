import axios from "axios";
import { notificationError, notificationSuccess } from "../../helpers/toastNotificationPopUp";
import { 
    ADD_ITEM_TO_CART,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
 } from "../actionTypes/cartActionTypes";
import { errorMessageHandler } from "../errorMessageHandler";
import { spinnerStatusAction } from "./spinnerAction";

const BaseUrl = `http://localhost:9001`;

const addToCartActions = (productId, qty, size) => async (dispatch, getState) => {
    try {   
        spinnerStatusAction(true);

        if(!size) {
            return notificationError('Oops, you should first specify a size of the sneaker!')
        }
        const { data } = await axios(`${BaseUrl}/api/products?id=${productId}`);
        dispatch({ type: ADD_ITEM_TO_CART, 
            payload: {
                id: productId,
                model: data[0].model,
                brandName: data[0].brandName,
                price: data[0].price,
                countInStock: data[0].countInStock,
                releaseDate: data[0].releaseDate,
                qty,
                size
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
        spinnerStatusAction(false);
        notificationSuccess("It has been added on your cart!");

    } catch (error) {
        spinnerStatusAction(true);
        notificationError(errorMessageHandler(error))

    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
  
const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export { addToCartActions, removeFromCart, saveShippingAddress };