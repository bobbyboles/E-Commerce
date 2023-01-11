import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const getSingleUser = createAsyncThunk("singleUser", async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  });

const singleUserSlice = createSlice({
    name: "singleUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getSingleUser.fulfilled, (state, action) => {
        return action.payload
      });
    },
});

export const selectSingleUser = (state) => {
    return state.singleUser;
  };
  
  export default singleUserSlice.reducer;