import {InfinityIcon} from "@gsu-ai/gsu-ui-core";
import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {
    ActionKidMovieIcon,
    ActionMovieIcon,
    AdventuresIcon,
    AnimalsIcon,
    ArthouseIcon,
    AsianIcon,
    BrainIcon,
    CalmIcon,
    CartoonIcon,
    CisIcon,
    ClassicIcon,
    ClassicKidIcon,
    CognitiveIcon,
    ComedyIcon,
    CrimeIcon,
    DetectiveIcon,
    DocumentaryIcon,
    DramaIcon,
    EducationIcon,
    EnergyIcon,
    ExcitingIcon,
    FamilyIcon,
    FamilyKidIcon,
    FantasyIcon,
    FantasyKidIcon,
    FilmIcon,
    FriendshipIcon,
    FunIcon,
    HistoryIcon,
    HistoryMoodIcon,
    HorrorsIcon,
    InspirationIcon,
    KindIcon,
    LightIcon,
    LongIcon,
    MedievalIcon,
    MediumIcon,
    MelodramaIcon,
    ModernKidIcon,
    MotivationIcon,
    MusicIcon,
    NewIcon,
    NewKidIcon,
    ProfessionsIcon,
    PsychologicalIcon,
    PuzzlesIcon,
    RealIcon,
    RobotsIcon,
    RomaceIcon,
    SchoolIcon,
    SciFiIcon,
    SeriesIcon,
    ShortIcon,
    SouthernIcon,
    SpaceIcon,
    SportsIcon,
    SuperheroesIcon,
    ThrillerIcon,
    TravelIcon,
    VintageKidIcon,
    WesternIcon,
} from "../assets/Icons";

interface IAdultsMovieWishes {
    adultsGenres: {name: string; values: IOptions};
    adultsContentTypes: {name: string; values: IOptions};
    adultsMoods: {name: string; values: IOptions};
    adultsRegions: {name: string; values: IOptions};
    adultsReleaseTimes: {name: string; values: IOptions};
}

interface IKidsMovieWishes {
    kidsGenres: {name: string; values: IOptions};
    kidsContentTypes: {name: string; values: IOptions};
    kidsSubgenres: {name: string; values: IOptions};
    kidsMoods: {name: string; values: IOptions};
    kidsReleaseTimes: {name: string; values: IOptions};
    kidsDurations: {name: string; values: IOptions};
    kidsRegions: {name: string; values: IOptions};
}

export const adultsMovieWishes: IAdultsMovieWishes = {
    adultsGenres: {
        name: "Жанр",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            ARTHOUSE: {label: "Арт-кино", Icon: ArthouseIcon},
            ACTION: {label: "Боевик", Icon: ActionMovieIcon},
            DETECTIVE: {label: "Детектив", Icon: DetectiveIcon},
            DOCUMENTARY: {label: "Документальный", Icon: DocumentaryIcon},
            DRAMA: {label: "Драма", Icon: DramaIcon},
            HISTORICAL: {label: "Исторический", Icon: HistoryIcon},
            COMEDY: {label: "Комедия", Icon: ComedyIcon},
            CRIME: {label: "Криминал", Icon: CrimeIcon},
            MELODRAMA: {label: "Мелодрама", Icon: MelodramaIcon},
            MUSICAL: {label: "Мюзикл", Icon: MusicIcon},
            BASED_ON_TRUE_EVENTS: {label: "По реальным событиям", Icon: RealIcon},
            ADVENTURES: {label: "Приключения", Icon: AdventuresIcon},
            PSYCHOLOGICAL: {label: "Психологический", Icon: PsychologicalIcon},
            FAMILY: {label: "Семейный", Icon: FamilyIcon},
            SPORTS: {label: "Спортивный", Icon: SportsIcon},
            THRILLER: {label: "Триллер", Icon: ThrillerIcon},
            HORROR: {label: "Ужасы", Icon: HorrorsIcon},
            FANTASTIC: {label: "Фантастика", Icon: SciFiIcon},
            FANTASY: {label: "Фэнтези", Icon: FantasyIcon},
        },
    },
    adultsContentTypes: {
        name: "Тип контента",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            ANIMATION: {label: "Мультфильм", Icon: CartoonIcon},
            SERIES: {label: "Сериал", Icon: SeriesIcon},
            FILM: {label: "Фильм", Icon: FilmIcon},
        },
    },
    adultsMoods: {
        name: "Настроение",
        values: {
            ANY: {label: "Любое", Icon: InfinityIcon},
            INSPIRING: {label: "Вдохновляющее", Icon: InspirationIcon},
            EXCITING: {label: "Захватывающее", Icon: ExcitingIcon},
            LIGHT_AND_CHEERFUL: {label: "Лёгкое и веселое", Icon: LightIcon},
            HOUGHT_PROVOKING: {label: "Поразмышлять", Icon: BrainIcon},
            ROMANTIC: {label: "Романтическое", Icon: RomaceIcon},
            CALM: {label: "Спокойное", Icon: CalmIcon},
            IMMERSE_IN_HISTORY: {label: "Увлекательная история", Icon: HistoryMoodIcon},
            ENERGETIC: {label: "Энергичное", Icon: EnergyIcon},
        },
    },
    adultsRegions: {
        name: "Регион",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            ASIAN: {label: "Азия", Icon: AsianIcon},
            WESTERN: {label: "Запад", Icon: WesternIcon},
            CIS: {label: "СНГ", Icon: CisIcon},
            SOUTHERN: {label: "Южная Америка и Восток", Icon: SouthernIcon},
        },
    },
    adultsReleaseTimes: {
        name: "Формат контента",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            CLASSIC: {label: "Классика", Icon: ClassicIcon},
            NEW: {label: "Современное", Icon: NewIcon},
        },
    },
};

