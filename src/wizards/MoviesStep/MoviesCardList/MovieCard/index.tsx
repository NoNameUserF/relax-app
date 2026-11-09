import {formatDuration} from "@gsu-ai/gsu-ui-core";

import {IMovie} from "../../../../api/interfaces";

import styles from "../../../styles/index.module.css";
import {ContentCardTime, ContentCardYear} from "../../../../assets/Icons";

const MovieCard = ({card}: {card: IMovie}) => {
    const userAge = card.ageRating;

    const renderList = (list?: string[], fallback: string = "отсутствует") =>
        list && list.length > 0 ? list.join(", ") : fallback;

    const renderValue = (value?: string, fallback: string = "—") => (value && value.trim() !== "" ? value : fallback);

    if (!userAge) {
        return (
            <div className={styles.contentCardContainer}>
                <div className={styles.contentCardHeaderContainer}>
                    <h6>{renderValue(card.title)}</h6>
                    <p>{renderValue(card.contentType)}</p>
                </div>
                <div className={styles.contentCardContent}>
                    <div className={styles.contentCardContentIcons}>
                        <div className={styles.contentCardContentItem}>
                            <ContentCardYear />
                            <p>{renderValue(card.releaseYear)}</p>
                        </div>
                        <div className={styles.contentCardContentItem}>
                            <ContentCardTime />
                            <p>{formatDuration(card.duration)}</p>
                        </div>
                    </div>
                    <div className={styles.contentCardContentInfo}>
                        <p>
                            Жанр: <span>{renderList(card.genres)}</span>
                        </p>
                        <p>
                            Режиссёр: <span>{renderValue(card.director)}</span>
                        </p>
                        <p>
                            Актёры: <span>{renderList(card.cast)}</span>
                        </p>
                    </div>
                </div>
                {card.description && (
                    <p className={styles.contentCardContentDescription}>{renderValue(card.description)}</p>
                )}
            </div>
        );
    }

    return (
        <div className={styles.contentCardContainer}>
            <div className={styles.contentCardHeaderContainer}>
                <h6>{renderValue(card.title)}</h6>
                <p>{renderValue(card.contentType)}</p>
            </div>
            <div className={styles.contentCardContent}>
                <div className={styles.contentCardContentIcons}>
                    <div className={styles.contentCardContentItem}>
                        <ContentCardYear />
                        <p>{renderValue(card.releaseYear)}</p>
                    </div>
                    <div className={styles.contentCardContentItem}>
                        <ContentCardTime />
                        <p>{formatDuration(card.duration)}</p>
                    </div>
                </div>
                <div className={styles.contentCardContentInfo}>
                    <p>
                        Возраст: <span>{renderValue(card.ageRating)}</span>
                    </p>
                    <p>
                        Жанр: <span>{renderList(card.genres)}</span>
                    </p>
                    <p>
                        Страна: <span>{renderValue(card.country)}</span>
                    </p>
                </div>
            </div>
            {card.description && (
                <p className={styles.contentCardContentDescription}>{renderValue(card.description)}</p>
            )}
        </div>
    );
};

export default MovieCard;
