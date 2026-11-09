import {formatDuration, GsuButton} from "@gsu-ai/gsu-ui-core";

import {IActivity} from "../../../../api/interfaces";
import {ClockGreyIcon, CloseMapIcon, GoogleMapsLogo, WalletIcon} from "../../../../assets/Icons";

import formatPrice from "../ActivitiesMap/utils/formatPrice";

import getParseUrl from "../ActivitiesMap/utils/getParseUrl";

import commonStyles from "../../../styles/index.module.css";

import styles from "./index.module.css";

interface ICardActivity {
    card: IActivity;
    isMap?: boolean;
    clickCloseButton?: () => void;
    nextClickHandler: () => void;
    city: string | undefined;
}

const ActivitiesCard = ({card, isMap = false, clickCloseButton, nextClickHandler, city}: ICardActivity) => {
    const url = getParseUrl({originalName: card.originalName, city});

    return (
        <div className={commonStyles.contentCardContainer}>
            <h6 className={styles.activitiesCardTitle}>{card.name}</h6>
            <div className={commonStyles.contentCardContent}>
                <div className={commonStyles.contentCardContentIcons}>
                    <div className={commonStyles.contentCardContentItem}>
                        <ClockGreyIcon />
                        <p className={styles.activitiesCardDuration}>{formatDuration(card.duration)}</p>
                    </div>
                    <div className={commonStyles.contentCardContentItem}>
                        <WalletIcon />
                        <p>{formatPrice(card.price)}</p>
                    </div>
                </div>
                <div className={commonStyles.contentCardContentInfo}>
                    <p>
                        Оригинальное название: <span>{card.originalName}</span>
                    </p>
                    <p>
                        Вид активности: <span className={styles.activitiesCardType}>{card.type}</span>
                    </p>
                </div>
            </div>
            <p className={commonStyles.contentCardContentDescription}>{card.description}</p>

            {isMap && (
                <>
                    <div className={styles.googleLogoWrapper}>
                        {url ? (
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <GoogleMapsLogo />
                            </a>
                        ) : (
                            <GoogleMapsLogo />
                        )}
                    </div>

                    <GsuButton
                        text="ПОДРОБНЕЕ"
                        style={"primary"}
                        onClick={nextClickHandler}
                        btnClassName={styles.activitiesCardButton}
                    />
                    <button onClick={clickCloseButton} className={styles.activitiesCardCloseButton}>
                        <CloseMapIcon />
                    </button>
                </>
            )}
        </div>
    );
};

export default ActivitiesCard;