export const kidsMovieWishes: IKidsMovieWishes = {
    kidsGenres: {
        name: "Жанр",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            DRAMA: {label: "Драма", Icon: DramaIcon},
            COMEDY: {label: "Комедия", Icon: ComedyIcon},
            MUSICAL: {label: "Мюзикл", Icon: MusicIcon},
            COGNITIVE: {label: "Познавательный", Icon: CognitiveIcon},
            ADVENTURES: {label: "Приключения", Icon: AdventuresIcon},
            ACTION: {label: "Экшен", Icon: ActionKidMovieIcon},
        },
    },
    kidsContentTypes: {
        name: "Тип контента",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            CARTOON: {label: "Мультфильм", Icon: CartoonIcon},
            SERIES: {label: "Сериал", Icon: SeriesIcon},
            FILM: {label: "Фильм", Icon: FilmIcon},
        },
    },
    kidsSubgenres: {
        name: "Тема",
        values: {
            ANY: {label: "Любая", Icon: InfinityIcon},
            FRIENDSHIP: {label: "Дружба и отношения", Icon: FriendshipIcon},
            ANIMALS: {label: "Животные и природа", Icon: AnimalsIcon},
            PUZZLES: {label: "Загадки и головоломки", Icon: PuzzlesIcon},
            HISTORY: {label: "История", Icon: HistoryIcon},
            SPACE: {label: "Космос", Icon: SpaceIcon},
            PROFESSIONS: {label: "Профессии и мечты", Icon: ProfessionsIcon},
            TRAVEL: {label: "Путешествия", Icon: TravelIcon},
            ROBOTS: {label: "Роботы и технологии", Icon: RobotsIcon},
            FAMILY: {label: "Семья и ценности", Icon: FamilyKidIcon},
            SPORTS: {label: "Спорт", Icon: SportsIcon},
            MEDIEVAL: {label: "Средневековье", Icon: MedievalIcon},
            SUPERHEROES: {label: "Супергерои", Icon: SuperheroesIcon},
            FANTASY: {label: "Фэнтези и волшебство", Icon: FantasyKidIcon},
            SCHOOL: {label: "Школа и учёба", Icon: SchoolIcon},
        },
    },
    kidsMoods: {
        name: "Настроение",
        values: {
            ANY: {label: "Любое", Icon: InfinityIcon},
            MOTIVATION: {label: "Вдохновляющее", Icon: MotivationIcon},
            FUN: {label: "Весёлое и бодрое", Icon: FunIcon},
            KIND: {label: "Доброе и светлое", Icon: KindIcon},
            DRAMA: {label: "Драматичное и захватывающее", Icon: DramaIcon},
            EDUCATION: {label: "Познавательное и развивающее", Icon: EducationIcon},
            CALM: {label: "Спокойное и расслабляющее", Icon: CalmIcon},
        },
    },
    kidsReleaseTimes: {
        name: "Формат контента",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            CLASSIC: {label: "Классика", Icon: ClassicKidIcon},
            NEW: {label: "Новинки", Icon: NewKidIcon},
            VINTAGE: {label: "Ретро", Icon: VintageKidIcon},
            MODERN: {label: "Современное", Icon: ModernKidIcon},
        },
    },
    kidsDurations: {
        name: "Длительность",
        values: {
            ANY: {label: "Любая", Icon: InfinityIcon},
            LONG: {label: "Полнометражная", Icon: LongIcon},
            MEDIUM: {label: "Средняя", Icon: MediumIcon},
            SHORT: {label: "Короткая", Icon: ShortIcon},
        },
    },
    kidsRegions: {
        name: "Регион",
        values: {
            ANY: {label: "Любой", Icon: InfinityIcon},
            ASIAN: {label: "Азия", Icon: AsianIcon},
            WESTERN: {label: "Запад", Icon: WesternIcon},
            CIS: {label: "СНГ", Icon: CisIcon},
            SOUTHERN: {label: "Южная Америка и Восток", Icon: SouthernIcon},
        },
    },
};
