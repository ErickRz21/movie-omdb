"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import MovieDetailsComponent from "./components/MovieDetails";
import { Movie, MovieDetails } from "./types/movie";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${searchTerm}`);
      const data = await res.json();
      setResults(data?.Search || []);
      setSelectedMovie(null);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen text-gray-900">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
        scrolled={scrolled}
      />

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 pb-16">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <div className="animate-pulse bg-neutral-200 h-64 rounded-xl"></div>
            ) : (
              results
                .filter(
                  (movie, idx, self) =>
                    idx === self.findIndex((m) => m.imdbID === movie.imdbID)
                )
                .map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `/api/details?id=${movie.imdbID}`
                        );
                        if (!res.ok) throw new Error("Failed to fetch");
                        const data = await res.json();
                        setSelectedMovie(data);
                      } catch (err) {
                        console.error("Fetch error:", err);
                      }
                    }}
                  />
                ))
            )}
          </div>
        </div>

        <aside className="bg-neutral-100 p-4 rounded-2xl shadow-md text-base">
          <MovieDetailsComponent selectedMovie={selectedMovie} />
        </aside>
      </section>

      <footer className="text-center text-sm text-gray-500 py-8 border-t border-gray-300">
        © 2025 Salem’s OMDb App | Built with ❤️ using Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
