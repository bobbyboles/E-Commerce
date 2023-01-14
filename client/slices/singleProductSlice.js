import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const getSingleProduct = createAsyncThunk('singleProduct', async (id) => {
  try{
      const { data } = await axios.get(`/api/products/${id}`)
      //console.log('Single Product Data:',data)
      return data
  } catch (err){
      alert('error has occurred, check console')
      console.log('error has occurred, check console', err.message)
  }
})

export const editSingleProduct = createAsyncThunk("singleProduct/edit", async ({id, productName, category, stockQuantity, description, price, imageUrl}) => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, {productName, category, stockQuantity, description, price, imageUrl});
      return data;
    } catch (err) {
      console.log(err);
    }
});

const singleProductSlice = createSlice({
    name: 'singleProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSingleProduct.fulfilled,(state, action)=>{
            return action.payload
        });
        builder.addCase(editSingleProduct.fulfilled, (state, action) => {
            return action.payload;
        });
    }
})

export const selectSingleProduct = (state) => {
    return state.singleProduct;
}

export default singleProductSlice.reducer;
