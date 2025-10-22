import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { PlusIcon, MinusIcon, NotebookPenIcon, BadgePercentIcon } from './icons';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};


interface CartItemProps {
  item: Product & { quantity: number };
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity } = useCart();
    const [note, setNote] = useState('');
    const [isEditingNote, setIsEditingNote] = useState(false);
    
    // Mock one item having a note to match the screenshot
    useEffect(() => {
        if (item.id === 15) { // Arvejas Partidas
            setNote('Por favor elijan las de vencimiento más lejano.');
        }
    }, [item.id]);

    const savingsPerUnit = item.oldPrice ? item.oldPrice - item.price : 0;

    const handleRemove = () => updateQuantity(item.id, 0);
    const handleDecrement = () => updateQuantity(item.id, item.quantity - 1);
    const handleIncrement = () => updateQuantity(item.id, item.quantity + 1);
    
    return (
        <div className="py-4 border-b border-gray-200">
            <div className="flex gap-3">
                <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
                    <img src={item.imageUrl} alt={item.name} className="max-w-full max-h-full object-contain" />
                     {item.discount && (
                        <div className="absolute top-0 left-0 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 transform -translate-x-1 -translate-y-1 rounded-md shadow">
                            -{item.discount}%
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <p className="font-bold text-gray-800 leading-tight mb-1">{item.name}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(item.price)}</p>
                        {item.oldPrice && <p className="text-base text-gray-500 line-through">{formatCurrency(item.oldPrice)}</p>}
                    </div>
                    {savingsPerUnit > 0 && 
                        <p className="text-sm text-red-600 font-semibold flex items-center gap-1 mt-1">
                            <BadgePercentIcon className="w-4 h-4" />
                            Ahorras: {formatCurrency(savingsPerUnit)}
                        </p>
                    }
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <button onClick={() => setIsEditingNote(!isEditingNote)} className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600">
                    <NotebookPenIcon className="w-5 h-5"/>
                    <span className="truncate max-w-[100px]">{note ? (isEditingNote ? 'Editando nota...' : note) : 'Agregar notas'}</span>
                </button>
                <div className="flex items-center gap-4">
                    <button onClick={handleRemove} className="text-sm font-bold text-red-600">Quitar</button>
                    <div className="flex items-center justify-between border-2 border-green-600 text-green-700 rounded-full w-[100px]">
                        <button onClick={handleDecrement} className="p-1" aria-label="Disminuir cantidad"><MinusIcon className="w-5 h-5"/></button>
                        <span className="font-bold select-none text-lg">{item.quantity}</span>
                        <button onClick={handleIncrement} className="p-1" aria-label="Aumentar cantidad"><PlusIcon className="w-5 h-5"/></button>
                    </div>
                </div>
            </div>
            {isEditingNote && (
                <div className="mt-3">
                    <textarea 
                        className="w-full border rounded p-2 text-sm focus:ring-green-500 focus:border-green-500"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ej: Tomates maduros para salsa"
                        rows={2}
                    />
                    <button onClick={() => setIsEditingNote(false)} className="text-sm bg-green-600 text-white px-4 py-1 rounded-full mt-1 hover:bg-green-700">Guardar</button>
                </div>
            )}
        </div>
    );
};
