import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const getSingleUser = createAsyncThunk("singleUser", async (id) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      //console.log('AXIOS single user info:', data)
      return data;
    } catch (err) {
      console.log(err);
    }
  });

export const editSingleUser = createAsyncThunk("singleUser/edit", async (singleUser) => {
  try {
    const { username, password, firstName, lastName, email, address, phone} = singleUser
    const updatedUser = {username, password, firstName, lastName, email, address, phone}
    const { data } = await axios.put(`/api/users/${id}`, updatedUser);
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
      builder.addCase(editSingleUser.fulfilled, (state, action) => {
        return action.payload;
      });
    },
});

export const selectSingleUser = (state) => {
    return state.singleUser;
  };
  
  export default singleUserSlice.reducer;