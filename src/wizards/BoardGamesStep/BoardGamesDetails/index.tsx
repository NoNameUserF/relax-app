import {FC} from "react";
import {IGsuInfoContainerCell, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuWizardResultPage, GsuInfoContainer, GsuActionsBlock, GsuTextContainer} from "@gsu-ai/gsu-ui-core";

import {BoardGamesList} from "../BoardGamesCardList";
import {BoardGamesBasicInfoState} from "../BoardGamesBasicInfo";
import boardGameWishes from "../../../constants/boardGameWishes";

import {BoardGameDataIcon, DescriptionIcon} from "../../../assets/Icons";
import {buildBoardGameActions} from "../../../helpers/actionsBuilder";
import styles from "../BoardGamesDetails/BoardDetailsStepContent/index.module.css";
export interface GameDetailsState {
    description: string;
    rating: number;
}

const BoardGameDetails: FC<IWizardStep<GameDetailsState>> = ({refresh, wizardState}) => {
    const BASICINFO = wizardState.BOARDGAMESBASICINFO as BoardGamesBasicInfoState;
    const DETAILS = wizardState.BOARDGAMEDETAILS as GameDetailsState;
    const CARDLIST = wizardState.BOARDGAMESCARDLIST as BoardGamesList;

    const selectedGame = CARDLIST.selectedBoardGame;
    const playersLabel = boardGameWishes.players.values[BASICINFO.players].label;

    const title = selectedGame?.title || "Детали настольной игры";

    if (!selectedGame) {
        return <div>Настольная игра не выбрана</div>;
    }

    const actionInfo = buildBoardGameActions(BASICINFO, DETAILS, selectedGame);

    const saveFileName = `${title.replace(/ /g, "_")}.txt`;
    const description = DETAILS?.description || "";

    const infoCells: IGsuInfoContainerCell[] = [
        {
            key: "Жанр",
            value: BASICINFO.genre
                .map((key) => boardGameWishes.genres.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {
            key: "Игровой процесс",
            value: BASICINFO.boardGameProcess
                .map((key) => boardGameWishes.processes.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {
            key: "Тематика",
            value: BASICINFO.theme
                .map((key) => boardGameWishes.themes.values[key]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {key: "Сложность", value: boardGameWishes.rules.values[BASICINFO.rules].label},
        {key: "Возраст", value: selectedGame.age ? `${selectedGame.age}+` : ""},
        {key: "Время игровой сессии", value: boardGameWishes.times.values[BASICINFO.time].label},
        {key: "Количество игроков", value: playersLabel},
        {key: "Рейтинг", value: DETAILS.rating ? DETAILS.rating.toString() : ""},
    ].filter((cell) => cell.value) as IGsuInfoContainerCell[];

    return (
        <GsuWizardResultPage refresh={refresh} title={title}>
            <div className={styles.container}>
                <div className={styles.titleBlock}>
                    <div className={styles.actionsBlock}>
                        <GsuActionsBlock
                            copy={actionInfo}
                            save={actionInfo}
                            share={actionInfo}
                            saveFileName={saveFileName}
                        />
                    </div>
                    {description && (
                        <GsuTextContainer
                            Icon={DescriptionIcon}
                            header={"Описание:"}
                            text={description}
                        ></GsuTextContainer>
                    )}
                </div>
                {infoCells.length > 0 && (
                    <GsuInfoContainer Icon={BoardGameDataIcon} header={"Данные:"} cells={infoCells} type="default" />
                )}
            </div>
        </GsuWizardResultPage>
    );
};

export default BoardGameDetails;
