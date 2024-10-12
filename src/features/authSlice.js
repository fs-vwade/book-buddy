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
		login: build.mutation({
			query: (user) => ({
				url: "/api",
			}),
		}),
		register: build.mutation({}),
	}),
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		// state structure (auth)
		user: null,
		token: null,
		isAuthenticated: false,
		loading: false,
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
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
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isAuthenticated = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
