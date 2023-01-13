import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const initialState = [];

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
export const getMyCart = createAsyncThunk('myCart', async (userId) => {
    try{
        let {data} = await axios.get(`http://localhost:8080/api/cart/myCart`, {headers:{authid:userId}})
        console.log("this is the thunk for myCart", data)
        return data
    } catch (err){
        alert('error has occurred, check console')
        console.log('error has occurred, check console', err.message)
    }
})
export const editProductInCart = createAsyncThunk("singleUser/edit", async ({id, userId, productId, quantity, completed}) => {
  try {
    const { data } = await axios.put(`/api/cart/${id}`, {userId, productId, quantity, completed});
    return data;
  } catch (err) {
    console.log(err);
  }
});

const singleCartDatabaseSlice = createSlice({
    name: "singleCartDatabase",
    initialState,
    reducers: {  }, 
    extraReducers: (builder) => {
        builder.addCase(addProductToCart.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getMyCart.fulfilled, (state, action) => {
           return action.payload
        });
        builder.addCase(editProductInCart.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectSingleCartDatabase = (state) => {
    return state.singleCartDatabase;
};

export default singleCartDatabaseSlice.reducer;
