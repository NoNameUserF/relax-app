import {FC} from "react";

import {GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {MovieDetailsState} from "..";

import {buildMovieActions} from "../../../../helpers/actionsBuilder";

import styles from "./index.module.css";

const CartTable: FC<MovieDetailsState> = ({selectedMovie, moviesBasicInfoState, detailedDescription}) => {
    const infoMovie = buildMovieActions(moviesBasicInfoState, selectedMovie);

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardButtons}>
                <GsuActionsBlock copy={infoMovie} save={infoMovie} share={infoMovie} saveFileName={"movie"} />
            </div>

            <div className={styles.infoGroup}>
                {selectedMovie?.cast && <p>Актеры: {selectedMovie.cast}</p>}
                <p>{detailedDescription?.detailedDescription}</p>
            </div>
        </div>
    );
};

export default CartTable;
