import {IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import ReactGA from "react-ga4";

import {fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import MoviesBasicInfo, {MoviesBasicInfoState} from "../../wizards/MoviesStep/MoviesBasicInfo";
import {APPLICATION_HOST} from "../../constants/api";
import MoviesCardList, {MoviesList} from "../../wizards/MoviesStep/MoviesCardList";
import MovieDetails, {MovieDetailsState} from "../../wizards/MoviesStep/MovieDetails";

const watchLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Анализирую параметры",
        time: 5000,
    },
    {
        title: "Подбираю медиа",
        time: 5000,
    },
    {
        title: "Формирую списки",
        time: 6000,
    },
];

const getWatchDetailsLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Подготавливаю информацию",
        time: 5000,
    },
];

const MOVIES_BASIC_INFO: IWorkflowStep<MoviesBasicInfoState> = {
    uid: "MOVIESBASICINFO",
    name: "ЧТО ПОСМОТРЕТЬ",
    initState: () => {
        return {
            userAge: getDataFromStorage("userAge") || "ADULT",
            adultsGenres: getDataFromStorage("moviesGenre") || ["ANY"],
            adultsContentTypes: getDataFromStorage("moviesadultsContentTypes") || ["ANY"],
            adultsMoods: getDataFromStorage("moviesMood") || ["ANY"],
            adultsRegions: getDataFromStorage("moviesCountry") || ["ANY"],
            adultsReleaseTimes: getDataFromStorage("moviesNovelty") || ["ANY"],
            kidsAge: getDataFromStorage("moviesKidsAge") || 1,
            kidsContentTypes: getDataFromStorage("moviesKidsContentTypes") || ["ANY"],
            kidsDurations: getDataFromStorage("moviesKidsDurations") || ["ANY"],
            kidsGenres: getDataFromStorage("moviesKidsGenres") || ["ANY"],
            kidsMoods: getDataFromStorage("moviesKidsMoods") || ["ANY"],
            kidsRegions: getDataFromStorage("moviesKidsRegions") || ["ANY"],
            kidsReleaseTimes: getDataFromStorage("moviesKidsReleaseTimes") || ["ANY"],
            kidsSubgenres: getDataFromStorage("moviesKidsSubgenres") || ["ANY"],
        };
    },
    cleanState: () => {
        return {
            userAge: "ADULT",
            adultsGenres: ["ANY"],
            adultsContentTypes: ["ANY"],
            adultsMoods: ["ANY"],
            adultsRegions: ["ANY"],
            adultsReleaseTimes: ["ANY"],
            kidsAge: 1,
            kidsContentTypes: ["ANY"],
            kidsDurations: ["ANY"],
            kidsGenres: ["ANY"],
            kidsMoods: ["ANY"],
            kidsRegions: ["ANY"],
            kidsReleaseTimes: ["ANY"],
            kidsSubgenres: ["ANY"],
        };
    },
    storageDependencies: [
        "userAge",
        "moviesGenre",
        "moviesadultsContentTypes",
        "moviesMood",
        "moviesCountry",
        "moviesNovelty",
        "moviesKidsAge",
        "moviesKidsContentTypes",
        "moviesKidsDurations",
        "moviesKidsGenres",
        "moviesKidsMoods",
        "moviesKidsRegions",
        "moviesKidsReleaseTimes",
        "moviesKidsSubgenres",
    ],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: () => {
        return MoviesBasicInfo;
    },
    fetch: (componentState) => {
        const userAge = componentState.userAge;
        if (userAge === "ADULT") {
            const movie = {
                adultsContentTypes: componentState.adultsContentTypes,
                adultsGenres: componentState.adultsGenres,
                adultsMoods: componentState.adultsMoods,
                adultsRegions: componentState.adultsRegions,
                adultsReleaseTimes: componentState.adultsReleaseTimes,
                refresh: true,
            };

            ReactGA.gtag("event", "fetchMovies", movie);
            return fetchPost(APPLICATION_HOST, "/getWatchAdults", movie);
        } else {
            const movie = {
                kidsAge: componentState.kidsAge,
                kidsContentTypes: componentState.kidsContentTypes,
                kidsDurations: componentState.kidsDurations,
                kidsGenres: componentState.kidsGenres,
                kidsMoods: componentState.kidsMoods,
                kidsRegions: componentState.kidsRegions,
                kidsReleaseTimes: componentState.kidsReleaseTimes,
                kidsSubgenres: componentState.kidsSubgenres,
                refresh: true,
            };
            ReactGA.gtag("event", "fetchMovies", movie);
            return fetchPost(APPLICATION_HOST, "/getWatchKids", movie);
        }
    },

    loaderSteps: watchLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            moviesList: fetchResponse,
        };
    },
    clearable: true,
    // isNextDisabled: (componentState, wizardState) => {
    // 	const userAge = componentState.userAge
    // 	if (userAge === "ADULT") {
    // 		const allAny = ["adultsGenres", "adultsContentTypes", "adultsMoods", "adultsRegions", "adultsReleaseTimes"]
    // 		.every((key) => (componentState as any)[key]?.includes("ANY"));
    // 		return allAny;
    // 	} else {
    // 		const allAny = ["kidsContentTypes", "kidsDurations", "kidsGenres", "kidsMoods", "kidsRegions", "kidsReleaseTimes", "kidsSubgenres"]
    // 		.every((key) => (componentState as any)[key]?.includes("ANY"));
    // 		return allAny;
    // 	}
    // },
    // nextDisabledTooltip: () => {
    // 	return "Выберите хотя бы один интересующий параметр, кроме 'Любой'";
    // },
};

