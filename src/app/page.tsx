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
        className={`top-0 mb-3 lg:mb-10 sticky grid lg:flex items-center justify-between m-0 p-4 border-[0.04px] backdrop-blur-xs transition-all duration-500 ease-in-out z-30 ${
          scrolled
            ? "bg-white/30 border-gray-200 top-5 m-5 rounded-2xl"
            : "bg-neutral-200/60 border-transparent"
        }`}
      >
        <h1 className="text-xl md:text-3xl font-bold">Movie OMDb</h1>
        <form className="relative flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-neutral-300/60 backdrop-blur-xs text-black rounded-full py-2 pr-24 pl-4 outline-none focus:ring ring-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-indigo-500 cursor-pointer"
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
              <div className="animate-pulse bg-neutral-200 h-64 rounded-xl"></div>
            ) : results.length > 0 ? (
              results.map((movie) => (
                <div
                  key={movie.imdbID}
                  onClick={async () => {
                    try {
                      const res = await fetch(
                        `/api/details?id=${movie.imdbID}`
                      );
                      if (!res.ok)
                        throw new Error("Failed to fetch movie details");

                      const data = await res.json();
                      setSelectedMovie(data);
                    } catch (error) {
                      console.error("Error fetching movie details:", error);
                      alert("Sorry! Couldn't load movie details.");
                    }
                  }}
                  className="bg-neutral-100 p-2 rounded-2xl shadow-md hover:scale-105 duration-300 cursor-pointer"
                >
                  <img
                    src={
                      movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"
                    }
                    alt={movie.Title}
                    width={300}
                    height={450}
                    className="rounded-xl mb-2 w-full h-58 object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/placeholder.jpg";
                    }}
                  />
                  <h3 className="font-bold text-lg">{movie.Title}</h3>
                  <p className="text-sm text-gray-600 capitalize">
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
        <aside className="bg-neutral-100 p-4 rounded-2xl shadow-md text-base">
          {selectedMovie ? (
            <>
              <h2 className="text-lg font-semibold mb-1">
                {selectedMovie.Title}
              </h2>
              <p className="text-gray-600 mb-2 capitalize">
                {selectedMovie.Year} • {selectedMovie.Runtime} •{" "}
                {selectedMovie.Genre}
              </p>
              <img
                src={
                  selectedMovie.Poster !== "N/A"
                    ? selectedMovie.Poster
                    : "/placeholder.jpg"
                }
                alt={selectedMovie.Title}
                width={300}
                height={450}
                className="rounded-xl mb-2 w-full max-h-[500px] object-fit"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/placeholder.jpg";
                }}
              />
              <p className="text-gray-800 mb-2">{selectedMovie.Plot}</p>
              <p className="text-gray-500 mb-1">
                🎬 Directed by:{" "}
                <span className="text-gray-700">{selectedMovie.Director}</span>
              </p>
              <p className="text-gray-500 mb-1">
                🎭 Cast:{" "}
                <span className="text-gray-700">{selectedMovie.Actors}</span>
              </p>
              <p className="text-gray-500">
                ⭐ IMDb Rating:{" "}
                <span className="text-yellow-600">
                  {selectedMovie.imdbRating}
                </span>
              </p>
              {selectedMovie.Type === "movie" && (
                <p className="text-gray-500">
                  🍅 Rotten Tomatoes:{" "}
                  <span className="text-red-600">
                    {
                      // Try to find Rotten Tomatoes rating in Ratings array if present
                      (selectedMovie as any).Ratings?.find(
                        (r: any) => r.Source === "Rotten Tomatoes"
                      )?.Value || "N/A"
                    }
                  </span>
                </p>
              )}
              <p className="text-gray-500">
                Rated:{" "}
                <span className="text-gray-700">{selectedMovie.Rated}</span>
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
      <footer className="text-center text-sm text-gray-500 py-8 border-t border-gray-300">
        © 2025 Salem’s OMDb App | Built with ❤️ using Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
