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
            Placeholder description text — this section will contain an overview of the
            form's purpose, why this data is being collected, and how it benefits
            graduating students and the institution. Replace with actual content later.
          </p>

          <div className="landing__meta">
            <div className="landing__meta-item">
              <span className="landing__meta-label">Estimated Time</span>
              <span className="landing__meta-value">~10 minutes</span>
            </div>
            <div className="landing__meta-item">
              <span className="landing__meta-label">Sections</span>
              <span className="landing__meta-value">4 sections</span>
            </div>
            <div className="landing__meta-item">
              <span className="landing__meta-label">Deadline</span>
              <span className="landing__meta-value">To be announced</span>
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
                Placeholder text — describe the target audience. E.g., all B.Tech
                students graduating from MLRIT in 2026 across all branches.
              </p>
            </div>
            <div className="landing__card">
              <div className="landing__card-icon">📊</div>
              <h3 className="landing__card-title">What Data Is Collected</h3>
              <p className="landing__card-text">
                Placeholder text — outline the types of data that will be collected
                such as personal details, academic records, and placement info.
              </p>
            </div>
            <div className="landing__card">
              <div className="landing__card-icon">🔒</div>
              <h3 className="landing__card-title">Data Privacy</h3>
              <p className="landing__card-text">
                Placeholder text — assure respondents about data privacy, storage
                security, and the institutional use policy for collected information.
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
                  <p className="landing__instruction-title">Placeholder Instruction Title</p>
                  <p className="landing__instruction-text">
                    Placeholder text for the first instruction — describe what respondents
                    need to do before starting the form. E.g., keep your roll number,
                    hall ticket, and placement details handy.
                  </p>
                </div>
              </li>
              <li className="landing__instruction">
                <span className="landing__instruction-number">2</span>
                <div className="landing__instruction-content">
                  <p className="landing__instruction-title">Placeholder Instruction Title</p>
                  <p className="landing__instruction-text">
                    Placeholder text for the second instruction — e.g., fill all fields
                    accurately. Incorrect data may lead to discrepancies in records.
                  </p>
                </div>
              </li>
              <li className="landing__instruction">
                <span className="landing__instruction-number">3</span>
                <div className="landing__instruction-content">
                  <p className="landing__instruction-title">Placeholder Instruction Title</p>
                  <p className="landing__instruction-text">
                    Placeholder text for the third instruction — e.g., you can save
                    progress and resume later. Ensure you submit before the deadline.
                  </p>
                </div>
              </li>
              <li className="landing__instruction">
                <span className="landing__instruction-number">4</span>
                <div className="landing__instruction-content">
                  <p className="landing__instruction-title">Placeholder Instruction Title</p>
                  <p className="landing__instruction-text">
                    Placeholder text for the fourth instruction — e.g., for any technical
                    issues or queries, contact the placement cell at the provided email.
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
                Placeholder notice text — this will contain critical information such as
                submission deadlines, mandatory fields warning, or consequences of not
                submitting. Replace with actual content later.
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
