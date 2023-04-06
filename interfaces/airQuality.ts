export interface AirQuality {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    hourly_units: {
        time: string;
        european_aqi: string;
    };
    hourly: {
        time: string[];
        european_aqi: number[];
    };
}