import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { logIn, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1/',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.user?.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  }
});

const baseQueryWithRefreshToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const response = await baseQuery(args, api, extraOptions);

  if (response?.error?.status === 403) {
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