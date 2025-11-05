'use client';

import useUser from '@/components/hooks/useUser';
import PageResult from '@/components/result/PageResult';
import { appRedirect } from '@/lib/actions';
import { Answer, Page } from '@/types/forms';
import { PageUser } from '@/types/users';
import React from 'react';

type RenderComponentProps = {
    user: PageUser;
    data: Answer & Page;
};

const RenderComponent = ({ user, data }: RenderComponentProps) => {
    const defaultFeedback = {
        evaluationId: '',
        otherRequirements: '',
        gerontologistEvaluation: '',
        problems: '',
        objectives: '',
        actionsAndServices: '',
        actionsAndServicesCoordination: Array(6).fill({
            date: new Date(Date.now()),
            actions: '',
            services: '',
        }),
        reevaluation: Array(6).fill({
            date: new Date(Date.now()),
            actions: '',
            services: '',
        }),
    }
    return <PageResult user={user} data={data} feedback={data.feedback ?? defaultFeedback} />;
};

const AnswerPage = () => {
    const { answer } = useUser();
    if(!answer){
        appRedirect('/specialist/services/page/results');
        return;
    }

    return (
        <div
            className="flex flex-1 flex-col gap-4 min-h-[600px] print:!max-w-[70%]"
            style={{ maxWidth: `calc(80vw - var(--sidebar)` }}
        >
            
            <RenderComponent
                user={answer?.user as PageUser}
                data={answer as Answer & Page}
            />
        </div>
    );
};

export default AnswerPage;
