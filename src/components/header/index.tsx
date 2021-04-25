import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import '../../styles/components/header.css';
import icon from '../../icons/hamburger-icon.svg';

export default function Header() {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const location = useLocation();
  const HIDE_HEADER_AT = ['/login', '/logout'];
  const links = [
    {
      label: 'Account',
      to: '/account'
    },
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Logout',
      to: '/logout'
    }
  ].filter(({ to }) => location.pathname !== to);

  function handleNavBarVisibility() {
    setIsNavBarVisible(isNavBarVisible => !isNavBarVisible);
  }

  if (HIDE_HEADER_AT.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="app-header">
      <button type="button" className="menu" onClick={handleNavBarVisibility}>
        <img src={icon} alt="Menu"/>
      </button>
      <nav onClick={handleNavBarVisibility} className={`nav-bar ${isNavBarVisible ? 'visible' : 'hidden'}`}>
        {links.map(({ label, to }) => {
          const id = uuidv4();

          return <Link className="nav-item" key={id} to={to}>{label}</Link>
        })}
      </nav> 
    </header>
  );
}