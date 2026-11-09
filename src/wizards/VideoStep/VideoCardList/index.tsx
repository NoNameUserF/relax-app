import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuCardList, GsuWizardCardPage} from "@gsu-ai/gsu-ui-core";

import {IVideo} from "../../../api/interfaces";

import VideoCard from "./VideoCard";

export interface VideoListState {
    cards: IVideo[];
    selectedCard: IVideo | null;
}

export const VideoCardList: FC<IWizardStep<VideoListState>> = ({componentState, change, refresh}) => {
    const cards = componentState.cards;
    const selectedCard = componentState.selectedCard;

    const setSelectedCard = (card: IVideo) => {
        change({...componentState, selectedCard: card});
    };

    return (
        <GsuWizardCardPage refresh={refresh} title="Выберите видео">
            <GsuCardList
                CardComponent={(card) => <VideoCard card={card} />}
                onSelectCard={setSelectedCard}
                selectedCard={selectedCard}
                cards={cards}
                uid={"videoUrl"}
            />
        </GsuWizardCardPage>
    );
};

export default VideoCardList;
