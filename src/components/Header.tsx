import React from 'react';
import '../styles/Header.css';

const Header = ({ name }) => {
  return (
    <div className="header">
      <h1>Boas vindas, <span>{name}</span>!</h1>
      <div><p>Últimas avaliações</p>
      <p>Últimos resultados</p></div>
    </div>
  );
}

export default Header;
