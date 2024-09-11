import React from 'react';
import { Button } from './ui/button';

const LatestPublications: React.FC = () => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-lg font-medium mb-4">Últimas publicações</h2>
      <ol className="space-y-2">
        {['Entenda cada um dos serviços', 'SUS - Como funciona'].map((item, index) => (
          <li key={index} className="bg-primary-background p-3 rounded-md flex items-center shadow-sm"> 
            <span className="mr-2 text-sm font-medium">{index + 1}.</span>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ol>
      <Button className="mt-4">Ver mais</Button>
    </div>
  );
};

export default LatestPublications;