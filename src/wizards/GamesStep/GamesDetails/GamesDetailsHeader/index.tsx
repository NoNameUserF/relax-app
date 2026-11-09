import {FC} from "react";

import {GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {DetailsStepContentProps} from "../../../../types/BoardGameDetails";
import {buildVideoGameActions} from "../../../../helpers/actionsBuilder";

import styles from "./index.module.css";

const GamesDetailsHeader: FC<DetailsStepContentProps> = ({basicInfo, details, selectedGame}) => {
    const actionInfo = buildVideoGameActions(basicInfo, details, selectedGame);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <GsuActionsBlock copy={actionInfo} save={actionInfo} share={actionInfo} saveFileName={"cart"} />
            </div>
        </div>
    );
};

export default GamesDetailsHeader;
