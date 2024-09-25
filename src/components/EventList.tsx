import React from 'react';

interface Item {
    name: string;
    date: string;
}

interface EventListProps {
    lastEvents: Item[];
}


const EventList: React.FC<EventListProps> = ({ lastEvents }) => {
    return (
        <div className="bg-primary-background p-4 rounded-md shadow-sm">
          <ul className="space-y-2">
            {lastEvents.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span className='block text-left'>{item.name}</span>
                <span className='block text-right'>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default EventList;