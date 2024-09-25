import React from 'react';
import { Button } from './ui/button';
import OrderedList from './ui/ordered-list';

const LatestPublications: React.FC = () => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-lg font-medium mb-4">Perguntas Frequentes</h2>
      <OrderedList listItems={['Como alterar o meu cadastro?', 'Posso repetir uma avaliação?']}/>
      <Button className="mt-4">Ver mais</Button>
    </div>
  );
};

export default LatestPublications;