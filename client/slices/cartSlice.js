import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = [];

export const getCart = createAsyncThunk('cart', async () => {
    try{
        let {data} = await axios.get(`http://localhost:8080/api/cart`)
        return data
    } catch (err){
        alert('error has occurred, check console')
        console.log('error has occurred, check console', err.message)
    }
})

export const addProductToCart = createAsyncThunk('cart', async (id) => {
    try{
        let {data} = await axios.get(`http://localhost:8080/api/cart${id}`)
        return data
    } catch (err){
        alert('error has occurred, check console')
        console.log('error has occurred, check console', err.message)
    }
})

const cartSlice = createSlice({
    name: 'cart slice',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        }
    },
    extraReducers: (builder) => {
      builder.addCase(getCart.fulfilled,(state, action)=>{
        return action.payload
        });
    }
})
export const {addToCart} = cartSlice.actions;

export const selectGetCart = (state) => {
    return state.cart;
}

export default cartSlice.reducer;
