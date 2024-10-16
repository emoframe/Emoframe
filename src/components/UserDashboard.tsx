import React from 'react';
import EventList from './EventList';

interface Item {
  uid: string;
  name: string;
  date: string;
}

interface DashboardProps {
  pendingEvaluations: Item[];
  availableResults: Item[];
}

const UserDashboard: React.FC<DashboardProps> = ({ pendingEvaluations, availableResults }) => {
  return (
    <div className="flex bg-background p-6 rounded-lg shadow-lg md:min-w-[600px]">
      <div className="flex-1 text-center">
        <h2 className="text-md font-medium mb-4">Avaliações Pendentes</h2>
        <EventList eventItems={pendingEvaluations.map(e => ({href: `/user/evaluations/fill?evaluation=${e.uid}`, ...e}))}/>
      </div>
      <div className="flex-1 text-center mx-6">
        <h2 className="text-md font-medium mb-4">Resultados Disponíveis</h2>
        <EventList eventItems={availableResults.map(e => ({href: `/user/evaluations/fill?evaluation=${e.uid}`, ...e}))}/>
      </div>
    </div>
  );
};

export default UserDashboard;