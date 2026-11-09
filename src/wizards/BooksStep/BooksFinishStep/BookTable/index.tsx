import {FC} from "react";

import {GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {IBook} from "../../../../api/interfaces";
import {LinkGrayIcon} from "../../../../assets/Icons";

import CardInfoWithIcon from "../../../../components/CardInfoWithIcon";

import styles from "./index.module.css";

interface BookTableProps {
    selectedCard: IBook;
    displayQuestions: IGsuInfoContainerCell[];
}

const BookTable: FC<BookTableProps> = ({selectedCard, displayQuestions}) => {
    const categories = displayQuestions.reduce((res, el) => {
        return `${res}${el.key}: ${el.value}\n`;
    }, "*** Категории ***\n");
    const name = `*** ${selectedCard?.title} ***`;
    const originalTitle = `${selectedCard?.originalTitle}`;
    const author = `${selectedCard?.authors.join(", ")}`;
    const releaseYear = `${selectedCard?.releaseYear}`;
    const openLibraryLink = selectedCard ? `Ссылка на книгу: ${selectedCard.openLibraryLink}` : "";
    const description = selectedCard?.description;
    const result = `\n${name}\n${originalTitle}\n${author}\n${releaseYear}\n${description}\n\n${categories}\n\n${openLibraryLink}`;

    return (
        <div className={styles.table}>
            <div className={styles.titleBlock}>
                <h4 className={styles.originalTitle}>{selectedCard?.originalTitle}</h4>
                <p className={styles.author}>{selectedCard?.authors.join(", ")}</p>
            </div>
            <div className={styles.actionsBlock}>
                <CardInfoWithIcon card={selectedCard} />
                <GsuActionsBlock copy={result} save={result} share={result} saveFileName={selectedCard?.title} />
            </div>

            <p className={styles.description}>{selectedCard?.description}</p>
            <a className={styles.link} href={selectedCard?.openLibraryLink} target="_blank">
                <LinkGrayIcon />
                {selectedCard.openLibraryLink}
            </a>
        </div>
    );
};

export default BookTable;
