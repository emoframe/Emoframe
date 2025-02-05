'use client'

import React from "react"
import { useTranslation } from "react-i18next"

const WhatIs = () => {
    const { t } = useTranslation('specialist')
    return (
        <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-lg font-bold mb-4">{t('explanationTitle')}</h2>
            <p className="text-sm">
            {t('explanationDescription')}
            </p>
        </div>
    )
}

export default WhatIs