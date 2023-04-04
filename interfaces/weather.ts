interface CurrentWeather {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
}

interface Daily {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    windspeed_10m_max: number[];
}

interface DailyUnits {
    time: string;
    weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    precipitation_sum: string;
    precipitation_probability_max: string;
    windspeed_10m_max: string;
    uv_index_max: string;
}

interface Hourly {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    precipitation: number[];
    weathercode: number[];
    cloudcover: number[];
    visibility: number[];
    windspeed_10m: number[];
    uv_index: number[];
}

interface HourlyUnits {
    time: string;
    temperature_2m: string;
    apparent_temperature: string;
    precipitation_probability: string;
    precipitation: string;
    cloudcover: string;
    visibility: string;
    windspeed_10m: string;
    weathercode: string;
    uv_index: string;
}

export interface Weather {
    current_weather: CurrentWeather;
    daily: Daily;
    daily_units: DailyUnits;
    elevation: number;
    generationtime_ms: number;
    hourly: Hourly;
    hourly_units: HourlyUnits;
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
}