import React, {useState, useEffect} from 'react';
import { MovieCard } from '../../components/MovieCard';
import { getPopular, getNowPlaying, getTopRated } from '../../services';
import { IMovieResponse } from '../../views/TopRated/types';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<IMovieResponse[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularData = await getPopular();
        const topRatedData = await getTopRated();
        const nowPlayingData = await getNowPlaying();
        if (popularData.data) {
          setPopularMovies(popularData.data.results
            .filter((movie: { vote_average: number; }) => movie.vote_average > 6.5)
            .sort((a: { vote_average: number; }, b: { vote_average: number; }) => b.vote_average - a.vote_average));
        }
        if (topRatedData.data) {
          setTopRatedMovies(topRatedData.data.results.filter((movie: { vote_average: number; }) => movie.vote_average > 8.5));
        }
        if (nowPlayingData.data) {
          setNowPlayingMovies(nowPlayingData.data.results
            .sort((a: { vote_average: number; }, b: { vote_average: number; }) => b.vote_average - a.vote_average)
            .slice(0, 9));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-gray-800 font-semibold mt-5 text-left ml-7 uppercase">Popular Movies</h2>
      <header className="flex overflow-x-auto p-4 space-x-4">
        {isLoading ? <div>Loading...</div> : popularMovies.map((movie: IMovieResponse) => (
          <MovieCard 
            key={movie.id}
            title={movie.title}
            genreId={movie.genre_ids[0]}
            movieId={movie.id}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
          />
        ))}
      </header>
      <h2 className="text-2xl text-gray-800 font-semibold mt-5 text-left ml-7 uppercase">Top Rated Movies</h2>
      <header className="flex overflow-x-auto p-4 space-x-4">
        {isLoading ? <div>Loading...</div> : topRatedMovies.map((movie: IMovieResponse) => (
          <MovieCard 
            key={movie.id}
            title={movie.title}
            genreId={movie.genre_ids[0]}
            movieId={movie.id}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
          />
        ))}
      </header>
      <h2 className="text-2xl text-gray-800 font-semibold mt-5 text-left ml-7 uppercase">Now Playing</h2>
      <header className="flex overflow-x-auto p-4 space-x-4">
        {isLoading ? <div>Loading...</div> : nowPlayingMovies.map((movie: IMovieResponse) => (
          <MovieCard 
            key={movie.id}
            title={movie.title}
            genreId={movie.genre_ids[0]}
            movieId={movie.id}
            voteAverage={movie.vote_average}
            posterPath={movie.poster_path}
          />
        ))}
      </header>
    </div>
  );
}

export default Home;