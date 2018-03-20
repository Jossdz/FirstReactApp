import React from 'react';
import Logo from '../ironhack.png';
export default () => {
  return (
    <nav className="navbar is-dark is-fixed-top" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        <img src={Logo} alt="logo" height="28"/>
        IronNews
      </a>
    </div>
</nav>
  )
}