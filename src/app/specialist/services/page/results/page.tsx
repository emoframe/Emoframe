"use client";

import React, { useEffect, useState, useTransition } from 'react';
import { columns } from './columns';
import PageAnswersDataTable from './data-table';
import { getById, search } from '@/lib/firebase';
import { appRedirect, getSessionUser } from '@/lib/actions';
import useUser from '@/components/hooks/useUser';
import { PageUser, User } from '@/types/users';
import { Loader2 } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';
import { Answer, PageFeedback } from '@/types/forms';

const Results = () => {
    const { user, evaluation } = useUser();
    const [data, setData] = useState<Answer[]>([]);
    const [loading, startTransition] = useTransition();
    const [initialLoading, setInitialLoading] = useState(true); // Estado de carregamento inicial
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {

            const sessionUser = await getSessionUser();

            try {
                startTransition(async () => {
                    const answersData: Answer[] = await search('page_answer', [{
                        field: 'specialist',
                        operation: '==',
                        value: sessionUser?.uid,
                    }]);
                    for (const answer of answersData) {
                        const userData: PageUser = await getById(answer.user as string, 'page_user');
                        answer.user = userData;
                        const feedbackDataRaw = await getById(answer.uid as string, 'page_feedback');
                        if (feedbackDataRaw) {
                            const feedbackData: PageFeedback = {
                                evaluationId: feedbackDataRaw.evaluationId,
                                otherRequirements: feedbackDataRaw.otherRequirements,
                                gerontologistEvaluation: feedbackDataRaw.gerontologistEvaluation,
                                problems: feedbackDataRaw.problems,
                                objectives: feedbackDataRaw.objectives,
                                actionsAndServices: feedbackDataRaw.actionsAndServices,
                                actionsAndServicesCoordination: [],
                                reevaluation: [],
                            };
                            for(const item of feedbackDataRaw.actionsAndServicesCoordination){
                                feedbackData.actionsAndServicesCoordination.push({
                                    date: item.date.toDate(),
                                    actions: item.actions,
                                    services: item.services,
                                });
                            }
                            for(const item of feedbackDataRaw.reevaluation){
                                feedbackData.reevaluation.push({
                                    date: item.date.toDate(),
                                    actions: item.actions,
                                    services: item.services,
                                });
                            }
                            answer.feedback = feedbackData;
                        }
                    }
                    setData(answersData);
                    setInitialLoading(false); // Carregamento inicial concluído
                });
            } catch (error) {
                console.log("Redirecionando devido ao erro: ", error);
                toast({
                    title: "Erro",
                    description: "Ocorreu algum problema",
                    variant: "destructive",
                });
                await appRedirect('/specialist/services/page');
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
            <h3 className='text-2xl font-semibold leading-none tracking-tight'>Respostas</h3>
            {loading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <PageAnswersDataTable columns={columns} data={data} />
            )}
        </div>
    );
};

export default Results;
