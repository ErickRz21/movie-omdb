import Image from "next/image";

export default function Home() {
  return (
    <main>
      <nav className="mb-8 flex items-center justify-between w-full mx-auto p-6 border-b border-gray-300">
        <h1 className="text-4xl font-bold text-center">Movie OMDB</h1>
        <div className="space-x-3 flex items-center">
          <input type="text" className="bg-neutral-700 rounded-full py-2 px-4" />
          <button className="bg-blue-500 text-white rounded-full py-2 px-4">Search</button>
        </div>
      </nav>
      <p className="text-lg text-center mb-8">
        A simple movie search application using the OMDB API.
      </p>
      <Image
        src="/movie-omdb-logo.png"
        alt="Movie OMDB Logo"
        width={200}
        height={200}
        className="mx-auto mb-8"
      />
    </main>
  );
}
