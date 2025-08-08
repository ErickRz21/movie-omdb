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

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <h2 className="mb-2 text-xl font-semibold">Search Results</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {loading ? (
              <div className="h-64 animate-pulse rounded-xl bg-neutral-200"></div>
            ) : (
              results
                .filter(
                  (movie, idx, self) =>
                    idx === self.findIndex((m) => m.imdbID === movie.imdbID),
                )
                .map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `/api/details?id=${movie.imdbID}`,
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

        <aside className="rounded-2xl bg-neutral-100 p-4 text-base shadow-md">
          <MovieDetailsComponent selectedMovie={selectedMovie} />
        </aside>
      </section>

      <footer className="border-t border-gray-300 py-8 text-center text-sm text-gray-500">
        © 2025 Salem’s OMDb App | Built with ❤️ using Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
