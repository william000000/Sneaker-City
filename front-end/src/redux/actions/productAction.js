import axios from 'axios';
import {
    PRODUCT_LIST_ERROR,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "../actionTypes/productActionTypes";
import { notificationError } from "../../helpers/toastNotificationPopUp";
import { spinnerStatusAction } from "./spinnerAction";
import { errorMessageHandler } from "../errorMessageHandler";

const BaseUrl = `http://localhost:9001`;

const productListAction = (id) => async (dispatch) => {
    try {
        spinnerStatusAction(true);
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const apiRoute = id ? await axios.get(`${BaseUrl}/api/products?id=${id}`) : await axios.get(`${BaseUrl}/api/products`);
        const { data } = apiRoute;
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        spinnerStatusAction(false);

    } catch (error) {
        dispatch({ type: PRODUCT_LIST_ERROR, payload: errorMessageHandler(error) })
        spinnerStatusAction(true);
        notificationError(errorMessageHandler(error));
        spinnerStatusAction(false);
    }

}

const sortProductsAction = (orderBy) => async (dispatch) => {
    try {
        spinnerStatusAction(true);
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`${BaseUrl}/api/products/sort?orderBy=${orderBy}`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        spinnerStatusAction(false);

    } catch (error) {
        dispatch({ type: PRODUCT_LIST_ERROR, payload: errorMessageHandler(error) })
        spinnerStatusAction(true);
        notificationError(errorMessageHandler(error));
        spinnerStatusAction(false);
    }

}

export { productListAction, sortProductsAction };