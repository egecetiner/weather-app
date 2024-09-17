export interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: Array<{
        description: string;
    }>;
}

export const fetchWeatherData = async (cityCode: string, apiKey: string): Promise<WeatherData> => {
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    try {
        const response = await fetch(`${BASE_URL}?q=${cityCode}&appid=${apiKey}&units=metric&lang=tr`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Hava durumu verisi alınamadı');
        }
        return response.json();
    } catch (error) {
        throw new Error(error?.message || 'Hava durumu verisi alınamadı');
    }
};

