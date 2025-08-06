"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
  };

  type MovieDetails = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Type: string;
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // or whatever scroll threshold you want
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${searchTerm}`);
      const data = await res.json();

      setResults(data?.Search || []);
      setSelectedMovie(null); // clear sidebar if new search
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-gray-900 ">
      {/* Navbar */}
      <nav
        className={`top-3 mb-10 sticky flex items-center justify-between m-2 p-4 border-[0.04px] rounded-2xl backdrop-blur-xs transition-colors duration-300 ${
          scrolled
            ? "bg-white/60 border-gray-200"
            : "bg-gray-200/60 border-gray-50"
        }`}
      >
        <h1 className="text-3xl font-bold">🎬 Movie OMDb</h1>
        <form className="relative flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-neutral-200/70 text-black rounded-full py-2 pr-10 pl-4 outline-none focus:ring-2 ring-indigo-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            type="submit"
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </nav>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 pb-16 ">
        {/* Search Results */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <p className="text-sm text-gray-500 italic">Loading...</p>
            ) : results.length > 0 ? (
              results.map((movie) => (
                <div
                  key={movie.imdbID}
                  onClick={async () => {
                    const res = await fetch(`/api/details?id=${movie.imdbID}`);
                    const data = await res.json();
                    setSelectedMovie(data);
                  }}
                  className="bg-neutral-100 p-2 rounded-2xl shadow hover:scale-105 duration-300 cursor-pointer"
                >
                  <Image
                    src={
                      movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"
                    }
                    alt={movie.Title}
                    width={300}
                    height={450}
                    className="rounded-xl mb-2 w-full h-58 object-cover"
                  />
                  <h3 className="font-bold text-lg">{movie.Title}</h3>
                  <p className="text-sm text-gray-600">
                    {movie.Year} • {movie.Type}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">
                No results yet. Try searching for a movie.
              </p>
            )}
          </div>
        </div>

        {/* Movie Details Sidebar */}
        <aside className="bg-neutral-100 p-4 rounded-2xl shadow-md">
          {selectedMovie ? (
            <>
              <h2 className="text-lg font-semibold mb-1">
                {selectedMovie.Title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {selectedMovie.Year} • {selectedMovie.Runtime} •{" "}
                {selectedMovie.Genre}
              </p>
              <Image
                src={
                  selectedMovie.Poster !== "N/A"
                    ? selectedMovie.Poster
                    : "/no-image.png"
                }
                alt={selectedMovie.Title}
                width={250}
                height={350}
                className="rounded-xl mb-2 object-cover w-full"
              />
              <p className="text-sm text-gray-800 mb-2">{selectedMovie.Plot}</p>
              <p className="text-xs text-gray-500 mb-1">
                🎬 Directed by:{" "}
                <span className="text-gray-700">{selectedMovie.Director}</span>
              </p>
              <p className="text-xs text-gray-500 mb-1">
                🎭 Cast:{" "}
                <span className="text-gray-700">{selectedMovie.Actors}</span>
              </p>
              <p className="text-xs text-gray-500">
                ⭐ IMDb Rating:{" "}
                <span className="text-yellow-600">
                  {selectedMovie.imdbRating}
                </span>
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              Select a movie to see details here.
            </p>
          )}
        </aside>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-300">
        © 2025 Salem’s OMDb App | Built with ❤️ using Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
