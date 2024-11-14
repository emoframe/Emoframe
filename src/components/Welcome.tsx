'use client'

import React from "react";
import { useTranslation } from 'react-i18next';

const Welcome = ({name}) => {
    const { t } = useTranslation('specialist')
    return (
        <h1 className="text-2xl font-bold mb-6">{t('welcome', {name})}
        </h1>
    )
}

export default Welcome