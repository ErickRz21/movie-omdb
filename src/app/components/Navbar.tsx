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
      className={`top-0 mb-3 lg:mb-10 sticky lg:flex items-center justify-between m-0 p-4 border-[0.04px] backdrop-blur-xs transition-all duration-500 ease-in-out z-30 ${
        scrolled
          ? "bg-white/40 border-gray-200 top-2 md:top-5 mx-4 md:mx-5 rounded-2xl"
          : "bg-neutral-200/60 border-transparent"
      }`}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 md:mb-0">
        Movie OMDb
      </h1>
      <form
        className="relative flex items-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:mx-0"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search movies..."
          className="bg-neutral-300/80 backdrop-blur-xs text-black rounded-full py-2 pr-12 pl-4 outline-none focus:ring ring-gray-400 w-full text-base sm:text-lg transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-indigo-500 cursor-pointer p-2"
          type="submit"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </nav>
  );
}
