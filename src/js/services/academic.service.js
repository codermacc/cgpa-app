/**
 * Academic Service — GPA/CGPA calculations
 * Nigerian 5-point grading system
 */

/** Grade point map */
export const GRADE_POINTS = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };

/** Grade color classes */
export const GRADE_COLORS = {
  A: { bg: '#f0fdf4', text: '#166534' },
  B: { bg: '#eff6ff', text: '#1e40af' },
  C: { bg: '#fffbeb', text: '#92400e' },
  D: { bg: '#fff7ed', text: '#9a3412' },
  E: { bg: '#fef2f2', text: '#991b1b' },
  F: { bg: '#fef2f2', text: '#7f1d1d' },
};

/** Degree classification thresholds */
export const CLASSIFICATIONS = [
  { label: 'First Class',         min: 4.50, max: 5.00, color: '#16a34a', dot: '#16a34a' },
  { label: 'Second Class Upper',  min: 3.50, max: 4.49, color: '#2563eb', dot: '#2563eb' },
  { label: 'Second Class Lower',  min: 2.40, max: 3.49, color: '#d97706', dot: '#d97706' },
  { label: 'Third Class',         min: 1.50, max: 2.39, color: '#ea580c', dot: '#ea580c' },
  { label: 'Pass',                min: 1.00, max: 1.49, color: '#6b7280', dot: '#6b7280' },
  { label: 'Fail',                min: 0.00, max: 0.99, color: '#dc2626', dot: '#dc2626' },
];

/**
 * Calculate GPA for a single semester
 * @param {Array} courses - [{units, grade}]
 * @returns {{ gpa, totalUnits, qualityPoints }}
 */
export function calculateGPA(courses) {
  if (!courses || courses.length === 0) return { gpa: 0, totalUnits: 0, qualityPoints: 0 };

  let totalUnits = 0;
  let qualityPoints = 0;

  courses.forEach(course => {
    const units = parseInt(course.units) || 0;
    const gp = GRADE_POINTS[course.grade?.toUpperCase()] ?? 0;
    totalUnits += units;
    qualityPoints += units * gp;
  });

  const gpa = totalUnits > 0 ? qualityPoints / totalUnits : 0;
  return { gpa: parseFloat(gpa.toFixed(2)), totalUnits, qualityPoints };
}

/**
 * Calculate CGPA across all semesters
 * @param {Array} semesters - [{courses: [...]}]
 * @returns {{ cgpa, totalUnits, totalQualityPoints }}
 */
export function calculateCGPA(semesters) {
  if (!semesters || semesters.length === 0) {
    return { cgpa: 0, totalUnits: 0, totalQualityPoints: 0 };
  }

  let totalUnits = 0;
  let totalQualityPoints = 0;

  semesters.forEach(sem => {
    const { totalUnits: u, qualityPoints: qp } = calculateGPA(sem.courses || []);
    totalUnits += u;
    totalQualityPoints += qp;
  });

  const cgpa = totalUnits > 0 ? totalQualityPoints / totalUnits : 0;
  return {
    cgpa: parseFloat(cgpa.toFixed(2)),
    totalUnits,
    totalQualityPoints
  };
}

/**
 * Get degree classification from CGPA
 * @param {number} cgpa
 * @returns {object} classification
 */
export function getClassification(cgpa) {
  if (cgpa === 0) return { label: 'No Data Available', color: '#9ca3af', dot: '#9ca3af' };
  return CLASSIFICATIONS.find(c => cgpa >= c.min && cgpa <= c.max)
    || CLASSIFICATIONS[CLASSIFICATIONS.length - 1];
}

/**
 * Predict projected CGPA
 * @param {number} currentCGPA
 * @param {number} completedSemesters
 * @param {number} remainingSemesters
 * @param {number} expectedGPA
 * @returns {{ projectedCGPA, classification, neededGPA }}
 */
export function predictCGPA({ currentCGPA, completedSemesters, remainingSemesters, expectedGPA }) {
  const total = completedSemesters + remainingSemesters;
  if (total === 0) return { projectedCGPA: 0, classification: getClassification(0), neededGPA: [] };

  const projectedCGPA = parseFloat(
    ((currentCGPA * completedSemesters + expectedGPA * remainingSemesters) / total).toFixed(2)
  );

  // Calculate needed GPAs to achieve each class
  const neededGPA = CLASSIFICATIONS.slice(0, 4).map(cls => {
    const needed = remainingSemesters > 0
      ? ((cls.min * total) - (currentCGPA * completedSemesters)) / remainingSemesters
      : null;
    return { ...cls, needed: needed ? parseFloat(needed.toFixed(2)) : null };
  });

  return {
    projectedCGPA,
    classification: getClassification(projectedCGPA),
    neededGPA
  };
}

/**
 * Generate academic insights from semesters
 * @param {Array} semesters
 * @returns {object} insights
 */
export function generateInsights(semesters) {
  if (!semesters || semesters.length === 0) return null;

  const withGPA = semesters.map(s => {
    const { gpa } = calculateGPA(s.courses || []);
    return { ...s, gpa };
  });

  const gpas = withGPA.map(s => s.gpa);
  const avgGPA = gpas.reduce((a, b) => a + b, 0) / gpas.length;

  const best = withGPA.reduce((a, b) => a.gpa >= b.gpa ? a : b);
  const worst = withGPA.reduce((a, b) => a.gpa <= b.gpa ? a : b);

  // Most improved: biggest positive jump from previous semester
  let mostImproved = null;
  for (let i = 1; i < withGPA.length; i++) {
    const diff = withGPA[i].gpa - withGPA[i - 1].gpa;
    if (!mostImproved || diff > mostImproved.diff) {
      mostImproved = { semester: withGPA[i], diff: parseFloat(diff.toFixed(2)) };
    }
  }

  return {
    bestSemester: best,
    worstSemester: worst,
    mostImproved: mostImproved?.semester,
    mostImprovedDiff: mostImproved?.diff,
    averageGPA: parseFloat(avgGPA.toFixed(2)),
    trend: withGPA.map(s => ({ label: `${s.semester} ${s.year}`, gpa: s.gpa }))
  };
}

/**
 * Generate smart recommendations
 * @param {number} cgpa
 * @param {number} completedSemesters
 * @param {number} remainingSemesters
 * @returns {Array<{message, type, icon}>}
 */
export function generateRecommendations(cgpa, completedSemesters, remainingSemesters) {
  const recs = [];
  if (!remainingSemesters) return recs;

  const total = completedSemesters + remainingSemesters;

  CLASSIFICATIONS.slice(0, 4).forEach(cls => {
    const needed = ((cls.min * total) - (cgpa * completedSemesters)) / remainingSemesters;
    if (needed >= 0 && needed <= 5) {
      recs.push({
        type: needed <= cgpa ? 'achievable' : 'stretch',
        icon: needed <= cgpa ? '✓' : '↑',
        message: `You need a GPA of ${needed.toFixed(2)} in remaining ${remainingSemesters} semester${remainingSemesters > 1 ? 's' : ''} to graduate with ${cls.label}.`,
        color: cls.color
      });
    } else if (needed > 5) {
      recs.push({
        type: 'unachievable',
        icon: '✗',
        message: `${cls.label} is no longer achievable (would need ${needed.toFixed(2)} GPA).`,
        color: '#6b7280'
      });
    }
  });

  return recs;
}

export default {
  GRADE_POINTS, GRADE_COLORS, CLASSIFICATIONS,
  calculateGPA, calculateCGPA, getClassification,
  predictCGPA, generateInsights, generateRecommendations
};
