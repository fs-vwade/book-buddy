# Block 30 - Book Buddy

Welcome to Book Buddy! Your task is to build out a functional client for [the Book Buddy API](https://fsa-book-buddy-b6e748d1380d.herokuapp.com/docs/). This API holds a catalog of books, which users can reserve or return once they've logged in.

## Requirements

### All users should be able to:

- See all books in the library's catalog
- View details of an individual book
- Register for a new account
- Log in to an existing account

### Logged in users should be able to:

- Check out an available book
- View their profile page, which includes information such as their name and their email
- See a list of books that they have reserved
- Return a book they have checked out

## API Note

There are two different endpoints to handle reserving and returning a book!

- To check out a book, send `{available:false}` to `PATCH /books/:id`
- To return a book, see `DELETE /reservations/:id`

## Recommended Site Layout

While you are free to organize your project however you'd like to meet the requirements, here is a recommended site layout to follow:

`/`, `/books` - list of all books in catalog

- each book links to its individual page

`/books/:id` - details about the specific book

- if the user is logged in, show a "Reserve" button for the user to check out this book

`/account` - profile page

- if the user is not logged in, show them a link to register or log in
- if the user is logged in, then show their account details such as name and email
- show a list of all reservations the user has made
  - in this list, also include a button for users to return the reserved book

## Submission

**Make a pull request** from your fork into the main branch of this starter repo. The title of your pull request should include your full name. Submit the link to your _pull request_.
