import {IWizardStep, IGsuInfoContainerCell, IFlow} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC} from "react";
import {GsuWizardResultPage, GsuTextContainer, GsuInfoContainer, GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {IVideo} from "../../../api/interfaces";
import {DescriptionIcon, VideoDataIcon, LinkGrayIcon} from "../../../assets/Icons";

import styles from "../VideoFinishStep/VideoTable/index.module.css";

export interface VideoDetailsState {
    selectedCard: IVideo | null;
}

const buildVideoActions = (video: IVideo, categoryCells: IGsuInfoContainerCell[]): string => {
    const categories = categoryCells.reduce((res, el) => `${res}${el.key}: ${el.value}\n`, "*** Категории ***\n");
    const name = `*** ${video.title} ***`;
    const author = `Автор: ${video.author || "Нет данных"}`;
    const publishedAt = `Дата публикации: ${video.publishedAt || "Нет данных"}`;
    const videoUrl = video.videoUrl ? `Ссылка на видео: ${video.videoUrl}` : "";
    const description = video.description || "";
    const productLink = `\n\nВыбери себе видео: ${window.location.href}`;
    return `\n${name}\n${author}\n${publishedAt}\n\n${description}\n\n${categories}\n\n${videoUrl}${productLink}`;
};

const VideoDetails: FC<IWizardStep<VideoDetailsState>> = ({componentState, wizardState}) => {
    const VIDEO_SCENARIO = wizardState.VIDEO_SCENARIO as IFlow;

    const {selectedCard} = componentState;
    const {displayQuestions} = VIDEO_SCENARIO;

    if (!selectedCard) {
        return <div>Видео не выбрано</div>;
    }

    const categoryCells: IGsuInfoContainerCell[] =
        displayQuestions
            ?.map((el) => {
                return el.answerLabel
                    ? {key: el.questionLabel, value: el.answerLabel}
                    : {key: el.questionLabel, value: el.answersLabels?.join(", ") || ""};
            })
            .filter((cell) => cell.value) || [];

    const infoCells: IGsuInfoContainerCell[] = [];
    if (selectedCard.publishedAt) {
        infoCells.push({key: "Дата публикации", value: selectedCard.publishedAt});
    }

    const allInfoCells = [...infoCells, ...categoryCells];
    const actionData = buildVideoActions(selectedCard, categoryCells);

    const title = selectedCard.title || "Детали видео";
    const saveFileName = `${title.replace(/ /g, "_")}.txt`;
    const authorLine = selectedCard.author || "";

    return (
        <GsuWizardResultPage title={title}>
            <div className={styles.table}>
                <div className={styles.titleBlock}>
                    {authorLine && <p className={styles.author}>{authorLine}</p>}
                    <div className={styles.actionsBlock}>
                        <GsuActionsBlock
                            copy={actionData}
                            save={actionData}
                            share={actionData}
                            saveFileName={saveFileName}
                        />
                    </div>
                    {selectedCard.description && (
                        <GsuTextContainer Icon={DescriptionIcon} header={"Описание:"} text={selectedCard.description}>
                            {selectedCard.videoUrl && (
                                <a className={styles.link} href={selectedCard.videoUrl} target="_blank">
                                    <LinkGrayIcon />
                                    {selectedCard.videoUrl}
                                </a>
                            )}
                        </GsuTextContainer>
                    )}
                    {!selectedCard.description && selectedCard.videoUrl && (
                        <a className={styles.link} href={selectedCard.videoUrl} target="_blank">
                            <LinkGrayIcon />
                            {selectedCard.videoUrl}
                        </a>
                    )}
                </div>
                {allInfoCells.length > 0 && (
                    <GsuInfoContainer Icon={VideoDataIcon} header={"Данные:"} cells={allInfoCells} type="default" />
                )}
            </div>
        </GsuWizardResultPage>
    );
};

export default VideoDetails;
