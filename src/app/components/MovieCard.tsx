import { Movie } from "../types/movie";
import Image from "next/image";

export default function MovieCard({
  movie,
  onClick,
}: {
  movie: Movie;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-neutral-100 p-2 rounded-2xl shadow-md hover:scale-105 duration-300 cursor-pointer"
    >
      <Image
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
        alt={movie.Title}
        width={300}
        height={450}
        className="rounded-xl mb-2 w-full h-58 object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
        }}
        unoptimized={movie.Poster.startsWith("http")} // optionally disable Next optimization for external URLs
        loading="lazy"
      />
      <h3 className="font-bold text-lg">{movie.Title}</h3>
      <p className="text-sm text-gray-600 capitalize">
        {movie.Year} • {movie.Type}
      </p>
    </div>
  );
}
