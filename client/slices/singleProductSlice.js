import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const getSingleProduct = createAsyncThunk('product', async (id) => {
  try{
      let {data} = await axios.get(`/api/products/${id}`)
      return data
  } catch (err){
      alert('error has occurred, check console')
      console.log('error has occurred, check console', err.message)
  }
})

const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getSingleProduct.fulfilled,(state, action)=>{
        return action.payload
        });
    }
})

export const selectSingleProduct = (state) => {
    return state.singleProduct;
}

export default singleProductSlice.reducer;
