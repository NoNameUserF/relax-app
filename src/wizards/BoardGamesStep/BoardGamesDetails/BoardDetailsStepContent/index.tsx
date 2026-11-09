import {FC} from "react";

import BoardGamesDetailsHeader from "../BoardGamesDetailsHeader";
import {BoardGameDetailsCommonProps} from "../../../../types/BoardGameDetails";

import styles from "./index.module.css";

const BoardDetailsStepContent: FC<BoardGameDetailsCommonProps> = ({players, basicInfo, details, selectedGame}) => {
    return (
        <div className={styles.container}>
            <BoardGamesDetailsHeader
                players={players}
                basicInfo={basicInfo}
                details={details}
                selectedGame={selectedGame}
            />
            <p className={styles.desc}>{details?.description}</p>
        </div>
    );
};

export default BoardDetailsStepContent;
