import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const cartSlice = createSlice({
    name: "cart slice",
    initialState,
    reducers: {
        addToQuantity(state, action){
             state.map(product => {
                if(action.payload.id == product.id) product.count++
            })
        },
        removeToQuantity(state, action){
             state.map(product => {
                if(action.payload.id == product.id) product.count--
            })
        },
        addToCart(state, action) {
            state.push(action.payload)
        },
        removeFromCart(state, action) {
            return state.filter(product => {
                return product.id !== action.payload})
        }
    },
    extraReducers: (builder) => {}
    }
)

export const {addToCart, removeFromCart, addToQuantity, removeToQuantity} = cartSlice.actions;

export const selectGetCart = (state) => {
    return state.cart;
};

export default cartSlice.reducer;
