import { useSelector } from "react-redux";
import BookListItem from "./BookListItem";
import SearchBar from "./Search";

export default function BooksSection() {
  const books = useSelector((state) => state.book.books);
  return (
    <div className="flex-grow mt-10">
      <SearchBar></SearchBar>
      <hr className="mt-5 bg-black"></hr>
      {books.map((book) => {
        return (
          <BookListItem
            key={book._id}
            name={book.name}
            author={book.author}
            publisher={book.publisher}
            genre={book.genre}
            price={book.price}
          />
        )
      })}
    </div>
  );
}