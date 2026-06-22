'use client'; // Obrigatório no Next.js (App Router)

import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveAnswer } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

interface SusInstrumentProps {
    evaluationId: string;
    userId: string;
}

export function SusInstrument({ evaluationId, userId }: SusInstrumentProps) {
    const { push } = useRouter();
    const { toast } = useToast();
    const { t } = useTranslation('specialist_services_instruments_sus');

    useEffect(() => {
        const handleMfEvent = (event: Event) => {
            const customEvent = event as CustomEvent;
            const { answers, score, evaluationId, userId } = customEvent.detail;
            console.log('Dados recebidos do MF:', customEvent.detail);

            saveAnswer({ ...answers, score }, evaluationId, userId).then(() => {
                toast({
                    title: t("submitTitle", "Avaliação salva com sucesso!"),
                    description: t("submitMessage", "Obrigado por responder o formulário."),
                });
                push('/user/evaluations');
            }).catch((err) => {
                console.error("Erro ao salvar avaliação do MF", err);
                toast({
                    title: "Erro",
                    description: "Ocorreu um erro ao salvar as respostas.",
                    variant: "destructive"
                });
            });
        };

        window.addEventListener('sus-completed', handleMfEvent);
        return () => window.removeEventListener('sus-completed', handleMfEvent);
    }, []);

    return (
        <div className="sus-wrapper">
            {/* 
                Em desenvolvimento local, consumimos diretamente o servidor do Vite (porta 5173).
                Em produção, este script deve apontar para o bundle gerado (ex: dist/sus-form.js).
            */}
            <Script
                src="http://localhost:5173/@vite/client"
                strategy="lazyOnload"
                type="module"
            />
            <Script
                src="http://localhost:5173/src/main.tsx"
                strategy="lazyOnload"
                type="module"
            />

            {/* A nossa tag customizada registrada pelo MF */}
            <emoframe-mf-sus
                evaluation-id={evaluationId}
                user-id={userId}
            ></emoframe-mf-sus>
        </div>
    );
}
