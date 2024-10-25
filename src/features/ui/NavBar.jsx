import bookLogo from "../../assets/books.png";

export default function NavBar() {
	return (
		<header>
			<div className="logo">
				<img src={bookLogo} alt="Book Buddy" />
				<h1>Book Buddy</h1>
			</div>
		</header>
	);
}
