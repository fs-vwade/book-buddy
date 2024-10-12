import api from "../store/api";

const bookApi = api.injectEndpoints({
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
		getBooks: build.query({
			query: () => ({
				url: `books`,
				method: "GET",
			}),
			providesTags: [`Book`],
		}),
		getBook: build.query({
			query: (id) => `books/${id}`,
			providesTags: [`Book`],
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
	useAddUserMutation,
	useLoginUserMutation,
	useGetBooksQuery,
	useGetBookQuery,
	useReserveBookMutation,
	useGetReservationsQuery,
	useDeleteReservationMutation,
} = bookApi;
