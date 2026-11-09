import {IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import ActivitiesBasicInfo from "../../wizards/ActivitiesStep/ActivitiesBasicInfo";
import {APPLICATION_HOST} from "../../constants/api";
import ActivitiesCardList, {ActivitiesList} from "../../wizards/ActivitiesStep/ActivitiesCardList";
import formatDateToString from "../../helpers/formatDateToString";
import {ActivitiesBasicInfoState, IActivityDetails} from "../../constants/activitiesWishes";
import ActivityDetails from "../../wizards/ActivitiesStep/ActivityDetails";

const getActivitiesLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Анализирую параметры",
        time: 6500,
    },
    {
        title: "Подбираю активности",
        time: 6500,
    },
    {
        title: "Сверяю бюджет",
        time: 6500,
    },
    {
        title: "Генерирую результат",
        time: 6500,
    },
];
const getActivityDetailsLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Подбираю информацию",
        time: 4000,
    },
];

const ACTIVITIES_BASIC_INFO: IWorkflowStep<ActivitiesBasicInfoState> = {
    uid: "ACTIVITIESBASICINFO",
    name: "АКТИВНОСТИ",
    initState: () => {
        return {
            distance: getDataFromStorage("distance") || "ANY",
            city: getDataFromStorage("itineraryCity") || null,
            date:
                getDataFromStorage("date") &&
                new Date().setHours(0, 0, 0, 0) <= new Date(getDataFromStorage("date")).getTime()
                    ? new Date(getDataFromStorage("date"))
                    : null,
            timeOfDay: getDataFromStorage("timeOfDay") || "ANY",
            duration: getDataFromStorage("duration") || "ANY",
            ages: getDataFromStorage("age") || ["AGE_FREE"],
            prices: getDataFromStorage("prices") || ["ANY"],
            participationFormat: getDataFromStorage("participationFormat") || "INDIVIDUALLY",
            typeOfActivities: getDataFromStorage("typeOfActivities") || ["ANY"],
            additionalInfo: getDataFromStorage("additionalInfo") || [],
        };
    },
    cleanState: () => {
        return {
            distance: "ANY",
            city: null,
            date: null,
            timeOfDay: "ANY",
            duration: "ANY",
            ages: ["AGE_FREE"],
            prices: ["ANY"],
            participationFormat: "INDIVIDUALLY",
            typeOfActivities: ["ANY"],
            additionalInfo: [],
        };
    },
    storageDependencies: [
        "distance",
        "itineraryCity",
        "date",
        "timeOfDay",
        "duration",
        "age",
        "prices",
        "participationFormat",
        "typeOfActivities",
        "additionalInfo",
    ],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: () => {
        return ActivitiesBasicInfo;
    },

    fetch: (componentState) => {
        const activity = {
            additionalInfo: componentState.additionalInfo,
            ages: componentState.ages,
            date: componentState.date ? formatDateToString(componentState.date) : formatDateToString(new Date()),
            distance: componentState.distance,
            duration: componentState.duration,
            location: {
                cityName: componentState.city?.city,
                countryName: componentState.city?.countryName,
            },
            participationFormat: componentState.participationFormat,
            prices: componentState.prices,
            refresh: false,
            timesOfDay: componentState.timeOfDay,
            typeOfActivities: componentState.typeOfActivities,
        };

        ReactGA.gtag("event", "fetchActivity", activity);
        return fetchPost(APPLICATION_HOST, "/getActivities", activity);
    },

    loaderSteps: getActivitiesLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            activities: fetchResponse,
        };
    },

    isNextDisabled: (componentState) => {
        return !componentState.city || !componentState.date;
    },

    nextDisabledTooltip: (componentState) => {
        if (!componentState.city) {
            return "Выберите город";
        } else if (!componentState.date) {
            return "Выберите дату";
        }
        return "";
    },
};

const ACTIVITIES_CARD_LIST: IWorkflowStep<ActivitiesList, ActivitiesBasicInfoState> = {
    uid: "ACTIVITIESCARDLIST",
    name: "АКТИВНОСТИ",
    initState: () => {
        return {
            activities: [],
            selectedActivity: null,
        };
    },
    nextBtnLabel: "ПОДРОБНЕЕ",
    component: () => {
        return ActivitiesCardList;
    },

    refresh: (previousComponentState) => {
        const activity = {
            additionalInfo: previousComponentState.additionalInfo,
            ages: previousComponentState.ages,
            date: previousComponentState.date
                ? formatDateToString(previousComponentState.date)
                : formatDateToString(new Date()),
            distance: previousComponentState.distance,
            duration: previousComponentState.duration,
            location: {
                cityName: previousComponentState.city?.city,
                countryName: previousComponentState.city?.countryName,
            },
            participationFormat: previousComponentState.participationFormat,
            prices: previousComponentState.prices,
            refresh: true,
            timesOfDay: previousComponentState.timeOfDay,
            typeOfActivities: previousComponentState.typeOfActivities,
        };

        ReactGA.gtag("event", "fetchActivity", activity);
        return fetchPost(APPLICATION_HOST, "/getActivities", activity);
    },
    fetch: (componentState, wizardState) => {
        const BASICINFO = wizardState?.["ACTIVITIESBASICINFO"] as ActivitiesBasicInfoState;
        const activityDetails = {
            activityTitle: componentState.selectedActivity?.name,
            city: BASICINFO?.city?.city,
            country: BASICINFO?.city?.country,
            refresh: true,
        };
        ReactGA.gtag("event", "fetchActivity", activityDetails);
        return fetchPost(APPLICATION_HOST, "/getActivityDetails", activityDetails);
    },

    loaderSteps: getActivityDetailsLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return fetchResponse;
    },

    isNextDisabled: (componentState) => {
        return !componentState.selectedActivity;
    },

    nextDisabledTooltip: () => {
        return "Пожалуйста, выберите одну из активностей";
    },
};
const ACTIVITY_DETAILS: IWorkflowStep<IActivityDetails> = {
    uid: "ACTIVITYDETAILS",
    name: "ДЕТАЛИ_АКТИВНОСТИ",
    initState: () => {
        return {
            fullDescription: "",
        };
    },
    component: () => {
        return ActivityDetails;
    },
    refresh: (previousComponentState, _, wizardState) => {
        const BASICINFO = wizardState?.["ACTIVITIESBASICINFO"] as ActivitiesBasicInfoState;
        const activityDetails = {
            activityTitle: previousComponentState.selectedActivity?.name,
            city: BASICINFO?.city?.city,
            country: BASICINFO?.city?.country,
            refresh: true,
        };
        ReactGA.gtag("event", "fetchActivity", activityDetails);
        return fetchPost(APPLICATION_HOST, "/getActivityDetails", activityDetails);
    },
};

const workflow = [ACTIVITIES_BASIC_INFO, ACTIVITIES_CARD_LIST, ACTIVITY_DETAILS];

export type ActivitiesWizardState = ActivitiesBasicInfoState | ActivitiesList;
export default workflow;
