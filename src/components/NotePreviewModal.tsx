import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Bookmark, 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Star, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Check, 
  Send, 
  Sun, 
  Moon, 
  BookMarked,
  MessageSquare
} from 'lucide-react';
import { Note, Review } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { generateAndDownloadNotePDF } from '../utils/pdfGenerator';

interface NotePreviewModalProps {
  note: Note | null;
  onClose: () => void;
}

export const NotePreviewModal: React.FC<NotePreviewModalProps> = ({ note, onClose }) => {
  const { toggleBookmark, isBookmarked, recordDownload } = useAuth();
  const { incrementDownload, incrementView, addReview, getReviewsForNote } = useNotes();

  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [paperTheme, setPaperTheme] = useState<'dark' | 'light' | 'sepia'>('dark');
  const [activeTab, setActiveTab] = useState<'document' | 'contents' | 'reviews'>('document');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Review form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (note) {
      incrementView(note.id);
      setCurrentPage(1);
      setZoomLevel(100);
      setActiveTab('document');
    }
  }, [note?.id]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!note) return null;

  const bookmarked = isBookmarked(note.id);
  const reviews = getReviewsForNote(note.id);
  const totalSamplePages = note.samplePages?.length || 1;
  const activePageData = note.samplePages?.[currentPage - 1] || note.samplePages?.[0];

  const handleDownload = () => {
    incrementDownload(note.id);
    recordDownload(note.id, note.title, note.subject);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);

    // Generate authentic PDF document
    generateAndDownloadNotePDF(note);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '#browse');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview(note.id, newRating, newComment.trim());
    setNewComment('');
  };

  const getThemeStyles = () => {
    if (paperTheme === 'light') {
      return {
        bg: 'bg-white',
        text: 'text-slate-900',
        subtext: 'text-slate-600',
        card: 'bg-slate-100 border-slate-300',
        codeBg: 'bg-slate-900 text-sky-300',
        accentBorder: 'border-slate-300'
      };
    }
    if (paperTheme === 'sepia') {
      return {
        bg: 'bg-[#fbf0d9]',
        text: 'text-[#433422]',
        subtext: 'text-[#6b583e]',
        card: 'bg-[#f4e4c1] border-[#dec494]',
        codeBg: 'bg-[#3b2d1d] text-[#fde047]',
        accentBorder: 'border-[#deb887]'
      };
    }
    return {
      bg: 'bg-slate-950',
      text: 'text-slate-100',
      subtext: 'text-slate-400',
      card: 'bg-slate-900/90 border-slate-800',
      codeBg: 'bg-slate-900 text-sky-300',
      accentBorder: 'border-slate-800'
    };
  };

  const theme = getThemeStyles();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="h-16 px-4 sm:px-6 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {note.title}
              </h2>
              <div className="text-[11px] text-slate-400 flex items-center gap-2 truncate">
                <span className="text-sky-400 font-semibold">{note.branch} · Sem {note.semester}</span>
                <span>·</span>
                <span>{note.subject}</span>
                <span>·</span>
                <span>By {note.author.name}</span>
              </div>
            </div>
          </div>

          {/* Reader Tools */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Paper Theme Selector */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setPaperTheme('dark')}
                className={`p-1.5 rounded ${paperTheme === 'dark' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'}`}
                title="Dark Reading Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPaperTheme('sepia')}
                className={`p-1.5 rounded ${paperTheme === 'sepia' ? 'bg-[#f4e4c1] text-[#433422]' : 'text-slate-400 hover:text-white'}`}
                title="Sepia Warm Mode"
              >
                <span className="text-xs font-bold font-serif">S</span>
              </button>
              <button
                onClick={() => setPaperTheme('light')}
                className={`p-1.5 rounded ${paperTheme === 'light' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'}`}
                title="Clean White Mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <button
                onClick={() => setZoomLevel((prev) => Math.max(75, prev - 15))}
                className="p-1.5 rounded hover:bg-slate-800 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((prev) => Math.min(145, prev + 15))}
                className="p-1.5 rounded hover:bg-slate-800 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Reader (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport & Sidebar Grid */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Document Reading Canvas */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-slate-950 p-4 sm:p-6 items-center justify-start scrollbar-thin scrollbar-thumb-slate-800">
            {/* Rendered Document Sheet */}
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className={`w-full max-w-2xl min-h-[580px] p-6 sm:p-10 rounded-xl shadow-2xl transition-all duration-150 border ${theme.bg} ${theme.accentBorder} flex flex-col justify-between`}
            >
              <div className="space-y-6">
                {/* Document Header within the Page */}
                <div className={`border-b pb-4 ${theme.accentBorder} flex items-start justify-between gap-4`}>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-sky-500">
                      {activePageData?.unit || note.unit}
                    </span>
                    <h3 className={`text-xl font-bold mt-1 ${theme.text}`}>
                      {activePageData?.title || note.title}
                    </h3>
                    <div className={`text-xs mt-1 ${theme.subtext}`}>
                      {note.subject} · Unit Syllabus Guide
                    </div>
                  </div>

                  <div className="text-right text-[11px] font-mono opacity-70">
                    Page {currentPage} of {note.pageCount}
                  </div>
                </div>

                {/* Main Theory & Key Points */}
                <div className="space-y-3">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${theme.text}`}>
                    Core Principles & Derivations
                  </h4>
                  <div className={`space-y-2 text-xs sm:text-sm leading-relaxed ${theme.text}`}>
                    {activePageData?.content.map((paragraph, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <span className="text-sky-500 font-bold">•</span>
                        <span>{paragraph}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Mathematical Formula / Algorithm Block */}
                {activePageData?.keyFormulasOrCode && activePageData.keyFormulasOrCode.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>
                        Key Formulas / Pseudo-Code
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activePageData.keyFormulasOrCode!.join('\n'));
                          setCopiedCode(true);
                          setTimeout(() => setCopiedCode(false), 2000);
                        }}
                        className={`text-[11px] flex items-center gap-1 font-mono transition-colors ${
                          copiedCode ? 'text-emerald-500' : 'text-sky-400 hover:text-sky-300'
                        }`}
                      >
                        {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border ${theme.card} ${theme.codeBg}`}>
                      {activePageData.keyFormulasOrCode.join('\n')}
                    </pre>
                  </div>
                )}

                {/* Exam Hall Pro-Tips Box */}
                {activePageData?.examTips && (
                  <div className={`p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1 text-xs text-amber-300`}>
                    <div className="font-bold flex items-center gap-1.5 text-amber-200">
                      <span>⚡ Exam Hall Weightage & Examiner Tip</span>
                    </div>
                    {activePageData.examTips.map((tip, idx) => (
                      <p key={idx} className="text-[11px] leading-relaxed text-amber-100/90">
                        {tip}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Page Footer Attribution inside Document */}
              <div className={`pt-6 mt-8 border-t ${theme.accentBorder} flex items-center justify-between text-[11px] ${theme.subtext}`}>
                <div>
                  Prepared by <span className="font-semibold">{note.author.name}</span> ({note.author.college})
                </div>
                <div>OmniNotes Verified Archive</div>
              </div>
            </div>
          </div>

          {/* Right Navigation / Info Sidebar */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800 bg-slate-900 flex flex-col shrink-0">
            {/* Sidebar Tabs */}
            <div className="flex border-b border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('document')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  activeTab === 'document' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('contents')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  activeTab === 'contents' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Syllabus
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  activeTab === 'reviews' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>

            {/* Sidebar Tab Contents */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {activeTab === 'document' && (
                <div className="space-y-4">
                  {/* Page Navigation */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">
                      Page {currentPage} of {totalSamplePages}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalSamplePages, p + 1))}
                        disabled={currentPage >= totalSamplePages}
                        className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h5 className="font-semibold text-white mb-1">About These Notes</h5>
                    <p className="text-slate-400 leading-relaxed text-xs">
                      {note.description}
                    </p>
                  </div>

                  {/* Syllabus Coverage */}
                  <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-800/40 text-sky-300 space-y-1">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Syllabus Coverage</span>
                    </div>
                    <div className="text-[11px] text-slate-300">{note.syllabusCoverage}</div>
                  </div>

                  {/* Author Card */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-[11px] text-slate-500 uppercase font-mono">Contributor</div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sky-400">
                        {note.author.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{note.author.name}</div>
                        <div className="text-[11px] text-slate-400">{note.author.college}</div>
                      </div>
                    </div>
                    {note.author.badge && (
                      <div className="text-[10px] text-amber-400 font-medium">
                        ★ {note.author.badge}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-white font-bold">{note.downloadsCount}</div>
                      <div className="text-[10px] text-slate-400">Total Downloads</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800">
                      <div className="text-amber-400 font-bold">★ {note.rating} / 5.0</div>
                      <div className="text-[10px] text-slate-400">{note.ratingCount} Ratings</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contents' && (
                <div className="space-y-2">
                  <h5 className="font-semibold text-white mb-2">Table of Contents</h5>
                  <div className="space-y-1.5">
                    {note.tableOfContents.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-sky-400 font-mono text-[11px] shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {/* Add Review Box */}
                  <form onSubmit={handleAddReview} className="space-y-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-semibold text-white">Leave Feedback</div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`p-1 ${newRating >= star ? 'text-amber-400' : 'text-slate-600'}`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Was this helpful for your semester exams?"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="w-full py-1.5 rounded bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Submit Review</span>
                    </button>
                  </form>

                  {/* List of Reviews */}
                  <div className="space-y-2.5">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white text-xs">{rev.userName}</span>
                          <div className="flex items-center text-amber-400">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                        <div className="text-[10px] text-slate-500">{rev.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Sidebar */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-2 shrink-0">
              <button
                onClick={handleDownload}
                disabled={downloadSuccess}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 ${
                  downloadSuccess
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20 active:scale-95'
                }`}
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>File Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download {note.fileFormat} ({note.fileSize})</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleBookmark(note.id)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    bookmarked
                      ? 'bg-sky-950/60 text-sky-400 border-sky-800/60'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-sky-400' : ''}`} />
                  <span>{bookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2 px-3 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
