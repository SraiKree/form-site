import { useState, useRef } from 'react';
import './FormPage.css';

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Artificial Intelligence & Machine Learning',
  'Data Science',
  'Cyber Security',
  'Other',
];

const STATUS_OPTIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'higher-studies', label: 'Pursuing higher studies (PG / MS / MBA etc.)' },
  { value: 'entrepreneur', label: 'Entrepreneurship / Self-employed' },
  { value: 'preparing', label: 'Preparing for competitive exams' },
  { value: 'searching', label: 'Seeking opportunities' },
  { value: 'other', label: 'Other' },
];

function FormPage({ onBack }) {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    currentStatus: '',
    pgCourse: '',
    pgInstitution: '',
    pgSpecialization: '',
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

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
    const file = e.dataTransfer.files?.[0];
    if (file) setUploadedFile(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isPG = formData.currentStatus === 'higher-studies';

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully! (Placeholder — connect to backend)');
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

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
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="pgSpecialization">
                        Specialization
                      </label>
                      <input
                        type="text"
                        id="pgSpecialization"
                        name="pgSpecialization"
                        className="form-input"
                        placeholder="e.g., Machine Learning, VLSI Design"
                        value={formData.pgSpecialization}
                        onChange={handleChange}
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
                    />
                  </div>

                  {/* --- File Upload --- */}
                  <div className="form-group">
                    <label className="form-label">
                      Proof of Admission <span className="form-label__required">*</span>
                    </label>
                    <p className="form-hint" style={{ marginBottom: 'var(--space-3)' }}>
                      Upload your admission letter, offer letter, or enrollment confirmation (PDF, JPG, PNG — max 10 MB).
                    </p>

                    {!uploadedFile ? (
                      <div
                        className={`file-upload ${dragActive ? 'file-upload--drag' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') fileInputRef.current?.click(); }}
                      >
                        <div className="file-upload__icon">📄</div>
                        <p className="file-upload__text">
                          <span className="file-upload__link">Click to upload</span> or drag and drop
                        </p>
                        <p className="file-upload__hint">PDF, JPG, or PNG up to 10 MB</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="file-upload__input"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </div>
                    ) : (
                      <div className="file-preview">
                        <div className="file-preview__info">
                          <span className="file-preview__icon">
                            {uploadedFile.type.includes('pdf') ? '📑' : '🖼️'}
                          </span>
                          <div className="file-preview__details">
                            <p className="file-preview__name">{uploadedFile.name}</p>
                            <p className="file-preview__size">{formatFileSize(uploadedFile.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="file-preview__remove"
                          onClick={removeFile}
                          aria-label="Remove file"
                        >
                          ✕
                        </button>
                      </div>
                    )}
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
