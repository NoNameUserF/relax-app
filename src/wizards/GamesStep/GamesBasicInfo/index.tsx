import {FC} from "react";
import {
    GsuButtonSelect,
    GsuButtonSingleSelect,
    GsuPageDescription,
    GsuWizardGroupContainer,
    GsuWizardSection,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import videoGameWishes from "../../../constants/videoGameWishes";

export interface GamesBasicInfoState {
    genre: string[];
    typeOfExperience: string[];
    worldSetting: string[];
    format: string;
    style: string;
    sessionTime: string;
    narrative: string;
    gameNovelty: string;
    difficultyLevel: string;
}

export const GamesBasicInfo: FC<IWizardStep<GamesBasicInfoState>> = ({componentState, change}) => {
    const {genre} = componentState;
    const {typeOfExperience} = componentState;
    const {worldSetting} = componentState;
    const format = componentState.format;
    const style = componentState.style;
    const sessionTime = componentState.sessionTime;
    const narrative = componentState.narrative;
    const gameNovelty = componentState.gameNovelty;
    const difficultyLevel = componentState.difficultyLevel;

    const changeGenre = (updatedGenre: string[]) => {
        storeDataToStorage("videoGamesGenre", updatedGenre);
        change({...componentState, genre: updatedGenre});
    };

    const changeTypeOfExperience = (updatedExperience: string[]) => {
        storeDataToStorage("videoGamesExperience", updatedExperience);
        change({...componentState, typeOfExperience: updatedExperience});
    };

    const changeWorldSetting = (updatedWorldSetting: string[]) => {
        storeDataToStorage("videoGamesWorldSetting", updatedWorldSetting);
        change({...componentState, worldSetting: updatedWorldSetting});
    };

    const setGameFormatState = (updatedGameFormat: string) => {
        storeDataToStorage("videoGamesFormat", updatedGameFormat);
        change({...componentState, format: updatedGameFormat});
    };

    const setGameStyle = (updatedGameStyle: string) => {
        storeDataToStorage("videoGamesStyle", updatedGameStyle);
        change({...componentState, style: updatedGameStyle});
    };

    const setGameSessionTime = (updatedGameSessionTime: string) => {
        storeDataToStorage("videoGamesSessionTime", updatedGameSessionTime);
        change({...componentState, sessionTime: updatedGameSessionTime});
    };

    const setGameNarrative = (updatedGameNarrative: string) => {
        storeDataToStorage("videoGamesNarrative", updatedGameNarrative);
        change({...componentState, narrative: updatedGameNarrative});
    };

    const setGameNovelty = (updatedGameNovelty: string) => {
        storeDataToStorage("videoGamesNovelty", updatedGameNovelty);
        change({...componentState, gameNovelty: updatedGameNovelty});
    };

    const setGameDifficultyLevel = (updatedGameDifficultyLevel: string) => {
        storeDataToStorage("videoGamesDifficultyLevel", updatedGameDifficultyLevel);
        change({...componentState, difficultyLevel: updatedGameDifficultyLevel});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Компьютерные игры"}
                description={"Пройдите небольшой опрос для того, чтобы мы смогли предложить подходящую вам игру"}
            />

            <GsuWizardSection header={"Жанр"}>
                <GsuButtonSelect
                    values={genre}
                    options={videoGameWishes.genres.values}
                    change={changeGenre}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Стиль игры"}>
                <GsuButtonSelect
                    values={typeOfExperience}
                    options={videoGameWishes.experiences.values}
                    change={changeTypeOfExperience}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Игровой мир"}>
                <GsuButtonSelect
                    values={worldSetting}
                    options={videoGameWishes.worldSettings.values}
                    change={changeWorldSetting}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Графическое оформление"}>
                <GsuButtonSingleSelect
                    value={style}
                    options={videoGameWishes.visualStyles.values}
                    change={setGameStyle}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Время игровой сессии"}>
                <GsuButtonSingleSelect
                    value={sessionTime}
                    options={videoGameWishes.sessionTimes.values}
                    change={setGameSessionTime}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Статус игры"}>
                <GsuButtonSingleSelect
                    value={gameNovelty}
                    options={videoGameWishes.novelties.values}
                    change={setGameNovelty}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Тип сюжета"}>
                <GsuButtonSingleSelect
                    value={narrative}
                    options={videoGameWishes.narratives.values}
                    change={setGameNarrative}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Сложность"}>
                <GsuButtonSingleSelect
                    value={difficultyLevel}
                    options={videoGameWishes.difficultyLevels.values}
                    change={setGameDifficultyLevel}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Режим игры"}>
                <GsuButtonSingleSelect
                    value={format}
                    options={videoGameWishes.formats.values}
                    change={setGameFormatState}
                />
            </GsuWizardSection>
        </GsuWizardGroupContainer>
    );
};

export default GamesBasicInfo;
