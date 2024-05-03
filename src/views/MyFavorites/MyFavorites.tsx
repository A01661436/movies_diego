import React, { useEffect } from 'react'
import { IMovieDetail } from './types';
import { getDetails } from '../../services';
import { MovieCard } from '../../components/MovieCard';

const MyFavorites = () => {
  const [Loading, setLoading] = React.useState<boolean>(false);
  const [Shows, setShows] = React.useState<IMovieDetail[]>([]);
  const favorites: string = localStorage.getItem('favorites') || ''; 
  
  const runGetFavorites = async () => {
    if (favorites.length) {
      const favoritesArray = JSON.parse(favorites);
      const newShows = await Promise.all(
        favoritesArray.map(async (favorite: string) => {
          return getDetails(String(favorite))
          .then((res) => {
            if (res && res.data) {
              return res.data;
          }
        })
        .catch((err) => {
          console.log(err, "err");        
        });
      })
    )
  }
};

  useEffect(() => {
    runGetFavorites();
  } , []);
  return (
    <div> 
      {!Loading ? (
        <div>
          <h2> Favorites</h2>
          {favorites && favorites.length > 0 ? (
            <div>
              Shows &&
              {Shows.map((show: IMovieDetail) => (
                <MovieCard 
                  key={show.id}
                  title={show.title}
                  genreId={show.genres[0].id}
                  movieId={show.id}
                  voteAverage={show.vote_average}
                  posterPath={show.poster_path}
                />))}
            </div>
          )}
        </div>

      ) : (
        <div>
          <h2>Oops... you don't have any favorites yet.</h2>
        </div>
      )}
    </div>
  )
}

export default MyFavorites