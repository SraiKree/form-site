import './LandingPage.css';

function LandingPage({ onBegin }) {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="landing__hero">
        <div className="landing__hero-inner">
          <div className="landing__eyebrow">
            <span className="landing__eyebrow-icon">📋</span>
            Official Data Collection Form
          </div>

          <h1 className="landing__heading">
            B.Tech Graduate Survey,{' '}
            <span className="landing__heading-accent">Class of 2026</span>
          </h1>

          <p className="landing__description">
            This form is intended for UG students who have graduated from MLR Institute of Technology and secured admission for higher studies during the academic year 2026–2027. Please provide accurate details of your admission and upload valid supporting documents. The information collected through this form will be used solely for institutional records, accreditation, and reporting purposes. Kindly ensure that all information provided is accurate and complete before submitting the form.
          </p>

          <div className="landing__meta">
            <div className="landing__meta-item">
              <span className="landing__meta-label">Estimated Time</span>
              <span className="landing__meta-value">~5 minutes</span>
            </div>
            <div className="landing__meta-item">
              <span className="landing__meta-label">Target Audience</span>
              <span className="landing__meta-value">Class of 2026</span>
            </div>
            <div className="landing__meta-item">
              <span className="landing__meta-label">Purpose</span>
              <span className="landing__meta-value">Institutional Records</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="landing__content">
        <div className="landing__content-inner">

          {/* Info Cards */}
          <div className="landing__cards">
            <div className="landing__card">
              <div className="landing__card-icon">🎓</div>
              <h3 className="landing__card-title">Who Should Fill This</h3>
              <p className="landing__card-text">
                UG students who have graduated from MLR Institute of Technology (Class of 2026).
              </p>
            </div>
            <div className="landing__card">
              <div className="landing__card-icon">📄</div>
              <h3 className="landing__card-title">What Data Is Collected</h3>
              <p className="landing__card-text">
                Details regarding your admission for higher studies or employment, along with valid supporting documents.
              </p>
            </div>
            <div className="landing__card">
              <div className="landing__card-icon">🔒</div>
              <h3 className="landing__card-title">Data Privacy</h3>
              <p className="landing__card-text">
                Information will be used solely for institutional records, accreditation, and reporting purposes.
              </p>
            </div>
          </div>

          {/* Instructions */}
          <section className="landing__section">
            <div className="landing__section-header">
              <div className="landing__section-icon">📝</div>
              <h2 className="landing__section-title">Instructions</h2>
            </div>

            <ol className="landing__instructions">
              <li className="landing__instruction">
                <span className="landing__instruction-number">1</span>
                <div className="landing__instruction-content">
                  <p className="landing__instruction-title">Provide Accurate Details</p>
                  <p className="landing__instruction-text">
                    Kindly ensure that all information provided is accurate and complete before submitting the form.
                  </p>
                </div>
              </li>
              <li className="landing__instruction">
                <span className="landing__instruction-number">2</span>
                <div className="landing__instruction-content">
                  <p className="landing__instruction-title">Prepare Documents</p>
                  <p className="landing__instruction-text">
                    Keep your valid supporting documents ready for upload (e.g., offer letter, admission proof, photo).
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Important Notice */}
          <div className="landing__notice">
            <span className="landing__notice-icon">⚠️</span>
            <div className="landing__notice-content">
              <p className="landing__notice-title">Important Notice</p>
              <p className="landing__notice-text">
                Please double-check your entries. Providing accurate data helps the institution with official records and accreditation.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="landing__cta">
            <button
              className="landing__cta-button"
              onClick={onBegin}
              type="button"
            >
              Begin Form
              <span className="landing__cta-arrow" aria-hidden="true">→</span>
            </button>
            <p className="landing__cta-hint">
              You will be able to review your responses before submitting.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default LandingPage;
