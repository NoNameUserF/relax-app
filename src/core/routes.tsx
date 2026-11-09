import {IRoute} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {NavHomeIcon, prepareSSGRouter} from "@gsu-ai/gsu-ui-core";

import BooksIcon from "../assets/CustomizeSvg/NavBar/BooksIcon";
import VideoIcon from "../assets/CustomizeSvg/NavBar/VideoIcon";
import GamesIcon from "../assets/CustomizeSvg/NavBar/GamesIcon";
import MoviesIcon from "../assets/CustomizeSvg/NavBar/MoviesIcon";
import BoardGamesIcon from "../assets/CustomizeSvg/NavBar/BoardGamesIcon";
import ActivitiesIcon from "../assets/CustomizeSvg/NavBar/ActivitiesIcon";

import image404 from "/images/error-content/image-404.png";

import App from "../root/App";

import type {RouteRecord} from "vite-react-ssg";

const routes: IRoute[] = [
    {
        path: "/",
        name: "Главная",
        icon: NavHomeIcon,
        importer: () => import("../pages/MainPage"),
    },
    {
        path: "/movies",
        name: "Кино и анимация",
        icon: MoviesIcon,
        importer: () => import("../pages/MoviesPage"),
    },
    {
        path: "/video-games",
        name: "Компьютерные игры",
        icon: GamesIcon,
        importer: () => import("../pages/GamesPage"),
    },
    {
        path: "/board-games",
        name: "Настольные игры",
        icon: BoardGamesIcon,
        importer: () => import("../pages/BoardGamesPage"),
    },
    {
        path: "/videos",
        name: "Видео",
        icon: VideoIcon,
        importer: () => import("../pages/VideosPage"),
    },
    {
        path: "/books",
        name: "Книги",
        icon: BooksIcon,
        importer: () => import("../pages/BooksPage"),
    },
    {
        path: "/activities",
        name: "Активности",
        icon: ActivitiesIcon,
        importer: () => import("../pages/ActivitiesPage"),
    },
];

export const ssgRouter: RouteRecord[] = [
    {
        element: <App />,
        path: "/",
        entry: "src/root/App.tsx",
        children: [...prepareSSGRouter(routes, image404)],
    },
];

export default routes;
