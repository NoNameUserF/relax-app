import {formatDuration} from "@gsu-ai/gsu-ui-core";

import {IBoardGame} from "../../../../api/interfaces";

import {OneIcon, Timer2Icon} from "../../../../assets/Icons";

import commonStyles from "../../../styles/index.module.css";

import styles from "./index.module.css";

const BoardGamesCard = ({card}: {card: IBoardGame}) => {
    return (
        <div className={commonStyles.contentCardContainer}>
            <h6 className={styles.boardGameCardTitle}>{card.title}</h6>
            <div className={commonStyles.contentCardContent}>
                <div className={commonStyles.contentCardContentIcons}>
                    <div className={commonStyles.contentCardContentItem}>
                        <OneIcon />
                        <p>{card.playersCount}</p>
                    </div>
                    <div className={commonStyles.contentCardContentItem}>
                        <Timer2Icon />
                        <p>{formatDuration(card.oneBatchTime)}</p>
                    </div>
                </div>
                <div className={commonStyles.contentCardContentInfo}>
                    <p>
                        Оригинальное название: <span>{card.originalLangTitle}</span>
                    </p>
                    <p>
                        Возраст: <span>{`${card.age}+`}</span>
                    </p>
                    <p>
                        Жанр: <span>{card.genre}</span>
                    </p>
                </div>
            </div>
            <p className={commonStyles.contentCardContentDescription}>{`${card.briefDescription}`}</p>
        </div>
    );
};

export default BoardGamesCard;
