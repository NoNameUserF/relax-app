import {IWizardStep, IGsuInfoContainerCell, IFlow} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC} from "react";
import {GsuWizardResultPage, GsuTextContainer, GsuInfoContainer, GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {IBook} from "../../../api/interfaces";
import {DescriptionIcon, BookDataIcon, LinkGrayIcon} from "../../../assets/Icons";

import styles from "../BooksFinishStep/BookTable/index.module.css";

export interface BooksDetailsState {
    selectedCard: IBook | null;
}

const buildBookActions = (book: IBook, displayQuestions: IGsuInfoContainerCell[]): string => {
    const categories = displayQuestions.reduce((res, el) => `${res}${el.key}: ${el.value}\n`, "*** Категории ***\n");
    const name = `*** ${book.title} ***`;
    const originalTitle = `${book.originalTitle || ""}`;
    const author = `${book.authors?.join(", ") || "Нет данных"}`;
    const releaseYear = `${book.releaseYear || "Нет данных"}`;
    const openLibraryLink = book.openLibraryLink ? `Ссылка на книгу: ${book.openLibraryLink}` : "";
    const description = book.description || "";
    const productLink = `\n\nВыбери себе книгу: ${window.location.href}`;
    return `\n${name}\nОригинальное название: ${originalTitle}\nАвтор(ы): ${author}\nГод издания: ${releaseYear}\n\n${description}\n\n${categories}\n\n${openLibraryLink}${productLink}`;
};

const BooksDetails: FC<IWizardStep<BooksDetailsState>> = ({componentState, wizardState}) => {
    const BOOKS_SCENARIO = wizardState.BOOKS_SCENARIO as IFlow;

    const {selectedCard} = componentState;
    const {displayQuestions} = BOOKS_SCENARIO;

    if (!selectedCard) {
        return <div>Книга не выбрана</div>;
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
    if (selectedCard.releaseYear) {
        infoCells.push({key: "Год издания", value: selectedCard.releaseYear.toString()});
    }

    const allInfoCells = [...infoCells, ...categoryCells];
    const actionData = buildBookActions(selectedCard, categoryCells);

    const originalTitleLine = selectedCard.originalTitle || "";
    const authorsLine = selectedCard.authors?.join(", ") || "";
    const title = selectedCard.title || "Детали книги";
    const saveFileName = `${title.replace(/ /g, "_")}.txt`;

    return (
        <GsuWizardResultPage title={title}>
            <div className={styles.table}>
                <div className={styles.titleBlock}>
                    {originalTitleLine && <h4 className={styles.originTitle}>{originalTitleLine}</h4>}
                    {authorsLine && <p className={styles.author}>{authorsLine}</p>}
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
                            {selectedCard.openLibraryLink && (
                                <a className={styles.link} href={selectedCard.openLibraryLink} target="_blank">
                                    <LinkGrayIcon />
                                    {selectedCard.openLibraryLink}
                                </a>
                            )}
                        </GsuTextContainer>
                    )}
                </div>
                {allInfoCells.length > 0 && (
                    <GsuInfoContainer Icon={BookDataIcon} header={"Данные:"} cells={allInfoCells} type="default" />
                )}
            </div>
        </GsuWizardResultPage>
    );
};

export default BooksDetails;
