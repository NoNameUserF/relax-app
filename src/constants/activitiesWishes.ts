import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {BudgetIcon, ClockIcon, InfinityIcon} from "@gsu-ai/gsu-ui-core";

import {ICityOption} from "../helpers/countries";
import {
    AccessibleIcon,
    BicycleWithManIcon,
    CarIcon,
    ClockOneTwoHours,
    DishIcon,
    EnglishIcon,
    ExhibitionsAndMuseums,
    FamilyIcon,
    HouseIcon,
    KidIcon,
    MapMarkerIcon,
    MasksIcon,
    OneCoinIcon,
    PaletteIcon,
    PlayerIcon,
    PlayersIcon,
    RealIcon,
    SpeedIcon,
    SquirrelIcon,
    TargetIcon,
    TeenagerIcon,
    ThreeCoinIcon,
    TimeIcon,
    TracesIcon,
    TrainIcon,
    TreesIcon,
    TwoCoinIcon,
    UserAdultIcon,
    VrIcon,
    WalletFreeIcon,
} from "../assets/Icons";

export interface ActivitiesBasicInfoState {
    distance: string;
    city: ICityOption | null;
    date: Date | null;
    timeOfDay: string;
    duration: string;
    ages: string[];
    prices: string[];
    participationFormat: string;
    typeOfActivities: string[];
    additionalInfo: string[] | [];
}

interface IActivitiesWishes {
    DISTANCE: IOptions;
    TIME_OF_DAY: IOptions;
    ACTIVITIES_DURATION: IOptions;
    AGES: IOptions;
    PRICES: IOptions;
    PARTICIPATION_FORMAT: IOptions;
    TYPE_OF_ACTIVITIES: IOptions;
    INFO: IOptions;
}

export interface IActivityDetails {
    fullDescription: string;
}

export const activitiesWishes: IActivitiesWishes = {
    DISTANCE: {
        ANY: {label: "Любая", Icon: InfinityIcon},
        CENTER: {label: "В центре", Icon: MapMarkerIcon},
        UP_TO_5: {label: "До 5 км", Icon: TracesIcon},
        UP_TO_10: {label: "До 10 км", Icon: BicycleWithManIcon},
        UP_TO_25: {label: "До 25 км", Icon: CarIcon},
        UP_TO_50: {label: "До 50 км", Icon: TrainIcon},
    },
    TIME_OF_DAY: {
        ANY: {label: "Любое"},
        MORNING: {label: "Утро"},
        DAY: {label: "День"},
        EVENING: {label: "Вечер"},
        NIGHT: {label: "Ночь"},
        BEFORE_NOON: {label: "Первая половина дня"},
        AFTERNOON: {label: "Вторая половина дня"},
    },

    ACTIVITIES_DURATION: {
        ANY: {label: "Любая", Icon: InfinityIcon},
        ONE_TWO_HOURS: {label: "1-2 часа", Icon: ClockOneTwoHours},
        THREE_FOUR_HOURS: {label: "3-4 часа", Icon: ClockIcon},
        WHOLE_DAY_NIGHT: {label: "Весь день / ночь", Icon: TimeIcon},
    },

    AGES: {
        AGE_FREE: {label: "Любая", Icon: InfinityIcon},
        FOR_KIDS: {label: "Дети", Icon: KidIcon},
        FOR_TEENAGERS: {label: "Подростки", Icon: TeenagerIcon},
        FOR_ADULTS: {label: "Взрослые", Icon: UserAdultIcon},
    },

    PRICES: {
        ANY: {label: "Любая", Icon: InfinityIcon},
        FREE: {label: "Бесплатно", Icon: WalletFreeIcon},
        LESS_THEN_TEN: {label: "До 10 USD", Icon: OneCoinIcon},
        TEN_THIRTY: {label: "10-30 USD", Icon: TwoCoinIcon},
        THIRTY_HUNDRED: {label: "30-100 USD", Icon: ThreeCoinIcon},
        MORE_THEN_HUNDRED: {label: "100+ USD", Icon: BudgetIcon},
    },

    PARTICIPATION_FORMAT: {
        INDIVIDUALLY: {label: "Индивидуально", Icon: PlayerIcon},
        WITH_A_COUPLE: {label: "Парой", Icon: RealIcon},
        WITH_FAMILY: {label: "С семьёй", Icon: FamilyIcon},
        WITH_FRIENDS: {label: "С друзьями (2-8 человек)", Icon: PlayersIcon},
        LARGE_GROUP: {label: "Компанией (от 9 человек)", Icon: PlayersIcon},
    },
    TYPE_OF_ACTIVITIES: {
        ANY: {label: "Любые", Icon: InfinityIcon},
        EXHIBITIONS_AND_MUSEUMS: {
            label: "Выставки и музеи",
            Icon: ExhibitionsAndMuseums,
        },
        CULTURAL_AND_GASTRONOMIC_WALKS: {label: "Гастропрогулки", Icon: DishIcon},
        QUESTS_AND_VR_GAMES: {label: "Квесты и VR-игры", Icon: VrIcon},
        MASTER_CLASSES: {label: "Мастер-классы", Icon: PaletteIcon},
        ACTIVITIES_IN_NATURE: {label: "На природе", Icon: TreesIcon},
        CONCERTS_THEATERS_PERFORMANCES: {
            label: "Театры и концерты",
            Icon: MasksIcon,
        },
        SHOOTING: {label: "Тир и арбалеты", Icon: TargetIcon},
        EXTREME: {label: "Экстрим", Icon: SpeedIcon},
    },
    INFO: {
        INDOOR: {label: "В помещении", Icon: HouseIcon},
        OUTDOOR: {label: "На улице", Icon: SquirrelIcon},
        SUITABLE_FOR_FOREIGNERS: {
            label: "Программа на иностранном",
            Icon: EnglishIcon,
        },
        ACCESSIBLE_TO_HANDICAPPED: {
            label: "Инклюзивная среда",
            Icon: AccessibleIcon,
        },
    },
};
