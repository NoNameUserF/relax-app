import {IWizardStep, IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC} from "react";
import {
    GsuWizardResultPage,
    GsuTextContainer,
    GsuInfoContainer,
    GsuActionsBlock,
    formatDuration,
} from "@gsu-ai/gsu-ui-core";

import {IMovie} from "../../../api/interfaces";
import {DescriptionIcon, FilmIcon} from "../../../assets/Icons";
import {buildMovieActions} from "../../../helpers/actionsBuilder";
import {MoviesBasicInfoState} from "../MoviesBasicInfo";

import styles from "../MovieDetails/CartTable/index.module.css";

export interface DetailedDescription {
    detailedDescription: string | undefined;
}

export interface MovieDetailsState {
    selectedMovie: IMovie | null;
    moviesBasicInfoState: MoviesBasicInfoState | null;
    detailedDescription: DetailedDescription | null;
}

const MovieDetails: FC<IWizardStep<MovieDetailsState>> = ({componentState, wizardState, refresh}) => {
    const {selectedMovie} = componentState;

    const details = wizardState?.MOVIEDETAILS as MovieDetailsState;

    const title = details?.selectedMovie?.title || "Детали фильма";
    const detailedDescription = details?.detailedDescription?.detailedDescription;

    const MOVIESBASICINFO = wizardState.MOVIESBASICINFO as MoviesBasicInfoState;

    const infoBlock = {
        userAge: MOVIESBASICINFO.userAge,
        adultsGenres: MOVIESBASICINFO.adultsGenres,
        adultsContentTypes: MOVIESBASICINFO.adultsContentTypes,
        adultsMoods: MOVIESBASICINFO.adultsMoods,
        adultsRegions: MOVIESBASICINFO.adultsRegions,
        adultsReleaseTimes: MOVIESBASICINFO.adultsReleaseTimes,
        kidsAge: MOVIESBASICINFO.kidsAge,
        kidsContentTypes: MOVIESBASICINFO.kidsContentTypes,
        kidsDurations: MOVIESBASICINFO.kidsDurations,
        kidsGenres: MOVIESBASICINFO.kidsGenres,
        kidsMoods: MOVIESBASICINFO.kidsMoods,
        kidsRegions: MOVIESBASICINFO.kidsRegions,
        kidsReleaseTimes: MOVIESBASICINFO.kidsReleaseTimes,
        kidsSubgenres: MOVIESBASICINFO.kidsSubgenres,
    };

    if (!selectedMovie) {
        return <div>Фильм не выбран</div>;
    }

    const saveFileName = `${title.replace(/ /g, "_")}.txt`;

    const infoMovie = buildMovieActions(infoBlock, selectedMovie);
    const infoCells: IGsuInfoContainerCell[] = [
        {key: "Тип", value: selectedMovie.contentType || "Тип отсутствует"},
        {key: "Год", value: selectedMovie.releaseYear?.toString() || "Год отсутствует"},
        {
            key: "Длительность",
            value: selectedMovie.duration ? `${formatDuration(selectedMovie.duration)}` : "Длительность отсутствует",
        },
        {key: "Жанр", value: selectedMovie.genres?.join(", ") || "Жанр отсутствует"},
        {key: "Режиссёр", value: selectedMovie.director || null},
        {key: "Актёры", value: selectedMovie.cast?.join(", ") || null},
    ].filter((cell) => cell.value) as IGsuInfoContainerCell[];

    return (
        <GsuWizardResultPage refresh={refresh} title={title}>
            <div className={styles.cardContainer}>
                <div className={styles.cardButtons}>
                    <GsuActionsBlock copy={infoMovie} save={infoMovie} share={infoMovie} saveFileName={saveFileName} />
                </div>
                <div className={styles.infoGroup}>
                    {detailedDescription && (
                        <GsuTextContainer Icon={DescriptionIcon} header={"Описание:"} text={detailedDescription} />
                    )}
                    {infoCells.length > 0 && (
                        <GsuInfoContainer Icon={FilmIcon} header={"Данные:"} cells={infoCells} type="default" />
                    )}
                </div>
            </div>
        </GsuWizardResultPage>
    );
};
export default MovieDetails;
