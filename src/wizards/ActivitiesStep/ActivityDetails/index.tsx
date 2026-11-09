import {FC} from "react";
import {IGsuInfoContainerCell, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {
    formatDuration,
    GsuActionsBlock,
    GsuInfoContainer,
    GsuTextContainer,
    GsuWizardResultPage,
} from "@gsu-ai/gsu-ui-core";

import {ActivitiesBasicInfoState, activitiesWishes, IActivityDetails} from "../../../constants/activitiesWishes";
import {ActivitiesList} from "../ActivitiesCardList";

import {ActiveDataIcon, DescriptionMarkerIcon, GoogleMapsLogo} from "../../../assets/Icons";
import {buildActivityActions} from "../../../helpers/actionsBuilder";
import formatPrice from "../ActivitiesCardList/ActivitiesMap/utils/formatPrice";

import styles from "../ActivityDetails/ActivityDetailsStepContent/index.module.css";
import getParseUrl from "../ActivitiesCardList/ActivitiesMap/utils/getParseUrl";

const ActivityDetails: FC<IWizardStep<IActivityDetails>> = ({componentState, wizardState, refresh}) => {
    const BASICINFO = wizardState?.["ACTIVITIESBASICINFO"] as ActivitiesBasicInfoState;
    const ACTIVITIESCARDLIST = wizardState?.["ACTIVITIESCARDLIST"] as ActivitiesList;

    const selectedActivity = ACTIVITIESCARDLIST?.selectedActivity;
    const details = componentState;
    const title = selectedActivity?.name || "Детали aктивности";

    const city = BASICINFO?.city?.city;

    const actionInfo = buildActivityActions({basicInfo: BASICINFO, selectedActivity, details});
    const originalName = ACTIVITIESCARDLIST.selectedActivity?.originalName;

    const url = getParseUrl({originalName, city});

    if (!selectedActivity) {
        return <div>Активность не выбрана</div>;
    }

    const activityTypes = BASICINFO?.typeOfActivities;

    const infoCells: IGsuInfoContainerCell[] = [
        {
            key: "Длительность",
            value: formatDuration(selectedActivity.duration) || "Длительность отсутствует",
        },
        {
            key: "Стоимость",
            value: selectedActivity.price ? formatPrice(selectedActivity.price) : "Бесплатно",
        },
        {
            key: "Вид активности",
            value:
                activityTypes
                    ?.map((key) => activitiesWishes.TYPE_OF_ACTIVITIES[key]?.label)
                    .filter(Boolean)
                    .join(", ") || "Вид активности отсутствует",
        },
    ].filter((cell) => cell.value) as IGsuInfoContainerCell[];

    const originalNameLine = selectedActivity.originalName || "";
    const description = details?.fullDescription || "";
    const saveFileName = `${title.replace(/ /g, "_")}.txt`;

    return (
        <GsuWizardResultPage refresh={refresh} title={title}>
            <div className={styles.activityDetailsContainer}>
                <div className={styles.activityDetailTitleBlock}>
                    {originalNameLine && <h4 className={styles.activityDetailTitle}>{originalNameLine}</h4>}
                    <div className={styles.activityDetailsActionBlock}>
                        <GsuActionsBlock
                            copy={actionInfo}
                            save={actionInfo}
                            share={actionInfo}
                            saveFileName={saveFileName}
                        />
                    </div>
                    {description && (
                        <GsuTextContainer Icon={DescriptionMarkerIcon} header={"Описание:"} text={description}>
                            <div className={styles.googleLogoWrapper}>
                                {url ? (
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        <GoogleMapsLogo />
                                    </a>
                                ) : (
                                    <GoogleMapsLogo />
                                )}
                            </div>
                        </GsuTextContainer>
                    )}
                </div>
                {infoCells.length > 0 && (
                    <GsuInfoContainer Icon={ActiveDataIcon} header={"Данные:"} cells={infoCells} type="default" />
                )}
            </div>
        </GsuWizardResultPage>
    );
};
export default ActivityDetails;
