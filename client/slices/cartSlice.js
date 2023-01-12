import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cart slice",
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {

    },
});
export const { addToCart } = cartSlice.actions;

export const selectGetCart = (state) => {
    return state.cart;
};

export default cartSlice.reducer;
