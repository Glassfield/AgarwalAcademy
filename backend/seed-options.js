import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'database.db');
const db = new Database(dbPath);

console.log('Seeding form options...');

const options = [
  // Classes
  ...['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII',
      'JEE','NEET','BA','BCOM','BSc','CLAT','CUET','IELTS'].map(c => ({
    category: 'classes', optionId: c, label: c
  })),

  // Boards
  ...['CBSE','ICSE','IB','IGCSE'].map(b => ({
    category: 'boards', optionId: b, label: b
  })),

  // Subjects
  ...['English','Hindi','Maths','Science','SST','Sanskrit','French','Spanish',
      'Physics','Chemistry','Biology','Accounts','Computer Science',
      'Information Practice','Business Studies','Political Science','Economics',
      'Psychology','Sociology','History','Geography','Spoken English',
      'Corporate Accounting','Cost Accounting','Management Accounting',
      'Tax','Finance','Statistics'].map(s => ({
    category: 'subjects', optionId: s, label: s
  })),

  // Experience
  { category: 'experience', optionId: '0-2', label: '0-2 years' },
  { category: 'experience', optionId: '2-5', label: '2-5 years' },
  { category: 'experience', optionId: '5-10', label: '5-10 years' },
  { category: 'experience', optionId: '10+', label: '10+ years' },

  // Areas
  ...['Safdarjung Enclave','South Ex','GK','Vasant Kunj','Vasant Vihar',
      'Dhaula Kuan','Moti Bagh','RK Puram Sector 1','RK Puram Sector 2',
      'RK Puram Sector 3','RK Puram Sector 4','RK Puram Sector 5',
      'RK Puram Sector 6','RK Puram Sector 7','RK Puram Sector 8',
      'RK Puram Sector 9','RK Puram Sector 10','Nivedita Kunj',
      'RK Puram Sector 11','RK Puram Sector 12','RK Puram Sector 13',
      'Aradhna Enclave','Arjun Nagar','Krishna Nagar','Hauzkhas','Munirka',
      'Munirka Vihar','Munirka Enclave','Saket','Safdarjung Development Enclave',
      'Green Park','West End','Anand Niketan','Panchsheel','Sarvodya Enclave',
      'Kidwai Nagar','Sarojni Nagar','Mohammadpur','Humayupur','Ber Sarai',
      'Adchini','Katwaria Sarai','Azad Apartment','Malviya Nagar',
      'Defence Colony','Shankar Vihar','Anuj Vihar','Mahipalpur',
      'Delhi Cantt','Dwarka','Kalkaji','Andrews Gunj','Nanakpura',
      'Sainik Farm','Ladoo Sarai','Mehrauli','Satyaniketan'].map(a => ({
    category: 'areas', optionId: a, label: a
  })),
];

const stmt = db.prepare('INSERT OR IGNORE INTO form_options (category, optionId, label) VALUES (?, ?, ?)');

let inserted = 0;
for (const option of options) {
  const result = stmt.run(option.category, option.optionId, option.label);
  if (result.changes > 0) inserted++;
}

console.log(`✅ Seeded ${inserted} options successfully!`);

// Verify
const allOptions = db.prepare('SELECT * FROM form_options').all();
console.log(`Total options in database: ${allOptions.length}`);

db.close();
