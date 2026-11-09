import {RefreshRequestIcon} from "@gsu-ai/gsu-ui-core";

import styles from "./index.module.css";

interface ActivitiesCardListHeaderProps {
    tableName: string;
    refresh: () => void;
}

const ActivitiesCardListHeader = ({tableName, refresh}: ActivitiesCardListHeaderProps) => {
    return (
        <>
            <div className={styles.activitiesHeader}>
                <h1 className={styles.activitiesDescription}>{tableName}</h1>
                <div className={styles.activitiesButtons}>
                    <button className={styles.activitiesHeaderRefresh} onClick={refresh}>
                        <RefreshRequestIcon />
                        <p className={styles.activitiesRefreshDescription}>Сгенерировать заново</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ActivitiesCardListHeader;
