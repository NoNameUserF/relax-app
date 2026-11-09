import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {InfinityIcon} from "@gsu-ai/gsu-ui-core";

import {
    AnarchyIcon,
    BattleIcon,
    BrainCircuitIcon,
    CardSuitIcon,
    ClassicGenreIcon,
    ClockIcon,
    CooperativeIcon,
    FamilyIcon,
    FistIcon,
    HouseGamesIcon,
    InstancesIcon,
    MagicIcon,
    ManagementIcon,
    MaskIcon,
    OneStarIcon,
    OpponentsIcon,
    OrigamiIcon,
    PlayerIcon,
    PlayersIcon,
    PredictableIcon,
    PremiumQualityIcon,
    PsychologicalIcon,
    PuzzleIcon,
    RandomIcon,
    RepeatIcon,
    SemiChaosIcon,
    SherlockIcon,
    StrategizingIcon,
    StrategyIcon,
    ThreeStarsIcon,
    Time30Icon,
    Time60Icon,
    TimeIcon,
    TriangleIcon,
    TwoStarsIcon,
} from "../assets/Icons";

interface IBoardGameWishes {
    genres: {values: IOptions};
    themes: {values: IOptions};
    interactions: {values: IOptions};
    processes: {values: IOptions};
    players: {values: IOptions};
    times: {values: IOptions};
    chances: {values: IOptions};
    rules: {values: IOptions};
    designs: {values: IOptions};
    replayabilities: {values: IOptions};
}

const boardGameWishes: IBoardGameWishes = {
    genres: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            DEDUCTION_AND_ROLE_PLAYING: {label: "Детектив", Icon: SherlockIcon},
            CARD_AND_DECK_BUILDING: {label: "Карточные", Icon: CardSuitIcon},
            COOPERATIVE: {label: "Кооперативные", Icon: CooperativeIcon},
            FAMILY_AND_CASUAL: {label: "Семейные", Icon: PuzzleIcon},
            STRATEGIC: {label: "Стратегические", Icon: StrategyIcon},
        },
    },
    themes: {
        values: {
            ANY: {label: "Любая", Icon: InfinityIcon},
            ABSTRACT: {label: "Абстракция и минимализм", Icon: OrigamiIcon},
            HOUSEHOLD: {label: "Быт и семья", Icon: HouseGamesIcon},
            FANTASY: {label: "Мир магии", Icon: MagicIcon},
            SCIENCE_FICTION: {label: "Фантастика и будущее", Icon: BrainCircuitIcon},
            HISTORICAL: {label: "Эпохи и сражения", Icon: BattleIcon},
        },
    },
    interactions: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            COMPETITION: {label: "Все против всех", Icon: AnarchyIcon},
            COOPERATIVE_MODE: {label: "Все против игры", Icon: FistIcon},
            COMMUNICATION: {label: "Дипломатия", Icon: PsychologicalIcon},
            MIXED_FORMAT: {label: "Друзья и соперники", Icon: OpponentsIcon},
        },
    },
    processes: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            FAST_AND_DYNAMIC: {label: "Быстрый и лёгкий", Icon: TriangleIcon},
            ROLE_AND_STORY_DRIVEN: {label: "Сюжет и роли", Icon: MaskIcon},
            STRATEGIC_PLANNING: {label: "Тактика и стратегия", Icon: StrategizingIcon},
            RESOURCE_DEVELOPMENT: {label: "Управление ресурсами", Icon: ManagementIcon},
        },
    },
    players: {
        values: {
            SINGLE_GAME: {label: "1 игрок", Icon: PlayerIcon},
            GAME_FOR_TWO: {label: "2 игрока", Icon: FamilyIcon},
            MIDDLE_GROUP: {label: "3-4 игрока", Icon: PlayersIcon},
            LARGE_GROUP: {label: "5 и более", Icon: PlayersIcon},
        },
    },
    times: {
        values: {
            ANY: {label: "Любое", Icon: InfinityIcon},
            SHORT_GAME: {label: "До 30 минут", Icon: Time30Icon},
            MEDIUM: {label: "30-60 минут", Icon: Time60Icon},
            LONG_GAME: {label: "Больше часа", Icon: TimeIcon},
        },
    },
    chances: {
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            RANDOMNESS: {label: "Рандом", Icon: RandomIcon},
            STRATEGY_FIRST: {label: "Умеренный хаос", Icon: SemiChaosIcon},
            PURE_STRATEGY: {label: "Предсказуемо", Icon: PredictableIcon},
        },
    },
    rules: {
        values: {
            ANY: {label: "Любая", Icon: InfinityIcon},
            EASY: {label: "Низкая", Icon: OneStarIcon},
            MEDIUM: {label: "Средняя", Icon: TwoStarsIcon},
            HARD: {label: "Высокая", Icon: ThreeStarsIcon},
        },
    },
    designs: {
        values: {
            ANY: {label: "Любое", Icon: InfinityIcon},
            CLASSIC: {label: "Классическое", Icon: ClassicGenreIcon},
            THEMATIC: {label: "С уникальными элементами", Icon: InstancesIcon},
            PREMIUM: {label: "Премиальное", Icon: PremiumQualityIcon},
        },
    },
    replayabilities: {
        values: {
            NO_MATTER: {label: "Любая", Icon: InfinityIcon},
            LOW: {label: "Низкая", Icon: ClockIcon},
            HIGH: {label: "Высокая", Icon: RepeatIcon},
        },
    },
};

export default boardGameWishes;
