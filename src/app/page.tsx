import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between w-full mx-auto p-6 border-b border-gray-300 bg-white/90 backdrop-blur-sm">
        <h1 className="text-3xl font-bold">🎬 Movie OMDb</h1>
        <form className="relative flex items-center">
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-neutral-200 text-black rounded-full py-2 pr-10 pl-4 outline-none focus:ring-2 ring-blue-400"
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

      {/* Description */}
      <section className="max-w-4xl mx-auto text-center mt-8 mb-4 px-4">
        <p className="text-lg">
          A simple movie search application using the OMDb API.
        </p>
      </section>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/movie-omdb-logo.png"
          alt="Movie OMDB Logo"
          width={150}
          height={150}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Main Content Layout */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-16">
        {/* Search Results */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          {/* Placeholder for result cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example movie card */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <div className="bg-gray-200 h-48 rounded mb-2" />
              <h3 className="font-bold text-lg">Movie Title</h3>
              <p className="text-sm text-gray-600">2024 • Movie</p>
              <button className="mt-2 text-blue-500 hover:underline text-sm">
                More Info
              </button>
            </div>
            {/* Add more cards dynamically */}
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
