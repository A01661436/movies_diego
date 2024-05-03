import { RouteObject, createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import { ROUTES } from "./constants";
import { Home, Popular, MyFavorites, TopRated, NowPlaying, Show } from "../views";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <PrivateRouter />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.POPULAR,
        element: <Popular />,
      },
      {
        path: ROUTES.MY_FAVORITES,
        element: <MyFavorites />,
      },
      {
        path: ROUTES.TOP_RATED,
        element: <TopRated />,
      },
      {
        path: ROUTES.NOW_PLAYING,
        element: <NowPlaying />,
      },
      {
        path: `${ROUTES.SHOW}:id`,
        element: <Show />,
      },

    ],
  }
];

export const router = createBrowserRouter(routes);

