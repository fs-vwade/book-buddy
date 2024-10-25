import api from "../store/api";

const bookApi = api.injectEndpoints({
	endpoints: (build) => ({
		getBooks: build.query({
			query: () => ({
				url: `books`,
				method: "GET",
			}),
			providesTags: [`Book`],
			transformResponse: (response) => response.books,
		}),
		getBook: build.query({
			query: (id) => `books/${id}`,
			providesTags: [`Book`],
			transformResponse: (response) => response.book,
		}),
		getReservations: build.query({
			query: () => `reservations`,
			providesTags: [`Book`],
		}),
		reserveBook: build.mutation({
			query: (id) => ({
				url: `reservations/${id}`,
				headers: { "Content-Type": `application/json` },
				body: { available: false },
			}),
			invalidatesTags: [`Book`],
		}),
		deleteReservation: build.mutation({
			query: (id) => ({
				url: `reservations/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [`Book`],
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetBookQuery,
	useReserveBookMutation,
	useGetReservationsQuery,
	useDeleteReservationMutation,
} = bookApi;
