import React from 'react';
  
interface OrderedListProps {
    listItems: string[];
}

const OrderedList: React.FC<OrderedListProps> = ({ listItems }) => {
    return (
        <ol className="space-y-2">
            {listItems.map((item, index) => (
                <li key={index} className="bg-primary-background p-3 rounded-md flex items-center shadow-sm"> 
                    <span className="mr-2 text-sm font-medium">{index + 1}.</span>
                    <span className="text-sm">{item}</span>
                </li>
            ))}
        </ol>
    )
}

export default OrderedList;