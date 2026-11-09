import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuCardList, GsuWizardCardPage} from "@gsu-ai/gsu-ui-core";

import {IBook} from "../../../api/interfaces";

import BookCard from "./BookCard";

export interface BooksListState {
    cards: IBook[];
    selectedCard: IBook | null;
}

export const BooksCardList: FC<IWizardStep<BooksListState>> = ({componentState, change, refresh}) => {
    const cards = componentState.cards;
    const selectedCard = componentState.selectedCard;

    const setSelectedCard = (card: IBook) => {
        change({...componentState, selectedCard: card});
    };
    return (
        <GsuWizardCardPage refresh={refresh} title="Выберите книгу">
            <GsuCardList
                CardComponent={(card) => <BookCard card={card} />}
                onSelectCard={setSelectedCard}
                selectedCard={selectedCard}
                cards={cards}
                uid={"openLibraryLink"}
            />
        </GsuWizardCardPage>
    );
};

export default BooksCardList;
