import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { logIn, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.user?.accessToken;
    const googleToken = (getState() as RootState).auth.googleToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else if (googleToken) {
      headers.set("authorization", `Bearer ${googleToken}`);
    }

    return headers;
  }
});

const baseQueryWithRefreshToken: BaseQueryFn<any, any, any> = async (args, api, extraOptions) => {
  const response = await baseQuery(args, api, extraOptions) as any;

  if (response?.error?.originalStatus === 403) {
    const refreshResponse = await baseQuery(
      '/auth/new_access_token',
      api,
      extraOptions
    );

    if (refreshResponse?.data) {
      api.dispatch(logIn({...refreshResponse.data}));
    } else {
      api.dispatch(logOut());
    }
  }

  return response;
}

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["User", "Customer", "Document"],
  endpoints: (builder) => ({})
})