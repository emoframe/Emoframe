'use client';

import useUser from '@/components/hooks/useUser';
import LeapResult from '@/components/result/LeapResult';
import PanasResult from '@/components/result/PanasResult';
import SusResult from '@/components/result/SusResult';
import GdsResult from '@/components/result/GdsResult';
import SamResult from '@/components/result/SamResult';
import { useToast } from '@/components/ui/use-toast';
import { appRedirect, getSessionUser } from '@/lib/actions';
import { getById } from '@/lib/firebase';
import { Answer, Evaluation, Gds, Leap, Panas, Sam, Sus } from '@/types/forms';
import { User } from '@/types/users';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState, useTransition } from 'react';

type RenderComponentProps = {
  user: User;
  evaluation: Evaluation;
  data: Answer;
};

const RenderComponent = ({ user, evaluation, data }: RenderComponentProps) => {
  const commonProps = { user, evaluation, data };
  switch (evaluation.instrument) {
    case 'panas':
      return <PanasResult user={user} evaluation={evaluation} data={data as Panas} />;
    case 'leap':
      return <LeapResult user={user} evaluation={evaluation} data={data as Leap} />;
    case 'sus':
      return <SusResult user={user} evaluation={evaluation} data={data as Sus} />;
    case 'gds':
      return <GdsResult user={user} evaluation={evaluation} data={data as Gds} />;
    case 'sam':
      return <SamResult user={user} evaluation={evaluation} data={data as Sam} />;
    default:
      return (
        <>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Resposta</h3>
          <pre className="whitespace-pre-wrap break-words bg-white p-4 rounded-lg border border-gray-300">
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      );
  }
};

const AnswerPage = () => {
  const { user, evaluation } = useUser();
  const [data, setData] = useState<Answer | null>(null);
  const [loading, startTransition] = useTransition();
  const [initialLoading, setInitialLoading] = useState(true);
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
          throw new Error('Evaluation não pertence a este specialist');
        } else if (user.specialistId !== sessionUser?.uid) {
          throw new Error('User não está relacionado a este specialist');
        }

        if (evaluation.answered?.includes(user.uid as string)) {
          startTransition(async () => {
            const answerData: Answer = await getById(user.uid as string, `evaluation/${evaluation.uid}/answers`);
            
            if (answerData.uid) {
              delete answerData.uid;
            }
            if (answerData.datetime) {
              delete answerData.datetime;
            }

            setData(answerData);
            setInitialLoading(false);
          });
        } else {
          setInitialLoading(false);
        }
      } catch (error) {
        console.log('Redirecionando devido ao erro: ', error);
        toast({
          title: 'Erro',
          description: 'Ocorreu algum problema',
          variant: 'destructive',
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
    <div
       className="flex flex-1 flex-col gap-4 min-h-[600px]"
      style={{ maxWidth: `calc(80vw - var(--sidebar)` }}
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <RenderComponent 
          user={user as User}
          evaluation={evaluation as Evaluation}
          data={data as Answer}
        />
      )}
    </div>
  );
};

export default AnswerPage;
