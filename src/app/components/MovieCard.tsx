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
      className="cursor-pointer rounded-2xl bg-neutral-100 p-2 shadow-md duration-300 hover:scale-105"
    >
      <Image
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
        alt={movie.Title}
        width={300}
        height={450}
        className="mb-2 h-58 w-full rounded-xl object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
        }}
        unoptimized={movie.Poster.startsWith("http")} // optionally disable Next optimization for external URLs
        loading="lazy"
      />
      <h3 className="text-lg font-bold">{movie.Title}</h3>
      <p className="text-sm text-gray-600 capitalize">
        {movie.Year} • {movie.Type}
      </p>
    </div>
  );
}
