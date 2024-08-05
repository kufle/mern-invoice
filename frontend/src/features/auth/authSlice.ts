import { createSlice } from "@reduxjs/toolkit";

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const initialState = {
  user: user
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice;
