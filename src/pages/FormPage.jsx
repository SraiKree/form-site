import { useState, useRef } from 'react';
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
              {file.type.includes('pdf') ? '📑' : '🖼️'}
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
function FormPage({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
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
  });

  // File uploads — keyed by purpose
  const [files, setFiles] = useState({
    admissionProof: null,
    joiningLetter: null,
    photo: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for files
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
    }

    alert('Form submitted successfully! (Placeholder — connect to backend)');
  };

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

              {/* --- Employed Details (conditional) --- */}
              {isEmployed && (
                <div className="form-conditional">
                  <div className="form-conditional__header">
                    <span className="form-conditional__icon">💼</span>
                    <span className="form-conditional__title">Employment Details</span>
                  </div>

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
                        placeholder="e.g., TCS, Infosys, Google"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
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
                        placeholder="e.g., 6.5"
                        value={formData.package}
                        onChange={handleChange}
                        required
                      />
                      <p className="form-hint">Annual CTC in Lakhs Per Annum.</p>
                    </div>
                  </div>

                  <div className="form-row">
                    <FileUploadField
                      id="joiningLetter"
                      label="Joining Letter"
                      required
                      hint="Upload your joining letter or offer letter."
                      file={files.joiningLetter}
                      onFileChange={(f) => setFile('joiningLetter', f)}
                      onRemove={() => removeFile('joiningLetter')}
                    />
                    <FileUploadField
                      id="photo"
                      label="Photo"
                      required
                      hint="Upload a recent passport-size photo."
                      accept=".jpg,.jpeg,.png"
                      file={files.photo}
                      onFileChange={(f) => setFile('photo', f)}
                      onRemove={() => removeFile('photo')}
                    />
                  </div>
                </div>
              )}

              {/* --- PG Details (conditional) --- */}
              {isPG && (
                <div className="form-conditional">
                  <div className="form-conditional__header">
                    <span className="form-conditional__icon">🎓</span>
                    <span className="form-conditional__title">Post-Graduate Details</span>
                  </div>

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
                        placeholder="e.g., M.Tech, MS in CS, MBA"
                        value={formData.pgCourse}
                        onChange={handleChange}
                        required
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
                        placeholder="e.g., Machine Learning, VLSI Design"
                        value={formData.pgSpecialization}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pgInstitution">
                      University / Institution <span className="form-label__required">*</span>
                    </label>
                    <input
                      type="text"
                      id="pgInstitution"
                      name="pgInstitution"
                      className="form-input"
                      placeholder="e.g., IIT Hyderabad, University of Texas at Dallas"
                      value={formData.pgInstitution}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <FileUploadField
                    id="admissionProof"
                    label="Proof of Admission"
                    required
                    hint="Upload your admission letter, offer letter, or enrollment confirmation (PDF, JPG, PNG — max 10 MB)."
                    file={files.admissionProof}
                    onFileChange={(f) => setFile('admissionProof', f)}
                    onRemove={() => removeFile('admissionProof')}
                  />
                </div>
              )}
            </div>

            {/* --- Navigation --- */}
            <div className="form-page__nav">
              <button
                type="button"
                className="form-page__nav-btn form-page__nav-btn--back"
                onClick={onBack}
              >
                ← Back to Info
              </button>
              <button
                type="submit"
                className="form-page__nav-btn form-page__nav-btn--submit"
              >
                Submit Response ✓
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default FormPage;
