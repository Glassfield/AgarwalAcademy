import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from '@/services/api/inquiryService';
import { getAllTutors, updateTutor, deleteTutor } from '@/services/api/tutorService';
import { getAllSettings, updateSetting } from '@/services/api/settingsService';
import TutorRegistrationForm from '@/components/tutors/TutorRegistrationForm';
import BulkTutorUpload from '@/components/admin/BulkTutorUpload';
import TutorEditModal from '@/components/admin/TutorEditModal';
import ManageOptions from '@/components/admin/ManageOptions';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [tutorFilter, setTutorFilter] = useState('all');
  const [isDemo, setIsDemo] = useState(false);
  const [showTutorForm, setShowTutorForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [activeTab, setActiveTab] = useState('inquiries');
  const [editingTutor, setEditingTutor] = useState(null);
  const [settings, setSettings] = useState({});
  const [savingSettings, setSavingSettings] = useState(false);
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  useEffect(() => {
    loadInquiries();
    loadTutors();
  }, []);
  
  const loadInquiries = async () => {
    try {
      const result = await getAllInquiries();
      if (result.success) {
        setInquiries(result.data);
        setIsDemo(result.isDemo || false);
      } else {
        setInquiries([]);
      }
    } catch (error) {
      console.error('Error loading inquiries:', error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };
  
  const loadTutors = async () => {
    try {
      const result = await getAllTutors();
      if (result.success) {
        setTutors(result.data);
      } else {
        setTutors([]);
      }
    } catch (error) {
      console.error('Error loading tutors:', error);
      setTutors([]);
    }
  };

  const loadSettings = async () => {
    try {
      const result = await getAllSettings();
      if (result.success) {
        setSettings(result.data || {});
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setSettings({});
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const result = await updateSetting('whatsappNumber', settings.whatsappNumber || '');
      if (result.success) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings. Please try again.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSavingSettings(false);
    }
  };
  
  const handleTutorSave = async (updatedTutor) => {
    try {
      const result = await updateTutor(updatedTutor.id, updatedTutor);
      if (result.success) {
        await loadTutors(); // Reload from database
        setEditingTutor(null);
      }
    } catch (error) {
      console.error('Error saving tutor:', error);
      throw error;
    }
  };
  
  const handleTutorDelete = async (tutorId) => {
    if (window.confirm('Are you sure you want to delete this tutor?')) {
      try {
        const result = await deleteTutor(tutorId);
        if (result.success) {
          await loadTutors(); // Reload from database
        }
      } catch (error) {
        console.error('Error deleting tutor:', error);
      }
    }
  };
  
  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus);
      loadInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  const handleDelete = async (inquiryId) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await deleteInquiry(inquiryId);
        loadInquiries();
      } catch (error) {
        console.error('Error deleting inquiry:', error);
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  const filteredInquiries = Array.isArray(inquiries) ? inquiries.filter(inquiry => {
    if (filter === 'all') return true;
    return inquiry.status === filter;
  }) : [];
  
  const stats = {
    total: Array.isArray(inquiries) ? inquiries.length : 0,
    new: Array.isArray(inquiries) ? inquiries.filter(i => i.status === 'new').length : 0,
    contacted: Array.isArray(inquiries) ? inquiries.filter(i => i.status === 'contacted').length : 0,
    matched: Array.isArray(inquiries) ? inquiries.filter(i => i.status === 'matched').length : 0,
    closed: Array.isArray(inquiries) ? inquiries.filter(i => i.status === 'closed').length : 0
  };
  
  if (authLoading || !isAuthenticated) {
    return null;
  }
  
  return (
    <div className="admin-dashboard">
      <Helmet>
        <title>Admin Dashboard | Agarwal Academy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Header */}
      <div className="admin-header">
        <div className="container-custom">
          <div className="admin-header-content">
            <div>
              <h1>Admin Dashboard</h1>
              <p>{activeTab === 'inquiries' ? 'Student Inquiry Management' : 'Tutor Management'}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button variant="primary" onClick={() => setShowTutorForm(true)}>
                + Register Tutor
              </Button>
              <Button variant="outline" onClick={() => setShowBulkUpload(true)}>
                📤 Bulk Upload
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {isDemo && (
        <div className="demo-banner">
          <div className="container-custom">
            ⚠️ <strong>Demo Mode:</strong> Data stored in browser localStorage. Backend API not connected yet.
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="admin-tabs">
        <div className="container-custom">
          <div className="tabs-nav">
            <button
              className={`tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >
              📝 Student Inquiries
              {stats.new > 0 && <span className="tab-badge">{stats.new}</span>}
            </button>
            <button
              className={`tab-btn ${activeTab === 'tutors' ? 'active' : ''}`}
              onClick={() => setActiveTab('tutors')}
            >
              👨‍🏫 Manage Tutors
              <span className="tab-badge">{Array.isArray(tutors) ? tutors.length : 0}</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'options' ? 'active' : ''}`}
              onClick={() => setActiveTab('options')}
            >
              ⚙️ Form Options
            </button>
            <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings');
                loadSettings();
              }}
            >
              🔧 Settings
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="admin-content">
        <div className="container-custom">
          {activeTab === 'inquiries' ? (
            <>
            <div className="stats-grid">
              <Card className="stat-card">
                <div className="stat-icon total">📊</div>
                <div className="stat-info">
                  <h3>{stats.total}</h3>
                  <p>Total Inquiries</p>
                </div>
              </Card>
            
            <Card className="stat-card">
              <div className="stat-icon new">🆕</div>
              <div className="stat-info">
                <h3>{stats.new}</h3>
                <p>New Leads</p>
              </div>
            </Card>
            
            <Card className="stat-card">
              <div className="stat-icon contacted">📞</div>
              <div className="stat-info">
                <h3>{stats.contacted}</h3>
                <p>Contacted</p>
              </div>
            </Card>
            
            <Card className="stat-card">
              <div className="stat-icon matched">✅</div>
              <div className="stat-info">
                <h3>{stats.matched}</h3>
                <p>Matched</p>
              </div>
            </Card>
          </div>
          
          {/* Filters */}
          <div className="filters-section">
            <h2>Lead Management</h2>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({stats.total})
              </button>
              <button
                className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
                onClick={() => setFilter('new')}
              >
                New ({stats.new})
              </button>
              <button
                className={`filter-btn ${filter === 'contacted' ? 'active' : ''}`}
                onClick={() => setFilter('contacted')}
              >
                Contacted ({stats.contacted})
              </button>
              <button
                className={`filter-btn ${filter === 'matched' ? 'active' : ''}`}
                onClick={() => setFilter('matched')}
              >
                Matched ({stats.matched})
              </button>
              <button
                className={`filter-btn ${filter === 'closed' ? 'active' : ''}`}
                onClick={() => setFilter('closed')}
              >
                Closed ({stats.closed})
              </button>
            </div>
          </div>
          
          {/* Inquiries Table */}
          <div className="inquiries-section">
            {loading ? (
              <div className="loading-state">
                <div className="spinner-large"></div>
                <p>Loading inquiries...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <Card className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No Inquiries Found</h3>
                <p>
                  {filter === 'all'
                    ? 'No student inquiries yet. They will appear here once submitted.'
                    : `No ${filter} inquiries at the moment.`}
                </p>
              </Card>
            ) : (
              <div className="inquiries-table-wrapper">
                <table className="inquiries-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Student Name</th>
                      <th>Parent Name</th>
                      <th>Phone</th>
                      <th>Class</th>
                      <th>Subjects</th>
                      <th>Locality</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td>{new Date(inquiry.submittedAt || inquiry.timestamp).toLocaleDateString()}</td>
                        <td><strong>{inquiry.studentName}</strong></td>
                        <td>{inquiry.parentName}</td>
                        <td>
                          <a href={`tel:${inquiry.phone}`} className="phone-link">
                            {inquiry.phone}
                          </a>
                        </td>
                        <td>Class {inquiry.class}</td>
                        <td className="subjects-cell">{inquiry.subjects}</td>
                        <td>{inquiry.locality}</td>
                        <td>
                          <select
                            className={`status-select status-${inquiry.status}`}
                            value={inquiry.status}
                            onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="matched">Matched</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="view-btn"
                              onClick={() => alert(`Email: ${inquiry.email || 'Not provided'}\n\nRequirements: ${inquiry.requirements || 'None'}`)}
                              title="View Details"
                            >
                              👁️
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(inquiry.id)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          </>
          ) : activeTab === 'tutors' ? (
            <>
            {/* Tutor Management */}
            <div className="filters-section">
              <h2>Tutor Database</h2>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${tutorFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setTutorFilter('all')}
                >
                  All ({Array.isArray(tutors) ? tutors.length : 0})
                </button>
                <button
                  className={`filter-btn ${tutorFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setTutorFilter('pending')}
                >
                  Pending ({Array.isArray(tutors) ? tutors.filter(t => t.status === 'pending').length : 0})
                </button>
                <button
                  className={`filter-btn ${tutorFilter === 'approved' ? 'active' : ''}`}
                  onClick={() => setTutorFilter('approved')}
                >
                  Approved ({Array.isArray(tutors) ? tutors.filter(t => t.status === 'approved').length : 0})
                </button>
                <button
                  className={`filter-btn ${tutorFilter === 'rejected' ? 'active' : ''}`}
                  onClick={() => setTutorFilter('rejected')}
                >
                  Rejected ({Array.isArray(tutors) ? tutors.filter(t => t.status === 'rejected').length : 0})
                </button>
              </div>
            </div>

            {/* Tutors Table */}
            <div className="inquiries-section">
              {Array.isArray(tutors) && tutors.filter(t => tutorFilter === 'all' || t.status === tutorFilter).length === 0 ? (
                <Card className="empty-state">
                  <div className="empty-icon">👨‍🏫</div>
                  <h3>No Tutors Found</h3>
                  <p>
                    {tutorFilter === 'all'
                      ? 'No tutors registered yet. Use the "Register Tutor" or "Bulk Upload" buttons to add tutors.'
                      : `No ${tutorFilter} tutors at the moment.`}
                  </p>
                </Card>
              ) : (
                <div className="table-container">
                  <table className="inquiries-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Subjects</th>
                        <th>Classes</th>
                        <th>Experience</th>
                        <th>Areas</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Array.isArray(tutors) ? tutors : [])
                        .filter(t => tutorFilter === 'all' || t.status === tutorFilter)
                        .map((tutor) => (
                        <tr key={tutor.id}>
                          <td>
                            <strong>{tutor.displayName}</strong>
                            {tutor.verified && <span style={{ marginLeft: '0.5rem' }}>✓</span>}
                          </td>
                          <td>{tutor.phone}</td>
                          <td>
                            {Array.isArray(tutor.subjects) 
                              ? tutor.subjects.slice(0, 2).join(', ') 
                              : tutor.subjects}
                            {Array.isArray(tutor.subjects) && tutor.subjects.length > 2 && ' +' + (tutor.subjects.length - 2)}
                          </td>
                          <td>
                            {Array.isArray(tutor.classes) 
                              ? tutor.classes.slice(0, 2).join(', ') 
                              : tutor.classes}
                            {Array.isArray(tutor.classes) && tutor.classes.length > 2 && ' +' + (tutor.classes.length - 2)}
                          </td>
                          <td>{tutor.experience}</td>
                          <td>
                            {Array.isArray(tutor.areas) 
                              ? tutor.areas.slice(0, 2).join(', ') 
                              : tutor.areas}
                            {Array.isArray(tutor.areas) && tutor.areas.length > 2 && ' +' + (tutor.areas.length - 2)}
                          </td>
                          <td>
                            <span className={`status-badge status-${tutor.status || 'pending'}`}>
                              {(tutor.status || 'pending').charAt(0).toUpperCase() + (tutor.status || 'pending').slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="view-btn"
                                onClick={() => setEditingTutor(tutor)}
                                title="Edit Tutor"
                              >
                                ✏️
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => handleTutorDelete(tutor.id)}
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            </>
          ) : activeTab === 'options' ? (
            <ManageOptions />
          ) : activeTab === 'settings' ? (
            <div className="settings-section">
              <div className="section-header">
                <h2>Application Settings</h2>
                <p>Configure global settings for your website</p>
              </div>

              <div className="settings-form">
                <div className="setting-group">
                  <label htmlFor="whatsappNumber">
                    <span className="setting-icon">💬</span>
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsappNumber"
                    type="text"
                    value={settings.whatsappNumber || ''}
                    onChange={(e) => handleSettingChange('whatsappNumber', e.target.value)}
                    placeholder="e.g., +919876543210 or 919876543210"
                    className="setting-input"
                  />
                  <small className="setting-help">
                    Enter the WhatsApp number with country code (e.g., +91 for India). 
                    This will be used for the floating WhatsApp button on the website.
                    Leave empty to hide the button.
                  </small>
                </div>

                <div className="setting-actions">
                  <button 
                    onClick={handleSaveSettings} 
                    disabled={savingSettings}
                    className="btn btn-primary"
                  >
                    {savingSettings ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Tutor Registration Modal */}
      {showTutorForm && (
        <div className="modal-overlay" onClick={() => setShowTutorForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ position: 'sticky', top: 0, background: 'white', padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
              <h2 style={{ margin: 0 }}>Register New Tutor</h2>
              <button
                onClick={() => setShowTutorForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  lineHeight: 1
                }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: '1rem' }}>
              <TutorRegistrationForm skipOTP={true} />
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="modal-overlay" onClick={() => setShowBulkUpload(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
            <BulkTutorUpload 
              onClose={() => setShowBulkUpload(false)}
              onSuccess={(tutors) => {
                alert(`Successfully uploaded ${tutors.length} tutors!`);
                setShowBulkUpload(false);
                loadTutors();
              }}
            />
          </div>
        </div>
      )}

      {/* Tutor Edit Modal */}
      {editingTutor && (
        <div className="modal-overlay" onClick={() => setEditingTutor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto' }}>
            <TutorEditModal
              tutor={editingTutor}
              onClose={() => setEditingTutor(null)}
              onSave={handleTutorSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
