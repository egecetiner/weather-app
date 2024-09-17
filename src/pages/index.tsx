import { useState, useEffect } from 'react';
import { useApiKey } from '../hooks/useApiKey';
import { ApiKeyForm } from '../components/ApiKeyForm';
import CitySelector from '../components/CitySelector';
import { fetchWeatherData } from '../utils/fetchWeatherData';
import "../app/globals.css"

export default function Home() {
    const { apiKey, isApiKeyValid, saveApiKey, clearApiKey, errorMessage } = useApiKey();
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const getWeatherData = async () => {
            if (selectedCity && apiKey) {
                setLoading(true);
                setFetchError(null);
                try {
                    const data = await fetchWeatherData(selectedCity, apiKey);
                    setWeatherData(data);
                } catch (error: any) {
                    setFetchError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        getWeatherData();
    }, [selectedCity, apiKey]);

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
        setWeatherData(null);
    };

    return (
        <div>
            {!isApiKeyValid ? (
                <ApiKeyForm saveApiKey={saveApiKey} errorMessage={errorMessage} />
            ) : (
                <div>
                    <CitySelector selectedCity={selectedCity} onCityChange={handleCityChange} />
                    <div className="h-52 flex justify-center px-5 items-center border border-black rounded-lg">
                        {loading && <p>Veriler yükleniyor...</p>}
                        {fetchError && <p>Hata: {fetchError}</p>}

                        {weatherData && (
                            <div>
                                <p className='text-black-900 underline mb-2'>{selectedCity} için hava durumu</p>
                                <p>Sıcaklık: {weatherData.main.temp}°C</p>
                                <p>Hissedilen: {weatherData.main.feels_like}°C</p>
                                <p>Durum: {weatherData.weather[0].description}</p>
                                <p>Nem: {weatherData.main.humidity}%</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center items-center">
                        <button onClick={clearApiKey} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
