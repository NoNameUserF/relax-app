import {GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {FC} from "react";

import {OneIcon} from "../../../../assets/Icons";

import {BoardGameDetailsCommonProps} from "../../../../types/BoardGameDetails";
import {buildBoardGameActions} from "../../../../helpers/actionsBuilder";

import styles from "./index.module.css";

const BoardGamesDetailsHeader: FC<BoardGameDetailsCommonProps> = ({players, basicInfo, details, selectedGame}) => {
    const actionInfo = buildBoardGameActions(basicInfo, details, selectedGame);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerLeft}>
                <OneIcon />
                <label>{players}</label>
            </div>
            <div className={styles.headerRight}>
                <GsuActionsBlock copy={actionInfo} save={actionInfo} share={actionInfo} saveFileName={"cart"} />
            </div>
        </div>
    );
};

export default BoardGamesDetailsHeader;
