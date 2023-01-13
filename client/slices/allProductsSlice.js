import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { current } from "@reduxjs/toolkit";

const initialState = [];

export const fetchProductsAsync = createAsyncThunk("allProducts", async () => {
        try {
            const { data } = await axios.get("/api/products") 
            return data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const addProductAsync = createAsyncThunk("allProducts/addProduct", async (addProduct) => {
    try {
      const { data } = await axios.post('/api/products', addProduct);
      return data;
    } catch (err) {
      console.log(err);
    }
  });

const allProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        sortZA(state, action) {
            state = state.sort((a, b) => a.productName.toLowerCase() < b.productName.toLowerCase()? 1 : -1
            );
        },
        sortAZ(state, action) {
            state = state.sort((a, b) => a.productName.toLowerCase() < b.productName.toLowerCase()? -1 : 1
            );
        },
        sortByPriceLowHigh(state, action) {
            state = state.sort((a, b) => a.price - b.price
            );
        },
        sortByPriceHighLow(state, action) {
            console.log('High Low Fired')
            state = state.sort((a, b) => b.price - a.price
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            state.push(action.payload);
          });
    },
});

export const { sortZA, sortAZ, sortByPriceLowHigh, sortByPriceHighLow  } = allProductsSlice.actions;

export const selectProducts = (state) => {
    return state.products;
};

export default allProductsSlice.reducer;
