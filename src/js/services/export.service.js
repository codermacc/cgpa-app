/**
 * Export Service — PDF, PNG, JSON
 */
import state from '../core/state.js';
import { calculateCGPA, getClassification } from './academic.service.js';

/**
 * Export as JSON file download
 */
export function exportJSON() {
  const json = state.exportJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cgpa-data-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import from JSON file
 * @param {File} file
 * @returns {Promise<boolean>}
 */
export function importJSON(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const success = state.importJSON(e.target.result);
      resolve(success);
    };
    reader.onerror = () => resolve(false);
    reader.readAsText(file);
  });
}

/**
 * Export as PDF using jsPDF
 */
export async function exportPDF() {
  const { default: jsPDF } = await import('jspdf');
  const { profile, semesters } = state.get();
  const { cgpa, totalUnits, totalQualityPoints } = calculateCGPA(semesters);
  const classification = getClassification(cgpa);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(22, 163, 74);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('CGPA Calculator', 20, 18);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Academic Performance Report', 20, 28);
  doc.text(new Date().toLocaleDateString('en-NG', { dateStyle: 'long' }), pageWidth - 20, 28, { align: 'right' });

  // Profile
  doc.setTextColor(31, 41, 55);
  let y = 55;
  if (profile) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(profile.name || 'Student', 20, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    if (profile.university) doc.text(profile.university, 20, y); y += 6;
    if (profile.department) doc.text(`${profile.department} · ${profile.faculty || ''}`, 20, y); y += 6;
    if (profile.level) doc.text(`Level ${profile.level}`, 20, y); y += 10;
  }

  // CGPA Summary Box
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(15, y, pageWidth - 30, 30, 4, 4, 'F');
  doc.setTextColor(22, 101, 52);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(`${cgpa.toFixed(2)}`, 35, y + 20);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('CGPA', 35, y + 27);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(classification.label, 80, y + 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text(`${totalUnits} total units · ${totalQualityPoints} quality points`, 80, y + 26);
  y += 40;

  // Semesters
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Semester Records', 20, y); y += 8;

  semesters.forEach(sem => {
    const semGPA = sem.courses?.reduce((acc, c) => {
      const gp = { A:5,B:4,C:3,D:2,E:1,F:0 }[c.grade?.toUpperCase()] ?? 0;
      return { qp: acc.qp + gp * c.units, u: acc.u + parseInt(c.units) };
    }, { qp: 0, u: 0 });
    const gpa = semGPA.u ? (semGPA.qp / semGPA.u).toFixed(2) : '0.00';

    if (y > 260) { doc.addPage(); y = 20; }

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(15, y, pageWidth - 30, 8, 2, 2, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text(`${sem.semester} Semester ${sem.year}`, 20, y + 5.5);
    doc.text(`GPA: ${gpa}`, pageWidth - 25, y + 5.5, { align: 'right' });
    y += 12;

    sem.courses?.forEach(c => {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(107, 114, 128);
      doc.setFontSize(9);
      doc.text(`  ${c.code || 'Course'} — ${c.units} units — Grade ${c.grade}`, 20, y);
      y += 6;
    });
    y += 4;
  });

  doc.save(`cgpa-report-${profile?.name?.replace(/\s+/g, '-') || 'student'}.pdf`);
}

/**
 * Export dashboard as PNG screenshot
 */
export async function exportPNG() {
  const { default: html2canvas } = await import('html2canvas');
  const target = document.getElementById('page-content');
  const canvas = await html2canvas(target, {
    scale: 2,
    backgroundColor: '#f9fafb',
    logging: false
  });
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = `cgpa-dashboard-${new Date().toISOString().split('T')[0]}.png`;
  a.click();
}

export default { exportJSON, importJSON, exportPDF, exportPNG };
