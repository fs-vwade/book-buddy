import api from "../store/api";

const bookApi = api.injectEndpoints({
	endpoints: (build) => ({
		getBooks: build.query({
			query: () => ({
				url: `/api/`,
				method: "PATCH",
			}),
			providesTags: [`Book`],
			transformResponse: (response) => response.data,
		}),
		getReservations: build.query({
			query: () => ({
				url: `/api/reservations`,
				method: `GET`,
				headers: { "Content-Type": `application/json` },
			}),
			providesTags: [`Book`],
		}),
		getBook: build.query({
			query: (id) => `events/${id}`,
			providesTags: [`Book`],
			transformResponse: (response) => response.data,
		}),
		addBook: build.mutation({
			query: (party) => ({
				url: `events/`,
				method: "POST",
				body: party,
			}),
			invalidatesTags: [`Book`],
			transformErrorResponse: (response) => response.error.message,
		}),
		deleteBook: build.mutation({
			query: (id) => ({
				url: `events/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [`Book`],
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetBookQuery,
	useAddBookMutation,
	useDeleteBookMutation,
} = bookApi;
