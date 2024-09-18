import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../slices/bookSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchBooks(query));
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-md mx-auto">
      <input
        type="text"
        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
