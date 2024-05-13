import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../public/locales/en/translation.json'
import ptTranslation from '../../public/locales/pt/translation.json'

i18n
  .use(initReactI18next) // Integração com React
  .init({
    lng: 'pt', // Idioma inicial
    fallbackLng: 'pt', // Idioma de fallback
    debug: true, // Mostra informações de debug no console
    resources: {
      en: {
        translation: enTranslation
      },
      pt: {
        translation: ptTranslation
      }
    },
    interpolation: {
      escapeValue: false, // Não é necessário escapar xss em react por padrão
    }
  });

export default i18n;
