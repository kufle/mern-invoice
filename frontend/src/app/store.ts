import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "../features/api/baseApiSlice";
import authSlice from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(baseApiSlice.middleware),
    //TODO: change this to false in production,
    devTools: true,
  
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
