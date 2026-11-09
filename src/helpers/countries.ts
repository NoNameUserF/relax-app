import {IOption, IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {fetchGet} from "@gsu-ai/gsu-ui-core";

import {APPLICATION_HOST} from "../constants/api";

export interface ICityOption extends IOption {
    country: string;
    countryName: string;
    city: string;
    population: string;
    region: string;
}

export interface ICity {
    country: string;
    countryName: string;
    city: string;
    population: string;
    region: string;
}

export const countriesCallback = (data: ICity[]) => {
    const options: IOptions<ICityOption> = {};
    data.forEach((item) => {
        options[`${item.city}, ${item.region}, ${item.countryName}`] = {
            label: `${item.city}, ${item.region}, ${item.countryName}`,
            city: item.city,
            country: item.country,
            region: item.region,
            population: item.population,
            countryName: item.countryName,
        };
    });
    return options;
};

export const countriesFetch = (value: string) => fetchGet(APPLICATION_HOST, `/getCities?cityName=${value}`);
