import React from 'react';

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
    <div className="flex bg-primary-background p-6 rounded-lg shadow-lg md:min-w-[600px]">
      <div className="flex-1 text-center">
        <h2 className="text-md font-medium mb-4">Últimas avaliações</h2>
        <div className="bg-background p-4 rounded-lg shadow-sm">
          <ul className="space-y-2">
            {lastEvaluations.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span className='block text-left'>{item.name}</span>
                <span className='block text-right'>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 text-center mx-6">
        <h2 className="text-md font-medium mb-4">Últimos resultados</h2>
        <div className="bg-background p-4 rounded-md shadow-sm">
          <ul className="space-y-2">
            {lastResults.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span className='block text-left'>{item.name}</span>
                <span className='block text-right'>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-0 text-center">
        <h2 className="text-md font-medium mb-4">Nº Usuários</h2>
        <div className="bg-background p-4 rounded-md">
          <p className="text-5xl font-semibold">{userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialistDashboard;