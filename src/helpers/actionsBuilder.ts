import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import {BoardGamesBasicInfoState} from "../wizards/BoardGamesStep/BoardGamesBasicInfo";
import {GameDetailsState} from "../wizards/BoardGamesStep/BoardGamesDetails";
import {IBoardGame, IMovie, IVideoGame} from "../api/interfaces";
import boardGameWishes from "../constants/boardGameWishes";
import videoGameWishes from "../constants/videoGameWishes";
import {GamesBasicInfoState} from "../wizards/GamesStep/GamesBasicInfo";
import {VideoGameDetailsState} from "../wizards/GamesStep/GamesDetails";
import {ActivityDetailsStepContentProps} from "../wizards/ActivitiesStep/ActivityDetails/ActivityDetailsStepContent";

import {activitiesWishes} from "../constants/activitiesWishes";

import {adultsMovieWishes, kidsMovieWishes} from "../constants/movieWishes";
import {MoviesBasicInfoState} from "../wizards/MoviesStep/MoviesBasicInfo";

import formatPrice from "../wizards/ActivitiesStep/ActivitiesCardList/ActivitiesMap/utils/formatPrice";

import formatDateToString from "./formatDateToString";

interface ActionItem {
    key: string;
    value?: string | number;
}

interface DetailLike {
    rating?: number | string;
    description?: string;
}

const DURATION = "Длительность";

const buildDescItems = (details: DetailLike): ActionItem[] => {
    return [
        {key: "Рейтинг", value: details.rating},
        {key: "Описание", value: details.description},
        {key: "\nВыбери себе игру", value: window.location.href},
    ];
};

const renderSection = (title: string, items: ActionItem[]): string => {
    return `*** ${title} ***\n\n${items.map((elem) => `${elem.key}: ${elem.value ?? ""}`).join("\n")}`;
};

const getActionItemFormat = (selectedData: string[], fullData: IOptions) =>
    selectedData
        .map((key) => fullData[key].label)
        .filter(Boolean)
        .join(", ");

