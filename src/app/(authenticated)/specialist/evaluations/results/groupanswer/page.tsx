'use client';

import useUser from '@/components/hooks/useUser';
import LeapResultMultiple from '@/components/result/LeapResultMultiple';
import PanasResultMultiple from '@/components/result/PanasResultMultiple';
import SusResultMultiple from '@/components/result/SusResultMultiple';
import GdsResultMultiple from '@/components/result/GdsResultMultiple';
import SamResultMultiple from '@/components/result/SamResultMultiple';
import TuqResult from '@/components/result/TuqResult';
import { useToast } from '@/components/ui/use-toast';
import { appRedirect, getSessionUser } from '@/lib/actions';
import { getById } from '@/lib/firebase';
import { Answer, Evaluation, Gds, Leap, Panas, Sam, Sus, TuqRespostas } from '@/types/forms';
import { User } from '@/types/users';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState, useTransition } from 'react';

type UserAnswer = {
    user: User;
    data: Answer;
};

type RenderComponentProps = {
    evaluation: Evaluation;
    answers: UserAnswer[];
};

type SusAnswer = {
    user: User;
    data: Sus;
};

type SamAnswer = {
    user: User;
    data: Sam;
};

type GdsAnswer = {
    user: User;
    data: Gds;
};

type PanasAnswer = {
    user: User;
    data: Panas;
};

type LeapAnswer = {
    user: User;
    data: Leap;
};

const RenderComponent = ({ evaluation, answers }: RenderComponentProps) => {
    switch (evaluation.instrument) {
        case 'panas':
            return <PanasResultMultiple evaluation={evaluation} answers={answers as PanasAnswer[]} />;
        case 'leap':
            return <LeapResultMultiple evaluation={evaluation} answers={answers as LeapAnswer[]} />;
        case 'sus':
        case 'sus_mf':
            return <SusResultMultiple evaluation={evaluation} answers={answers as SusAnswer[]}/>;
        case 'tuq_mf':
            return (
                <div className="flex flex-col gap-16">
                    {answers.map((answer, index) => (
                        <TuqResult key={index} user={answer.user} evaluation={evaluation} data={answer.data as TuqRespostas} />
                    ))}
                </div>
            );
        case 'gds':
            return <GdsResultMultiple evaluation={evaluation} answers={answers as GdsAnswer[]}/>;
        case 'sam':
            return <SamResultMultiple evaluation={evaluation} answers={answers as SamAnswer[]}/>;
        default:
            return (
                <>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Resposta</h3>
                    <pre className="whitespace-pre-wrap break-words bg-white p-4 rounded-lg border border-gray-300">
                        {JSON.stringify(answers, null, 2)}
                    </pre>
                </>
            );
    }
};

const AnswerPage = () => {
    const { users, evaluation } = useUser();
    console.log('users: ', users);
    console.log('evaluation: ', evaluation);
    const [data, setData] = useState<UserAnswer[]>([]);
    const [loading, startTransition] = useTransition();
    const [initialLoading, setInitialLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            if (!evaluation || !users?.length) {
                await appRedirect('/specialist/evaluations');
                return;
            }

            const sessionUser = await getSessionUser();

            try {
                if (evaluation.specialist !== sessionUser?.uid) {
                    throw new Error('Evaluation não pertence a este specialist');
                }

                startTransition(async () => {
                    const answersData: UserAnswer[] = [];
                    for(const user of users) {
                        const answerData: Answer = await getById(user.uid as string, `evaluation/${evaluation.uid}/answers`);

                        if (answerData.uid) {
                            delete answerData.uid;
                        }
                        if (answerData.datetime) {
                            delete answerData.datetime;
                        }
                        answersData.push({
                            user: user,
                            data: answerData,
                        });
                    }

                    setData(answersData);
                    setInitialLoading(false);
                });
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
                    evaluation={evaluation as Evaluation}
                    answers={data}
                />
            )}
        </div>
    );
};

export default AnswerPage;
