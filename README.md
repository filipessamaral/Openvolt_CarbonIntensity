# Openvolt + Official Carbon Intensity API from the National Grid

Gool:
- The energy consumed by the building in kilowatt-hours (kWh).
- The amount of carbon dioxide (CO2) in kilograms emitted by the electricity generated for the building. This calculation requires half-hourly readings from data sources.
- The percentage of the fuel mix (which may include sources like wind, solar, nuclear, coal, etc.) used to generate the electricity. This also necessitates the use of half-hourly readings to calculate a weighted average.

## Setup

Replace `sample.env` with `.env`

Fill the necessary configuration fields,
You need to get an api key from [OpenVolt](https://www.openvolt.com/)

### To install dependencies:

```bash
bun install
```

### To run in local:

```bash
bun run start
```

### To run in development:

```bash
bun run dev
```


This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
