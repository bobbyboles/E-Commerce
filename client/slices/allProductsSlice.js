import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchProductsAsync = createAsyncThunk("Products/fetchAll", async () => {
    try {
      const { data } = await axios.get('/api/products');
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  export const getSingleProduct = createAsyncThunk('product', async (id) => {
    try{
        let {data} = await axios.get(`http://localhost:8080/api/products/${id}`)
        return data
    } catch (err){
        alert('error has occurred, check console')
        console.log('error has occurred, check console', err.message)
    }
  })

const allProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        return action.payload;
        });
      builder.addCase(getSingleProduct.fulfilled,(state, action)=>{
        return action.payload
        });
    }
})

export const selectProducts = (state) => {
    return state.products;
}

export default allProductsSlice.reducer;