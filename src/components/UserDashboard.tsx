'use client'

import React from 'react';
import EventList from './EventList';
import { useTranslation } from 'react-i18next';

interface Item {
  uid: string;
  name: string;
  date: string;
}

interface DashboardProps {
  pendingEvaluations: Item[];
  availableResults: Item[];
}

const UserDashboard: React.FC<DashboardProps> = ({ pendingEvaluations, availableResults }) => {
  const { t } = useTranslation('user');
  return (
    <div className="flex flex-col gap-4 md:flex-row bg-background p-6 rounded-lg shadow-lg md:min-w-[600px]">
      <div className="flex-1 text-center">
        <h2 className="text-md font-medium mb-4">{t('pendingEvaluationsTitle')}</h2>
        <EventList eventItems={pendingEvaluations.map(e => ({href: `/user/evaluations/fill?evaluation=${e.uid}`, ...e}))}/>
      </div>
      <div className="flex-1 text-center">
        <h2 className="text-md font-medium mb-4">{t('availableResultsTitle')}</h2>
        <EventList eventItems={availableResults.map(e => ({href: `/user/evaluations/fill?evaluation=${e.uid}`, ...e}))}/>
      </div>
    </div>
  );
};

export default UserDashboard;