import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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

export const deleteCart = createAsyncThunk('deleteCart', async (id) => {
    try{
        let {data} = await axios.delete(`http://localhost:8080/api/cart/${id}`)
        return data
    } catch (err){
        err('error')
    }
})

const cartSlice = createSlice({
    name: 'cart slice',
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
    extraReducers: (builder) => {
      builder.addCase(getCart.fulfilled,(state, action)=>{
        return action.payload
        });
      builder.addCase(deleteCart.fulfilled,(state, action)=>{
        console.log(action)
        console.log(state)
        // state = state.filter(product => )
        })
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions;

export const selectGetCart = (state) => {
    return state.cart;
}

export default cartSlice.reducer;
