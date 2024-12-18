import { configureStore } from "@reduxjs/toolkit";
import { jewelerySlice } from "./features/jewelery/jewelerySlice";
import {wishlistSlice} from "./features/wishlist/wishlistSlice";
import {cartSlice} from "./features/cart/cartSlice";
import {addressSlice} from "./features/address/addressSlice";

export default configureStore({
    reducer: {
jewelery: jewelerySlice.reducer,
wishlist: wishlistSlice.reducer,
cart: cartSlice.reducer,
addresses: addressSlice.reducer
    }
})
