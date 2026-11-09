import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {InfinityIcon} from "@gsu-ai/gsu-ui-core";

import {
    ActivitiesIcon,
    AnimationIcon,
    BookIcon,
    BrainIcon,
    ClockIcon,
    CrossbowGameIcon,
    Crown2Icon,
    Crown3Icon,
    CrownIcon,
    EarthIcon,
    EnergyIcon,
    FamilyIcon,
    Fantasy2Icon,
    HistoryIcon,
    InspirationIcon,
    OneStarIcon,
    PlayerIcon,
    RealIcon,
    SeriesIcon,
    StarBrokenIcon,
    ShareIcon,
    SizeMapIcon2Icon,
    SportsIcon,
    TacticIcon,
    TimeIcon,
    TimerIcon,
    TwoStarsIcon,
} from "../assets/Icons";

interface IVideoGameWishes {
    genres: {values: IOptions};
    experiences: {values: IOptions};
    worldSettings: {values: IOptions};
    formats: {values: IOptions};
    visualStyles: {values: IOptions};
    sessionTimes: {values: IOptions};
    narratives: {values: IOptions};
    novelties: {values: IOptions};
    difficultyLevels: {values: IOptions};
}

const videoGameWishes: IVideoGameWishes = {
    genres: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            PUZZLE_INDI: {label: "Головоломки и инди", Icon: BrainIcon},
            ROLE_PLAYING: {label: "Ролевые и сюжетные", Icon: FamilyIcon},
            SIMULATION: {label: "Симуляторы и спорт", Icon: SportsIcon},
            STRATEGY: {label: "Стратегия и тактика", Icon: TacticIcon},
            SHOOTERS: {
                label: "Шутеры и соревнования",
                Icon: CrossbowGameIcon,
            },
            ACTION_ADVENTURE: {
                label: "Экшен и приключения",
                Icon: ShareIcon,
            },
        },
    },
    experiences: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            DYNAMIC_AND_FAST: {label: "Динамичный экшен", Icon: EnergyIcon},
            FREEDOM_OF_ACTION: {
                label: "Открытый мир",
                Icon: RealIcon,
            },
            RELAXING_AND_UNOBTRUSIVE: {
                label: "Расслабленный",
                Icon: ActivitiesIcon,
            },
            TACTICAL_PLANNING: {
                label: "Стратегия",
                Icon: CrossbowGameIcon,
            },
            DEEP_STORYLINE: {label: "Cюжет и персонажи", Icon: BrainIcon},
        },
    },
    worldSettings: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            ALTERNATIVE_REALITY: {
                label: "Альтернативная реальность",
                Icon: EarthIcon,
            },
            HISTORICAL_ERA: {label: "Историческая эпоха", Icon: HistoryIcon},
            SCIENCE_FICTION: {label: "Научная фантастика", Icon: BookIcon},
            REALISTIC: {label: "Современный и реалистичный", Icon: RealIcon},
            FANTASY: {label: "Фэнтези и мифы", Icon: Fantasy2Icon},
        },
    },
    formats: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            SINGLE_PLAYING_CAMPAIGN: {label: "Одиночный", Icon: PlayerIcon},
            MULTIPLAYER_MODE: {
                label: "Многопользовательский",
                Icon: FamilyIcon,
            },
            MIXED_EXPERIENCE: {label: "Смешанный", Icon: InspirationIcon},
        },
    },
    visualStyles: {
        values: {
            ANY: {label: "Любое", Icon: InfinityIcon},
            STYLIZED_OR_CARTOONISH: {
                label: "Мультяшное",
                Icon: AnimationIcon,
            },
            REALISTIC_GRAPHICS: {label: "Реалистичное", Icon: RealIcon},
            RETRO_PIXEL: {label: "Ретро-пиксельное", Icon: SeriesIcon},
        },
    },
    sessionTimes: {
        values: {
            ANY: {label: "Любое", Icon: InfinityIcon},
            SHORT_GAME: {label: "До 60 минут", Icon: ClockIcon},
            MEDIUM_SESSION: {label: "1-2 часа", Icon: TimerIcon},
            LONG_GAME: {label: "2 часа и более", Icon: TimeIcon},
        },
    },
    narratives: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            CINEMATIC_LINEAR: {
                label: "Линейный, как в фильме",
                Icon: TacticIcon,
            },
            NON_LINEAR: {
                label: "Нелинейный с выбором",
                Icon: SizeMapIcon2Icon,
            },
        },
    },
    novelties: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            FRESH: {label: "Новинка", Icon: TwoStarsIcon},
            NEW: {label: "Недавний релиз", Icon: OneStarIcon},
            RETRO: {label: "Ретро", Icon: StarBrokenIcon},
        },
    },
    difficultyLevels: {
        values: {
            ANY: {label: "Любая", Icon: InfinityIcon},
            EASY: {label: "Низкая", Icon: CrownIcon},
            MEDIUM: {label: "Средняя", Icon: Crown2Icon},
            HARD: {label: "Высокая", Icon: Crown3Icon},
        },
    },
};

export default videoGameWishes;
