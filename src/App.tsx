import React from 'react';
import { MovieCard } from './components/MovieCard';
import { movies } from './constants/moviesMock';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

const App = () => {
  return <RouterProvider router={router} />
}

export default App;
