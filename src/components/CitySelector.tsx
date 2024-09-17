import React from 'react';
import { cities } from '../data/cities'; // Şehirler listesi
import { Field, Label, Select } from '@headlessui/react'
import clsx from 'clsx'

interface CitySelectorProps {
    selectedCity: string;
    onCityChange: (city: string) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
    selectedCity,
    onCityChange,
}) => {
    return (

        <Field className='mb-4'>
            <Label >Şehir seçin</Label>

            <Select
                aria-hidden="true"

                className={clsx(
                    'ml-3 border rounded-lg bg-white/5 py-1.5 px-3 ',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                )}
                id="city"
                defaultValue={selectedCity}
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)} name="city">
                <option value="">Şehir Seçin</option>
                {cities.map((city) => (
                    <option key={city.code} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </Select>
        </Field>

    );
};

export default CitySelector;