export const buildBoardGameActions = (
    basicInfo: BoardGamesBasicInfoState,
    details: GameDetailsState,
    selectedGame: IBoardGame | null,
): string => {
    const actions: ActionItem[] = [
        {
            key: "Жанр",
            value: basicInfo.genre
                .map((key) => boardGameWishes.genres.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {
            key: "Тематика",
            value: basicInfo.theme
                .map((key) => boardGameWishes.themes.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {
            key: "Уровень взаимодействия",
            value: basicInfo.interaction
                .map((key) => boardGameWishes.interactions.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {
            key: "Игровой процесс",
            value: basicInfo.boardGameProcess
                .map((key) => boardGameWishes.processes.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {key: "Количество игроков", value: boardGameWishes.players.values[basicInfo.players].label},
        {key: "Время игровой сессии", value: boardGameWishes.times.values[basicInfo.time].label},
        {key: "Уровень случайности", value: boardGameWishes.chances.values[basicInfo.chance].label},
        {key: "Сложность", value: boardGameWishes.rules.values[basicInfo.rules].label},
        {key: "Реиграбельность", value: boardGameWishes.replayabilities.values[basicInfo.replayability].label},
        {key: "Качество оформления", value: boardGameWishes.designs.values[basicInfo.design].label},
    ];

    const cardGame: ActionItem[] = [
        {key: "Название игры", value: selectedGame && selectedGame.title ? `${selectedGame.title}` : ""},
        {
            key: "Количество игроков",
            value: selectedGame && selectedGame.playersCount ? `${selectedGame.playersCount}` : "",
        },
        {key: "Время игры", value: selectedGame && selectedGame.oneBatchTime ? `${selectedGame.oneBatchTime} мин` : ""},
        {key: "Возраст", value: selectedGame && selectedGame.age ? `${selectedGame.age}+` : ""},
        {key: "Жанр игры", value: selectedGame && selectedGame.genre ? `${selectedGame.genre}` : ""},
        {
            key: "Аннотация",
            value: selectedGame && selectedGame.briefDescription ? `${selectedGame.briefDescription}+` : "",
        },
    ];

    const descGame = buildDescItems(details);

    return [
        renderSection("Общая информация об игре", actions),
        renderSection("Карта игры", cardGame),
        renderSection("Описание игры", descGame),
    ].join("\n\n");
};

export const buildVideoGameActions = (
    basicInfo: GamesBasicInfoState,
    details: VideoGameDetailsState,
    selectedGame: IVideoGame | null,
): string => {
    const actions: ActionItem[] = [
        {
            key: "Жанр",
            value: basicInfo.genre
                .map((key) => videoGameWishes.genres.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {
            key: "Стиль игры",
            value: basicInfo.typeOfExperience
                .map((key) => videoGameWishes.experiences.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {
            key: "Игровой мир",
            value: basicInfo.worldSetting
                .map((key) => videoGameWishes.worldSettings.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {key: "Графическое оформление", value: videoGameWishes.visualStyles.values[basicInfo.format].label},
        {key: "Время игровой сессии", value: videoGameWishes.sessionTimes.values[basicInfo.sessionTime].label},
        {key: "Статус игры", value: videoGameWishes.novelties.values[basicInfo.gameNovelty].label},
        {key: "Тип сюжета", value: videoGameWishes.narratives.values[basicInfo.narrative].label},
        {key: "Сложность", value: videoGameWishes.difficultyLevels.values[basicInfo.difficultyLevel].label},
        {key: "Режим игры", value: videoGameWishes.formats.values[basicInfo.format].label},
    ];

    const cardGame: ActionItem[] = [
        {key: "Название игры", value: selectedGame && selectedGame.title ? `${selectedGame.title}` : ""},
        {key: "Жанр игры", value: selectedGame && selectedGame.videoGameGenre ? `${selectedGame.videoGameGenre}` : ""},
        {key: "Год", value: selectedGame && selectedGame.releaseYear ? `${selectedGame.releaseYear}` : ""},
        {key: "Страна", value: selectedGame && selectedGame.country ? `${selectedGame.country}` : ""},
        {
            key: "Аннотация",
            value: selectedGame && selectedGame.briefDescription ? `${selectedGame.briefDescription}` : "",
        },
    ];

    const descGame = buildDescItems(details);

    return [
        renderSection("Общая информация об игре", actions),
        renderSection("Карта игры", cardGame),
        renderSection("Описание игры", descGame),
    ].join("\n\n");
};

export const buildActivityActions = ({
    basicInfo,
    selectedActivity,
    details,
}: ActivityDetailsStepContentProps): string => {
    const actions: ActionItem[] = [
        {
            key: "Местоположение",
            value: basicInfo.city?.city,
        },
        {
            key: "Дата",
            value: basicInfo?.date ? formatDateToString(basicInfo.date) : "",
        },
        {
            key: "Время суток",
            value: activitiesWishes.TIME_OF_DAY[basicInfo.timeOfDay].label,
        },
        {
            key: "Удалённость от города",
            value: activitiesWishes.DISTANCE[basicInfo.distance].label,
        },
        {
            key: DURATION,
            value: activitiesWishes.ACTIVITIES_DURATION[basicInfo.duration].label,
        },
        {
            key: "Формат участия",
            value: activitiesWishes.PARTICIPATION_FORMAT[basicInfo.participationFormat].label,
        },
        {
            key: "Возрастная категория",
            value: getActionItemFormat(basicInfo.ages, activitiesWishes.AGES),
        },
        {
            key: "Стоимость на одного человека",
            value: getActionItemFormat(basicInfo.prices, activitiesWishes.PRICES),
        },
        {
            key: "Виды активности",
            value: getActionItemFormat(basicInfo.typeOfActivities, activitiesWishes.TYPE_OF_ACTIVITIES),
        },
        {
            key: "Дополнительно",
            value:
                basicInfo.additionalInfo.length > 0
                    ? basicInfo.additionalInfo
                          .map((key) => activitiesWishes.INFO[key].label)
                          .filter(Boolean)
                          .join(", ")
                    : "",
        },
    ];

    const cardActivity: ActionItem[] = [
        {key: "Имя активности", value: selectedActivity?.name ?? ""},
        {key: "Продолжительность", value: selectedActivity?.duration ?? ""},
        {
            key: "Стоимость на одного человека",
            value: selectedActivity?.price ? formatPrice(selectedActivity.price) : "",
        },
        {key: "Вид активности", value: selectedActivity?.type ?? ""},
        {key: "Описание активности", value: selectedActivity?.description ?? ""},
        {key: "Координаты", value: `${selectedActivity?.latitude ?? ""} ${selectedActivity?.longitude ?? ""}`},
    ];

    const fullDescription: ActionItem[] = [
        {
            key: "Подробное описание активности",
            value: details?.fullDescription ?? "",
        },
        {key: "\nВыбери себе активность", value: window.location.href},
    ];

    return [
        renderSection("Общая информация об активностях", actions),
        renderSection("Информация об выбранной активности", cardActivity),
        renderSection("Подробная информация про выбранную активность", fullDescription),
    ].join("\n\n");
};

export const buildMovieActions = (basicInfo: MoviesBasicInfoState | null, selectedMovie: IMovie | null): string => {
    const userAge: string = getDataFromStorage("userAge");
    let actions: ActionItem[] = [];
    if (userAge === "ADULT") {
        actions = [
            {
                key: "Жанр",
                value: basicInfo?.adultsGenres
                    .map((key) => adultsMovieWishes.adultsGenres.values[key]?.label)
                    .filter(Boolean)
                    .join(", "),
            },
            {
                key: "Тип контента",
                value: basicInfo?.adultsContentTypes
                    .map((key) => adultsMovieWishes.adultsContentTypes.values[key]?.label)
                    .filter(Boolean)
                    .join(", "),
            },
            {
                key: "Настроение",
                value: basicInfo?.adultsMoods
                    .map((key) => adultsMovieWishes.adultsMoods.values[key]?.label)
                    .filter(Boolean)
                    .join(", "),
            },
            {
                key: "Какие регионы производства вам ближе",
                value: basicInfo?.adultsRegions
                    .map((key) => adultsMovieWishes.adultsRegions.values[key]?.label)
                    .filter(Boolean)
                    .join(", "),
            },
            {
                key: "Какая свежесть контента вам интересна",
                value: basicInfo?.adultsReleaseTimes
                    .map((key) => adultsMovieWishes.adultsReleaseTimes.values[key]?.label)
                    .filter(Boolean)
                    .join(", "),
            },
        ];
    } else {
        actions = [
            {
                key: "Жанр",
                value: basicInfo?.kidsGenres.map((key) => kidsMovieWishes.kidsGenres.values[key]?.label).join(", "),
            },
            {
                key: "Тип контента",
                value: basicInfo?.kidsContentTypes
                    .map((key) => kidsMovieWishes.kidsContentTypes.values[key]?.label)
                    .join(", "),
            },
            {
                key: "Тема",
                value: basicInfo?.kidsSubgenres
                    .map((key) => kidsMovieWishes.kidsSubgenres.values[key]?.label)
                    .join(", "),
            },
            {
                key: "Настроение",
                value: basicInfo?.kidsMoods.map((key) => kidsMovieWishes.kidsMoods.values[key]?.label).join(", "),
            },
            {
                key: "Формат контента",
                value: basicInfo?.kidsReleaseTimes
                    .map((key) => kidsMovieWishes.kidsReleaseTimes.values[key]?.label)
                    .join(", "),
            },
            {
                key: DURATION,
                value: basicInfo?.kidsDurations
                    .map((key) => kidsMovieWishes.kidsDurations.values[key]?.label)
                    .join(", "),
            },
            {
                key: "Регион",
                value: basicInfo?.kidsRegions.map((key) => kidsMovieWishes.kidsRegions.values[key]?.label).join(", "),
            },
        ];
    }

    const cardMovie: ActionItem[] = [
        {key: "Название фильма", value: selectedMovie?.title},
        {key: "Тип", value: selectedMovie?.contentType},
        {key: "Год выпуска", value: selectedMovie?.releaseYear},
        {key: "Жанр", value: selectedMovie?.genres},
        {key: "Возраст", value: selectedMovie?.ageRating},
        {key: "Страна", value: selectedMovie?.country},
        {key: DURATION, value: selectedMovie?.duration},
        {key: "Режиссер", value: selectedMovie?.director},
        {
            key: "Актеры",
            value: selectedMovie && selectedMovie.cast ? selectedMovie.cast.join(", ") : null,
        },

        {key: "Описание", value: selectedMovie?.description},
        {key: "\nВыбери себе фильм", value: window.location.href},
    ].filter((item) => Boolean(item.value)) as ActionItem[];

    return [renderSection("Общая информация о фильме", actions), renderSection("Выбранный фильм", cardMovie)].join(
        "\n\n",
    );
};
