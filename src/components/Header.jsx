import './Header.css';

function Header({ user, onSignOut }) {
  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <div className="header__brand">
          <img src="/logo.png" alt="MLRIT Logo" className="header__logo-img" />
          <div className="header__text">
            <span className="header__title">
               MLR Institute of Technology
            </span>
            <span className="header__subtitle">
              B.Tech Class of 2026 — Graduate Data Collection
            </span>
          </div>
        </div>

        <div className="header__actions">
          {user ? (
            <div className="header__user-profile">
              <div className="header__user-info">
                <span className="header__user-name">{user.name}</span>
                <span className="header__user-email">
                  <span className="header__domain-badge">@mlrit.ac.in verified</span>
                  {user.email}
                </span>
              </div>
              {user.picture && (
                <img src={user.picture} alt={user.name} className="header__user-avatar" />
              )}
              <button
                type="button"
                className="header__signout-btn"
                onClick={onSignOut}
                title="Sign out of your account"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="header__badge">
              <span className="header__badge-dot" aria-hidden="true"></span>
              <span className="header__badge-text">Accepting Responses</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
