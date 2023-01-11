import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

// let user = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')):{data:{

//     id:0
// }} 
// const token = user.data.id;

  // const token = window.localStorage.getItem('token');

export const fetchProductsAsync = createAsyncThunk(
    "Products/fetchAll",
    async () => {
        try {
            const { data } = await axios.get("/api/products");
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }
);

const allProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectProducts = (state) => {
    return state.products;
};

export default allProductsSlice.reducer;
