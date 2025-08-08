"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import MovieDetailsComponent from "./components/MovieDetails";
import { Movie, MovieDetails } from "./types/movie";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // Tailwind's md breakpoint

    if (showModal && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

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

  // Open modal on mobile when movie is selected
  React.useEffect(() => {
    if (selectedMovie) setShowModal(true);
  }, [selectedMovie]);

  return (
    <main className="min-h-screen text-gray-900">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
        scrolled={scrolled}
      />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-3 pb-16 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <h2 className="mb-2 text-xl font-semibold">Search Results</h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
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

        <aside className="hidden rounded-2xl bg-neutral-100 p-3 text-base shadow-md md:block">
          <MovieDetailsComponent selectedMovie={selectedMovie} />
        </aside>

        {/* Mobile modal */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center md:hidden"
            onClick={() => setShowModal(false)} // Close on background click
          >
            <div
              className="relative h-full max-h-screen w-full rounded-t-3xl bg-white/80 p-4 shadow-lg backdrop-blur-md"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-3 text-gray-500 hover:text-black"
              >
                <FontAwesomeIcon icon={faXmarkCircle} className="text-3xl" />
              </button>
              <MovieDetailsComponent selectedMovie={selectedMovie} />
            </div>
          </div>
        )}
      </section>

      <footer className="border-t border-gray-300 py-8 text-center text-sm text-gray-500">
        © 2025 Salem’s OMDb App | Built with ❤️ using Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
