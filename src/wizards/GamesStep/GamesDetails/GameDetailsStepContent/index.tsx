import {FC} from "react";

import GameDetailsHeader from "../GamesDetailsHeader";
import {DetailsStepContentProps} from "../../../../types/BoardGameDetails";

import styles from "./index.module.css";

const GameDetailsStepContent: FC<DetailsStepContentProps> = ({basicInfo, details, selectedGame}) => {
    return (
        <div className={styles.container}>
            <GameDetailsHeader basicInfo={basicInfo} details={details} selectedGame={selectedGame} />
            {/*<p className={styles.desc}>{details?.description}</p>*/}
        </div>
    );
};

export default GameDetailsStepContent;
