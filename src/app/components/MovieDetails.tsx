import { MovieDetails } from "../types/movie";

export default function MovieDetailsComponent({
  selectedMovie,
}: {
  selectedMovie: MovieDetails | null;
}) {
  if (!selectedMovie)
    return (
      <p className="text-sm text-gray-600">
        Select a movie to see details here.
      </p>
    );

  return (
    <>
      <h2 className="text-lg font-semibold mb-1">{selectedMovie.Title}</h2>
      <p className="text-gray-600 mb-2 capitalize">
        {selectedMovie.Year} • {selectedMovie.Runtime} • {selectedMovie.Genre}
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
        className="rounded-xl w-full max-h-[500px] object-fit"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
        }}
      />
      <p className="text-black my-2">{selectedMovie.Plot}</p>
      <p className="text-info">
        🎬 Directed by:{" "}
        <span className="text-black">{selectedMovie.Director}</span>
      </p>
      <p className="text-info">
        🎭 Cast: <span className="text-black">{selectedMovie.Actors}</span>
      </p>
      <p className="text-info">
        ⭐ IMDb Rating:{" "}
        <span className="text-yellow-600">{selectedMovie.imdbRating}</span>
      </p>
      <p className="text-info">
        🍅 Rotten Tomatoes:{" "}
        <span className="text-red-600">
          {
            (selectedMovie as any).Ratings?.find(
              (r: any) => r.Source === "Rotten Tomatoes"
            )?.Value || "N/A"
          }
        </span>
      </p>
      <p className="text-info">
        Rated: <span className="text-gray-700">{selectedMovie.Rated}</span>
      </p>
    </>
  );
}
