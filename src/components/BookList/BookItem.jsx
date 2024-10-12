// components/BookList/BookItem.jsx (or a separate component like BookDetail.jsx)
import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../features/bookSlice";

const BookSelection = () => {
	const { id } = useParams();
	const { data: book, error, isLoading } = useGetBookQuery(id);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<h2>{book.title}</h2>
			<p>{book.description}</p>
			<p>Author: {book.author}</p>
			{/* Add more details as required */}
		</div>
	);
};

export default BookSelection;
