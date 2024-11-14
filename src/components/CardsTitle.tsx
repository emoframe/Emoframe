'use client'

import React from "react"
import { useTranslation } from "react-i18next"

const CardsTitle = ({ns}) => {
    const { t } = useTranslation(ns);
    return (
        <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
    )
}

export default CardsTitle