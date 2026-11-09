import {
    GsuWizardGroupContainer,
    GsuWizardSection,
    storeDataToStorage,
    GsuButtonSingleSelect,
    GsuButtonSelect,
    GsuPageDescription,
} from "@gsu-ai/gsu-ui-core";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC} from "react";

import boardGameWishes from "../../../constants/boardGameWishes";

export interface BoardGamesBasicInfoState {
    genre: string[];
    theme: string[];
    interaction: string[];
    boardGameProcess: string[];
    players: string;
    time: string;
    chance: string;
    rules: string;
    design: string;
    replayability: string;
}

const BoardGamesBasicInfo: FC<IWizardStep<BoardGamesBasicInfoState>> = ({componentState, change}) => {
    const {genre} = componentState;
    const {theme} = componentState;
    const {interaction} = componentState;
    const {boardGameProcess} = componentState;
    const {players} = componentState;
    const {time} = componentState;
    const {chance} = componentState;
    const {rules} = componentState;
    const {design} = componentState;
    const {replayability} = componentState;

    const changeGenre = (updatedGenre: string[]) => {
        storeDataToStorage("boardGamesGenre", updatedGenre);
        change({...componentState, genre: updatedGenre});
    };

    const changeTheme = (updatedTheme: string[]) => {
        storeDataToStorage("boardGamesTheme", updatedTheme);
        change({...componentState, theme: updatedTheme});
    };

    const changeInteraction = (updatedInteraction: string[]) => {
        storeDataToStorage("boardGamesInteraction", updatedInteraction);
        change({...componentState, interaction: updatedInteraction});
    };

    const changeBoardGameProcess = (updatedBoardGameProcess: string[]) => {
        storeDataToStorage("boardGamesProcess", updatedBoardGameProcess);
        change({...componentState, boardGameProcess: updatedBoardGameProcess});
    };

    const changePlayersCount = (updatedCount: string) => {
        storeDataToStorage("boardGamesPlayersCount", updatedCount);
        change({...componentState, players: updatedCount});
    };

    const changeTime = (updatedTime: string) => {
        storeDataToStorage("boardGamesTime", updatedTime);
        change({...componentState, time: updatedTime});
    };

    const setChanceState = (updatedChance: string) => {
        storeDataToStorage("boardGameChance", updatedChance);
        change({...componentState, chance: updatedChance});
    };

    const setRulesState = (updatedRules: string) => {
        storeDataToStorage("boardGameRules", updatedRules);
        change({...componentState, rules: updatedRules});
    };

    const setDesignState = (updatedDesign: string) => {
        storeDataToStorage("boardGameDesign", updatedDesign);
        change({...componentState, design: updatedDesign});
    };

    const setReplayabilityState = (updatedReplayability: string) => {
        storeDataToStorage("boardGameReplayability", updatedReplayability);
        change({...componentState, replayability: updatedReplayability});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Настольные игры"}
                description={"Пройдите короткий опрос, и мы подберём настольную игру с учётом ваших предпочтений"}
            />

            <GsuWizardSection header={"Жанр"}>
                <GsuButtonSelect
                    values={genre}
                    options={boardGameWishes.genres.values}
                    change={changeGenre}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Тематика"}>
                <GsuButtonSelect
                    values={theme}
                    options={boardGameWishes.themes.values}
                    change={changeTheme}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Уровень взаимодействия"}>
                <GsuButtonSelect
                    values={interaction}
                    options={boardGameWishes.interactions.values}
                    change={changeInteraction}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Игровой процесс"}>
                <GsuButtonSelect
                    values={boardGameProcess}
                    options={boardGameWishes.processes.values}
                    change={changeBoardGameProcess}
                    checkDefaultIfAllSelected={true}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Количество игроков"}>
                <GsuButtonSingleSelect
                    value={players}
                    options={boardGameWishes.players.values}
                    change={changePlayersCount}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Время игровой сессии"}>
                <GsuButtonSingleSelect value={time} options={boardGameWishes.times.values} change={changeTime} />
            </GsuWizardSection>

            <GsuWizardSection header={"Уровень случайности"}>
                <GsuButtonSingleSelect
                    value={chance}
                    options={boardGameWishes.chances.values}
                    change={setChanceState}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Сложность"}>
                <GsuButtonSingleSelect value={rules} options={boardGameWishes.rules.values} change={setRulesState} />
            </GsuWizardSection>

            <GsuWizardSection
                header={"Реиграбельность"}
                description={"Какова степень повторного интереса после прохождения игры"}
            >
                <GsuButtonSingleSelect
                    value={replayability}
                    options={boardGameWishes.replayabilities.values}
                    change={setReplayabilityState}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Качество оформления игры"}>
                <GsuButtonSingleSelect
                    value={design}
                    options={boardGameWishes.designs.values}
                    change={setDesignState}
                />
            </GsuWizardSection>
        </GsuWizardGroupContainer>
    );
};

export default BoardGamesBasicInfo;
