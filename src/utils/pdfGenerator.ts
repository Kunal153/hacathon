import { jsPDF } from 'jspdf';
import { Note } from '../types';

export const generateAndDownloadNotePDF = (note: Note): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = margin;

  const addHeaderAndFooter = (pageNum: number, totalPages: number) => {
    // Top subtle bar
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 12, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(56, 189, 248); // sky-400
    doc.text('OMNINOTES ACADEMIC VAULT', margin, 8);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(`${note.branch} · Semester ${note.semester} · ${note.subject}`, pageWidth - margin, 8, { align: 'right' });

    // Bottom footer bar
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Prepared by ${note.author.name} (${note.author.college})`, margin, pageHeight - 7);
    doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  const checkPageBreak = (neededHeight: number): void => {
    if (cursorY + neededHeight > pageHeight - 18) {
      doc.addPage();
      cursorY = 20; // below top header
    }
  };

  // ---------------- PAGE 1: TITLE & METADATA BANNER ----------------
  cursorY = 22;

  // Title Box Background
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.roundedRect(margin, cursorY, contentWidth, 42, 3, 3, 'FD');

  // Branch & Sem tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(2, 132, 199); // sky-600
  doc.text(`${note.branch.toUpperCase()} · SEMESTER ${note.semester} · ${note.noteType.toUpperCase()}`, margin + 5, cursorY + 7);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42); // slate-900
  const titleLines = doc.splitTextToSize(note.title, contentWidth - 10);
  doc.text(titleLines.slice(0, 2), margin + 5, cursorY + 16);

  // Author & Verified strip
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Subject: ${note.subject}  |  Unit: ${note.unit}  |  Author: ${note.author.name} (${note.author.college})`,
    margin + 5,
    cursorY + 34
  );

  cursorY += 48;

  // Overview / Description
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Course Unit Overview & Syllabus Coverage', margin, cursorY);
  cursorY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(note.description, contentWidth);
  doc.text(descLines, margin, cursorY);
  cursorY += descLines.length * 4.5 + 4;

  // Syllabus Coverage Box
  doc.setFillColor(240, 249, 255); // sky-50
  doc.setDrawColor(186, 230, 253); // sky-200
  doc.roundedRect(margin, cursorY, contentWidth, 12, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(3, 105, 161);
  doc.text(`Syllabus Alignment: ${note.syllabusCoverage}`, margin + 4, cursorY + 5);

  if (note.examWeightageEstimate) {
    doc.setFont('helvetica', 'normal');
    doc.text(`Exam Weightage: ${note.examWeightageEstimate}`, margin + 4, cursorY + 9.5);
  }
  cursorY += 18;

  // Table of Contents
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Table of Contents & Study Modules', margin, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  note.tableOfContents.forEach((item, index) => {
    checkPageBreak(7);
    doc.setFillColor(241, 245, 249);
    doc.circle(margin + 2.5, cursorY - 1, 1.2, 'F');
    doc.text(`${item}`, margin + 6, cursorY);
    cursorY += 5.5;
  });

  cursorY += 6;

  // ---------------- CONTENT PAGES / CHAPTER MODULES ----------------
  note.samplePages.forEach((page, pageIdx) => {
    checkPageBreak(30);

    // Module / Page Title
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, cursorY, contentWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${page.unit} — ${page.title}`, margin + 3, cursorY + 5);
    cursorY += 12;

    // Bullet points / Core Principles
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);

    page.content.forEach((paragraph) => {
      const pLines = doc.splitTextToSize(`• ${paragraph}`, contentWidth - 4);
      checkPageBreak(pLines.length * 4.5 + 2);
      doc.text(pLines, margin + 2, cursorY);
      cursorY += pLines.length * 4.5 + 2;
    });

    cursorY += 3;

    // Formulas or Code block
    if (page.keyFormulasOrCode && page.keyFormulasOrCode.length > 0) {
      const codeText = page.keyFormulasOrCode.join('\n');
      const codeLines = doc.splitTextToSize(codeText, contentWidth - 10);
      const boxHeight = codeLines.length * 4 + 7;

      checkPageBreak(boxHeight + 8);

      doc.setFillColor(15, 23, 42); // dark slate block for formulas/code
      doc.roundedRect(margin, cursorY, contentWidth, boxHeight, 2, 2, 'F');

      doc.setFont('courier', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(56, 189, 248); // sky-400 code text
      doc.text(codeLines, margin + 4, cursorY + 5);

      cursorY += boxHeight + 4;
    }

    // Exam Tips Callout
    if (page.examTips && page.examTips.length > 0) {
      const tipText = `Exam Hall Tip: ${page.examTips.join(' ')}`;
      const tipLines = doc.splitTextToSize(tipText, contentWidth - 10);
      const tipBoxHeight = tipLines.length * 4.5 + 7;

      checkPageBreak(tipBoxHeight + 8);

      doc.setFillColor(254, 243, 199); // amber-100
      doc.setDrawColor(245, 158, 11); // amber-500
      doc.roundedRect(margin, cursorY, contentWidth, tipBoxHeight, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(146, 64, 14); // amber-900
      doc.text(tipLines, margin + 4, cursorY + 5);

      cursorY += tipBoxHeight + 6;
    }

    cursorY += 4;
  });

  // Apply header and footer to all generated pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addHeaderAndFooter(i, totalPages);
  }

  // Trigger real PDF download
  const sanitizedFilename = `${note.subject.replace(/[^a-zA-Z0-9]/g, '_')}_${note.branch}_Sem${note.semester}_Notes.pdf`;
  doc.save(sanitizedFilename);
};
