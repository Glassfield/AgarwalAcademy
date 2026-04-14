import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'database.db');
const db = new Database(dbPath);

console.log('Seeding form options...');

const options = [
  // Subjects
  { category: 'subjects', optionId: 'mathematics', label: 'Mathematics' },
  { category: 'subjects', optionId: 'physics', label: 'Physics' },
  { category: 'subjects', optionId: 'chemistry', label: 'Chemistry' },
  { category: 'subjects', optionId: 'biology', label: 'Biology' },
  { category: 'subjects', optionId: 'english', label: 'English' },
  { category: 'subjects', optionId: 'hindi', label: 'Hindi' },
  { category: 'subjects', optionId: 'social-science', label: 'Social Science' },
  { category: 'subjects', optionId: 'computer-science', label: 'Computer Science' },
  { category: 'subjects', optionId: 'accountancy', label: 'Accountancy' },
  { category: 'subjects', optionId: 'business-studies', label: 'Business Studies' },
  { category: 'subjects', optionId: 'economics', label: 'Economics' },
  
  // Classes
  { category: 'classes', optionId: 'class-1', label: 'Class 1' },
  { category: 'classes', optionId: 'class-2', label: 'Class 2' },
  { category: 'classes', optionId: 'class-3', label: 'Class 3' },
  { category: 'classes', optionId: 'class-4', label: 'Class 4' },
  { category: 'classes', optionId: 'class-5', label: 'Class 5' },
  { category: 'classes', optionId: 'class-6', label: 'Class 6' },
  { category: 'classes', optionId: 'class-7', label: 'Class 7' },
  { category: 'classes', optionId: 'class-8', label: 'Class 8' },
  { category: 'classes', optionId: 'class-9', label: 'Class 9' },
  { category: 'classes', optionId: 'class-10', label: 'Class 10' },
  { category: 'classes', optionId: 'class-11', label: 'Class 11' },
  { category: 'classes', optionId: 'class-12', label: 'Class 12' },
  
  // Experience
  { category: 'experience', optionId: '0-1', label: '0-1 years' },
  { category: 'experience', optionId: '1-3', label: '1-3 years' },
  { category: 'experience', optionId: '3-5', label: '3-5 years' },
  { category: 'experience', optionId: '5-10', label: '5-10 years' },
  { category: 'experience', optionId: '10+', label: '10+ years' },
  
  // Areas (South Delhi localities)
  { category: 'areas', optionId: 'kalkaji', label: 'Kalkaji' },
  { category: 'areas', optionId: 'greater-kailash', label: 'Greater Kailash' },
  { category: 'areas', optionId: 'defence-colony', label: 'Defence Colony' },
  { category: 'areas', optionId: 'lajpat-nagar', label: 'Lajpat Nagar' },
  { category: 'areas', optionId: 'cr-park', label: 'CR Park' },
  { category: 'areas', optionId: 'nehru-place', label: 'Nehru Place' },
  { category: 'areas', optionId: 'hauz-khas', label: 'Hauz Khas' },
  { category: 'areas', optionId: 'saket', label: 'Saket' },
  { category: 'areas', optionId: 'malviya-nagar', label: 'Malviya Nagar' },
  { category: 'areas', optionId: 'green-park', label: 'Green Park' },
  { category: 'areas', optionId: 'safdarjung', label: 'Safdarjung' },
  { category: 'areas', optionId: 'vasant-kunj', label: 'Vasant Kunj' },
  { category: 'areas', optionId: 'vasant-vihar', label: 'Vasant Vihar' },
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
