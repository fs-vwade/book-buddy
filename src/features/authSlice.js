import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../store/api";

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await api.fetchBaseQuery({
				baseUrl: api.reducerPath,
			})({
				url: "/api/users/login",
				method: "POST",
				body: JSON.stringify({
					email: credentials.email,
					password: credentials.password,
				}),
			});

			if (response.error) {
				throw new Error(response.error.message);
			}

			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		register: build.mutation({
			query: (signup) => ({
				url: `users/register`,
				method: `POST`,
				headers: { "Content-Type": "application/json" },
				body: {
					firstname: signup.firstname,
					lastname: signup.lastname,
					email: signup.email,
					password: signup.password,
				},
			}),
			invalidatesTags: [`User`],
		}),
		login: build.mutation({
			query: (login) => ({
				url: "users/login",
				method: `POST`,
				headers: { "Content-Type": "application/json" },
				body: {
					email: login.email,
					password: login.password,
				},
			}),
			invalidatesTags: [`User`],
		}),
	}),
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		// state structure (auth)
		user: JSON.parse(localStorage.getItem("user")) || null,
		token: JSON.parse(localStorage.getItem("token")) || null,
		isAuthenticated: false,
		loading: false,
		error: null,
	},
	reducers: {
		setCredentials: (state, action) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
			state.isAuthenticated = !!token;

			if (state.isAuthenticated) {
				localStorage.setItem("user", user);
				localStorage.setItem("token", token);
				localStorage.setItem("isAuth", true);
			}
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;

			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.removeItem("isAuth");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				authSlice.caseReducers.setCredentials(state, action);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setCredentials, logout } = authSlice.actions;
export const { useLoginMutation, useRegisterMutation } = authApi;
export default authSlice.reducer;
