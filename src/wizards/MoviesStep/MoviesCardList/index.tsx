import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuCardList, GsuWizardCardPage} from "@gsu-ai/gsu-ui-core";

import {IMovie} from "../../../api/interfaces";

import MovieCard from "./MovieCard";

export interface MoviesList {
    moviesList: IMovie[];
    selectedMovie: IMovie | null;
}

export const MoviesCardList: FC<IWizardStep<MoviesList>> = ({componentState, change, refresh}) => {
    const moviesList = componentState.moviesList;
    const selectedMovie = componentState.selectedMovie;

    const title = "Выберите что посмотреть";

    const setSelectedMovie = (movie: IMovie) => {
        change({...componentState, selectedMovie: movie});
    };

    return (
        <GsuWizardCardPage refresh={refresh} title={title}>
            <GsuCardList<IMovie>
                CardComponent={(card) => <MovieCard card={card} />}
                onSelectCard={setSelectedMovie}
                selectedCard={selectedMovie}
                cards={moviesList}
                uid={"title"}
            />
        </GsuWizardCardPage>
    );
};

export default MoviesCardList;
