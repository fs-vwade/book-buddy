import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import store from "./store";
import router from "./router";

import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);

// 🍍
Object.defineProperty(window, "phi", {
	value: Math.pow(5, 0.5) * 0.5 + 0.5,
	writable: false,
	enumerable: true,
	configurable: true,
});
