import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Books from "./components/Books";
import Account from "./components/Account";
import BookSelection from "./components/BookList/Book";

// create router tree
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Books />,
			},
			{
				path: "/books",
				element: <BooksList />,
			},
			{
				path: "/books/:id",
				element: <BookSelection />,
			},
			{
				path: "/account",
				element: <Account />,
			},
		],
	},
]);

export default router;
