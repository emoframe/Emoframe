import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    // Esta função é chamada sempre que o componente é renderizado
    setCurrentLanguage(i18n.language);

    // O retorno de chamada de limpeza aqui não é necessário porque não estamos fazendo nenhuma subscrição
  }, [i18n.language]); // Dependência no idioma atual para acionar a atualização

  const isEnglish = currentLanguage.startsWith('en');

  const toggleLanguage = () => {
    const newLang = isEnglish ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} className="language-switch" title="Switch Language">
      <div className={`toggle-circle ${isEnglish ? 'move-right' : 'move-left'}`}>
        <span className="label">{isEnglish ? 'EN' : 'PT'}</span>
      </div>
    </button>
  );
}

export default LanguageSelector;
