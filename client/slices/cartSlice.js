import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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

const cartSlice = createSlice({
    name: 'cart slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getCart.fulfilled,(state, action)=>{
        return action.payload
        });
    }
})

export const selectGetCart = (state) => {
    return state.getCart;
}

export default cartSlice.reducer;
