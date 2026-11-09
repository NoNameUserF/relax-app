import {
    GsuAsyncAutocomplete,
    GsuButtonMultiSelect,
    GsuButtonSelect,
    GsuButtonSingleSelect,
    GsuCalendarInput,
    GsuPageDescription,
    GsuSingleAutocomplete,
    GsuWizardGridSection,
    GsuWizardGroupContainer,
    GsuWizardSection,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC} from "react";

import {countriesCallback, countriesFetch, ICity, ICityOption} from "../../../helpers/countries";
import {ActivitiesBasicInfoState, activitiesWishes} from "../../../constants/activitiesWishes";

const timeOfDayLabel = "Время суток";

export const ActivitiesBasicInfo: FC<IWizardStep<ActivitiesBasicInfoState>> = ({componentState, change}) => {
    const distance = componentState.distance;
    const city = componentState.city;
    const {date} = componentState;
    const timeOfDay = componentState.timeOfDay;
    const duration = componentState.duration;
    const {ages} = componentState;
    const {prices} = componentState;
    const participationFormat = componentState.participationFormat;
    const {typeOfActivities} = componentState;
    const {additionalInfo} = componentState;

    const setDistance = (distance: string) => {
        storeDataToStorage("distance", distance);
        change({...componentState, distance: distance});
    };

    const setCity = (city: ICityOption) => {
        storeDataToStorage("itineraryCity", city);
        change({...componentState, city: city});
    };

    const setDate = (date: Date) => {
        storeDataToStorage("date", date);
        change({...componentState, date: date});
    };

    const setTimeOfDay = (timeOfDay: string) => {
        storeDataToStorage("timeOfDay", timeOfDay);
        change({...componentState, timeOfDay: timeOfDay});
    };

    const setDurationState = (updatedDuration: string) => {
        storeDataToStorage("duration", updatedDuration);
        change({...componentState, duration: updatedDuration});
    };

    const changeAge = (updatedAge: string[]) => {
        storeDataToStorage("age", updatedAge);
        change({...componentState, ages: updatedAge});
    };

    const changePrices = (updatedPrices: string[]) => {
        storeDataToStorage("prices", updatedPrices);
        change({...componentState, prices: updatedPrices});
    };

    const setParticipationFormat = (participationFormat: string) => {
        storeDataToStorage("participationFormat", participationFormat);
        change({...componentState, participationFormat: participationFormat});
    };

    const changeTypeOfActivities = (updatedTypeOfActivities: string[]) => {
        storeDataToStorage("typeOfActivities", updatedTypeOfActivities);
        change({...componentState, typeOfActivities: updatedTypeOfActivities});
    };

    const setAdditionalInfoState = (updatedAdditionalInfo: string[]) => {
        storeDataToStorage("additionalInfo", updatedAdditionalInfo);
        change({...componentState, additionalInfo: updatedAdditionalInfo});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Активности"}
                description={"Пройдите короткий опрос, и мы подберём подходящую активность с учётом ваших предпочтений"}
            />
            <GsuWizardSection header={"Местоположение"} description={"Город c населением от 200 тыс."}>
                <GsuAsyncAutocomplete<ICityOption, ICity[]>
                    value={city}
                    fetch={countriesFetch}
                    callback={countriesCallback}
                    placeholder={"Город"}
                    onOptionSelect={setCity}
                    listName={"Город"}
                />
            </GsuWizardSection>

            <GsuWizardGridSection columns={3} header={"Дата и время суток"}>
                <GsuCalendarInput value={date} onChange={setDate} listName={"Дата"} placeholder={"Дата"} />
                <GsuSingleAutocomplete
                    options={activitiesWishes.TIME_OF_DAY}
                    placeholder={timeOfDayLabel}
                    onOptionSelect={setTimeOfDay}
                    listName={timeOfDayLabel}
                    value={timeOfDay}
                    isRenderInput={false}
                />
            </GsuWizardGridSection>

            <GsuWizardSection header={"Длительность"}>
                <GsuButtonSingleSelect
                    value={duration}
                    change={(updatedDuration) => setDurationState(updatedDuration)}
                    options={activitiesWishes.ACTIVITIES_DURATION}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Удалённость от центра города"}>
                <GsuButtonSingleSelect
                    value={distance}
                    options={activitiesWishes.DISTANCE}
                    change={(updatedDistance) => setDistance(updatedDistance)}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Формат участия"}>
                <GsuButtonSingleSelect
                    value={participationFormat}
                    options={activitiesWishes.PARTICIPATION_FORMAT}
                    change={setParticipationFormat}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Возрастная категория"}>
                <GsuButtonSelect
                    values={ages}
                    options={activitiesWishes.AGES}
                    change={(updatedAge) => changeAge(updatedAge)}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Стоимость на одного человека"}>
                <GsuButtonSelect
                    values={prices}
                    options={activitiesWishes.PRICES}
                    change={(updatedPrices) => changePrices(updatedPrices)}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Виды активности"}>
                <GsuButtonSelect
                    values={typeOfActivities}
                    options={activitiesWishes.TYPE_OF_ACTIVITIES}
                    change={(updatedTypeOfActivities) => changeTypeOfActivities(updatedTypeOfActivities)}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Дополнительно"}>
                <GsuButtonMultiSelect
                    values={additionalInfo}
                    change={(updatedAdditionalInfo) => setAdditionalInfoState(updatedAdditionalInfo)}
                    options={activitiesWishes.INFO}
                />
            </GsuWizardSection>
        </GsuWizardGroupContainer>
    );
};

export default ActivitiesBasicInfo;
