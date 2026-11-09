import {IFlow, IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {fetchPost} from "@gsu-ai/gsu-ui-core";

import {APPLICATION_HOST} from "../../constants/api";
import BooksCardList, {BooksListState} from "../../wizards/BooksStep/BooksCardList";
import BooksDetails, {BooksDetailsState} from "../../wizards/BooksStep/BooksFinishStep";

const getBooksLoaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Подбираю книги",
        time: 6250,
    },
    {
        title: "Получаю информацию",
        time: 6250,
    },
    {
        title: "Подбираю описания",
        time: 6250,
    },
    {
        title: "Формирую списки",
        time: 6250,
    },
];

const BOOKS_FLOW: IWorkflowStep<IFlow> = {
    uid: "BOOKS_SCENARIO",
    name: "КНИГИ",
    flowStoragePrefix: "BOOKS_FLOW_",
    initState: () => {
        return {questions: null, displayQuestions: null};
    },
    cleanState: () => {
        return {questions: null, displayQuestions: null};
    },
    component: () => {
        return "/xml/book.xml";
    },
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    flowDescription: () => {
        return "Пройдите пошаговый опрос, и мы подберём подходящую литературу с учётом ваших предпочтений";
    },
    flowTitle: () => {
        return "Книги";
    },
    callback: (componentState, wizardState, fetchResponse) => {
        return {cards: fetchResponse};
    },
    fetch: (componentState) => {
        const body = {
            refresh: false,
            flow: {questions: componentState.questions},
        };
        return fetchPost(APPLICATION_HOST, "/getBooks", body);
    },
    loaderSteps: getBooksLoaderSteps,
};

const BOOKS_CARD_LIST: IWorkflowStep<BooksListState, IFlow> = {
    uid: "BOOKSCARDLIST",
    name: "КНИГИ",
    initState: () => {
        return {
            cards: [],
            selectedCard: null,
        };
    },
    component: () => {
        return BooksCardList;
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
        return fetchPost(APPLICATION_HOST, "/getBooks", body);
    },
    isNextDisabled: (componentState) => {
        return !componentState.selectedCard || !componentState.selectedCard.title;
    },
    nextDisabledTooltip: () => {
        return "Пожалуйста, выберите одну книгу";
    },
};

const FINISH_STEP: IWorkflowStep<BooksDetailsState> = {
    uid: "FINISH_STEP",
    name: "ФИНИШ",
    initState: () => {
        return {selectedCard: null};
    },
    component: () => {
        return BooksDetails;
    },
};

const workflow = [BOOKS_FLOW, BOOKS_CARD_LIST, FINISH_STEP];
export type BooksWizardState = IFlow | BooksListState | BooksDetailsState;

export default workflow;
