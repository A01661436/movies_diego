import React from 'react'
import { iMovieCard } from './types'
import { IMAGE_SOURCE } from '../../constants/moviesMock'
import genres from '../../constants/genres.json'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/constants'
import { Pill } from '../Pill'

const MovieCard: React.FC<iMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath,
    
}) => {
    const navigate = useNavigate(); //Hooks
    //useState
    const poster = IMAGE_SOURCE + posterPath; //Constants

    //Funciones
    const getGenre = (genreId: number): string =>{
        const key = Object.values(genres.genres).find(genre => genre.id == genreId);
        if(key){
            return key.name;
        }
        return "Not classified";        
    };

    const getColor = (vote: number): "red" | "green" | "yellow" => {
      if (vote < 6) return "red";
      if (vote < 8) return "yellow";
      return "green";
    };

    const navigateMovies = (id: number, movieName: string) => {
      navigate(`${ROUTES.SHOW}${id}`, { state: { movie: movieName }});
    };

    //useEffects

    return (
      <div 
        className='' onClick={() => {
          navigateMovies(movieId, title);
        }}
      >
        <div className="min-w-[300px] max-w-[300px] flex-shrink-0">
          <div className="mx-auto overflow-hidden bg-gray-800 rounded-lg shadow-lg relative">
            <img src={poster} alt={`Poster of ${title}`} className="w-full h-[450px] object-cover transform transition duration-500 ease-in-out hover:scale-110 hover:opacity-40" />
            <div className="absolute bottom-0 left-0 w-full p-0 bg-custom-gradient">
              <div className='p-4 py-3.5 w-full align-middle text-white'>
                <Pill title={getGenre(genreId)} color={getColor(voteAverage)} />
                <p className="text-white text-xl font-bold mb-2">{title}</p>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L0 7.545l6.56-.954L10 1l3.44 5.591 6.56.954-4.245 3.994 1.123 6.545z" />
                  </svg>
                  <span className="ml-1 text-sm">{voteAverage.toFixed(1)} / 10.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
}

export default MovieCard;