"use client";
import { useState, useCallback, memo, useEffect } from 'react';
import debounce from 'lodash/debounce';

const SearchBar = memo(function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Create memoized debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term.trim());
      setIsSearching(false);
    }, 400),
    [onSearch]
  );

  // Handle search input change
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(Boolean(value));
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Handle search submit
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  }, [searchTerm, onSearch]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[1200px] mx-auto px-4 mt-8">
      <div className="relative flex items-center">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for item by title..."
          className="w-full px-6 h-12 text-base rounded-full border border-gray-300
            focus:outline-none focus:border-red-200
            placeholder:text-gray-500
            shadow-[0_0_10px_-3px_rgba(239,68,68,0.2)]
            focus:shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]"
        />
        <button
          type="submit"
          className="absolute right-4 w-10 h-10 flex items-center justify-center 
            bg-red-600 rounded-full hover:bg-red-700 transition-colors
            shadow-[0_0_10px_-2px_rgba(239,68,68,0.3)]
            hover:shadow-[0_0_12px_-2px_rgba(239,68,68,0.4)]"
          aria-label="Search"
        >
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar; 