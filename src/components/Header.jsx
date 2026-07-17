import './Header.css';

function Header() {
  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__logo" aria-hidden="true">ML</div>
          <div className="header__text">
            <span className="header__title">
              MLR Institute of Technology
            </span>
            <span className="header__subtitle">
              B.Tech Class of 2026 — Graduate Data Collection
            </span>
          </div>
        </div>
        <div className="header__badge">
          <span className="header__badge-dot" aria-hidden="true"></span>
          <span className="header__badge-text">Accepting Responses</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
