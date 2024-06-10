"use client";

import React, { useEffect, useState, useTransition } from 'react';
import { columns } from './columns';
import EvaluationsAnswersDataTable from './data-table';
import { getById } from '@/lib/firebase';
import { appRedirect, getSessionUser } from '@/lib/actions';
import useUser from '@/components/hooks/useUser';
import { User } from '@/types/users';
import { Loader2 } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';

const Results = () => {
  const { user, evaluation } = useUser();
  const [data, setData] = useState<User[]>([]);
  const [loading, startTransition] = useTransition();
  const [initialLoading, setInitialLoading] = useState(true); // Estado de carregamento inicial
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!evaluation) {
        await appRedirect('/specialist/evaluations');
        return;
      }

      const sessionUser = await getSessionUser();

      try {
        if (evaluation.specialist !== sessionUser?.uid) {
          throw new Error("Evaluation não pertence a este specialist");
        }

        if (evaluation.answered) {
          startTransition(async () => {
            const usersData: User[] = await getById(evaluation.answered as string[], "user");
            setData(usersData);
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
      <h3 className='text-2xl font-semibold leading-none tracking-tight'>Usuários que responderam</h3>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <EvaluationsAnswersDataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default Results;
