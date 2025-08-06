"use client";

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  type Movie = {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
  };

  const [results, setResults] = useState<Movie[]>([]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const res = await fetch(`/api/search?query=${searchTerm}`);
    const data = await res.json();

    if (data?.Search) {
      setResults(data.Search);
    } else {
      setResults([]);
    }
  };

  return (
    <main className="min-h-screen text-gray-900">
      {/* Navbar */}
      <nav className="top-3 sticky flex items-center justify-between m-2 p-6 border-gray-300 bg-white/60 backdrop-blur-xs rounded-2xl">
        <h1 className="text-3xl font-bold">🎬 Movie OMDb</h1>
        <form className="relative flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-neutral-200 text-black rounded-full py-2 pr-10 pl-4 outline-none focus:ring-2 ring-blue-400"
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
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-16">
        {/* Search Results */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.length > 0 ? (
              results.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <Image
                    src={
                      movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"
                    }
                    alt={movie.Title}
                    width={300}
                    height={450}
                    className="rounded mb-2 w-full h-48 object-cover"
                  />
                  <h3 className="font-bold text-lg">{movie.Title}</h3>
                  <p className="text-sm text-gray-600">
                    {movie.Year} • {movie.Type}
                  </p>
                  <button className="mt-2 text-blue-500 hover:underline text-sm">
                    More Info
                  </button>
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
        <aside className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Movie Details</h2>
          <p className="text-sm text-gray-600">
            Select a movie to see details here.
          </p>
        </aside>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-300">
        © 2025 Salem’s OMDb App | Built with ❤️ using Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
