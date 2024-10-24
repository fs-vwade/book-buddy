import { configureStore } from "@reduxjs/toolkit";

import api from "./api";

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		// produces an array of middleware from the api
		getDefaultMiddleware().concat(api.middleware),
});

export default store;
