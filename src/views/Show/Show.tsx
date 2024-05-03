import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IMovieResponse } from './types';
import { getDetails, getRecommendations } from '../../services';
import { MovieCard } from '../../components/MovieCard';
import { IMAGE_SOURCE } from '../../constants/moviesMock'
import { Pill } from '../../components/Pill';

const Show: React.FC = () => {
    const { id } = useParams<{ id: any }>();
    const navigate = useNavigate();
    const [movieDetails, setMovieDetails] = useState<IMovieResponse | null>(null);
    const [recommendations, setRecommendations] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [Favorites, setFavorites] = useState<string>('');

    const getColor = (vote: number): "red" | "green" | "yellow" => {
        console.log("Vote average:", vote);
        if (vote < 6) return "red";
        if (vote < 8) return "yellow";
        return "green";
    };

    const addFavorite = () => {
        const favs = Favorites.length > 0 ? JSON.parse(Favorites): [];
        const newFavorites = [...favs, id];
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const removeFavorite = () => {
        const favs = Favorites.length > 0 ? JSON.parse(Favorites): [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

      useEffect(() => {
        const favs = localStorage.getItem('favorites') || '';
        setFavorites(favs);
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        }
        const fetchData = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    const detailsData = await getDetails(id);
                    console.log("Detalles de la película cargados:", detailsData);
                    if (detailsData && detailsData.genres && detailsData.genres.length > 0) {
                        setMovieDetails(detailsData);
                    } else {
                        console.log("No se encontraron géneros para esta película.");
                        setMovieDetails(null);
                    }
    
                    const recommendationsData = await getRecommendations(id);
                    if (recommendationsData && Array.isArray(recommendationsData.results)) {
                    const sortedRecommendations = recommendationsData.results.sort((a: { vote_average: number; }, b: { vote_average: number; }) => b.vote_average - a.vote_average);
                    setRecommendations(sortedRecommendations);
                    } else {
                    setRecommendations([]);
                    }
    
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setMovieDetails(null);
                    setRecommendations([]);
                }
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : movieDetails ? (
                <>
                    <div className="flex flex-col md:flex-row">
                        <div className="pt-4 pl-4 flex-shrink-0 rounded-lg">
                            <img className="rounded-lg" src={IMAGE_SOURCE + movieDetails.poster_path} alt={movieDetails.title} style={{ width: '300px', height: '450px' }} />
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col">
                            <h1 className="pt-4 text-4xl font-bold">{movieDetails.title}</h1>
                            <div className="flex items-center pt-6">
                                <span className="flex items-center pr-7">
                                    <svg className="fill-current text-black w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                                    </svg>
                                    {movieDetails.adult ? "+18" : "-18"}
                                </span>
                                <span className="flex items-center pr-7">
                                    <svg className="fill-current text-black w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                                        <path d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"/>
                                    </svg>
                                    {movieDetails.release_date.toString()}
                                </span>
                                <span className="flex items-center pr-7">
                                    <svg className="fill-current text-black w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"/>
                                    </svg>
                                    {movieDetails.vote_average.toString()}
                                </span>
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="fill-current text-black w-6 h-6 mr-2">
                                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                                    </svg>

                                    {movieDetails.vote_count.toString()}
                                </span>
                            </div>
                            <p className="text-black-700 py-6 pr-10 text-justify">{movieDetails.overview}</p>
                            <div className="flex justify-self-auto items-start">
                                <div>
                                    <h2 className="text-xl text-gray-800 font-semibold mb-3 uppercase">Genres</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {
                                            movieDetails && movieDetails.genres && movieDetails.genres.length > 0 ? (
                                                movieDetails.genres.map(genre => (
                                                    <Pill key={genre.id} title={genre.name} color={getColor(movieDetails.vote_average)} />
                                                ))
                                            ) : (
                                                <p>No genre data available.</p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl text-gray-800 font-semibold ml-28 mb-3 uppercase">Favorite</h2>
                                    {isFavorite ? (
                                        <div>
                                            <button onClick={removeFavorite} className='flex items-center justify-center font-semibold bg-sky-600 p-2 rounded-lg ml-28 mb-3 space-x-2 hover:opacity-40'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                </svg>
                                                <span className='text-white'>Add to Favorites</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button onClick={addFavorite} className='flex items-center justify-center font-semibold bg-red-600 p-2 rounded-lg ml-28 mb-3 space-x-2 hover:opacity-40'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                </svg>
                                                <span className='text-white'>Remove from Favorites</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl text-gray-800 font-semibold mt-5 text-left ml-7 uppercase">Recommended Movies Similar to This One</h2>
                        <header className="flex overflow-x-auto p-4 space-x-4">
                            {recommendations.map((movie) => (
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
                </>
            ) : (
                <div>Movie not found</div>
            )}
        </div>
    );
};

export default Show;