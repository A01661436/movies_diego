import React, { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { IMovieDetail } from './types';
import { getDetails } from "../../services";

const Favorite = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [show, setShow] = useState<IMovieDetail[]>([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites') || '[]');
    });

    const runGetFavorite = async () => {
        if (favorites.length > 0) {
            try {
                const newShows = await Promise.all(
                    favorites.map(async (favorite: string) => {
                        try {
                            const res = await getDetails(favorite);
                            return res;
                        } catch (err) {
                            console.error(err, "error fetching movie details");
                            setError("Error fetching movie details");
                            return null;
                        }
                    })
                );
                setShow(newShows.filter(show => show != null));
            } catch (err) {
                console.error(err);
                setError("Failed to fetch favorites");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        runGetFavorite();
    }, [favorites]);

    return (
      <div>
          <h2 className="text-3xl text-gray-800 font-semibold mt-5 mx-auto text-center uppercase w-full">Favorites</h2>
          {!loading ? (
              <div>
                  {show.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-16 py-6 gap-x-8 gap-y-8">
                          {show.map((movie: IMovieDetail) => (
                              <MovieCard 
                                  key={movie.id}
                                  movieId={movie.id}
                                  title={movie.title} 
                                  genreId={movie.genres[0].id}
                                  voteAverage={movie.vote_average}
                                  posterPath={movie.poster_path}
                              />
                          ))}
                      </div>
                  ) : (
                      <div className="text-center text-gray-700 text-xl">No favorites found</div>
                  )}
              </div>
          ) : (
              <div className="flex justify-center items-center h-64">
                  <div>Loading...</div>
              </div>
          )}
      </div>
  );
};

export default Favorite;