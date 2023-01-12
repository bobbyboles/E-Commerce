import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart slice",
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        removeFromCart(state, action) {
            console.log(current(state))
            return state.filter(product => {
                return product.id !== action.payload})
        }
    },
    extraReducers: (builder) => {}
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions;

export const selectGetCart = (state) => {
    return state.cart;
};

export default cartSlice.reducer;
