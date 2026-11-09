import {IFlow, IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {fetchPost} from "@gsu-ai/gsu-ui-core";

import {APPLICATION_HOST} from "../../constants/api";
import VideoCardList, {VideoListState} from "../../wizards/VideoStep/VideoCardList";
import VideoDetails, {VideoDetailsState} from "../../wizards/VideoStep/VideoFinishStep";

const getVideosLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Подбираю видео",
        time: 5500,
    },
    {
        title: "Генерирую список",
        time: 5500,
    },
];

const VIDEOS_FLOW: IWorkflowStep<IFlow> = {
    uid: "VIDEO_SCENARIO",
    name: "ВИДЕО",
    flowStoragePrefix: "VIDEOS_FLOW_",
    initState: () => {
        return {questions: null, displayQuestions: null};
    },
    cleanState: () => {
        return {questions: null, displayQuestions: null};
    },
    component: () => {
        return "/xml/video.xml";
    },
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    flowDescription: () => {
        return "Пройдите пошаговый опрос, и мы подберём подходящее видео с учётом ваших предпочтений";
    },
    flowTitle: () => {
        return "Видео";
    },
    callback: (componentState, wizardState, fetchResponse) => {
        return {cards: fetchResponse};
    },
    fetch: (componentState) => {
        const body = {
            refresh: false,
            flow: {questions: componentState.questions},
        };
        return fetchPost(APPLICATION_HOST, "/getVideos", body);
    },
    loaderSteps: getVideosLoaderSteps,
};

const VIDEO_CARD_LIST: IWorkflowStep<VideoListState, IFlow> = {
    uid: "VIDEOCARDLIST",
    name: "ВИДЕО",
    initState: () => {
        return {
            cards: [],
            selectedCard: null,
        };
    },
    component: () => {
        return VideoCardList;
    },
    nextBtnLabel: "ПОДРОБНЕЕ",
    callback: (componentState) => {
        return {selectedCard: componentState.selectedCard};
    },
    refresh: (previousComponentState) => {
        const body = {
            refresh: true,
            flow: {questions: previousComponentState.questions},
        };
        return fetchPost(APPLICATION_HOST, "/getVideos", body);
    },
    isNextDisabled: (componentState) => {
        return !componentState.selectedCard || !componentState.selectedCard.title;
    },
    nextDisabledTooltip: () => {
        return "Пожалуйста, выберите одно видео";
    },
};

const FINISH_STEP: IWorkflowStep<VideoDetailsState> = {
    uid: "FINISH_STEP",
    name: "ФИНИШ",
    initState: () => {
        return {selectedCard: null};
    },
    component: () => {
        return VideoDetails;
    },
};

const workflow = [VIDEOS_FLOW, VIDEO_CARD_LIST, FINISH_STEP];
export type VideoWizardState = IFlow | VideoListState | VideoDetailsState;

export default workflow;
