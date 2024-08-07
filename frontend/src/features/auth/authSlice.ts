import { createSlice } from "@reduxjs/toolkit";

interface IStateUser {
  auth: { 
    user: { 
      accessToken: string; 
    }; 
  };
}

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;

const initialState = {
  user: user
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    }
  },
});

export const {logIn, logOut} = authSlice.actions;

export default authSlice;

export const selectCurrentUserToken = (state: IStateUser) => state.auth.user?.accessToken;