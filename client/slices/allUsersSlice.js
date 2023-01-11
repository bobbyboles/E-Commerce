import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const getAllUsers = createAsyncThunk("allUsers", async () => {
    try {
      const { data } = await axios.get('/api/users');
      return data;
    } catch (err) {
      console.log(err);
    }
  });

const allUsersSlice = createSlice({
name: 'allUsers',
initialState,
reducers: {},
extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        return action.payload;
    });
  }
})

export const selectUsers = (state) => {
    return state.allUsers;
}

export default allUsersSlice.reducer;