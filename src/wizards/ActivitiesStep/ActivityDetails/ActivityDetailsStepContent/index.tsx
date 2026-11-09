import {FC} from "react";

import {GsuActionsBlock} from "@gsu-ai/gsu-ui-core";

import {ActivitiesBasicInfoState, IActivityDetails} from "../../../../constants/activitiesWishes";
import {IActivity} from "../../../../api/interfaces";

import {GoogleMapsLogo, WalletIcon} from "../../../../assets/Icons";

import {buildActivityActions} from "../../../../helpers/actionsBuilder";

import formatPrice from "../../ActivitiesCardList/ActivitiesMap/utils/formatPrice";

import styles from "./index.module.css";

export interface ActivityDetailsStepContentProps {
    basicInfo: ActivitiesBasicInfoState;
    selectedActivity: IActivity | null;
    details: IActivityDetails;
}

const ActivityDetailsStepContent: FC<ActivityDetailsStepContentProps> = ({basicInfo, selectedActivity, details}) => {
    const actionInfo = buildActivityActions({basicInfo, selectedActivity, details});

    return (
        <div className={styles.activityDetailsContainer}>
            <h4 className={styles.activityDetailsOriginalName}>{selectedActivity?.originalName}</h4>
            <div className={styles.activityDetailsActionBlock}>
                <div className={styles.activityDetailsActionBlock}>
                    <WalletIcon />
                    <p className={styles.activityDetailPrice}>{formatPrice(selectedActivity?.price)}</p>
                </div>
                <GsuActionsBlock copy={actionInfo} save={actionInfo} share={actionInfo} saveFileName={"cartActivity"} />
            </div>
            <p className={styles.activityDetailsDescription}>{details?.fullDescription}</p>
            <div className={styles.googleLogoWrapper}>
                <GoogleMapsLogo />
            </div>
        </div>
    );
};
export default ActivityDetailsStepContent;
