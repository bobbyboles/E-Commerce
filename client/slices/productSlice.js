const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
import axios from 'axios';


export const getProducts = createAsyncThunk('/', async () => {
    try{
        let {data} = await axios.get(`http://localhost:8080/api/products/`)
        return data
    } catch (err){
        alert('error has occurred, check console')
        console.log('error has occurred, check console', err.message)
    }
})

export const getSingleProduct = createAsyncThunk('product', async (id) => {
    try{
        let {data} = await axios.get(`http://localhost:3000/api/products/${id}`)
        return data
    } catch (err){
        alert('error has occurred, check console')
        console.log('error has occurred, check console', err.message)
    }
})

const initialState = {
    products: [],
    product: {}
}

export const ProductSlice = createSlice({
    name: 'ProductSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProducts.fulfilled,(state, action)=>{
            state.products = action.payload
        })
        builder.addCase(getSingleProduct.fulfilled,(state, action)=>{
            state.product = action.payload
        })
    }
})

export default ProductSlice.reducer