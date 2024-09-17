import { useState } from "react";
import { Field, Label, Input } from '@headlessui/react';
import clsx from 'clsx';

interface ApiKeyFormProps {
    saveApiKey: (key: string) => void;
    errorMessage: string | null;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ saveApiKey, errorMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveApiKey(inputValue);
    };

    return (
        <div className="w-[300px]">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center">
                    <label className="block" htmlFor="apiKey">API Key</label>
                </div>
                <div className="w-full max-w-xl flex justify-center items-center mt-5 mb-5">
                    <Input
                        type="text"
                        id="apiKey"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={clsx(
                            'w-full max-w-xl border block rounded-lg bg-white py-1.5 px-3 text-sm text-black',
                            'focus:outline-none focus:ring-2 focus:ring-blue-500'
                        )}
                    />
                </div>

                <div className="flex justify-center items-center">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        Submit
                    </button>
                </div>
            </form>

            <div className="flex justify-center items-center">
                {errorMessage && <p className="text-red-500 mt-5">{errorMessage}</p>}
            </div>

        </div>
    );
};
