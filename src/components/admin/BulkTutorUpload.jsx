import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/common/Button';
import './BulkTutorUpload.css';

/**
 * Bulk Tutor Upload Component
 * Allows admin to upload tutors via CSV file
 */
const BulkTutorUpload = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setErrors([]);
      setResults(null);
    } else {
      setErrors(['Please select a valid CSV file']);
      setFile(null);
    }
  };

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('CSV file is empty or has no data rows');
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const tutors = [];
    const parseErrors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        parseErrors.push(`Row ${i + 1}: Column count mismatch`);
        continue;
      }

      const tutor = {};
      headers.forEach((header, index) => {
        tutor[header] = values[index];
      });

      // Validate required fields
      const required = ['fullname', 'mobile', 'gender', 'subjects', 'classes', 'experience', 'areas'];
      const missing = required.filter(field => !tutor[field] || !tutor[field].trim());
      
      if (missing.length > 0) {
        parseErrors.push(`Row ${i + 1}: Missing fields - ${missing.join(', ')}`);
        continue;
      }

      // Parse array fields (subjects, classes, areas)
      tutor.subjects = tutor.subjects.split('|').map(s => s.trim()).filter(s => s);
      tutor.classes = tutor.classes.split('|').map(c => c.trim()).filter(c => c);
      tutor.areas = tutor.areas.split('|').map(a => a.trim()).filter(a => a);

      tutors.push(tutor);
    }

    return { tutors, parseErrors };
  };

  const handleUpload = async () => {
    if (!file) {
      setErrors(['Please select a file first']);
      return;
    }

    setUploading(true);
    setErrors([]);

    try {
      const text = await file.text();
      const { tutors, parseErrors } = parseCSV(text);

      if (parseErrors.length > 0) {
        setErrors(parseErrors);
      }

      if (tutors.length > 0) {
        // Store tutors in localStorage (or send to API)
        const existingTutors = JSON.parse(localStorage.getItem('tutors') || '[]');
        const newTutors = tutors.map((tutor, index) => ({
          id: `bulk-${Date.now()}-${index}`,
          displayName: tutor.fullname,
          gender: tutor.gender.toLowerCase(),
          phone: tutor.mobile,
          subjects: tutor.subjects,
          classes: tutor.classes,
          experience: tutor.experience,
          areas: tutor.areas,
          dateOfBirth: tutor.dob || '',
          currentAddressLine1: tutor.currentaddress1 || '',
          currentAddressLine2: tutor.currentaddress2 || '',
          currentCity: tutor.currentcity || '',
          currentState: tutor.currentstate || '',
          currentPinCode: tutor.currentpincode || '',
          permanentAddressLine1: tutor.permanentaddress1 || '',
          permanentAddressLine2: tutor.permanentaddress2 || '',
          permanentCity: tutor.permanentcity || '',
          permanentState: tutor.permanentstate || '',
          permanentPinCode: tutor.permanentpincode || '',
          verified: false,
          rating: 0,
          totalStudents: 0,
          createdAt: new Date().toISOString(),
          createdBy: 'admin-bulk-upload'
        }));

        localStorage.setItem('tutors', JSON.stringify([...existingTutors, ...newTutors]));

        setResults({
          success: tutors.length,
          failed: parseErrors.length,
          total: tutors.length + parseErrors.length
        });

        if (onSuccess) {
          onSuccess(newTutors);
        }
      }
    } catch (error) {
      setErrors([error.message || 'Failed to process CSV file']);
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const template = `fullname,mobile,gender,dob,subjects,classes,experience,areas,currentaddress1,currentaddress2,currentcity,currentstate,currentpincode,permanentaddress1,permanentaddress2,permanentcity,permanentstate,permanentpincode
John Doe,9876543210,male,1990-05-15,Mathematics|Physics,Class 11-12,5-10 years,Saket|Malviya Nagar,123 Main St,,New Delhi,Delhi,110001,123 Main St,,New Delhi,Delhi,110001
Jane Smith,9876543211,female,1985-08-20,Chemistry|Biology,Class 9-10|Class 11-12,10+ years,Hauz Khas|Greater Kailash,456 Park Ave,,New Delhi,Delhi,110002,456 Park Ave,,New Delhi,Delhi,110002`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tutor_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bulk-upload-container">
      <h2>Bulk Upload Tutors</h2>
      <p className="upload-description">
        Upload a CSV file to register multiple tutors at once. Download the template to see the required format.
      </p>

      <div className="template-section">
        <Button variant="outline" onClick={downloadTemplate} size="sm">
          📥 Download CSV Template
        </Button>
      </div>

      <div className="upload-section">
        <label className="file-upload-label">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file-input"
          />
          <div className="file-upload-box">
            <div className="upload-icon">📄</div>
            <p className="upload-text">
              {file ? file.name : 'Click to select CSV file or drag and drop'}
            </p>
            <p className="upload-hint">Only CSV files are accepted</p>
          </div>
        </label>
      </div>

      {errors.length > 0 && (
        <div className="error-section">
          <h4>Errors Found:</h4>
          <ul className="error-list">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {results && (
        <div className="results-section">
          <h4>Upload Results:</h4>
          <div className="results-stats">
            <div className="stat-item success">
              <span className="stat-label">Successfully Added:</span>
              <span className="stat-value">{results.success}</span>
            </div>
            <div className="stat-item failed">
              <span className="stat-label">Failed:</span>
              <span className="stat-value">{results.failed}</span>
            </div>
            <div className="stat-item total">
              <span className="stat-label">Total Processed:</span>
              <span className="stat-value">{results.total}</span>
            </div>
          </div>
        </div>
      )}

      <div className="upload-actions">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={!file || uploading}
          loading={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Tutors'}
        </Button>
      </div>

      <div className="upload-info">
        <h4>CSV Format Instructions:</h4>
        <ul>
          <li><strong>Required fields:</strong> fullname, mobile, gender, subjects, classes, experience, areas</li>
          <li><strong>Multiple values:</strong> Use pipe (|) to separate multiple subjects, classes, or areas (e.g., "Mathematics|Physics")</li>
          <li><strong>Gender:</strong> male, female, or other</li>
          <li><strong>Date format:</strong> YYYY-MM-DD (e.g., 1990-05-15)</li>
          <li><strong>Mobile:</strong> 10-digit number without country code</li>
        </ul>
      </div>
    </div>
  );
};

BulkTutorUpload.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func
};

export default BulkTutorUpload;
