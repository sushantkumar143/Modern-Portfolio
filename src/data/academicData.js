/*
  Academic Performance Data
  All semester-wise data from Sushant Kumar's LPU transcript.
*/

export const studentInfo = {
  name: 'Sushant Kumar',
  regNo: '12311087',
  programme: 'B.Tech (Computer Science & Engineering)',
  university: 'Lovely Professional University',
  startYear: 2023,
  cgpa: 9.09,
  division: 'First with Distinction',
};

export const gradePoints = {
  'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'D': 4,
};

export const gradeColors = {
  'O':  '#00d4ff', // Cyan — Outstanding
  'A+': '#a855f7', // Purple — Excellent
  'A':  '#3b82f6', // Blue — Very Good
  'B+': '#f59e0b', // Amber — Good
  'B':  '#eab308', // Yellow — Above Average
  'C':  '#f97316', // Orange — Average
  'D':  '#ef4444', // Red — Marginal
};

export const semesters = [
  {
    term: 'I',
    tgpa: 9.55,
    percentage: 95.5,
    courses: [
      { code: 'CSE111', name: 'Orientation to Computing-I', credits: 2, grade: 'A+' },
      { code: 'CSE326', name: 'Internet Programming Laboratory', credits: 2, grade: 'A+' },
      { code: 'INT108', name: 'Python Programming', credits: 4, grade: 'O' },
      { code: 'MEC136', name: 'Engineering Graphics & Digital Fabrication', credits: 4, grade: 'O' },
      { code: 'MTH174', name: 'Engineering Mathematics', credits: 4, grade: 'O' },
      { code: 'PES318', name: 'Soft Skills-I', credits: 3, grade: 'A' },
      { code: 'PHY110', name: 'Engineering Physics', credits: 3, grade: 'O' },
    ],
  },
  {
    term: 'II',
    tgpa: 8.73,
    percentage: 87.3,
    courses: [
      { code: 'CHE110', name: 'Environmental Studies', credits: 2, grade: 'A' },
      { code: 'CSE101', name: 'Computer Programming', credits: 4, grade: 'O' },
      { code: 'CSE121', name: 'Orientation to Computing-II', credits: 2, grade: 'A' },
      { code: 'CSE320', name: 'Software Engineering', credits: 3, grade: 'A+' },
      { code: 'ECE249', name: 'Basic Electrical & Electronics Engineering', credits: 4, grade: 'A+' },
      { code: 'ECE279', name: 'Basic Electrical & Electronics Lab', credits: 1, grade: 'O' },
      { code: 'INT306', name: 'Database Management Systems', credits: 4, grade: 'O' },
      { code: 'MTH401', name: 'Discrete Mathematics', credits: 3, grade: 'A' },
      { code: 'PEL125', name: 'Upper Intermediate Communication Skills-I', credits: 3, grade: 'B' },
    ],
  },
  {
    term: 'III',
    tgpa: 9.08,
    percentage: 90.8,
    courses: [
      { code: 'CSE202', name: 'Object Oriented Programming', credits: 4, grade: 'O' },
      { code: 'CSE205', name: 'Data Structures & Algorithms', credits: 4, grade: 'O' },
      { code: 'CSE211', name: 'Computer Organization & Design', credits: 4, grade: 'A+' },
      { code: 'CSE306', name: 'Computer Networks', credits: 3, grade: 'A+' },
      { code: 'CSE307', name: 'Internetworking Essentials', credits: 1, grade: 'A+' },
      { code: 'CSE316', name: 'Operating Systems', credits: 3, grade: 'A+' },
      { code: 'CSE325', name: 'Operating Systems Laboratory', credits: 1, grade: 'A+' },
      { code: 'GEN231', name: 'Community Development Project', credits: 2, grade: 'A+' },
      { code: 'PEL134', name: 'Upper Intermediate Communication Skills-II', credits: 3, grade: 'B+' },
    ],
  },
  {
    term: 'IV',
    tgpa: 9.29,
    percentage: 92.9,
    courses: [
      { code: 'CSE310', name: 'Programming in Java', credits: 4, grade: 'O' },
      { code: 'CSE408', name: 'Design & Analysis of Algorithms', credits: 3, grade: 'O' },
      { code: 'INT217', name: 'Introduction to Data Management', credits: 3, grade: 'A+' },
      { code: 'INT375', name: 'Data Science Toolbox: Python', credits: 3, grade: 'A+' },
      { code: 'INT428', name: 'Artificial Intelligence Essentials', credits: 4, grade: 'A' },
      { code: 'MTH302', name: 'Probability & Statistics', credits: 4, grade: 'O' },
      { code: 'PEA305', name: 'Analytical Skills-I', credits: 3, grade: 'A+' },
    ],
  },
  {
    term: 'V',
    tgpa: 8.86,
    percentage: 88.6,
    courses: [
      { code: 'CSE322', name: 'Formal Languages & Automation Theory', credits: 3, grade: 'A' },
      { code: 'CSE329', name: 'Prelude to Competitive Coding', credits: 3, grade: 'O' },
      { code: 'CSE330', name: 'Competitive Coding Approaches', credits: 3, grade: 'O' },
      { code: 'CSE443', name: 'Seminar on Summer Training', credits: 3, grade: 'A+' },
      { code: 'INT234', name: 'Predictive Analytics', credits: 3, grade: 'A+' },
      { code: 'INT331', name: 'Fundamentals of DevOps', credits: 3, grade: 'A' },
      { code: 'INT374', name: 'Data Analytics with Power BI', credits: 3, grade: 'A' },
    ],
  },
];

/* Derived insights */
const tgpas = semesters.map(s => s.tgpa);
export const insights = {
  bestSemester: semesters[tgpas.indexOf(Math.max(...tgpas))],
  lowestSemester: semesters[tgpas.indexOf(Math.min(...tgpas))],
  avgTgpa: +(tgpas.reduce((a, b) => a + b, 0) / tgpas.length).toFixed(2),
  totalCourses: semesters.reduce((sum, s) => sum + s.courses.length, 0),
  totalCredits: semesters.reduce((sum, s) => sum + s.courses.reduce((cs, c) => cs + c.credits, 0), 0),
};
