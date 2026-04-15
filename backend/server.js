import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// ============ INQUIRIES ENDPOINTS ============

// Get all inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const inquiries = db.prepare('SELECT * FROM inquiries ORDER BY submittedAt DESC').all();
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Create new inquiry
app.post('/api/inquiries', (req, res) => {
  try {
    const { studentName, parentName, phone, email, subject, class: classLevel, locality, message } = req.body;
    
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO inquiries (studentName, parentName, phone, email, subject, class, locality, message, submittedAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(studentName, parentName, phone, email, subject, classLevel, locality, message, now, now);
    
    res.status(201).json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Inquiry submitted successfully'
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

// Update inquiry status (with /status path for frontend compatibility)
app.patch('/api/inquiries/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const stmt = db.prepare(`
      UPDATE inquiries 
      SET status = ?, updatedAt = datetime('now')
      WHERE id = ?
    `);
    
    stmt.run(status, id);
    res.json({ success: true, message: 'Inquiry updated' });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// Update inquiry status (legacy endpoint)
app.patch('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const stmt = db.prepare(`
      UPDATE inquiries 
      SET status = ?, updatedAt = datetime('now')
      WHERE id = ?
    `);
    
    stmt.run(status, id);
    res.json({ success: true, message: 'Inquiry updated' });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

// Delete inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM inquiries WHERE id = ?');
    stmt.run(id);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// ============ TUTORS ENDPOINTS ============

// Get all tutors
app.get('/api/tutors', (req, res) => {
  try {
    const tutors = db.prepare('SELECT * FROM tutors ORDER BY createdAt DESC').all();
    
    // Parse JSON fields
    const parsedTutors = tutors.map(tutor => ({
      ...tutor,
      subjects: tutor.subjects ? JSON.parse(tutor.subjects) : [],
      classes: tutor.classes ? JSON.parse(tutor.classes) : [],
      teachingSlots: tutor.teachingSlots ? JSON.parse(tutor.teachingSlots) : [],
      areas: tutor.areas ? JSON.parse(tutor.areas) : []
    }));
    
    res.json(parsedTutors);
  } catch (error) {
    console.error('Error fetching tutors:', error);
    res.status(500).json({ error: 'Failed to fetch tutors' });
  }
});

// Get approved tutors only (for public view)
app.get('/api/tutors/approved', (req, res) => {
  try {
    const tutors = db.prepare('SELECT * FROM tutors WHERE status = ? ORDER BY createdAt DESC').all('approved');
    
    const parsedTutors = tutors.map(tutor => ({
      ...tutor,
      subjects: tutor.subjects ? JSON.parse(tutor.subjects) : [],
      classes: tutor.classes ? JSON.parse(tutor.classes) : [],
      teachingSlots: tutor.teachingSlots ? JSON.parse(tutor.teachingSlots) : [],
      areas: tutor.areas ? JSON.parse(tutor.areas) : []
    }));
    
    res.json(parsedTutors);
  } catch (error) {
    console.error('Error fetching approved tutors:', error);
    res.status(500).json({ error: 'Failed to fetch tutors' });
  }
});

// Create new tutor
app.post('/api/tutors', (req, res) => {
  try {
    console.log('Received tutor registration:', req.body);
    
    const {
      fullName, displayName, dateOfBirth, gender, mobileNumber,
      currentAddressLine1, currentAddressLine2, currentCity, currentState, currentPinCode,
      permanentAddressLine1, permanentAddressLine2, permanentCity, permanentState, permanentPinCode,
      teachingSlots, experience, areas, aadharFile, panFile
    } = req.body;
    
    console.log('Preparing to insert tutor:', {
      fullName, displayName, dateOfBirth, gender, mobileNumber,
      teachingSlots,
      experience,
      areas: JSON.stringify(areas)
    });
    
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO tutors (
        fullName, displayName, dateOfBirth, gender, mobileNumber,
        currentAddressLine1, currentAddressLine2, currentCity, currentState, currentPinCode,
        permanentAddressLine1, permanentAddressLine2, permanentCity, permanentState, permanentPinCode,
        teachingSlots, experience, areas, aadharFile, panFile, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      fullName, displayName, dateOfBirth, gender, mobileNumber,
      currentAddressLine1, currentAddressLine2, currentCity, currentState, currentPinCode,
      permanentAddressLine1, permanentAddressLine2, permanentCity, permanentState, permanentPinCode,
      typeof teachingSlots === 'string' ? teachingSlots : JSON.stringify(teachingSlots || []),
      experience, JSON.stringify(areas || []),
      aadharFile, panFile, now, now
    );
    
    console.log('Tutor inserted successfully, ID:', result.lastInsertRowid);
    
    res.status(201).json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Tutor registered successfully'
    });
  } catch (error) {
    console.error('Error creating tutor:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to register tutor', details: error.message });
  }
});

// Update tutor
app.put('/api/tutors/:id', (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName, displayName, dateOfBirth, gender, mobileNumber,
      currentAddressLine1, currentAddressLine2, currentCity, currentState, currentPinCode,
      permanentAddressLine1, permanentAddressLine2, permanentCity, permanentState, permanentPinCode,
      teachingSlots, experience, areas, status, verified
    } = req.body;
    
    const stmt = db.prepare(`
      UPDATE tutors SET
        fullName = ?, displayName = ?, dateOfBirth = ?, gender = ?, mobileNumber = ?,
        currentAddressLine1 = ?, currentAddressLine2 = ?, currentCity = ?, currentState = ?, currentPinCode = ?,
        permanentAddressLine1 = ?, permanentAddressLine2 = ?, permanentCity = ?, permanentState = ?, permanentPinCode = ?,
        teachingSlots = ?, experience = ?, areas = ?, status = ?, verified = ?,
        updatedAt = datetime('now')
      WHERE id = ?
    `);
    
    stmt.run(
      fullName, displayName, dateOfBirth, gender, mobileNumber,
      currentAddressLine1, currentAddressLine2, currentCity, currentState, currentPinCode,
      permanentAddressLine1, permanentAddressLine2, permanentCity, permanentState, permanentPinCode,
      typeof teachingSlots === 'string' ? teachingSlots : JSON.stringify(teachingSlots || []),
      experience, JSON.stringify(areas || []),
      status, verified ? 1 : 0, id
    );
    
    res.json({ success: true, message: 'Tutor updated successfully' });
  } catch (error) {
    console.error('Error updating tutor:', error);
    res.status(500).json({ error: 'Failed to update tutor' });
  }
});

// Delete tutor
app.delete('/api/tutors/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM tutors WHERE id = ?');
    stmt.run(id);
    res.json({ success: true, message: 'Tutor deleted' });
  } catch (error) {
    console.error('Error deleting tutor:', error);
    res.status(500).json({ error: 'Failed to delete tutor' });
  }
});

// ============ FORM OPTIONS ENDPOINTS ============

// Get all options
app.get('/api/options', (req, res) => {
  try {
    const options = db.prepare('SELECT * FROM form_options ORDER BY category, id').all();
    
    // Group by category
    const grouped = options.reduce((acc, opt) => {
      if (!acc[opt.category]) acc[opt.category] = [];
      acc[opt.category].push({ id: opt.optionId, label: opt.label });
      return acc;
    }, {});
    
    res.json(grouped);
  } catch (error) {
    console.error('Error fetching options:', error);
    res.status(500).json({ error: 'Failed to fetch options' });
  }
});

// Add new option
app.post('/api/options', (req, res) => {
  try {
    const { category, optionId, label } = req.body;
    
    const stmt = db.prepare('INSERT INTO form_options (category, optionId, label) VALUES (?, ?, ?)');
    const result = stmt.run(category, optionId, label);
    
    res.status(201).json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Option added successfully'
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      res.status(400).json({ error: 'Option already exists' });
    } else {
      console.error('Error adding option:', error);
      res.status(500).json({ error: 'Failed to add option' });
    }
  }
});

// Delete option
app.delete('/api/options/:category/:optionId', (req, res) => {
  try {
    const { category, optionId } = req.params;
    const stmt = db.prepare('DELETE FROM form_options WHERE category = ? AND optionId = ?');
    stmt.run(category, optionId);
    res.json({ success: true, message: 'Option deleted' });
  } catch (error) {
    console.error('Error deleting option:', error);
    res.status(500).json({ error: 'Failed to delete option' });
  }
});

// ============ SETTINGS ENDPOINTS ============

// Get all settings
app.get('/api/settings', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM settings').all();
    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.settingKey] = setting.settingValue;
    });
    res.json(settingsObj);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update a setting
app.put('/api/settings/:key', (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO settings (settingKey, settingValue, updatedAt) 
      VALUES (?, ?, datetime('now'))
      ON CONFLICT(settingKey) 
      DO UPDATE SET settingValue = ?, updatedAt = datetime('now')
    `);
    
    stmt.run(key, value, value);
    res.json({ success: true, message: 'Setting updated successfully' });
  } catch (error) {
    console.error('Error updating setting:', error);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_PATH || 'database.db'}`);
});
