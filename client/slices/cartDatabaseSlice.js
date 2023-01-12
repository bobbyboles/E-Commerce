import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const initialState = {};

export const getCart = createAsyncThunk('cart', async () => {
    try{
        let {data} = await axios.get(`http://localhost:8080/api/cart`)
        return data
    } catch (err){
        alert('error has occurred, check console')
        console.log('error has occurred, check console', err.message)
    }
})


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

const cartDatabaseSlice = createSlice({
    name: "cartDatabase",
    initialState,
    reducers: {  }, 
    extraReducers: (builder) => {
        builder.addCase(addProductToCart.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectDatabaseCart = (state) => {
    return state.cartDatabase;
};

export default cartDatabaseSlice.reducer;
