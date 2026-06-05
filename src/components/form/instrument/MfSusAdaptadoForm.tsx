'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveAnswer } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';

interface SusAdaptadoInstrumentProps {
    evaluationId: string;
    userId: string;
}

// Declarar o custom element para o TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'emoframe-mf-sus-adaptado': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'evaluation-id'?: string;
        'user-id'?: string;
      };
    }
  }
}

export function MfSusAdaptadoForm({ evaluationId, userId }: SusAdaptadoInstrumentProps) {
    const { push } = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const handleMfEvent = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { answers, score, evaluationId, userId } = customEvent.detail;
            console.log('Dados recebidos do MF SUS Adaptado:', customEvent.detail);
            
            saveAnswer({ ...answers, score }, evaluationId, userId).then(() => {
                toast({
                    title: "Avaliação salva com sucesso!",
                    description: "Obrigado por responder o formulário.",
                });
                push('/user/evaluations');
            }).catch((err) => {
                console.error("Erro ao salvar avaliação do MF SUS Adaptado", err);
                toast({
                    title: "Erro",
                    description: "Ocorreu um erro ao salvar as respostas.",
                    variant: "destructive"
                });
            });
        };

        window.addEventListener('sus-adaptado-completed', handleMfEvent);
        return () => window.removeEventListener('sus-adaptado-completed', handleMfEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mfUrl = process.env.NEXT_PUBLIC_MF_SUS_ADAPTADO_URL || 'http://localhost:5175/sus-adaptado-form.js';
    const isDev = mfUrl.includes('localhost');

    return (
        <div className="sus-adaptado-wrapper">
            {isDev ? (
                <>
                    <Script
                        src="http://localhost:5175/@vite/client"
                        strategy="lazyOnload"
                        type="module"
                    />
                    <Script
                        src="http://localhost:5175/src/main.tsx"
                        strategy="lazyOnload"
                        type="module"
                    />
                </>
            ) : (
                <Script
                    src={mfUrl}
                    strategy="lazyOnload"
                    type="module"
                />
            )}

            <emoframe-mf-sus-adaptado
                evaluation-id={evaluationId}
                user-id={userId}
            ></emoframe-mf-sus-adaptado>
        </div>
    );
}
