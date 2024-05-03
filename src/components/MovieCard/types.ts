export interface iMovieCard {
    /**
     *  Title of the movie
     */
    title: string;
    /**
     *  Genre ID of the movie
     */
    genreId: number;
    /**
     *  Movie ID of the movie
     */
    movieId: number;
    /**
     *  Vote average of the movie
     */
    voteAverage: number;
    /**
     *  Poster path of the movie
     */
    posterPath: string;
}

export interface iGenre {
    /**
     * ID of the genre
     */
    id: number;
    /**
     * Name of the genre
     */
    name: string;
}