import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const initialState = {};

export const addProductToCart = createAsyncThunk(
    "cart",
    async ({ quantity, userId, productId }) => {
        try {
            let { data } = await axios.post(`http://localhost:8080/api/cart`, {
                quantity,
                userId,
                productId,
            });
            return data;
        } catch (err) {
            alert("error has occurred, check console");
            console.log("error has occurred, check console", err.message);
        }
    }
);

const singleCartDatabaseSlice = createSlice({
    name: "singleCartDatabase",
    initialState,
    reducers: {  }, 
    extraReducers: (builder) => {
        builder.addCase(addProductToCart.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectSingleCartDatabase = (state) => {
    return state.singleCartDatabase;
};

export default singleCartDatabaseSlice.reducer;
