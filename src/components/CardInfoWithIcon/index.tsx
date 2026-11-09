import {CommentIcon, LikeIcon, ViewIcon, CalendarGrayIcon} from "../../assets/Icons";
import {IVideo, IBook} from "../../api/interfaces";

import styles from "./index.module.css";

interface CardInfoWithIconProps {
    card: IVideo | IBook;
}

type InfoItem = {
    icon: JSX.Element;
    value: string | number;
};

const CardInfoWithIcon = ({card}: CardInfoWithIconProps) => {
    const infoWithIcon: InfoItem[] = [];

    if ("likeCount" in card) {
        infoWithIcon.push({icon: <LikeIcon />, value: card.likeCount});
    }
    if ("viewCount" in card) {
        infoWithIcon.push({icon: <ViewIcon />, value: card.viewCount});
    }
    if ("commentCount" in card) {
        infoWithIcon.push({icon: <CommentIcon />, value: card.commentCount});
    }
    if ("releaseYear" in card) {
        infoWithIcon.push({icon: <CalendarGrayIcon />, value: card.releaseYear});
    }

    return (
        <div className={styles.iconsBlock}>
            {infoWithIcon.map((el, index) => (
                <p key={index} className={styles.iconsBlockCount}>
                    {el.icon} {el.value}
                </p>
            ))}
        </div>
    );
};

export default CardInfoWithIcon;
