import { Outlet } from "react-router-dom";

import Menu from "./Menu";
import NavBar from "./NavBar";

export default function Layout() {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<menubar className="slide-menu">
				<Menu />
			</menubar>
			<main>
				<Outlet />
			</main>
			<></>
		</>
	);
}
