import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuCardList, GsuWizardCardPage} from "@gsu-ai/gsu-ui-core";

import {IVideoGame} from "../../../api/interfaces";

import GamesCard from "./GamesCard";

export interface VideoGamesList {
    videoGames: IVideoGame[];
    selectedVideoGame: IVideoGame | null;
    excludeList: string[];
}

export const GamesCardList: FC<IWizardStep<VideoGamesList>> = ({componentState, change, refresh}) => {
    const videoGames = componentState.videoGames;
    const selectedVideoGame = componentState.selectedVideoGame;

    const setSelectedVideoGame = (videoGame: IVideoGame) => {
        change({...componentState, selectedVideoGame: videoGame});
    };

    return (
        <GsuWizardCardPage refresh={refresh} title="Выберите компьютерную игру">
            <GsuCardList<IVideoGame>
                CardComponent={(card) => <GamesCard card={card} />}
                onSelectCard={setSelectedVideoGame}
                selectedCard={selectedVideoGame}
                cards={videoGames}
                uid={"title"}
            />
        </GsuWizardCardPage>
    );
};

export default GamesCardList;
