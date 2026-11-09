import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuCardList, GsuWizardCardPage} from "@gsu-ai/gsu-ui-core";

import {IBoardGame} from "../../../api/interfaces";

import BoardGamesCard from "./BoardGamesCard";

export interface BoardGamesList {
    boardGames: IBoardGame[];
    selectedBoardGame: IBoardGame | null;
    excludeList: string[];
}

const BoardGamesCardList: FC<IWizardStep<BoardGamesList>> = ({componentState, change, refresh}) => {
    const boardGames = componentState.boardGames;
    const selectedBoardGames = componentState.selectedBoardGame;

    const setSelectedPlace = (boardGame: IBoardGame) => {
        change({...componentState, selectedBoardGame: boardGame});
    };

    return (
        <GsuWizardCardPage refresh={refresh} title="Выберите настольную игру">
            <GsuCardList<IBoardGame>
                CardComponent={(card) => <BoardGamesCard card={card} />}
                onSelectCard={setSelectedPlace}
                selectedCard={selectedBoardGames}
                cards={boardGames}
                uid={"title"}
            />
        </GsuWizardCardPage>
    );
};

export default BoardGamesCardList;
