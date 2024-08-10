import { baseApiSlice } from "../api/baseApiSlice";

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: 'user/all',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        }
      }),
      providesTags: (result) => result 
        ? [
            ...result.users.map(({id}: any) => ({
              type: "User", id
            })), {type: "User", id: "LIST"}
          ]
        : [{tpye: "User", id: "LIST"}]
    }),
    deleteUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "User", id: "LIST" }],
		}),
		deactivateUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}/deactivate`,
				method: "PATCH",
			}),
			invalidatesTags: [{ type: "User", id: "LIST" }],
		}),
  })
});

export const { 
  useGetAllUsersQuery, 
  useDeleteUserMutation, 
  useDeactivateUserMutation 
} = usersApiSlice;
