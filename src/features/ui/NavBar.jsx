import bookLogo from "../../assets/books.png";

export default function NavBar() {
	return (
		<header>
			<div className="logo">
				<h1>Book Buddy</h1>
				<img src={bookLogo} alt="Book Buddy" />
			</div>
		</header>
	);
}
