import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../features/bookSlice";
import {
	useGetBookQuery,
	useReserveBookMutation,
	useDeleteReservationMutation,
} from "../features/bookSlice";

import "./Books.css";

/**	I've opted for fewer files during core development ->
 **
 **	we will implement the local components here
 **	- to avoid creating unnecessary files/includes
 **/

export default function Books() {
	const { data: books, isLoading, error } = useGetBooksQuery();
	const nav = useNavigate();

	if (isLoading) return <p>Loading books...</p>;
	if (error) return <p>Could not load books. Reason: {error.message}</p>;

	function userSelect(id) {
		nav(`/books/${id}`);
	}

	return (
		<books className="book-list">
			<h1>Book Library</h1>
			{books.map((book, idx) => (
				<div className="book" key={book.id}>
					{/*Flex col/down*/}
					<div
						className={`preview ${idx % 2 ? "odd" : "even"}`}
						onClick={() => userSelect(book.id)}
					>
						<div
							className={`cover left`}
							style={{ backgroundImage: `url(${book.coverimage})` }}
							alt={`${book.title} by ${book.author}`}
						/>
						<div className="right">
							<h2 className="title">{book.title}</h2>
							<p className="author">{book.author}</p>
							<p className="description">{book.description}</p>
							<b className={book.available ? "available" : "unavailable"}>
								{(book.available && "Available") || "Unavailable"}
							</b>
						</div>
					</div>
				</div>
			))}
		</books>
	);
}
