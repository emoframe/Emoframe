import React from 'react';
import { Button } from './ui/button';
import { Play } from 'lucide-react';

// Componente para o bloco de Vídeos e tutoriais
const VideosTutorials: React.FC = () => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-lg font-medium mb-4">Vídeos e tutoriais</h2>
      <div className="flex items-center mb-4 bg-primary-background p-3 rounded-md shadow-sm">
        <div className="bg-background w-16 h-16 flex items-center justify-center rounded-lg mr-4">
          <Play className="text-gray-600" size={24} />
        </div>
        <div>
          <p className="text-sm">Saiba como criar uma nova avaliação</p>
        </div>
      </div>
      <Button className="px-4 py-2 rounded-md text-sm">Ver mais</Button>
    </div>
  );
};

export default VideosTutorials;