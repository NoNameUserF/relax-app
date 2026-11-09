import {IWizardStep, IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC} from "react";
import {GsuWizardResultPage, GsuTextContainer, GsuInfoContainer, GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {IVideoGame} from "../../../api/interfaces";
import {DescriptionIcon, GameDataIcon} from "../../../assets/Icons";
import {buildVideoGameActions} from "../../../helpers/actionsBuilder";

import {GamesBasicInfoState} from "../GamesBasicInfo";
import {VideoGamesList} from "../GamesCardList";
import videoGameWishes from "../../../constants/videoGameWishes";

import styles from "../GamesDetails/GameDetailsStepContent/index.module.css";

export interface VideoGameDetailsState {
    detailedDescription: string | null;
    rating: number;
}

const GameDetails: FC<IWizardStep<VideoGameDetailsState>> = ({refresh, wizardState}) => {
    const BASICINFO = wizardState.GAMESBASICINFO as GamesBasicInfoState;
    const DETAILS = wizardState.VIDEOGAMEDETAILS as VideoGameDetailsState;
    const CARDLIST = wizardState.VIDEOGAMESCARDLIST as VideoGamesList;

    const selectedGame = CARDLIST.selectedVideoGame as IVideoGame | undefined;

    const title = selectedGame?.title || "Детали игры";
    const briefDescription = selectedGame?.briefDescription;

    if (!selectedGame) {
        return <div>Игра не выбрана</div>;
    }
    const saveFileName = `${title.replace(/ /g, "_")}.txt`;

    const infoGame = buildVideoGameActions(BASICINFO, DETAILS, selectedGame);

    const infoCells: IGsuInfoContainerCell[] = [
        {key: "Жанр", value: selectedGame.videoGameGenre || "Жанр игры отсутствует"},
        {key: "Год", value: selectedGame.releaseYear || "Год отсутствует"},
        {key: "Страна", value: selectedGame.country || "Страна отсутствует"},
        {
            key: "Игровой мир",
            value: BASICINFO.worldSetting
                .map((key) => videoGameWishes.worldSettings.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {key: "Режим игры", value: videoGameWishes.formats.values[BASICINFO.format]?.label || "Режим игры отсутствует"},
        {
            key: "Сложность",
            value: videoGameWishes.difficultyLevels.values[BASICINFO.difficultyLevel]?.label || "Сложность отсутствует",
        },
    ].filter((cell) => cell.value) as IGsuInfoContainerCell[];

    return (
        <GsuWizardResultPage refresh={refresh} title={title}>
            <div className={styles.cardContainer}>
                <div className={styles.titleBlock}>
                    <div className={styles.cardButtons}>
                        <GsuActionsBlock copy={infoGame} save={infoGame} share={infoGame} saveFileName={saveFileName} />
                    </div>
                    {briefDescription && briefDescription.length > 0 && (
                        <GsuTextContainer Icon={DescriptionIcon} header={"Описание:"} text={briefDescription} />
                    )}
                </div>
                {infoCells.length > 0 && (
                    <GsuInfoContainer Icon={GameDataIcon} header={"Данные:"} cells={infoCells} type="default" />
                )}
            </div>
        </GsuWizardResultPage>
    );
};

export default GameDetails;
