import {IVideoGame} from "../../../../api/interfaces";

import styles from "./index.module.css";
import commonStyles from "../../../styles/index.module.css"
import { ContentCardYear } from "../../../../assets/Icons";

const GamesCard = ({card}: {card: IVideoGame}) => {
    return (
        <div className={commonStyles.contentCardContainer}>
            <h6 className={styles.gameCardTitle}>{card.title}</h6>
            <div className={commonStyles.contentCardContent}>
                <div className={commonStyles.contentCardContentIcons}>
                  <div className={commonStyles.contentCardContentItem}>
                      <ContentCardYear/>
                      <p>{card.releaseYear}</p>
                  </div>
                </div>
            </div>
            <div className={commonStyles.contentCardContentInfo}>
                <p>
                    Жанр: <span>{card.videoGameGenre}</span>
                </p>
                <p>
                    Страна: <span>{card.country}</span>
                </p>
            </div>
            <p className={commonStyles.contentCardContentDescription}>{card.briefDescription}</p>
        </div>
    );
};

export default GamesCard;
