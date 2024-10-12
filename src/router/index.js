import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Books from "../components/Books";
import Account from "../components/Account";

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
				element: <BookSelection id={/* what to do to get id here... */} />,
			},
			{
				path: "/account",
				element: <Account />,
			},
		],
	},
]);

export default router;
