import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COHORT_CODE = "🍍";
const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/`;

const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: encodeURI(API_URL),
	}),
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) headers.set("authorization", `Bearer ${token}`);
		return headers;
	},
	endpoints: () => ({}),
	tagTypes: ["Book"],
});

export default api;
