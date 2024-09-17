import { useState, useEffect } from 'react';

export const useApiKey = () => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [isApiKeyValid, setIsApiKeyValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const storedApiKey = sessionStorage.getItem('weather-api-key');
        if (storedApiKey) {
            validateApiKey(storedApiKey);
        }
    }, []);

    const validateApiKey = async (key: string) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=${key}`
            );
            if (response.ok) {
                setApiKey(key);
                sessionStorage.setItem('weather-api-key', key); // API Key'i sessionStorage'a kaydet
                setIsApiKeyValid(true);
                setErrorMessage(null);
            } else {
                throw new Error('Invalid API Key');
            }
        } catch (error) {
            setErrorMessage((error as Error).message);
            setIsApiKeyValid(false);
        }
    };

    const saveApiKey = (key: string) => {
        validateApiKey(key);
    };

    const clearApiKey = () => {
        setApiKey(null);
        setIsApiKeyValid(false);
        sessionStorage.removeItem('weather-api-key');
    };

    return { apiKey, isApiKeyValid, saveApiKey, clearApiKey, errorMessage };
};
