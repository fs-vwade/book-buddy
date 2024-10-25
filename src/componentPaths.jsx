import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Books from "./components/Books";
import Book from "./components/Book";
import Account from "./components/Account";
import BookSelection from "./components/Book";

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
				element: <Books />,
			},
			{
				path: "/books/:id",
				element: <Book />,
			},
			{
				path: "/account",
				element: <Account />,
			},
		],
	},
]);

export default router;
