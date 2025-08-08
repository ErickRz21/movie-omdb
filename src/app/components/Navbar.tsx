"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  handleSubmit,
  scrolled,
}: {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  scrolled: boolean;
}) {
  return (
    <nav
      className={`sticky top-0 z-30 m-0 mb-3 items-center justify-between p-4 backdrop-blur-xs transition-all duration-500 ease-in-out lg:mb-10 lg:flex ${
        scrolled
          ? "top-2 mx-3 rounded-2xl bg-neutral-300/50 md:top-5 md:mx-5"
          : "border-transparent bg-neutral-200/80"
      }`}
    >
      <h1 className="mb-2 text-center text-2xl font-bold md:mb-0 md:text-3xl text-black">
        Movie OMDb
      </h1>
      <form
        className="relative mx-auto flex w-full max-w-sm items-center md:max-w-md lg:mx-0 lg:max-w-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full rounded-full bg-neutral-300/80 py-2 pr-12 pl-4 text-base text-black ring-gray-400 backdrop-blur-xs transition outline-none focus:ring sm:text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
        <button
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-2 text-gray-600 hover:text-indigo-500"
          type="submit"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </nav>
  );
}
