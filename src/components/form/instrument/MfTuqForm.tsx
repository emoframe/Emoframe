'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveAnswer } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';

interface TuqInstrumentProps {
    evaluationId: string;
    userId: string;
}

// Declarar o custom element para o TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'emoframe-mf-tuq': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'evaluation-id'?: string;
        'user-id'?: string;
      };
    }
  }
}

export function MfTuqForm({ evaluationId, userId }: TuqInstrumentProps) {
    const { push } = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const handleMfEvent = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { answers, score, totalRespondidas, evaluationId, userId } = customEvent.detail;
            console.log('Dados recebidos do MF TUQ:', customEvent.detail);
            
            saveAnswer({ ...answers, score, totalRespondidas }, evaluationId, userId).then(() => {
                toast({
                    title: "Avaliação salva com sucesso!",
                    description: "Obrigado por responder o formulário.",
                });
                push('/user/evaluations');
            }).catch((err) => {
                console.error("Erro ao salvar avaliação do MF TUQ", err);
                toast({
                    title: "Erro",
                    description: "Ocorreu um erro ao salvar as respostas.",
                    variant: "destructive"
                });
            });
        };

        window.addEventListener('tuq-completed', handleMfEvent);
        return () => window.removeEventListener('tuq-completed', handleMfEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mfUrl = process.env.NEXT_PUBLIC_MF_TUQ_URL || 'http://localhost:5174/tuq-form.js';
    const isDev = mfUrl.includes('localhost');

    return (
        <div className="tuq-wrapper">
            {isDev ? (
                <>
                    <Script
                        src="http://localhost:5174/@vite/client"
                        strategy="lazyOnload"
                        type="module"
                    />
                    <Script
                        src="http://localhost:5174/src/main.tsx"
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

            <emoframe-mf-tuq
                evaluation-id={evaluationId}
                user-id={userId}
            ></emoframe-mf-tuq>
        </div>
    );
}
