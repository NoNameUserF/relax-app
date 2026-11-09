import {IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {getDataFromStorage, fetchPost} from "@gsu-ai/gsu-ui-core";
import ReactGA from "react-ga4";

import {APPLICATION_HOST} from "../../constants/api";
import BoardGamesBasicInfo, {BoardGamesBasicInfoState} from "../../wizards/BoardGamesStep/BoardGamesBasicInfo";
import BoardGamesCardList, {BoardGamesList} from "../../wizards/BoardGamesStep/BoardGamesCardList";
import BoardGameDetails, {GameDetailsState} from "../../wizards/BoardGamesStep/BoardGamesDetails";

const getBoardGamesLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Подбираю игры",
        time: 5500,
    },
    {
        title: "Генерирую список",
        time: 5500,
    },
];
const getBoardGameDetailsLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Собираю информацию",
        time: 3500,
    },
    {
        title: "Генерирую результат",
        time: 3500,
    },
];

const BOARD_GAMES_BASIC_INFO: IWorkflowStep<BoardGamesBasicInfoState> = {
    uid: "BOARDGAMESBASICINFO",
    name: "НАСТОЛЬНЫЕ ИГРЫ",
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    initState: () => {
        return {
            genre: getDataFromStorage("boardGamesGenre") || ["ANY"],
            theme: getDataFromStorage("boardGamesTheme") || ["ANY"],
            interaction: getDataFromStorage("boardGamesInteraction") || ["ANY"],
            boardGameProcess: getDataFromStorage("boardGamesProcess") || ["ANY"],
            players: getDataFromStorage("boardGamesPlayersCount") || "SINGLE_GAME",
            time: getDataFromStorage("boardGamesTime") || "MEDIUM",
            chance: getDataFromStorage("boardGameChance") || "ANY",
            rules: getDataFromStorage("boardGameRules") || "ANY",
            design: getDataFromStorage("boardGameDesign") || "ANY",
            replayability: getDataFromStorage("boardGameReplayability") || "NO_MATTER",
        };
    },

    cleanState: () => {
        return {
            genre: ["ANY"],
            theme: ["ANY"],
            interaction: ["ANY"],
            boardGameProcess: ["ANY"],
            players: "SINGLE_GAME",
            time: "ANY",
            chance: "ANY",
            rules: "ANY",
            design: "ANY",
            replayability: "NO_MATTER",
        };
    },

    storageDependencies: [
        "boardGamesGenre",
        "boardGamesTheme",
        "boardGamesInteraction",
        "boardGamesProcess",
        "boardGamesPlayersCount",
        "boardGamesTime",
        "boardGameChance",
        "boardGameRules",
        "boardGameDesign",
        "boardGameReplayability",
    ],

    component: () => {
        return BoardGamesBasicInfo;
    },

    fetch: (componentState) => {
        const boardGame = {
            difficultyLevel: componentState.rules,
            gamingSessionTime: componentState.time,
            boardGameGenres: componentState.genre,
            kindsOfGameplay: componentState.boardGameProcess,
            levelsOfInteraction: componentState.interaction,
            numberOfPlayers: componentState.players,
            qualityOfDesign: componentState.design,
            randomness: componentState.chance,
            refresh: false,
            replayability: componentState.replayability,
            themes: componentState.theme,
            excludeList: [],
        };

        ReactGA.gtag("event", "fetchBoardGame", boardGame);
        return fetchPost(APPLICATION_HOST, "/getBoardGames", boardGame);
    },

    loaderSteps: getBoardGamesLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        const nextPageState = wizardState["BOARDGAMESCARDLIST"] as BoardGamesList;

        const excludeListPrevious = nextPageState.excludeList ? nextPageState.excludeList : [];
        let excludeList = excludeListPrevious
            ? [...nextPageState.excludeList, ...nextPageState.boardGames.map((boardGame) => boardGame.title)]
            : [];

        if (excludeList.length > 12) {
            excludeList = excludeList.slice(-12);
        }

        return {
            boardGames: fetchResponse,
            selectedBoardGame: null,
            excludeList: excludeList,
        };
    },

    nextDisabledTooltip: () => {
        return "";
    },
};

const BOARD_GAMES_CARD_LIST: IWorkflowStep<BoardGamesList, BoardGamesBasicInfoState> = {
    uid: "BOARDGAMESCARDLIST",
    name: "ВЫБОР ИГРЫ",
    nextBtnLabel: "ПОДРОБНЕЕ",
    initState: () => {
        return {
            boardGames: [],
            selectedBoardGame: null,
            excludeList: [],
        };
    },

    component: () => {
        return BoardGamesCardList;
    },

    // fetch: (componentState, wizardState) => {
    //
    // },

    // callback: (componentState, wizardState, fetchResponse) => {
    //   return {
    //
    //   };
    // },

    clearable: true,
    refresh: (previousComponentState, componentState) => {
        const excludeList = [
            ...componentState.excludeList,
            ...componentState.boardGames.map((boardGame) => boardGame.title),
        ];

        const boardGame = {
            difficultyLevel: previousComponentState.rules,
            gamingSessionTime: previousComponentState.time,
            boardGameGenres: previousComponentState.genre,
            kindsOfGameplay: previousComponentState.boardGameProcess,
            levelsOfInteraction: previousComponentState.interaction,
            numberOfPlayers: previousComponentState.players,
            qualityOfDesign: previousComponentState.design,
            randomness: previousComponentState.chance,
            refresh: true,
            replayability: previousComponentState.replayability,
            themes: previousComponentState.theme,
            excludeList: excludeList,
        };

        ReactGA.gtag("event", "fetchBoardGame", boardGame);
        return fetchPost(APPLICATION_HOST, "/getBoardGames", boardGame);
    },

    fetch: (componentState) => {
        const boardGames = {
            boardGameTitle: componentState.selectedBoardGame?.title,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchBoardGameDetails", boardGames);
        return fetchPost(APPLICATION_HOST, "/getBoardGameDetails", boardGames);
    },

    loaderSteps: getBoardGameDetailsLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            description: fetchResponse.description,
            rating: fetchResponse.averageRating,
        };
    },

    isNextDisabled: (componentState) => {
        return !componentState.selectedBoardGame || !componentState.selectedBoardGame.title;
    },

    nextDisabledTooltip: () => {
        return "Пожалуйста, выберите одну из игр";
    },
};

const BOARD_GAME_DETAILS: IWorkflowStep<GameDetailsState, BoardGamesList> = {
    uid: "BOARDGAMEDETAILS",
    name: "ДЕТАЛИ ИГРЫ",

    initState: () => ({
        description: "",
        rating: 0,
    }),

    component: () => {
        return BoardGameDetails;
    },

    clearable: true,

    refresh: (previousComponentState) => {
        const boardGames = {
            boardGameTitle: previousComponentState.selectedBoardGame?.title,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshBoardGameDetails", boardGames);
        return fetchPost(APPLICATION_HOST, "/getBoardGameDetails", boardGames);
    },

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            description: fetchResponse.description,
            rating: fetchResponse.averageRating,
        };
    },
};

const workflow = [BOARD_GAMES_BASIC_INFO, BOARD_GAMES_CARD_LIST, BOARD_GAME_DETAILS];

export type MoviesWizardState = BoardGamesBasicInfoState | BoardGamesList | GameDetailsState;

export default workflow;
