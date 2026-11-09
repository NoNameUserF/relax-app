import {
    GsuButtonSelect,
    GsuButtonSingleSelect,
    GsuPageDescription,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    GsuWizardSelectSection,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";
import {IOptions, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC} from "react";

import {UserAdultIcon, UserChildrenIcon} from "../../../assets/Icons";
import {adultsMovieWishes, kidsMovieWishes} from "../../../constants/movieWishes";

export interface MoviesBasicInfoState {
    userAge: string;
    adultsGenres: string[];
    adultsContentTypes: string[];
    adultsMoods: string[];
    adultsRegions: string[];
    adultsReleaseTimes: string[];
    kidsAge: number;
    kidsContentTypes: string[];
    kidsDurations: string[];
    kidsGenres: string[];
    kidsMoods: string[];
    kidsRegions: string[];
    kidsReleaseTimes: string[];
    kidsSubgenres: string[];
}

export const MoviesBasicInfo: FC<IWizardStep<MoviesBasicInfoState>> = ({componentState, change}) => {
    const {userAge} = componentState;
    const {adultsGenres} = componentState;
    const {adultsContentTypes} = componentState;
    const {adultsMoods} = componentState;
    const {adultsRegions} = componentState;
    const {adultsReleaseTimes} = componentState;
    const {kidsAge} = componentState;
    const {kidsGenres} = componentState;
    const {kidsContentTypes} = componentState;
    const {kidsSubgenres} = componentState;
    const {kidsMoods} = componentState;
    const {kidsReleaseTimes} = componentState;
    const {kidsDurations} = componentState;
    const {kidsRegions} = componentState;

    const ageType: IOptions = {
        ADULT: {label: "Взрослые", Icon: UserAdultIcon},
        CHILD: {label: "Дети", Icon: UserChildrenIcon},
    };

    const changeAge = (updatedAge: string) => {
        storeDataToStorage("userAge", updatedAge);
        change({...componentState, userAge: updatedAge});
    };

    const changeGenre = (updatedGenre: string[]) => {
        storeDataToStorage("moviesAdultsGenres", updatedGenre);
        change({...componentState, adultsGenres: updatedGenre});
    };

    const changeAdultsContentTypes = (updatedAdultsContentTypes: string[]) => {
        storeDataToStorage("moviesAdultsContentTypes", updatedAdultsContentTypes);
        change({...componentState, adultsContentTypes: updatedAdultsContentTypes});
    };

    const changeMood = (updatedMood: string[]) => {
        storeDataToStorage("moviesAdultsMoods", updatedMood);
        change({...componentState, adultsMoods: updatedMood});
    };

    const changeAdultsRegions = (updatedAdultsRegions: string[]) => {
        storeDataToStorage("moviesAdultsRegions", updatedAdultsRegions);
        change({...componentState, adultsRegions: updatedAdultsRegions});
    };

    const changeNovelty = (updatedNovelty: string[]) => {
        storeDataToStorage("moviesAdultsReleaseTimes", updatedNovelty);
        change({...componentState, adultsReleaseTimes: updatedNovelty});
    };

    const changeKidsContentTypes = (updatedKidsContentTypes: string[]) => {
        storeDataToStorage("moviesKidsContentTypes", updatedKidsContentTypes);
        change({...componentState, kidsContentTypes: updatedKidsContentTypes});
    };

    const changeKidsDurations = (updatedKidsDurations: string[]) => {
        storeDataToStorage("moviesKidsDurations", updatedKidsDurations);
        change({...componentState, kidsDurations: updatedKidsDurations});
    };

    const changeKidsGenres = (updatedKidsGenres: string[]) => {
        storeDataToStorage("moviesKidsGenres", updatedKidsGenres);
        change({...componentState, kidsGenres: updatedKidsGenres});
    };

    const changeKidsMoods = (updatedKidsMoods: string[]) => {
        storeDataToStorage("moviesKidsMoods", updatedKidsMoods);
        change({...componentState, kidsMoods: updatedKidsMoods});
    };

    const changeKidsRegions = (updatedKidsRegions: string[]) => {
        storeDataToStorage("moviesKidsRegions", updatedKidsRegions);
        change({...componentState, kidsRegions: updatedKidsRegions});
    };

    const changeKidsSubgenres = (updatedKidsSubgenres: string[]) => {
        storeDataToStorage("moviesKidsSubgenres", updatedKidsSubgenres);
        change({...componentState, kidsSubgenres: updatedKidsSubgenres});
    };

    const changeKidsReleaseTimes = (updatedKidsReleaseTimes: string[]) => {
        storeDataToStorage("moviesKidsReleaseTimes", updatedKidsReleaseTimes);
        change({...componentState, kidsReleaseTimes: updatedKidsReleaseTimes});
    };

    // kidsAge
    const changeKidsAge = (updatedKidsAge: number) => {
        storeDataToStorage("moviesKidsAge", updatedKidsAge);
        change({...componentState, kidsAge: updatedKidsAge});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Кино и анимация"}
                description={"Пройдите небольшой опрос для того, чтобы мы смогли предложить подходящий вам контент "}
            />
            <GsuWizardSection header={"Возрастная категория"}>
                <GsuButtonSingleSelect value={userAge} options={ageType} change={changeAge} />
            </GsuWizardSection>

            {userAge === "ADULT" && (
                <>
                    <GsuWizardSection header={adultsMovieWishes.adultsGenres.name}>
                        <GsuButtonSelect
                            values={adultsGenres}
                            options={adultsMovieWishes.adultsGenres.values}
                            change={changeGenre}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={adultsMovieWishes.adultsContentTypes.name}>
                        <GsuButtonSelect
                            values={adultsContentTypes}
                            options={adultsMovieWishes.adultsContentTypes.values}
                            change={changeAdultsContentTypes}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={adultsMovieWishes.adultsMoods.name}>
                        <GsuButtonSelect
                            values={adultsMoods}
                            options={adultsMovieWishes.adultsMoods.values}
                            change={changeMood}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={adultsMovieWishes.adultsRegions.name}>
                        <GsuButtonSelect
                            values={adultsRegions}
                            options={adultsMovieWishes.adultsRegions.values}
                            change={changeAdultsRegions}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={adultsMovieWishes.adultsReleaseTimes.name}>
                        <GsuButtonSelect
                            values={adultsReleaseTimes}
                            options={adultsMovieWishes.adultsReleaseTimes.values}
                            change={changeNovelty}
                        />
                    </GsuWizardSection>
                </>
            )}

            {userAge === "CHILD" && (
                <>
                    <GsuWizardSection header={"Возраст ребёнка"}>
                        <GsuWizardSelectSection>
                            <GsuWizardSelectCount
                                Icon={UserChildrenIcon}
                                value={kidsAge}
                                change={changeKidsAge}
                                header={"Возраст"}
                                minCount={1}
                                maxCount={16}
                            />
                        </GsuWizardSelectSection>
                    </GsuWizardSection>

                    <GsuWizardSection header={kidsMovieWishes.kidsGenres.name}>
                        <GsuButtonSelect
                            values={kidsGenres}
                            options={kidsMovieWishes.kidsGenres.values}
                            change={changeKidsGenres}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={kidsMovieWishes.kidsContentTypes.name}>
                        <GsuButtonSelect
                            values={kidsContentTypes}
                            options={kidsMovieWishes.kidsContentTypes.values}
                            change={changeKidsContentTypes}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={kidsMovieWishes.kidsSubgenres.name}>
                        <GsuButtonSelect
                            values={kidsSubgenres}
                            options={kidsMovieWishes.kidsSubgenres.values}
                            change={changeKidsSubgenres}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={kidsMovieWishes.kidsMoods.name}>
                        <GsuButtonSelect
                            values={kidsMoods}
                            options={kidsMovieWishes.kidsMoods.values}
                            change={changeKidsMoods}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={kidsMovieWishes.kidsReleaseTimes.name}>
                        <GsuButtonSelect
                            values={kidsReleaseTimes}
                            options={kidsMovieWishes.kidsReleaseTimes.values}
                            change={changeKidsReleaseTimes}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={kidsMovieWishes.kidsDurations.name}>
                        <GsuButtonSelect
                            values={kidsDurations}
                            options={kidsMovieWishes.kidsDurations.values}
                            change={changeKidsDurations}
                        />
                    </GsuWizardSection>

                    <GsuWizardSection header={kidsMovieWishes.kidsRegions.name}>
                        <GsuButtonSelect
                            values={kidsRegions}
                            options={kidsMovieWishes.kidsRegions.values}
                            change={changeKidsRegions}
                        />
                    </GsuWizardSection>
                </>
            )}
        </GsuWizardGroupContainer>
    );
};

export default MoviesBasicInfo;
