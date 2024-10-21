// components/BookList/BookItem.jsx (or a separate component like BookDetail.jsx)
import React from "react";
import { useParams } from "react-router-dom";
import {
	useGetBookQuery,
	useDeleteReservationMutation,
} from "../../features/bookSlice";

const Book = () => {
	const { id } = useParams();
	const { data: book, error, isLoading } = useGetBookQuery(id);
	const [deleteReservation] = useDeleteReservationMutation();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<h2>{book.title}</h2>
			<p>{book.description}</p>
			<p>Author: {book.author}</p>
		</div>
	);
};

export default Book;
