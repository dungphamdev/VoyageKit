export type ChecklistItem = {
    id: string;
    name: string;
    category: string;
    important: boolean;
};

export type Context = {
    id: string;
    name: string;
    icon: string;
    items: ChecklistItem[];
};

export const MOCK_CONTEXTS: Context[] = [
    {
        id: 'travel',
        name: 'Travel Packing',
        icon: 'briefcase',
        items: [
            { id: '1', name: 'Passport', category: 'Essentials', important: true },
            { id: '2', name: 'Phone Charger', category: 'Electronics', important: true },
            { id: '3', name: 'Toothbrush', category: 'Personal Care', important: false },
            { id: '4', name: 'Water Bottle', category: 'Accessories', important: false },
            { id: '5', name: 'Power Bank', category: 'Electronics', important: true },
            { id: '6', name: 'Sunglasses', category: 'Accessories', important: false },
        ],
    },
];
