import {FC, useState} from "react";
import {IOptions, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {GsuCardList, GsuPagination, GsuWizardCardPage} from "@gsu-ai/gsu-ui-core";

import {IActivity} from "../../../api/interfaces";

import {ActivitiesBasicInfoState} from "../../../constants/activitiesWishes";

import ActivitiesCard from "./ActivitiesCard";
import styles from "./index.module.css";
import ActivitiesMap from "./ActivitiesMap";

export interface ActivitiesList {
    activities: IActivity[];
    selectedActivity: IActivity | null;
}

const pagination: IOptions = {
    ACTIVITIES: {label: "Активности"},
    MAP: {label: "На карте"},
};

export const ActivitiesCardList: FC<IWizardStep<ActivitiesList>> = ({
    wizardState,
    componentState,
    change,
    refresh,
    next,
}) => {
    const [paginationKey, setPaginationKey] = useState<string>("ACTIVITIES");

    const activities = componentState.activities;
    const selectedActivity = componentState.selectedActivity;

    const BASICINFO = wizardState.ACTIVITIESBASICINFO as ActivitiesBasicInfoState;
    const cityName = BASICINFO.city?.city;

    const setSelectedActivity = (activity: IActivity | null) => {
        change({...componentState, selectedActivity: activity});
    };

    const handleMarkerClick = (activity: IActivity | null) => {
        setSelectedActivity(activity);
    };

    const nextClickHandler = () => {
        next();
    };

    return (
        <GsuWizardCardPage refresh={refresh} title={"Выберите активность"}>
            <div className={styles.activeCardListWrapper}>
                <div className={styles.toggleContainer}>
                    <GsuPagination activeKey={paginationKey} changeKey={setPaginationKey} options={pagination} />
                </div>

                {paginationKey === "ACTIVITIES" && (
                    <GsuCardList<IActivity>
                        onSelectCard={setSelectedActivity}
                        selectedCard={selectedActivity}
                        cards={activities}
                        uid={"name"}
                        CardComponent={(card) => (
                            <ActivitiesCard card={card} nextClickHandler={nextClickHandler} city={cityName} />
                        )}
                    />
                )}

                {paginationKey === "MAP" && (
                    <div className={styles.map}>
                        <ActivitiesMap
                            points={activities}
                            selectedMarker={selectedActivity}
                            activeElementToggler={paginationKey}
                            setActiveElementToggler={setPaginationKey}
                            onMarkerClick={handleMarkerClick}
                            nextClickHandler={nextClickHandler}
                            city={cityName}
                        />
                    </div>
                )}
            </div>
        </GsuWizardCardPage>
    );
};
export default ActivitiesCardList;
