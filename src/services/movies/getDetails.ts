import { data } from 'autoprefixer';
import httpInstance from '../httpinstance';

export const getDetails = async (movieId: string) => {
    const endpoint = `${movieId}?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
    try {
        const response = await httpInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw error;
    }
};