import React from 'react';
import { PiggyBankIcon } from './icons';

interface SavingsBannerProps {
    amount: string;
}

export const SavingsBanner: React.FC<SavingsBannerProps> = ({ amount }) => {
    return (
        <div className="bg-pink-100 p-3 rounded-lg flex items-center gap-4">
            <div className="text-pink-500">
                <PiggyBankIcon className="w-12 h-12" strokeWidth={1.5} />
            </div>
            <div>
                <p className="font-bold text-pink-800 text-lg">
                    Has ahorrado <span className="text-xl">${amount}</span>
                </p>
                <p className="text-sm text-pink-700">Desde Junio de 2023. Sigue ahorrando con nosotros!</p>
            </div>
        </div>
    );
};