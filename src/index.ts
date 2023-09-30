import { CarbonIntensityService } from "./services/CarbonIntensityService";
import { calculateBuildingStats } from "./services/MetricsService";
import { OpenvoltService } from "./services/OpenvoltService";

async function main() {
  try {
    const openvoltService = new OpenvoltService(Bun.env.OPENVOLT_APIKEY as string);
    const carbonIntensityService = new CarbonIntensityService();

    const stats = await calculateBuildingStats({
      openvoltService, carbonIntensityService,
      meterId: Bun.env.METER_ID as string,
      startDate: "2023-01-01",
      endDate: "2023-02-01"
    })

    console.log(stats);
  } catch (error) {
    throw new Error(`Failed with: ${JSON.stringify(error)}`)
  }
}

main();