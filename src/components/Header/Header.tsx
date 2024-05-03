import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

const Header = () => {
  const location = useLocation();

  const getNavLinkClass = (path: string) => {
    return location.pathname === path ? 'text-red-500' : 'text-gray-700 hover:text-red-500';
  };

  return (
    <nav className='bg-gray-100'>
      <div className='flex justify-between items-center p-4'>
        <div>
          {/* Nombre de la página que actúa como enlace al Home */}
          <Link to={ROUTES.HOME} className='text-xl text-gray-700 font-bold'>
            DIEGFLIX
          </Link>
        </div>
        <ul className='flex space-x-4'>
          <li>
            <Link to={ROUTES.HOME} className={getNavLinkClass(ROUTES.HOME)}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.POPULAR} className={getNavLinkClass(ROUTES.POPULAR)}>Popular</Link>
          </li>
          <li>
            <Link to={ROUTES.TOP_RATED} className={getNavLinkClass(ROUTES.TOP_RATED)}>Top Rated</Link>
          </li>
          <li>
            <Link to={ROUTES.NOW_PLAYING} className={getNavLinkClass(ROUTES.NOW_PLAYING)}>Now Playing</Link>
          </li>
          <li>
            <Link to={ROUTES.MY_FAVORITES} className={getNavLinkClass(ROUTES.MY_FAVORITES)}>My Favorites</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;