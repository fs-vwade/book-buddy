import { Outlet } from "react-router-dom";

import Menu from "./features/ui/Menu";
import NavBar from "./features/ui/NavBar";

export default function App() {
	const tree =
	return (
		<>
			<header>
				<NavBar />
			</header>
			<menu className="slide-menu">
				<Menu />
			</menu>
			<main>
				<Outlet />
			</main>
			<footer></footer>
			<></>
		</>
	);
}
