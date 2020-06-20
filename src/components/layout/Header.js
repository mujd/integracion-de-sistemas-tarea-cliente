import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <Link to={'/'} className="text-white">
            <h2>Integración de Sistemas</h2>
          </Link>
        </div>
        <div className="links">
          <Link to={'/persona/nuevo'} className="btn btn-light">
            <span className="material-icons">add</span> Agregar Persona
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
