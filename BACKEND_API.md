# Backend API Requirements for Agarwal Academy

## Overview
This document outlines the backend API endpoints required for the Agarwal Academy platform.

---

## 📧 Email Configuration

**Email Address:** agarwalacademy29@gmail.com

### Email Service Setup (Node.js Example)

```javascript
// Using Nodemailer with Gmail
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'agarwalacademy29@gmail.com',
    pass: process.env.EMAIL_PASSWORD // Use App Password from Gmail
  }
});

// Email template for new inquiry
const sendInquiryNotification = async (inquiryData) => {
  const mailOptions = {
    from: 'agarwalacademy29@gmail.com',
    to: 'agarwalacademy29@gmail.com',
    subject: `New Student Inquiry - ${inquiryData.studentName}`,
    html: `
      <h2>New Student Inquiry Received</h2>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      
      <h3>Student Information</h3>
      <ul>
        <li><strong>Student Name:</strong> ${inquiryData.studentName}</li>
        <li><strong>Parent Name:</strong> ${inquiryData.parentName}</li>
        <li><strong>Phone:</strong> ${inquiryData.phone}</li>
        <li><strong>Email:</strong> ${inquiryData.email || 'Not provided'}</li>
      </ul>
      
      <h3>Requirements</h3>
      <ul>
        <li><strong>Class:</strong> ${inquiryData.class}</li>
        <li><strong>Board:</strong> ${inquiryData.board}</li>
        <li><strong>Subjects:</strong> ${inquiryData.subjects}</li>
        <li><strong>Locality:</strong> ${inquiryData.locality}</li>
      </ul>
      
      <h3>Additional Requirements</h3>
      <p>${inquiryData.requirements || 'None'}</p>
      
      <hr>
      <p><small>Login to admin dashboard to manage this inquiry.</small></p>
    `
  };

  await transporter.sendMail(mailOptions);
};
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

### 1. Submit Inquiry (Public)

**POST** `/api/inquiries`

Submit a new student inquiry form.

#### Request Body
```json
{
  "studentName": "Rahul Sharma",
  "parentName": "Mr. Sharma",
  "phone": "9876543210",
  "email": "sharma@example.com",
  "class": "10",
  "board": "CBSE",
  "subjects": "Mathematics, Physics, Chemistry",
  "locality": "Greater Kailash",
  "requirements": "Need preparation for board exams",
  "tutorId": null,
  "timestamp": "2026-01-01T10:00:00.000Z",
  "status": "new"
}
```

#### Response (Success)
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "data": {
    "id": "inq_12345",
    "studentName": "Rahul Sharma",
    "status": "new",
    "submittedAt": "2026-01-01T10:00:00.000Z"
  }
}
```

#### Backend Actions
1. Save inquiry to database
2. Send email notification to **agarwalacademy29@gmail.com**
3. Return success response

---

### 2. Get All Inquiries (Admin Only)

**GET** `/api/inquiries`

Fetch all student inquiries for admin dashboard.

#### Headers
```
Authorization: Bearer <admin_token>
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "inq_12345",
      "studentName": "Rahul Sharma",
      "parentName": "Mr. Sharma",
      "phone": "9876543210",
      "email": "sharma@example.com",
      "class": "10",
      "board": "CBSE",
      "subjects": "Mathematics, Physics, Chemistry",
      "locality": "Greater Kailash",
      "requirements": "Board exam preparation",
      "status": "new",
      "submittedAt": "2026-01-01T10:00:00.000Z"
    }
  ]
}
```

---

### 3. Update Inquiry Status (Admin Only)

**PATCH** `/api/inquiries/:id/status`

Update the status of an inquiry.

#### Request Body
```json
{
  "status": "contacted"
}
```

#### Allowed Status Values
- `new` - New inquiry
- `contacted` - Admin has contacted
- `matched` - Tutor matched
- `closed` - Inquiry closed

#### Response
```json
{
  "success": true,
  "message": "Status updated successfully",
  "data": {
    "id": "inq_12345",
    "status": "contacted"
  }
}
```

---

### 4. Delete Inquiry (Admin Only)

**DELETE** `/api/inquiries/:id`

Delete an inquiry from the system.

#### Response
```json
{
  "success": true,
  "message": "Inquiry deleted successfully"
}
```

---

## 🗄️ Database Schema

### Inquiries Collection/Table

```javascript
{
  id: String,              // Unique ID
  studentName: String,     // Required
  parentName: String,      // Required
  phone: String,           // Required (10 digits)
  email: String,           // Optional
  class: String,           // Required (1-12)
  board: String,           // Required (CBSE, ICSE, etc.)
  subjects: String,        // Required
  locality: String,        // Required
  requirements: String,    // Optional
  tutorId: String,         // Optional (if requested specific tutor)
  status: String,          // new | contacted | matched | closed
  submittedAt: DateTime,   // Timestamp
  updatedAt: DateTime      // Last updated
}
```

---

## 🔐 Admin Authentication

### Login Endpoint

**POST** `/api/admin/login`

#### Request Body
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### Response
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

---

## 🚀 Quick Start Backend (Node.js + Express)

```javascript
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'agarwalacademy29@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

// In-memory storage (replace with database)
let inquiries = [];

// Submit Inquiry
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = {
      id: Date.now().toString(),
      ...req.body,
      submittedAt: new Date().toISOString()
    };
    
    inquiries.push(inquiry);
    
    // Send email
    await transporter.sendMail({
      from: 'agarwalacademy29@gmail.com',
      to: 'agarwalacademy29@gmail.com',
      subject: `New Inquiry - ${inquiry.studentName}`,
      html: `
        <h2>New Student Inquiry</h2>
        <p><strong>Student:</strong> ${inquiry.studentName}</p>
        <p><strong>Parent:</strong> ${inquiry.parentName}</p>
        <p><strong>Phone:</strong> ${inquiry.phone}</p>
        <p><strong>Class:</strong> ${inquiry.class}</p>
        <p><strong>Subjects:</strong> ${inquiry.subjects}</p>
        <p><strong>Locality:</strong> ${inquiry.locality}</p>
      `
    });
    
    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Inquiries
app.get('/api/inquiries', (req, res) => {
  res.json({ success: true, data: inquiries });
});

// Update Status
app.patch('/api/inquiries/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const inquiry = inquiries.find(i => i.id === id);
  if (inquiry) {
    inquiry.status = status;
    res.json({ success: true, data: inquiry });
  } else {
    res.status(404).json({ success: false, message: 'Not found' });
  }
});

// Delete Inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  inquiries = inquiries.filter(i => i.id !== id);
  res.json({ success: true });
});

app.listen(5000, () => {
  console.log('API running on http://localhost:5000');
});
```

---

## 📝 Environment Variables (.env)

```env
PORT=5000
EMAIL_PASSWORD=your_gmail_app_password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your_secret_key
```

---

## ✅ Current Frontend Implementation

The frontend is already configured to work with this API:

1. **Inquiry Form** - Submits to `/api/inquiries`
2. **Admin Dashboard** - Fetches from `/api/inquiries`
3. **Fallback Mode** - Uses localStorage if API is unavailable (demo mode)

---

## 🎯 Next Steps

1. Set up Gmail App Password for agarwalacademy29@gmail.com
2. Deploy backend API (Node.js/Express)
3. Update `VITE_API_BASE_URL` in `.env`
4. Test email notifications
5. Connect admin dashboard to live API

---

**Email notifications will be sent to:** agarwalacademy29@gmail.com
