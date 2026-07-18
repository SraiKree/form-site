import { useState, useRef, useEffect } from 'react';
import { fileToBase64 } from '../utils/fileUtils';
import './FormPage.css';

const DEPARTMENTS = [
  'AERO',
  'CSE',
  'CSE - AIML',
  'CSE - CS',
  'CSE - DS',
  'CSIT',
  'ECE',
  'EEE',
  'IT',
  'MECH',
];

const STATUS_OPTIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'higher-studies', label: 'Pursuing higher studies (PG / MS / MBA etc.)' },
  { value: 'entrepreneur', label: 'Entrepreneurship / Self-employed' },
  { value: 'preparing', label: 'Preparing for competitive exams' },
  { value: 'searching', label: 'Seeking opportunities' },
  { value: 'other', label: 'Other' },
];

/* === Reusable File Upload Component === */
function FileUploadField({ id, label, required, hint, accept, file, onFileChange, onRemove }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFileChange(dropped);
  };

  const handleInputChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) onFileChange(selected);
  };

  const handleRemove = () => {
    onRemove();
    if (inputRef.current) inputRef.current.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label} {required && <span className="form-label__required">*</span>}
      </label>
      {hint && (
        <p className="form-hint" style={{ marginBottom: 'var(--space-3)' }}>{hint}</p>
      )}

      {!file ? (
        <div
          className={`file-upload ${dragActive ? 'file-upload--drag' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.click(); }}
        >
          <div className="file-upload__icon">📄</div>
          <p className="file-upload__text">
            <span className="file-upload__link">Click to upload</span> or drag and drop
          </p>
          <p className="file-upload__hint">PDF, JPG, or PNG up to 10 MB</p>
          <input
            ref={inputRef}
            id={id}
            type="file"
            className="file-upload__input"
            accept={accept || '.pdf,.jpg,.jpeg,.png'}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div className="file-preview">
          <div className="file-preview__info">
            <span className="file-preview__icon">
              {file.type && file.type.includes('pdf') ? '📑' : '🖼️'}
            </span>
            <div className="file-preview__details">
              <p className="file-preview__name">{file.name}</p>
              <p className="file-preview__size">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            className="file-preview__remove"
            onClick={handleRemove}
            aria-label="Remove file"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

/* === Main Form Page === */
function FormPage({ user, onBack }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    rollNumber: '',
    department: '',
    currentStatus: '',
    // PG fields
    pgCourse: '',
    pgInstitution: '',
    pgSpecialization: '',
    // Employment fields
    companyName: '',
    package: '',
    // Exam fields
    examName: '',
    // Seeking fields
    seekingExplanation: '',
  });

  const [files, setFiles] = useState({
    admissionProof: null,
    joiningLetter: null,
    photo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    if (user && user.name && !formData.name) {
      setFormData((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setFile = (key, file) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const removeFile = (key) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
  };

  const isPG = formData.currentStatus === 'higher-studies';
  const isEmployed = formData.currentStatus === 'employed';
  const isEntrepreneur = formData.currentStatus === 'entrepreneur';
  const isPreparing = formData.currentStatus === 'preparing';
  const isSearching = formData.currentStatus === 'searching';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for files & conditional fields
    if (isEmployed) {
      if (!files.joiningLetter) {
        alert('Please upload your Joining Letter.');
        return;
      }
      if (!files.photo) {
        alert('Please upload your Photo.');
        return;
      }
    }

    if (isPG) {
      if (!files.admissionProof) {
        alert('Please upload your Proof of Admission.');
        return;
      }
      if (!files.photo) {
        alert('Please upload your Photo.');
        return;
      }
    }

    if (isEntrepreneur) {
      if (!formData.companyName) {
        alert('Please enter your Company Name.');
        return;
      }
      if (!files.photo) {
        alert('Please upload your Photo.');
        return;
      }
    }

    if (isPreparing) {
      if (!formData.examName) {
        alert('Please enter the Exam Name.');
        return;
      }
      if (!files.photo) {
        alert('Please upload your Photo.');
        return;
      }
    }

    setIsSubmitting(true);
    setStatusMessage('Converting attached documents to Base64...');

    try {
      const base64Files = {};
      if (files.joiningLetter) base64Files.joiningLetter = await fileToBase64(files.joiningLetter);
      if (files.photo) base64Files.photo = await fileToBase64(files.photo);
      if (files.admissionProof) base64Files.admissionProof = await fileToBase64(files.admissionProof);

      setStatusMessage('Sending data & documents to Google Cloud & Google Drive...');

      const payload = {
        googleEmail: user?.email,
        ...formData,
        files: base64Files,
      };

      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) {
        throw new Error('Google Script URL is not configured in .env');
      }

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      
      if (result.success) {
        setSubmissionResult({
          success: true,
          folderUrl: result.folderUrl,
          message: 'Your response and documents were successfully recorded in Google Sheets and uploaded to your dedicated Google Drive folder!',
        });
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || 'Backend returned an error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Error submitting to Google Cloud: ' + (err.message || 'Unknown network error'));
    } finally {
      setIsSubmitting(false);
      setStatusMessage('');
    }
  };

  if (isSubmitted && submissionResult) {
    return (
      <div className="form-page">
        <main className="form-page__content">
          <div className="form-page__inner">
            <div className="form-page__card form-page__success">
              <div className="form-page__success-icon">🎉</div>
              <h2 className="form-page__success-title">Submission Recorded!</h2>
              

              <div className="form-page__success-box">
                <div className="success-row">
                  <span>Verified Institutional Email:</span>
                  <strong>{user?.email || '22261A0501@mlrit.ac.in'}</strong>
                </div>
                <div className="success-row">
                  <span>Roll Number:</span>
                  <strong>{formData.rollNumber}</strong>
                </div>
                <div className="success-row">
                  <span>Department:</span>
                  <strong>{formData.department}</strong>
                </div>
              </div>

              <div className="form-page__nav" style={{ justifyContent: 'center', marginTop: 'var(--space-6)' }}>
                <button
                  type="button"
                  className="form-page__nav-btn form-page__nav-btn--submit"
                  onClick={onBack}
                >
                  ← Return to Home
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="form-page">
      <main className="form-page__content">
        <div className="form-page__inner">
          <form className="form-page__card" onSubmit={handleSubmit}>
            <div className="form-page__card-header">
              <h2 className="form-page__card-title">Graduate Information</h2>
              <p className="form-page__card-subtitle">
                All fields marked with <span className="form-label__required">*</span> are required
              </p>
              {user && (
                <div className="form-page__user-banner">
                  <span>🔒 Authenticated via Google: <strong>{user.email}</strong></span>
                </div>
              )}
            </div>

            <div className="form-page__card-body">

              {/* --- Name & Roll No. --- */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Name <span className="form-label__required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="rollNumber">
                    Roll No. <span className="form-label__required">*</span>
                  </label>
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    className="form-input"
                    placeholder="e.g., 22261A0501"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* --- Department --- */}
              <div className="form-group">
                <label className="form-label" htmlFor="department">
                  Department <span className="form-label__required">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  className="form-select"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your department</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* --- Divider --- */}
              <hr className="form-divider" />

              {/* --- Current Status --- */}
              <div className="form-group">
                <label className="form-label">
                  Current Status <span className="form-label__required">*</span>
                </label>
                <div className="form-radio-group">
                  {STATUS_OPTIONS.map((option) => (
                    <label className="form-radio-label" key={option.value}>
                      <input
                        type="radio"
                        name="currentStatus"
                        value={option.value}
                        checked={formData.currentStatus === option.value}
                        onChange={handleChange}
                        required
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* --- Employment Conditional Section --- */}
              {isEmployed && (
                <div className="form-conditional">
                  <h3 className="form-conditional__title">
                    💼 Employment Details
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="companyName">
                        Company Name <span className="form-label__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        className="form-input"
                        placeholder="e.g., Google, Microsoft, TCS"
                        value={formData.companyName}
                        onChange={handleChange}
                        required={isEmployed}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="package">
                        Package (LPA) <span className="form-label__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="package"
                        name="package"
                        className="form-input"
                        placeholder="e.g., 12.5 LPA"
                        value={formData.package}
                        onChange={handleChange}
                        required={isEmployed}
                      />
                      <p className="form-hint">Cost to Company per annum</p>
                    </div>
                  </div>

                  <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <FileUploadField
                      id="joiningLetter"
                      label="Joining / Offer Letter"
                      required={true}
                      hint="Upload official offer letter or appointment order"
                      accept=".pdf,.jpg,.jpeg,.png"
                      file={files.joiningLetter}
                      onFileChange={(f) => setFile('joiningLetter', f)}
                      onRemove={() => removeFile('joiningLetter')}
                    />
                    <FileUploadField
                      id="photo"
                      label="Professional Photo"
                      required={true}
                      hint="Upload a clear headshot or passport size photo"
                      accept=".jpg,.jpeg,.png"
                      file={files.photo}
                      onFileChange={(f) => setFile('photo', f)}
                      onRemove={() => removeFile('photo')}
                    />
                  </div>
                </div>
              )}

              {/* --- PG Conditional Section --- */}
              {isPG && (
                <div className="form-conditional">
                  <h3 className="form-conditional__title">
                    🎓 Higher Studies (PG) Details
                  </h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="pgCourse">
                        Course / Program <span className="form-label__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="pgCourse"
                        name="pgCourse"
                        className="form-input"
                        placeholder="e.g., M.S. in Computer Science, MBA, M.Tech"
                        value={formData.pgCourse}
                        onChange={handleChange}
                        required={isPG}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="pgSpecialization">
                        Specialization <span className="form-label__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="pgSpecialization"
                        name="pgSpecialization"
                        className="form-input"
                        placeholder="e.g., Artificial Intelligence, Data Science"
                        value={formData.pgSpecialization}
                        onChange={handleChange}
                        required={isPG}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                    <label className="form-label" htmlFor="pgInstitution">
                      University / Institution <span className="form-label__required">*</span>
                    </label>
                    <input
                      type="text"
                      id="pgInstitution"
                      name="pgInstitution"
                      className="form-input"
                      placeholder="e.g., Arizona State University, IIT Hyderabad, IIM Bangalore"
                      value={formData.pgInstitution}
                      onChange={handleChange}
                      required={isPG}
                    />
                  </div>

                  <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <FileUploadField
                      id="admissionProof"
                      label="Proof of Admission"
                      required={true}
                      hint="Upload admission letter, I-20, offer letter, or fee receipt"
                      accept=".pdf,.jpg,.jpeg,.png"
                      file={files.admissionProof}
                      onFileChange={(f) => setFile('admissionProof', f)}
                      onRemove={() => removeFile('admissionProof')}
                    />
                    <FileUploadField
                      id="photo"
                      label="Professional Photo"
                      required={true}
                      hint="Upload a clear headshot or passport size photo"
                      accept=".jpg,.jpeg,.png"
                      file={files.photo}
                      onFileChange={(f) => setFile('photo', f)}
                      onRemove={() => removeFile('photo')}
                    />
                  </div>
                </div>
              )}

              {/* --- Entrepreneurship / Self-employed Conditional Section --- */}
              {isEntrepreneur && (
                <div className="form-conditional">
                  <h3 className="form-conditional__title">
                    🚀 Entrepreneurship / Self-employed Details
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="companyName">
                        Company Name <span className="form-label__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        className="form-input"
                        placeholder="e.g., My Startup Pvt. Ltd. / Freelancer"
                        value={formData.companyName}
                        onChange={handleChange}
                        required={isEntrepreneur}
                      />
                    </div>
                    <FileUploadField
                      id="photo"
                      label="Professional Photo"
                      required={true}
                      hint="Upload a clear headshot or passport size photo"
                      accept=".jpg,.jpeg,.png"
                      file={files.photo}
                      onFileChange={(f) => setFile('photo', f)}
                      onRemove={() => removeFile('photo')}
                    />
                  </div>
                </div>
              )}

              {/* --- Preparing for Competitive Exams Section --- */}
              {isPreparing && (
                <div className="form-conditional">
                  <h3 className="form-conditional__title">
                    📝 Competitive Exam Preparation
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="examName">
                        Exam Name <span className="form-label__required">*</span>
                      </label>
                      <input
                        type="text"
                        id="examName"
                        name="examName"
                        className="form-input"
                        placeholder="e.g., GATE, GRE, CAT, UPSC"
                        value={formData.examName}
                        onChange={handleChange}
                        required={isPreparing}
                      />
                    </div>
                    <FileUploadField
                      id="photo"
                      label="Professional Photo"
                      required={true}
                      hint="Upload a clear headshot or passport size photo"
                      accept=".jpg,.jpeg,.png"
                      file={files.photo}
                      onFileChange={(f) => setFile('photo', f)}
                      onRemove={() => removeFile('photo')}
                    />
                  </div>
                </div>
              )}

              {/* --- Seeking Opportunities Section --- */}
              {isSearching && (
                <div className="form-conditional">
                  <h3 className="form-conditional__title">
                    🔍 Seeking Opportunities
                  </h3>

                  <div className="form-group">
                    <label className="form-label" htmlFor="seekingExplanation">
                      Additional Information
                    </label>
                    <textarea
                      id="seekingExplanation"
                      name="seekingExplanation"
                      className="form-textarea"
                      placeholder="Explain your position further (e.g., field of interest, types of roles you are seeking, preparation status)"
                      value={formData.seekingExplanation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* --- Navigation --- */}
            <div className="form-page__nav">
              <button
                type="button"
                className="form-page__nav-btn form-page__nav-btn--back"
                onClick={onBack}
                disabled={isSubmitting}
              >
                ← Back to Info
              </button>
              <button
                type="submit"
                className="form-page__nav-btn form-page__nav-btn--submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="spinner">⏳</span> {statusMessage || 'Submitting...'}
                  </span>
                ) : (
                  'Submit Response ✓'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default FormPage;
