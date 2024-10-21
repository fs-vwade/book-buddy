import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useGetBooksQuery } from "../features/bookSlice";
import {
	useGetBookQuery,
	useReserveBookMutation,
	useDeleteReservationMutation,
} from "../../features/bookSlice";

/**	I've opted for fewer files during core development ->
 **
 **	we will implement the local components here
 **	- to avoid creating unnecessary files/includes
 **/
function Book() {
	/**
	 * The requirements indicate that a book can be selected.
	 * The intended path for this would be "/books/:id"
	 * If the user is logged in, a button labeled "Reserve" appears.
	 * When clicked, this button sends the reservation request to the API.
	 * If the book is reserved, the button appears but is greyed-out and unclickable.
	 * I need to figure out how to appropriately setup and use a session token for when a user registers or logs in.
	 * To register, the api call is "users/register" and for login is "users/login"
	 * The return value on success is a JS object as follows:
	 * {
	 * 	message: "a message string",
	 * 	token: "the token string"
	 * }
	 * At this point, putting everything together becomes a blur
	 */
	const { id } = useParams();
	const { data: book, isLoading, error } = useGetBookQuery(id);
	const [createReservation] = useReserveBookMutation();
	const [deleteReservation] = useDeleteReservationMutation();

	const { isAuthenticated, token } = useSelector((state) => state.auth);

	if (isLoading) return <p>Loading book selection...</p>;
	if (error) return <p>Could not load book. Reason: {error.message}</p>;

	function makeReservation() {
		createReservation(id);
	}

	return (
		<div className="book-detail">
			<div>
				<h2>{book.title}</h2>
				<div className="book-img">
					<img src={book.coverimage} alt={`${book.title} by ${book.author}`} />
				</div>
			</div>
			<p>{book.description}</p>
			<p>Author: {book.author}</p>
			{isAuthenticated ?? (
				<button className="reserve-book" onSubmit={makeReservation}>
					Reserve Book
				</button>
			)}
		</div>
	);
}

export default function Books() {
	const { data: books, isLoading, error } = useGetBooksQuery();

	if (isLoading)
		return (
			<loading>
				<p>Loading books...</p>
			</loading>
		);
	if (error)
		return (
			<error>
				<p>Could not load books. Reason: {error.message}</p>
			</error>
		);

	return (
		<books className="book-list">
			<h1>Book Library</h1>
			{books.map((book, idx) => {
				return (
					<div className="book-list-book" key={idx}>
						<top className="book-top">
							<left className="book-left">
								<h2>Title: {book.title}</h2>
								<p>by {book.author}</p>
							</left>
							<right className="book-right">
								<img
									src={book.coverimage}
									alt={`${book.title} by ${book.author}`}
								/>
							</right>
						</top>
						<bottom className="book-bottom">
							<p>
								Description <div>{book.description}</div>
							</p>
						</bottom>
					</div>
				);
			})}
		</books>
	);
}
