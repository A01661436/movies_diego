import { data } from 'autoprefixer';
import httpInstance from '../httpinstance';

export const getRecommendations = async (movieId: string) => {
    try {
        const endpoint = `${movieId}/similar?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
        const response = await httpInstance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return null;
    }
}