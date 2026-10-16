import React, { useState, useId } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  X, 
  Plus, 
  Bookmark, 
  Star,
  FileCheck,
  Award
} from 'lucide-react';
import { Note, SectionType, NoteType } from '../types';
import { INITIAL_BRANCHES } from '../data/mockNotes';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';

interface UploadNotesSectionProps {
  onNavigate: (section: SectionType) => void;
  onPreviewNote: (note: Note) => void;
  onOpenAuthModal: () => void;
}

export const UploadNotesSection: React.FC<UploadNotesSectionProps> = ({
  onNavigate,
  onPreviewNote,
  onOpenAuthModal,
}) => {
  const { currentUser, isAuthenticated } = useAuth();
  const { addNote } = useNotes();

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [branchId, setBranchId] = useState('cse');
  const [semester, setSemester] = useState(4);
  const [unit, setUnit] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('Handwritten');
  const [description, setDescription] = useState('');
  const [syllabusCoverage, setSyllabusCoverage] = useState('100% University Syllabus (All Units)');
  const [tagsInput, setTagsInput] = useState('Operating Systems, Semaphores, CPU Scheduling');
  const [fileAttached, setFileAttached] = useState<{ name: string; size: string; pageCount: number } | null>({
    name: 'Operating_Systems_Handwritten_Notes.pdf',
    size: '6.4 MB',
    pageCount: 34
  });

  // Sample page text for the interactive reader
  const [samplePageTitle, setSamplePageTitle] = useState('Process Synchronization & Race Condition Notes');
  const [samplePageContent, setSamplePageContent] = useState(
    'A race condition occurs when two or more processes access shared data concurrently and the outcome depends on the particular order of execution.\nCritical Section solution requires Mutual Exclusion, Progress, and Bounded Waiting.'
  );
  const [sampleFormulaOrCode, setSampleFormulaOrCode] = useState(
    '// Peterson Solution Flag Variable\nboolean flag[2] = {false, false};\nint turn = 0;\nflag[i] = true; turn = j;\nwhile(flag[j] && turn == j);'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdNote, setCreatedNote] = useState<Note | null>(null);

  const selectedBranch = INITIAL_BRANCHES.find((b) => b.id === branchId) || INITIAL_BRANCHES[0];
  const suggestedSubjects = selectedBranch.subjectsBySemester[semester] || [];

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileAttached({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        pageCount: Math.floor(Math.random() * 25) + 15
      });
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileAttached({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        pageCount: Math.floor(Math.random() * 25) + 15
      });
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !subject.trim()) {
      return;
    }

    setIsSubmitting(true);

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const newNote = addNote({
      title: title.trim(),
      description: description.trim() || `Class notes and exam preparation material for ${subject}.`,
      subject: subject.trim(),
      branch: selectedBranch.shortCode,
      branchId: selectedBranch.id,
      semester,
      unit: unit.trim() || 'Unit 1 to 5',
      noteType,
      author: {
        id: currentUser?.id || 'uploader-student',
        name: currentUser?.name || 'Verified Student Contributor',
        college: currentUser?.college || 'Engineering Institute of Technology',
        verified: true,
        badge: 'Academic Contributor'
      },
      fileFormat: 'PDF',
      fileSize: fileAttached?.size || '5.2 MB',
      pageCount: fileAttached?.pageCount || 28,
      tags: parsedTags.length > 0 ? parsedTags : ['Notes', subject, selectedBranch.shortCode],
      tableOfContents: [
        `Module 1: ${unit || 'Fundamentals & Key Theorems'}`,
        'Module 2: Standard Solved University Problems',
        'Module 3: Previous Year Exam Questions & Marking Scheme',
        'Module 4: Summary Formula Quick Sheet'
      ],
      samplePages: [
        {
          pageNumber: 1,
          title: samplePageTitle.trim() || `${subject} Core Principles`,
          unit: unit || 'Unit 1',
          content: samplePageContent
            .split('\n')
            .map((s) => s.trim())
            .filter((s) => s.length > 0),
          keyFormulasOrCode: sampleFormulaOrCode
            ? sampleFormulaOrCode.split('\n').filter((s) => s.length > 0)
            : undefined,
          examTips: [
            'Examiner favorite topic: Focus on step-by-step working and clear diagrams.'
          ]
        }
      ],
      syllabusCoverage: syllabusCoverage.trim() || '100% University Syllabus Compliant',
      examWeightageEstimate: 'High Yield (Approx 15-20 Marks in University Exam)'
    });

    setIsSubmitting(false);
    setCreatedNote(newNote);
  };

  const resetForm = () => {
    setTitle('');
    setSubject('');
    setUnit('');
    setDescription('');
    setCreatedNote(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-wider uppercase text-sky-400">
            Community Knowledge Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Contribute Notes, Cheat Sheets & PYQs
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Upload your classroom notes, formula sheets, or solved exam papers. Earn +50 academic karma points and help your fellow engineering peers excel.
          </p>
        </div>

        {!isAuthenticated && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Posting as Guest.</span>
            <button
              onClick={onOpenAuthModal}
              className="font-bold underline text-amber-200 hover:text-white"
            >
              Sign in to earn Karma
            </button>
          </div>
        )}
      </div>

      {/* Success Dialog if Note Uploaded */}
      {createdNote && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Note Successfully Published to the Academic Vault!
              </h3>
              <p className="text-xs text-slate-300">
                You earned <span className="text-emerald-400 font-bold">+50 Karma Points</span>. Your study material is now live for all engineering students.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-sky-400">{createdNote.branch} · Sem {createdNote.semester}</div>
              <div className="text-sm font-bold text-white">{createdNote.title}</div>
              <div className="text-xs text-slate-400">{createdNote.subject} ({createdNote.noteType})</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPreviewNote(createdNote)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open in Reader</span>
              </button>
              <button
                onClick={() => onNavigate('browse')}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Browse Vault
              </button>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="text-xs text-slate-400 hover:text-white underline pt-1"
          >
            Upload Another Document
          </button>
        </div>
      )}

      {/* Main Upload Grid: Form (Left) & Real-time Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Drag & Drop Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                1. Select Document File (PDF, DOCX, ZIP)
              </label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="relative border-2 border-dashed border-slate-700 hover:border-sky-500/60 rounded-2xl p-6 text-center bg-slate-900/40 hover:bg-slate-900/70 transition-all cursor-pointer group"
              >
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.zip,.png,.jpg"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-medium text-slate-200">
                    Drag and drop your lecture notes or <span className="text-sky-400 underline">Browse files</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Supports high-resolution scans, typed documents, or formula sheets (up to 50MB)
                  </div>
                </div>
              </div>

              {fileAttached && (
                <div className="mt-2.5 p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium truncate max-w-[240px]">{fileAttached.name}</span>
                    <span className="text-slate-500">({fileAttached.size} · {fileAttached.pageCount} pages)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFileAttached(null)}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Note Metadata Details */}
            <div className="space-y-4 pt-2">
              <label className="block text-xs font-semibold text-slate-300">
                2. Academic Details & Curriculum Mapping
              </label>

              {/* Title */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems: CPU Scheduling & Synchronization Master Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              {/* Branch and Semester Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Discipline / Branch *
                  </label>
                  <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    {INITIAL_BRANCHES.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.shortCode} — {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Semester *
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject Input & Suggested Subjects */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Subject Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Operating Systems"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                />
                {suggestedSubjects.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-slate-500">Suggestions:</span>
                    {suggestedSubjects.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSubject(s)}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-sky-300 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Unit and Note Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Unit / Module Coverage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unit 2 & 3 (Process Scheduling & Concurrency)"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Resource Category *
                  </label>
                  <select
                    value={noteType}
                    onChange={(e) => setNoteType(e.target.value as NoteType)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Handwritten">Handwritten Class Notes</option>
                    <option value="Typed Notes">Typed Notes & Lecture Slides</option>
                    <option value="PYQ & Solutions">Solved PYQ (Previous Years)</option>
                    <option value="Formula Sheet">Formula Sheet / Cheat Sheet</option>
                    <option value="Lab Manual">Laboratory Practical Manual</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Summary & Key Highlights
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe what makes these notes helpful (e.g. includes step-by-step numericals, Gantt chart tips, university exam questions)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Topic Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. FCFS, Round Robin, Banker Algorithm, Deadlocks"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Interactive Reader Sample Content for Live Preview */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300">
                3. Interactive Reader Sample Page Content
              </label>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Sample Page Title
                </label>
                <input
                  type="text"
                  value={samplePageTitle}
                  onChange={(e) => setSamplePageTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Core Theory / Explanation Text
                </label>
                <textarea
                  rows={2}
                  value={samplePageContent}
                  onChange={(e) => setSamplePageContent(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Formula / Derivation / Code snippet
                </label>
                <textarea
                  rows={2}
                  value={sampleFormulaOrCode}
                  onChange={(e) => setSampleFormulaOrCode(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-slate-950 border border-slate-800 rounded-lg text-sky-300 focus:outline-none focus:border-sky-500 resize-none text-[11px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !subject.trim()}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-sky-500/25 active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Notes & Claim +50 Karma</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>Live Vault Card Preview</span>
            </div>

            {/* Mocked Card as it will appear */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sky-400">{selectedBranch.shortCode}</span>
                    <span>·</span>
                    <span>Sem {semester}</span>
                    <span>·</span>
                    <span className="text-slate-300">{noteType}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                    Live Preview
                  </span>
                </div>

                <h4 className="text-base font-bold text-white line-clamp-2">
                  {title || 'Your Note Title Will Appear Here'}
                </h4>

                <div className="text-xs text-slate-300 font-medium mt-1">
                  <span className="text-sky-400">{subject || 'Subject Name'}</span>
                  <span className="mx-1 text-slate-600">/</span>
                  <span className="text-slate-400">{unit || 'All Units'}</span>
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {description || 'Comprehensive lecture summary with step-by-step exam solutions.'}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tagsInput
                    .split(',')
                    .filter((t) => t.trim().length > 0)
                    .slice(0, 3)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded"
                      >
                        #{tag.trim().replace(/^#/, '')}
                      </span>
                    ))}
                </div>
              </div>

              {/* Preview Reader Teaser */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] font-semibold text-sky-400 flex items-center justify-between">
                  <span>Page 1: {samplePageTitle || 'Sample Topic'}</span>
                  <span className="text-slate-500 font-mono text-[10px]">Reader Preview</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                  {samplePageContent || 'Sample theory notes will appear in the interactive full-page reader.'}
                </p>
                {sampleFormulaOrCode && (
                  <pre className="text-[10px] text-emerald-300 font-mono bg-slate-900 p-2 rounded overflow-x-auto">
                    {sampleFormulaOrCode}
                  </pre>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-[10px]">
                    {currentUser?.name?.charAt(0) || 'K'}
                  </div>
                  <span className="text-slate-300 font-medium truncate max-w-[130px]">
                    {currentUser?.name || 'Kunal Chaudhari'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>5.0</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-300 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>Academic Karma Policy</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clear, legible notes earn up to 500+ downloads per exam season. Maintain high formatting quality to unlock Contributor Badges!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
