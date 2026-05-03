import { SusInstrument } from '@/components/form/instrument/MfSusForm';

export default function TestMfPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste Isolado do Micro Frontend SUS</h1>
      <p className="mb-8 text-gray-600">
        Esta página serve apenas para testar o carregamento do Web Component.
      </p>
      
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
        {/* Renderiza o wrapper do Next.js que carrega o Web Component */}
        <SusInstrument evaluationId="teste-dev-123" userId="user-teste-456" />
      </div>
    </div>
  );
}
