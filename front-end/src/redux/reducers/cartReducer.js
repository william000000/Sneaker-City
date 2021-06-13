import { 
    ADD_ITEM_TO_CART,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS
 } from "../actionTypes/cartActionTypes";


const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            const item = action.payload;
            const isProduct = state.cartItems.find(a => a.id === item.id);
            if(isProduct) {
                return { ...state, error: '', cartItems: state.cartItems.map(i => i.id === isProduct.id ? item : i) }
            }
            return { ...state, error: '', cartItems: [...state.cartItems, item]}

        case CART_REMOVE_ITEM:
            return {
                ...state,
                error: '',
                cartItems: state.cartItems.filter((x) => x.id !== action.payload),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };

        default: 
            return state
    }
}

export { cartReducer };