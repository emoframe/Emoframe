"use client";

import useUser from '@/components/hooks/useUser';
import { useToast } from '@/components/ui/use-toast';
import { appRedirect, getSessionUser } from '@/lib/actions';
import { getById } from '@/lib/firebase';
import { Answer } from '@/types/forms';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState, useTransition } from 'react'

const AnswerPage = () => {

  const { user, evaluation } = useUser();
  const [data, setData] = useState<Answer>([]);
  const [loading, startTransition] = useTransition();
  const [initialLoading, setInitialLoading] = useState(true); // Estado de carregamento inicial
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!evaluation || !user) {
        await appRedirect('/specialist/evaluations');
        return;
      }

      const sessionUser = await getSessionUser();

      try {
        if (evaluation.specialist !== sessionUser?.uid) {
          throw new Error("Evaluation não pertence a este specialist");
        } else if (user.specialistId !== sessionUser?.uid) {
          throw new Error("User não está relacionado a este specialist");
        }

        if (evaluation.answered?.includes(user.uid as string)) {
          startTransition(async () => {
            const answerData: Answer = await getById(user.uid as string, `evaluation/${evaluation.uid}/answers`);
            setData(answerData);
            setInitialLoading(false); // Carregamento inicial concluído
          });
        } else {
          setInitialLoading(false); // Carregamento inicial concluído
        }
      } catch (error) {
        console.log("Redirecionando devido ao erro: ", error);
        toast({
          title: "Erro",
          description: "Ocorreu algum problema",
          variant: "destructive",
        });
        await appRedirect('/specialist/evaluations');
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initialLoading) {
    return <Loader2 className="animate-spin" />;
  }


  return (
    <div className="flex flex-1 flex-col gap-4 md:min-w-[50vw] lg:min-w-[70vw] md:min-h-[600px]">
      <h3 className='text-2xl font-semibold leading-none tracking-tight'>Resposta</h3>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <pre className="whitespace-pre-wrap break-words bg-white p-4 rounded-lg border border-gray-300">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default AnswerPage;