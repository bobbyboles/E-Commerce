import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const getAllUsers = createAsyncThunk("allUsers", async () => {
    try {
        const token = window.localStorage.getItem("token");
        console.log('This is the token from the slice', token);
        if (token) {
            const { data } = await axios.get("/api/users", {
                headers: { authorization: token },
            });
            return data;
        }
    } catch (err) {
        console.log(err);
    }
});

export const addUserAsync = createAsyncThunk("allUsers/addUser", async (addUser) => {
  try {
    const { data } = await axios.post('/api/users', addUser);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const allUsersSlice = createSlice({

name:  'allUsers',
initialState,
reducers: {},
extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        return action.payload;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      return action.payload;
  });
  }
})

export const selectUsers = (state) => {
    return state.allUsers;
};

export default allUsersSlice.reducer;
