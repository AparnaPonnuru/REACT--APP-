// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

// Use env var (set REACT_APP_API_URL in .env). Falls back to empty string for relative paths.
const API_BASE = process.env.REACT_APP_API_URL || '';

export default function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Personal details
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    alternateContact: '',

    // Address
    address: {
      street: '',
      city: '',
      state: ''
    },

    // Education
    education: {
      classCourse: '',
      collegeInstitute: '',
      graduationYear: '',
      cgpaPercentage: '',
      other: ''
    },

    // Other
    technicalSkills: '',
    languagesKnown: ''
  });

  const [resumeName, setResumeName] = useState(null);
  const [resumeDataUrl, setResumeDataUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Load profile data from API when component mounts
  useEffect(() => {
    // load resume from localStorage (if any)
    const savedResumeDataUrl = localStorage.getItem('resumeDataUrl');
    const savedResumeName = localStorage.getItem('resumeName');
    if (savedResumeDataUrl) setResumeDataUrl(savedResumeDataUrl);
    if (savedResumeName) setResumeName(savedResumeName);

    loadProfileData();
  }, []);

  // Function to load profile data from backend API
  const loadProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, user might not be logged in');
        return;
      }

      const response = await fetch(`${API_BASE}/api/students/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        const profile = result.profile || {};

        // Update form with data from backend
        setForm(prev => ({
          ...prev,
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          dateOfBirth: profile.dateOfBirth || '',
          gender: profile.gender || '',
          email: profile.email || '',
          phoneNumber: profile.phoneNumber || '',
          alternateContact: profile.alternateContact || '',
          address: {
            street: profile.address?.street || '',
            city: profile.address?.city || '',
            state: profile.address?.state || ''
          },
          education: {
            classCourse: profile.education?.classCourse || '',
            collegeInstitute: profile.education?.collegeInstitute || '',
            graduationYear: profile.education?.graduationYear || '',
            cgpaPercentage: profile.education?.cgpaPercentage || '',
            other: profile.education?.other || ''
          },
          technicalSkills: Array.isArray(profile.technicalSkills)
            ? profile.technicalSkills.join(', ')
            : profile.technicalSkills || '',
          languagesKnown: Array.isArray(profile.languagesKnown)
            ? profile.languagesKnown.join(', ')
            : profile.languagesKnown || ''
        }));

        console.log('Profile loaded from backend:', profile);
      } else {
        console.log('No profile data found in backend. Status:', response.status);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  // Function to save student profile to backend API
  const saveStudentProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch(`${API_BASE}/api/students/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        throw new Error(result.error || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;

    // Handle nested objects (address and education)
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else if (name.startsWith('education.')) {
      const field = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        education: {
          ...prev.education,
          [field]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Prepare data for API
      const profileData = {
        firstName: form.firstName,
        lastName: form.lastName,
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        email: form.email,
        phoneNumber: form.phoneNumber,
        alternateContact: form.alternateContact,
        address: {
          street: form.address.street,
          city: form.address.city,
          state: form.address.state
        },
        education: {
          classCourse: form.education.classCourse,
          collegeInstitute: form.education.collegeInstitute,
          graduationYear: form.education.graduationYear,
          cgpaPercentage: form.education.cgpaPercentage,
          other: form.education.other
        },
        technicalSkills: form.technicalSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== ''),
        languagesKnown: form.languagesKnown.split(',').map(lang => lang.trim()).filter(lang => lang !== ''),
        resumePath: resumeName || "uploads/resume.pdf"
      };

      // Save to backend API
      const result = await saveStudentProfile(profileData);

      // Also save to localStorage as backup
      localStorage.setItem('user', JSON.stringify(form));

      setMessage('Profile saved successfully to database!');
      alert('Profile saved successfully to database!');

      console.log('Profile saved:', result);
    } catch (error) {
      console.error('Save error', error);
      setMessage('Error saving profile: ' + error.message);
      alert('Error saving profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('resumeDataUrl');
    localStorage.removeItem('resumeName');
    navigate('/login');
  }

  // Resume upload: convert to data URL and store in localStorage
  function handleResumeUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const maxMB = 5;
    if (file.size > maxMB * 1024 * 1024) {
      alert(`File too large. Max ${maxMB} MB allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      try {
        localStorage.setItem('resumeDataUrl', dataUrl);
        localStorage.setItem('resumeName', file.name);
        setResumeDataUrl(dataUrl);
        setResumeName(file.name);
        alert('Resume uploaded successfully!');
      } catch (err) {
        console.error('Error saving resume to localStorage:', err);
        alert('Could not save resume (storage limit?).');
      }
    };
    reader.onerror = () => {
      alert('Failed to read file.');
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveResume() {
    localStorage.removeItem('resumeDataUrl');
    localStorage.removeItem('resumeName');
    setResumeDataUrl(null);
    setResumeName(null);
  }

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSave}>
        <h2 className="profile-title">Student Profile</h2>

        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {/* Personal Details */}
        <div className="section-title">Personal Details</div>

        <div className="profile-row">
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>

        <div className="profile-row">
          <label>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>

        <div className="profile-row">
          <label>Date of Birth</label>
          <input
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="profile-row">
          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="prefer_not">Prefer not to say</option>
          </select>
        </div>

        <div className="profile-row">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="profile-row">
          <label>Phone Number</label>
          <input
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="+91xxxxxxxxxx"
            required
          />
        </div>

        <div className="profile-row">
          <label>Alternate Contact</label>
          <input
            name="alternateContact"
            type="tel"
            value={form.alternateContact}
            onChange={handleChange}
            placeholder="Alternate number (optional)"
          />
        </div>

        {/* Address */}
        <div className="section-title">Address</div>

        <div className="profile-row">
          <label>Street Address</label>
          <input
            name="address.street"
            value={form.address.street}
            onChange={handleChange}
            placeholder="Street / local area"
          />
        </div>

        <div className="profile-row">
          <label>City</label>
          <input
            name="address.city"
            value={form.address.city}
            onChange={handleChange}
            placeholder="Enter city"
          />
        </div>

        <div className="profile-row">
          <label>State</label>
          <input
            name="address.state"
            value={form.address.state}
            onChange={handleChange}
            placeholder="Enter state"
          />
        </div>

        {/* Education */}
        <div className="section-title">Education</div>

        <div className="profile-row">
          <label>Class / Course</label>
          <input
            name="education.classCourse"
            value={form.education.classCourse}
            onChange={handleChange}
            placeholder="e.g., B.Tech 3rd Year"
          />
        </div>

        <div className="profile-row">
          <label>College / Institute</label>
          <input
            name="education.collegeInstitute"
            value={form.education.collegeInstitute}
            onChange={handleChange}
            placeholder="College or University"
          />
        </div>

        <div className="profile-row">
          <label>Graduation Year</label>
          <input
            name="education.graduationYear"
            value={form.education.graduationYear}
            onChange={handleChange}
            placeholder="e.g., 2026"
          />
        </div>

        <div className="profile-row">
          <label>CGPA / Percentage</label>
          <input
            name="education.cgpaPercentage"
            value={form.education.cgpaPercentage}
            onChange={handleChange}
            placeholder="e.g., 8.2 or 72%"
          />
        </div>

        <div className="profile-row">
          <label>Other Information</label>
          <input
            name="education.other"
            value={form.education.other}
            onChange={handleChange}
            placeholder="Any other information"
          />
        </div>

        {/* Other */}
        <div className="section-title">Other</div>

        <div className="profile-row">
          <label>Technical Skills</label>
          <textarea
            name="technicalSkills"
            value={form.technicalSkills}
            onChange={handleChange}
            placeholder="Comma-separated skills e.g., Java, React, SQL"
            rows="3"
          />
        </div>

        <div className="profile-row">
          <label>Languages Known</label>
          <input
            name="languagesKnown"
            value={form.languagesKnown}
            onChange={handleChange}
            placeholder="e.g., English, Telugu, Hindi"
          />
        </div>

        <div className="profile-row">
          <label>Resume / CV</label>
          <div className="resume-block">
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
            {resumeName ? (
              <div className="resume-meta">
                <div className="resume-name">{resumeName}</div>
                <div className="resume-actions">
                  <a className="btn-download" href={resumeDataUrl} download={resumeName}>Download</a>
                  <button type="button" className="btn-remove" onClick={handleRemoveResume}>Remove</button>
                </div>
              </div>
            ) : (
              <div className="resume-hint">Upload PDF or DOCX (Max 5MB)</div>
            )}
          </div>
        </div>

        <div className="profile-buttons">
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </form>
    </div>
  );
}
