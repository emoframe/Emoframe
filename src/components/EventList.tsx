import Link from 'next/link';
import React from 'react';

interface Item {
    uid: string;
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
                            <Link key={index} href={`/user/evaluations/fill?evaluation=${item.uid}`}>
                                <li className="flex justify-between text-sm hover:text-primary transition-colors">
                                    <span className='block text-left'>{item.name}</span>
                                    <span className='block text-right'>{item.date}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : 'Nenhum item encontrado'
            }
        </div>
    );
};

export default EventList;