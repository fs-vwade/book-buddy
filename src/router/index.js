import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Books from "../components/Books";

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
		],
	},
]);

export default router;
