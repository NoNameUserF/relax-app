import {IBook} from "../../../../api/interfaces";
import {CalendarGrayIcon} from "../../../../assets/Icons";

import commonStyles from "../../../styles/index.module.css";

const BookCard = ({card}: {card: IBook}) => {
    return (
        <div className={commonStyles.contentCardContainer}>
            <div className={commonStyles.contentCardHeaderContainer}>
                <h6>{card.title}</h6>
                <p className={commonStyles.author}>{card.authors.join(", ")}</p>
            </div>
            <div className={commonStyles.contentCardContent}>
                <div className={commonStyles.contentCardContentIcons}>
                    <div className={commonStyles.contentCardContentItem}>
                        <CalendarGrayIcon />
                        <p>{card.releaseYear}</p>
                    </div>
                </div>
                <div className={commonStyles.contentCardContentInfo}>
                    <p>
                        Оригинальное название: <span>{card.originalTitle}</span>
                    </p>
                </div>
            </div>
            <p className={commonStyles.contentCardContentDescription}>{card.description}</p>
        </div>
    );
};

export default BookCard;