const MOVIES_CARDS_LIST: IWorkflowStep<MoviesList, MoviesBasicInfoState> = {
    uid: "MOVIESCARDSLIST",
    name: "СПИСОК_ФИЛЬМОВ",

    initState: () => ({
        moviesList: [],
        selectedMovie: null,
    }),

    nextBtnLabel: "ПОДРОБНЕЕ",
    component: () => {
        return MoviesCardList;
    },

    refresh: (previousComponentState: MoviesBasicInfoState) => {
        const userAge = previousComponentState.userAge;
        if (userAge === "ADULT") {
            const movie = {
                adultsContentTypes: previousComponentState.adultsContentTypes,
                adultsGenres: previousComponentState.adultsGenres,
                adultsMoods: previousComponentState.adultsMoods,
                adultsRegions: previousComponentState.adultsRegions,
                adultsReleaseTimes: previousComponentState.adultsReleaseTimes,
                refresh: true,
            };
            ReactGA.gtag("event", "refreshMovies", movie);
            return fetchPost(APPLICATION_HOST, "/getWatchAdults", movie);
        } else {
            const movie = {
                kidsAge: previousComponentState.kidsAge,
                kidsContentTypes: previousComponentState.kidsContentTypes,
                kidsDurations: previousComponentState.kidsDurations,
                kidsGenres: previousComponentState.kidsGenres,
                kidsMoods: previousComponentState.kidsMoods,
                kidsRegions: previousComponentState.kidsRegions,
                kidsReleaseTimes: previousComponentState.kidsReleaseTimes,
                kidsSubgenres: previousComponentState.kidsSubgenres,
                refresh: true,
            };
            ReactGA.gtag("event", "refreshMovies", movie);
            return fetchPost(APPLICATION_HOST, "/getWatchKids", movie);
        }
    },
    fetch: (componentState) => {
        const movieDetails = {
            country: componentState.selectedMovie?.country,
            description: componentState.selectedMovie?.description,
            releaseYear: componentState.selectedMovie?.releaseYear,
            title: componentState.selectedMovie?.title,
        };

        ReactGA.gtag("event", "fetchMovieDetails", movieDetails);
        return fetchPost(APPLICATION_HOST, "/getWatchDetails", movieDetails);
    },

    loaderSteps: getWatchDetailsLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        const moviesBasicInfoState = wizardState?.MOVIESBASICINFO as MoviesBasicInfoState | undefined;

        return {
            selectedMovie: componentState.selectedMovie,
            detailedDescription: fetchResponse,
            moviesBasicInfoState: moviesBasicInfoState ?? null,
        };
    },

    isNextDisabled: (componentState) => {
        return !componentState.selectedMovie || !componentState.selectedMovie.title;
    },

    nextDisabledTooltip: () => {
        return "Пожалуйста, выберите один фильм";
    },
};

const MOVIE_DETAILS: IWorkflowStep<MovieDetailsState, MoviesList> = {
    uid: "MOVIEDETAILS",
    name: "ДЕТАЛИ_ФИЛЬМА",

    initState: () => ({
        selectedMovie: null,
        detailedDescription: null,
        moviesBasicInfoState: null,
    }),

    component: () => {
        return MovieDetails;
    },
    refresh: (previousComponentState) => {
        const movieDetails = {
            country: previousComponentState.selectedMovie?.country,
            description: previousComponentState.selectedMovie?.description,
            releaseYear: previousComponentState.selectedMovie?.releaseYear,
            title: previousComponentState.selectedMovie?.title,
            refresh: true,
        };

        ReactGA.gtag("event", "fetchMovieDetails", movieDetails);
        return fetchPost(APPLICATION_HOST, "/getWatchDetails", movieDetails);
    },
};

const workflow = [MOVIES_BASIC_INFO, MOVIES_CARDS_LIST, MOVIE_DETAILS];

export type MoviesWizardState = MoviesBasicInfoState | MoviesList | MovieDetailsState;
export default workflow;
