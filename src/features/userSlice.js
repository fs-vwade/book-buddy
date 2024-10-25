import api from "../store/api";

const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUser: build.query({
			query: () => `users/me`,
			providesTags: [`User`],
		}),
		addUser: build.mutation({
			query: (user) => ({
				url: `users/register`,
				method: `POST`,
				headers: { "Content-Type": `application/json` },
				body: {
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email,
					password: user.password,
				},
			}),
			invalidatesTags: [`User`],
		}),
		loginUser: build.mutation({
			query: (login) => ({
				url: `users/login`,
				method: `POST`,
				headers: { "Content-Type": `application/json` },
				body: {
					email: login.email,
					password: login.password,
				},
			}),
			invalidatesTags: [`User`],
		}),
	}),
});

export const { useGetUserQuery, useAddUserMutation, useLoginUserMutation } =
	userApi;
