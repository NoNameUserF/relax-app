import {IVideo} from "../../../../api/interfaces";
import {CommentIcon, LikeIcon, SandglassIcon, ViewIcon} from "../../../../assets/Icons";
import formatCardInfo from "../../../../helpers/formatCardInfo";

import commonStyles from "../../../styles/index.module.css";

import styles from "./index.module.css";

const VideoCard = ({card}: {card: IVideo}) => {
    return (
        <div className={commonStyles.contentCardContainer}>
            <div className={styles.preview}>
                <img className={styles.previewImage} src={card.thumbnailsUrlMedium} alt={card.title} />
                <div className={styles.previewDurationBlock}>
                    <SandglassIcon /> <p className={styles.previewDurationText}>{card.duration} мин</p>
                </div>
            </div>
            <h6 className={styles.title}>{card.title}</h6>
            <div className={commonStyles.contentCardContent}>
                <div className={commonStyles.contentCardContentIcons}>
                    <div className={commonStyles.contentCardContentItem}>
                        <LikeIcon />
                        <p>{formatCardInfo(card.likeCount)}</p>
                    </div>
                    <div className={commonStyles.contentCardContentItem}>
                        <ViewIcon />
                        <p>{formatCardInfo(card.viewCount)}</p>
                    </div>
                    <div className={commonStyles.contentCardContentItem}>
                        <CommentIcon />
                        <p>{formatCardInfo(card.commentCount)}</p>
                    </div>
                </div>
                <div className={commonStyles.contentCardContentInfo}>
                    <p>
                        Дата публикации: <span>{card.publishedAt}</span>
                    </p>
                    <p>
                        Автор: <span>{card.author}</span>
                    </p>
                </div>
            </div>
            <p className={commonStyles.contentCardContentDescription}>{card.description}</p>
        </div>
    );
};

export default VideoCard;
