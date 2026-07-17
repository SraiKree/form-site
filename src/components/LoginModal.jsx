import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './LoginModal.css';

function LoginModal({ isOpen, onClose, onSuccess }) {
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      setError('');
      if (!credentialResponse.credential) {
        setError('No credential returned from Google.');
        return;
      }
      const decoded = jwtDecode(credentialResponse.credential);
      const email = (decoded.email || '').toLowerCase();
      const name = decoded.name || decoded.given_name || 'Graduate Student';
      const picture = decoded.picture || '';

      if (!email.endsWith('@mlrit.ac.in')) {
        setError(`Access Restricted: You must log in using your official institutional email ending in @mlrit.ac.in. (Attempted: ${email})`);
        return;
      }

      onSuccess({
        email,
        name,
        picture,
        token: credentialResponse.credential,
        authType: 'oauth',
      });
    } catch (err) {
      console.error('Error decoding JWT:', err);
      setError('Failed to process Google authentication token.');
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-In failed or was cancelled. Please try again.');
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="login-modal__close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="login-modal__header">
          <div className="login-modal__icon">🔐</div>
          <h2 id="modal-title" className="login-modal__title">Institutional Verification</h2>
          <p className="login-modal__subtitle">
            To maintain data integrity and security, access to this form is strictly restricted to verified graduates of MLR Institute of Technology.
          </p>
        </div>

        {error && (
          <div className="login-modal__error" role="alert">
            <span className="login-modal__error-icon">🚫</span>
            <span className="login-modal__error-text">{error}</span>
          </div>
        )}

        <div className="login-modal__body">
          <div className="login-modal__requirement">
            <span className="login-modal__badge">Mandatory Requirement</span>
            <p className="login-modal__req-text">
              Sign in with your official Google account ending in <strong>@mlrit.ac.in</strong>
            </p>
          </div>

          <div className="login-modal__oauth">
            <div className="login-modal__google-wrap">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_blue"
                size="large"
                shape="rectangular"
                width="100%"
                text="continue_with"
              />
            </div>
          </div>
        </div>

        <div className="login-modal__footer">
          <p>
            Having trouble signing into your institutional account? Contact the MLRIT IT Helpdesk or Placement Cell.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
