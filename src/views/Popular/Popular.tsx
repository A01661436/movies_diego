import React, { useEffect } from 'react';
import { getPopular } from '../../services';
import { MovieCard } from '../../components/MovieCard';
import { IMovieResponse } from './types';

const Popular: React.FC = () => {
  const [movies, setMovies] = React.useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getPopularMovies = async () => {
    setIsLoading(true);
    await getPopular().then((data) => {
      if (data && data.data) {
        const sortedMovies = data.data.results.sort((a: { vote_average: number; }, b: { vote_average: number; }) => b.vote_average - a.vote_average);
        setMovies(sortedMovies);
      }
    })
    .catch((err) => {
      console.log(err);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div>
        <h2 className="text-3xl text-gray-800 font-semibold mt-5 mx-auto text-center uppercase w-full">Popular Movies</h2>
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <div>Loading...</div>
            </div>
        ) : (
            <div>
                {movies?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-16 py-6 gap-x-8 gap-y-8">
                        {movies.map((movie) => (
                            <MovieCard 
                                key={movie.id}
                                title={movie.title} 
                                genreId={movie.genre_ids[0]}
                                movieId={movie.id}
                                voteAverage={movie.vote_average}
                                posterPath={movie.poster_path}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-700 text-xl">No movies found</div>
                )}
            </div>
        )}
    </div>
);
}

export default Popular;