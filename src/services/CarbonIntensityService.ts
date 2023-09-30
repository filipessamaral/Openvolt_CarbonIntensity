import { IntervalDataResponse } from "./OpenvoltService";
import { fetch } from "../utils/fetch";
export interface FuelMixDataResponse {
    data: FuelMixData[];
}

export interface FuelMixData {
    Biomass: number;
    Coal: number;
    'Dutch Imports': number;
    'French Imports': number;
    'Gas (Combined Cycle)': number;
    'Gas (Open Cycle)': number;
    Hydro: number;
    'Irish Imports': number;
    Nuclear: number;
    Oil: number;
    Other: number;
    'Pumped Storage': number;
    Solar: number;
    Wind: number;
}

interface CarbonIntensityResponse {
    data: CarbonIntensityData[];
}

interface CarbonIntensityData {
    from: string;
    to: string;
    intensity: {
        forecast: number;
        actual: number;
        index: string;
    };
}


const API_ENDPOINT: string = 'https://api.carbonintensity.org.uk';

export class CarbonIntensityService {

    public async fetchCarbonIntensityFactors(): Promise<FuelMixDataResponse> {
        try {
            const response = await fetch(`${API_ENDPOINT}/intensity/factors`);
            if (response.ok) {
                const carbonIntensityData = await response.json<FuelMixDataResponse>();
                return carbonIntensityData;
            } else {
                throw new Error('[CarbonIntensityService][fetchCarbonIntensity]Failed to fetch carbon intensity data');
            }
        } catch (error) {
            throw new Error(`[CarbonIntensityService][fetchCarbonIntensity]Error fetching carbon intensity data: ${JSON.stringify(error)}`);
        }
    }

    public async fetchCarbonIntensityByDate(startDate: string): Promise<CarbonIntensityResponse> {

        try {
            const carbonIntensityResponse = await fetch(`${API_ENDPOINT}/intensity/date/${startDate}/1`);

            if (carbonIntensityResponse.ok) {
                return await carbonIntensityResponse.json<CarbonIntensityResponse>();

            } else {
                throw new Error(`[CarbonIntensityService][fetchCarbonIntensityByDate]Failed to fetch carbon intensity data for interval starting at ${startDate}`);
            }
        } catch (error) {
            throw new Error(`[CarbonIntensityService][fetchCarbonIntensityByDate]Error fetching carbon intensity data: ${JSON.stringify(error)}`);

        }
    }
}