import React from 'react';

interface Item {
    name: string;
    date: string;
}

interface EventListProps {
    eventItems: Item[];
}


const EventList: React.FC<EventListProps> = ({ eventItems }) => {
    return (
        <div className="bg-primary-background p-4 rounded-md shadow-sm">
            {
                eventItems.length ? (
                    <ul className="space-y-2">
                        {eventItems.map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                                <span className='block text-left'>{item.name}</span>
                                <span className='block text-right'>{item.date}</span>
                            </li>
                        ))}
                    </ul>
                ) : 'Nenhum item encontrado'
            }
        </div>
    );
};

export default EventList;