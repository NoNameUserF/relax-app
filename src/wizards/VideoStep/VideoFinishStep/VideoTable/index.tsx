import {FC} from "react";

import {GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {IVideo} from "../../../../api/interfaces";
import {LinkGrayIcon} from "../../../../assets/Icons";

import CardInfoWithIcon from "../../../../components/CardInfoWithIcon";

import styles from "./index.module.css";

interface VideoTableProps {
    selectedCard: IVideo;
    displayQuestions: IGsuInfoContainerCell[];
}

const VideoTable: FC<VideoTableProps> = ({selectedCard, displayQuestions}) => {
    const categories = displayQuestions.reduce((res, el) => {
        return `${res}${el.key}: ${el.value}\n`;
    }, "*** Категории ***\n");
    const name = `*** ${selectedCard?.title} ***`;
    const author = `${selectedCard?.author}`;
    const publishedAt = `${selectedCard?.publishedAt}`;
    const description = selectedCard?.description;
    const videoUrl = selectedCard ? `Ссылка на видео: ${selectedCard.videoUrl}` : "";
    const result = `\n${name}\n${author}\n${publishedAt}\n${description}\n\n${categories}\n\n${videoUrl}`;

    return (
        <div className={styles.table}>
            <div className={styles.actionsBlock}>
                <CardInfoWithIcon card={selectedCard} />
                <GsuActionsBlock copy={result} save={result} share={result} saveFileName={name} />
            </div>
            <p className={styles.description}>{selectedCard.description}</p>
            <a className={styles.link} href={selectedCard.videoUrl} target="_blank">
                <LinkGrayIcon />
                {selectedCard.videoUrl}
            </a>
        </div>
    );
};

export default VideoTable;
