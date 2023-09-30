import { fetch } from "../utils/fetch";

export interface IntervalDataResponse {
    startInterval: string;
    endInterval: string;
    granularity: string;
    data: IntervalData[];
}
export interface IntervalData {

    start_interval: string;
    meter_id: string;
    meter_number: string;
    customer_id: string;
    consumption: string;
    consumption_units: string;
}

export enum Granularity {
    HH = 'hh',
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year'
}

const API_ENDPOINT: string = 'https://api.openvolt.com/v1';

export class OpenvoltService {
    private readonly apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    public async fetchIntervalData(opts: { meterId: string, granularity: Granularity, startDate: string, endDate: string }): Promise<IntervalDataResponse> {
        const { endDate, granularity, meterId, startDate } = opts;
        try {
            const response = await fetch(`${API_ENDPOINT}/interval-data?` + new URLSearchParams({
                "meter_id": meterId,
                "granularity": granularity,
                "start_date": startDate,
                "end_date": endDate
            }), {
                headers: {
                    'accept': 'application/json',
                    'x-api-key': this.apiKey
                }
            });
            if (!response.ok) {
                throw new Error(`[OpenvoltService][fetchIntervalData]Request failed with status: ${response.status}`);
            }

            return await response.json<IntervalDataResponse>();
        } catch (error) {
            throw new Error(`[OpenvoltService][fetchIntervalData]Error fetching data: ${JSON.stringify(error)}`);
        }
    }

}

