
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];
export const getMyOrders = createAsyncThunk("myOrders", async (userId) => {
    try {
        let { data } = await axios.get(
            `http://localhost:8080/api/cart/myOrders`,
            { headers: { authid: userId } }
        );
        console.log("this is the thunk for myCart", data);
        return data;
    } catch (err) {
        alert("error has occurred, check console");
        console.log("error has occurred, check console", err.message);
    }
});

const orderHistorySlice = createSlice({
    name: "Order History Slice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getMyOrders.fulfilled, (state, action) => {
            return action.payload 
        });
    },
});

export const selectOrderHistory = (state) => {
    return state.orderHistory;
};

export default orderHistorySlice.reducer;
