import { createSlice } from "@reduxjs/toolkit";
import { decodeToken } from 'react-jwt';

interface IStateUser {
  auth: { 
    user: { 
      accessToken?: string; 
    };
    googleToken?: string;
  };
}

const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
const googleToken = localStorage.getItem('googleToken');
const decodedToken = googleToken ? decodeToken(googleToken) : null;

const initialState = {
  user: user ? user : decodedToken,
  googleToken: googleToken ? googleToken : null,
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
      state.googleToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('googleToken');
    }
  },
});

export const {logIn, logOut} = authSlice.actions;

export default authSlice;

export const selectCurrentUserToken = (state: IStateUser) => state.auth.user?.accessToken;

export const selectCurrentUserGoogleToken = (state: IStateUser) => state.auth?.googleToken;