import {IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {getDataFromStorage, fetchPost} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {GamesBasicInfo, GamesBasicInfoState} from "../../wizards/GamesStep/GamesBasicInfo";
import {APPLICATION_HOST} from "../../constants/api";
import GamesCardList, {VideoGamesList} from "../../wizards/GamesStep/GamesCardList";
import GameDetails, {VideoGameDetailsState} from "../../wizards/GamesStep/GamesDetails";

const getVideoGamesLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Подбираю подходящие игры",
        time: 3500,
    },
    {
        title: "Генерирую список",
        time: 3500,
    },
];
const getVideoGameDetailsLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Ищу информацию",
        time: 4000,
    },
    {
        title: "Генерирую ответ",
        time: 4000,
    },
];

const GAMES_BASIC_INFO: IWorkflowStep<GamesBasicInfoState> = {
    uid: "GAMESBASICINFO",
    name: "ИГРЫ",
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    initState: () => {
        return {
            genre: getDataFromStorage("videoGamesGenre") || ["ANY"],
            typeOfExperience: getDataFromStorage("videoGamesExperience") || ["ANY"],
            worldSetting: getDataFromStorage("videoGamesWorldSetting") || ["ANY"],
            style: getDataFromStorage("videoGamesStyle") || "ANY",
            format: getDataFromStorage("videoGamesFormat") || "ANY",
            sessionTime: getDataFromStorage("videoGamesSessionTime") || "ANY",
            narrative: getDataFromStorage("videoGamesNarrative") || "ANY",
            gameNovelty: getDataFromStorage("videoGamesNovelty") || "ANY",
            difficultyLevel: getDataFromStorage("videoGamesDifficultyLevel") || "ANY",
        };
    },

    storageDependencies: [
        "videoGamesGenre",
        "videoGamesExperience",
        "videoGamesWorldSetting",
        "videoGamesStyle",
        "videoGamesFormat",
        "videoGamesSessionTime",
        "videoGamesNarrative",
        "videoGamesNovelty",
        "videoGamesDifficultyLevel",
    ],

    cleanState: () => {
        return {
            genre: ["ANY"],
            typeOfExperience: ["ANY"],
            worldSetting: ["ANY"],
            style: "ANY",
            format: "ANY",
            sessionTime: "ANY",
            narrative: "ANY",
            gameNovelty: "ANY",
            difficultyLevel: "ANY",
        };
    },

    component: () => {
        return GamesBasicInfo;
    },

    fetch: (componentState) => {
        const videoGame = {
            difficultyLevelOfVideoGame: componentState.difficultyLevel,
            gameFormat: componentState.format,
            gameNovelty: componentState.gameNovelty,
            narrativeInGame: componentState.narrative,
            refresh: false,
            sessionTime: componentState.sessionTime,
            typeOfExperience: componentState.typeOfExperience,
            typeOfWorldOrSetting: componentState.worldSetting,
            videoGameGenre: componentState.genre,
            visualStyle: componentState.style,
            excludeList: [],
        };
        ReactGA.gtag("event", "fetchVideoGame", videoGame);
        return fetchPost(APPLICATION_HOST, "/getVideoGames", videoGame);
    },

    loaderSteps: getVideoGamesLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        const nextPageState = wizardState["VIDEOGAMESCARDLIST"] as VideoGamesList;

        const excludeListPrevious = nextPageState.excludeList ? nextPageState.excludeList : [];
        let excludeList = excludeListPrevious
            ? [...nextPageState.excludeList, ...nextPageState.videoGames.map((videoGame) => videoGame.title)]
            : [];

        if (excludeList.length > 12) {
            excludeList = excludeList.slice(-12);
        }

        return {
            videoGames: fetchResponse,
            selectedVideoGame: null,
            excludeList: excludeList,
        };
    },

    // isNextDisabled: (componentState, wizardState) => {
    //     return
    // },

    nextDisabledTooltip: () => {
        return "";
    },
};

const GAMES_CARD_LIST: IWorkflowStep<VideoGamesList, GamesBasicInfoState> = {
    uid: "VIDEOGAMESCARDLIST",
    name: "НАСТОЛЬНЫЕ ИГРЫ",
    nextBtnLabel: "ПОДРОБНЕЕ",
    initState: () => {
        return {
            videoGames: [],
            selectedVideoGame: null,
            excludeList: [],
        };
    },

    component: () => {
        return GamesCardList;
    },

    clearable: true,
    refresh: (previousComponentState, componentState) => {
        const excludeList = [
            ...componentState.excludeList,
            ...componentState.videoGames.map((videoGame) => videoGame.title),
        ];

        const videoGame = {
            difficultyLevelOfVideoGame: previousComponentState.difficultyLevel,
            gameFormat: previousComponentState.format,
            gameNovelty: previousComponentState.gameNovelty,
            narrativeInGame: previousComponentState.narrative,
            refresh: true,
            sessionTime: previousComponentState.sessionTime,
            typeOfExperience: previousComponentState.typeOfExperience,
            typeOfWorldOrSetting: previousComponentState.worldSetting,
            videoGameGenre: previousComponentState.genre,
            visualStyle: previousComponentState.style,
            excludeList: excludeList,
        };

        ReactGA.gtag("event", "fetchVideoGame", videoGame);
        return fetchPost(APPLICATION_HOST, "/getVideoGames", videoGame);
    },

    fetch: (componentState) => {
        const videoGames = {
            videoGameTitle: componentState.selectedVideoGame?.title,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchVideoGameDetails", videoGames);
        return fetchPost(APPLICATION_HOST, "/getVideoGameDetails", videoGames);
    },

    loaderSteps: getVideoGameDetailsLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            description: fetchResponse.description,
            rating: fetchResponse.averageRating,
        };
    },

    isNextDisabled: (componentState) => {
        return !componentState.selectedVideoGame || !componentState.selectedVideoGame.title;
    },

    nextDisabledTooltip: () => {
        return "Пожалуйста, выберите одну из игр";
    },
};

const VIDEO_GAME_DETAILS: IWorkflowStep<VideoGameDetailsState, VideoGamesList> = {
    uid: "VIDEOGAMEDETAILS",
    name: "ДЕТАЛИ ИГРЫ",

    initState: () => ({
        detailedDescription: "",
        rating: 0,
    }),

    component: () => {
        return GameDetails;
    },

    clearable: true,

    refresh: (previousComponentState) => {
        const videoGames = {
            videoGameTitle: previousComponentState.selectedVideoGame?.title,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshVideoGameDetails", videoGames);
        return fetchPost(APPLICATION_HOST, "/getVideoGameDetails", videoGames);
    },

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            description: fetchResponse.description,
            rating: fetchResponse.averageRating,
        };
    },
};

const workflow = [GAMES_BASIC_INFO, GAMES_CARD_LIST, VIDEO_GAME_DETAILS];

export type MoviesWizardState = GamesBasicInfoState | VideoGamesList | VideoGameDetailsState;

export default workflow;
