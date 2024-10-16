import React from 'react';
import EventList from './EventList';

interface Item {
  name: string;
  date: string;
}

interface DashboardProps {
  lastEvaluations: Item[];
  lastResults: Item[];
  userCount: number;
}

const SpecialistDashboard: React.FC<DashboardProps> = ({ lastEvaluations, lastResults, userCount }) => {
  return (
    <div className="flex bg-background p-6 rounded-lg shadow-lg md:min-w-[600px]">
      <div className="flex-1 text-center">
        <h2 className="text-md font-medium mb-4">Últimas avaliações</h2>
        <EventList eventItems={lastEvaluations.map(e => ({href: '/specialist/evaluations', ...e}))}/>
      </div>
      <div className="flex-1 text-center mx-6">
        <h2 className="text-md font-medium mb-4">Últimos resultados</h2>
        <EventList eventItems={lastResults.map(e => ({href: '/specialist/results', ...e}))}/>
      </div>
      <div className="flex-0 text-center">
        <h2 className="text-md font-medium mb-4">Nº Usuários</h2>
        <div className="bg-primary-background p-4 rounded-md">
          <p className="text-5xl font-semibold">{userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialistDashboard;