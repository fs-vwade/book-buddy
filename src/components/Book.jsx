// components/BookList/BookItem.jsx (or a separate component like BookDetail.jsx)

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	useGetBookQuery,
	useReserveBookMutation,
	useDeleteReservationMutation,
} from "../features/bookSlice";

import "./Book.css";

export default function Book() {
	// I have a new conundrum. To use the same component that renders books in all places that render books, or to keep each component separate. I'd prefer to not rewrite the same thing.
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

	//const { isAuthenticated, token } = useSelector((state) => state.auth);

	if (isLoading) return <p>Loading book selection...</p>;
	if (error) return <p>Could not load book. Reason: {error.message}</p>;

	function makeReservation() {
		createReservation(id);
	}

	return (
		<article className="book">
			{/*Flex col/down*/}
			<div className="details">
				{/*Flex row/right*/}
				{/**
				 * We only need to display 4 items.
				 * - The title
				 * - Author
				 * - Description
				 * - Cover image
				 */}
				<div>
					<h2 className="title">{book.title}</h2>
					<p className="author">{book.author}</p>
					<p className="description">{book.description}</p>
					<b className={book.available ? "available" : "unavailable"}>
						{(book.available && "Available") || "Unavailable"}
					</b>
					{/*{isAuthenticated ?? (<button className="reserve" onSubmit={makeReservation}>Reserve Book</button>)}*/}
				</div>
				<div className="cover">
					<img
						className="book-img"
						src={book.coverimage}
						alt={`${book.title} by ${book.author}`}
					/>
				</div>
			</div>
		</article>
	);
}
