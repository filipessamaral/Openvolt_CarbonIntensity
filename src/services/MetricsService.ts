import { CarbonIntensityService } from "./CarbonIntensityService";
import { Granularity, OpenvoltService } from "./OpenvoltService";

export async function calculateBuildingStats(opts: { openvoltService: OpenvoltService, carbonIntensityService: CarbonIntensityService, meterId: string, startDate: string, endDate: string }) {
    try {
        const { carbonIntensityService, endDate, meterId, openvoltService, startDate } = opts;
        // Fetch interval data for the building
        const intervalDataResponse = await openvoltService.fetchIntervalData({
            meterId,
            granularity: Granularity.HH,
            startDate,
            endDate,
        });

        // Calculate energy consumed in kilowatt-hours (kWh)
        let totalEnergyConsumed = 0;
        for (const interval of intervalDataResponse.data) {
            const consumptionKWh = parseFloat(interval.consumption);
            if (!isNaN(consumptionKWh)) {
                totalEnergyConsumed += consumptionKWh;
            }
        }

        // Fetch carbon intensity data
        const carbonIntensityData = await carbonIntensityService.fetchCarbonIntensityByDate(startDate);

        // Calculate CO2 emissions in kilograms (kg)
        let totalCO2EmissionsKg = 0;
        for (const interval of intervalDataResponse.data) {
            const startDate = interval.start_interval;
            const actualIntensity = carbonIntensityData.data[0].intensity.actual;
            const consumptionKWh = parseFloat(interval.consumption);

            if (!isNaN(consumptionKWh)) {
                const emissionsKg = (consumptionKWh / 1000) * actualIntensity;
                totalCO2EmissionsKg += emissionsKg;
            }
        }

        // Fetch fuel mix data
        const fuelMixDataResponse = await carbonIntensityService.fetchCarbonIntensityFactors();

        // Calculate the percentage of fuel mix used for electricity generation
        const fuelMixData = fuelMixDataResponse.data[0];
        const totalFuelMix = Object.values(fuelMixData).reduce((total, value) => total + value, 0);
        const percentageFuelMix = {};

        for (const key in fuelMixData) {
            if (fuelMixData.hasOwnProperty(key)) {
                // @ts-ignore
                percentageFuelMix[key] = (fuelMixData[key] / totalFuelMix) * 100;
            }
        }

        return {
            totalEnergyConsumed,
            totalCO2EmissionsKg,
            percentageFuelMix
        }

    } catch (error) {
        // @ts-ignore
        console.error(error.message);
    }
}