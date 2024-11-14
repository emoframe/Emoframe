'use client'

import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next, Trans, useTranslation } from 'react-i18next';
i18n
  .use(initReactI18next) // Integração com React
  .use(resourcesToBackend((language, namespace) => import(`../../public/locales/${language}/${namespace}.json`)))
  .init({
    lng: 'pt', // Idioma inicial
    fallbackLng: 'pt', // Idioma de fallback
    debug: true, // Mostra informações de debug no console
    interpolation: {
      escapeValue: false, // Não é necessário escapar xss em react por padrão
    },
    preload: ['pt', 'en']
  });
export {i18n, Trans, useTranslation};