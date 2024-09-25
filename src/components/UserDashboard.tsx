import React from 'react';
import EventList from './EventList';

interface Item {
  name: string;
  date: string;
}

interface DashboardProps {
  lastEvaluations: Item[];
  lastResults: Item[];
}

const UserDashboard: React.FC<DashboardProps> = ({ lastEvaluations, lastResults }) => {
  return (
    <div className="flex bg-background p-6 rounded-lg shadow-lg md:min-w-[600px]">
      <div className="flex-1 text-center">
        <h2 className="text-md font-medium mb-4">Avaliações Pendentes</h2>
        <EventList lastEvents={lastEvaluations}/>
      </div>
      <div className="flex-1 text-center mx-6">
        <h2 className="text-md font-medium mb-4">Resultados Disponíveis</h2>
        <EventList lastEvents={lastResults}/>
      </div>
    </div>
  );
};

export default UserDashboard;