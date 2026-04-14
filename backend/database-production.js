import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || join(__dirname, 'database.db');

let db;

// Initialize database
const initDatabase = () => {
  db = new Database(dbPath);
  console.log('✅ Database initialized at:', dbPath);

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentName TEXT NOT NULL,
      parentName TEXT,
      phone TEXT NOT NULL,
      email TEXT,
      subject TEXT,
      class TEXT,
      locality TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      submittedAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tutors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      displayName TEXT,
      dateOfBirth TEXT,
      gender TEXT,
      mobileNumber TEXT,
      currentAddressLine1 TEXT,
      currentAddressLine2 TEXT,
      currentCity TEXT,
      currentState TEXT,
      currentPinCode TEXT,
      permanentAddressLine1 TEXT,
      permanentAddressLine2 TEXT,
      permanentCity TEXT,
      permanentState TEXT,
      permanentPinCode TEXT,
      subjects TEXT,
      classes TEXT,
      experience TEXT,
      areas TEXT,
      aadharFile TEXT,
      panFile TEXT,
      profilePhoto TEXT,
      status TEXT DEFAULT 'pending',
      verified INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS form_options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      optionId TEXT NOT NULL,
      label TEXT NOT NULL,
      UNIQUE(category, optionId)
    );
  `);

  console.log('✅ Database tables created/verified');
  return db;
};

// Wrapper to provide consistent API
const dbWrapper = {
  prepare: (sql) => {
    return db.prepare(sql);
  },
  exec: (sql) => {
    return db.exec(sql);
  },
  close: () => {
    if (db) {
      db.close();
    }
  }
};

// Initialize on module load
initDatabase();

// Export as default for compatibility with server.js
export default dbWrapper;
export { dbWrapper as db, initDatabase };
