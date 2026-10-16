import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Download, 
  Eye, 
  Star, 
  Bookmark, 
  RotateCcw, 
  FileText, 
  BookOpen,
  ArrowUpDown,
  CheckCircle,
  FileDown
} from 'lucide-react';
import { Note, SectionType, NoteType } from '../types';
import { INITIAL_BRANCHES } from '../data/mockNotes';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { generateAndDownloadNotePDF } from '../utils/pdfGenerator';

interface BrowseFilters {
  subject?: string;
  branch?: string;
  semester?: number;
}

interface BrowseNotesSectionProps {
  notes: Note[];
  initialFilters?: BrowseFilters;
  onPreviewNote: (note: Note) => void;
  onNavigate: (section: SectionType) => void;
}

export const BrowseNotesSection: React.FC<BrowseNotesSectionProps> = ({
  notes,
  initialFilters,
  onPreviewNote,
  onNavigate,
}) => {
  const { toggleBookmark, isBookmarked, recordDownload } = useAuth();
  const { incrementDownload } = useNotes();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedNoteType, setSelectedNoteType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'downloads'>('popular');
  const [downloadSuccessNoteId, setDownloadSuccessNoteId] = useState<string | null>(null);

  // Sync when initialFilters changes (e.g. user clicked a subject or branch/sem from home or branches)
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.subject) {
        setSearchQuery(initialFilters.subject);
      }
      if (initialFilters.branch) {
        // match shortCode or id
        const matched = INITIAL_BRANCHES.find(
          (b) => b.shortCode.toLowerCase() === initialFilters.branch?.toLowerCase() || b.id === initialFilters.branch
        );
        setSelectedBranch(matched ? matched.shortCode : initialFilters.branch);
      }
      if (initialFilters.semester !== undefined) {
        setSelectedSemester(String(initialFilters.semester));
      }
    }
  }, [initialFilters]);

  // Compute filtered & sorted notes
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = note.title.toLowerCase().includes(q);
        const matchesSubject = note.subject.toLowerCase().includes(q);
        const matchesDesc = note.description.toLowerCase().includes(q);
        const matchesAuthor = note.author.name.toLowerCase().includes(q);
        const matchesTags = note.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubject && !matchesDesc && !matchesAuthor && !matchesTags) {
          return false;
        }
      }

      // Branch filter
      if (selectedBranch !== 'all') {
        const matchesBranch =
          note.branch.toLowerCase() === selectedBranch.toLowerCase() ||
          note.branchId.toLowerCase() === selectedBranch.toLowerCase();
        if (!matchesBranch) return false;
      }

      // Semester filter
      if (selectedSemester !== 'all') {
        if (note.semester !== Number(selectedSemester)) {
          return false;
        }
      }

      // Note Type filter
      if (selectedNoteType !== 'all') {
        if (note.noteType !== selectedNoteType) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.downloadsCount * 2 + b.viewsCount) - (a.downloadsCount * 2 + a.viewsCount);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'downloads') {
        return b.downloadsCount - a.downloadsCount;
      }
      if (sortBy === 'newest') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
      return 0;
    });
  }, [notes, searchQuery, selectedBranch, selectedSemester, selectedNoteType, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedBranch !== 'all' ||
    selectedSemester !== 'all' ||
    selectedNoteType !== 'all';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedBranch('all');
    setSelectedSemester('all');
    setSelectedNoteType('all');
    setSortBy('popular');
  };

  const handleDownload = (e: React.MouseEvent, note: Note) => {
    e.stopPropagation();
    incrementDownload(note.id);
    recordDownload(note.id, note.title, note.subject);

    // Provide feedback
    setDownloadSuccessNoteId(note.id);
    setTimeout(() => {
      setDownloadSuccessNoteId(null);
    }, 2500);

    // Generate and download real formatted PDF document
    generateAndDownloadNotePDF(note);
  };

  const noteTypes: Array<NoteType | 'All'> = [
    'All',
    'Handwritten',
    'Typed Notes',
    'PYQ & Solutions',
    'Formula Sheet',
    'Lab Manual'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-semibold tracking-wider uppercase text-sky-400">
            Academic Vault
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Browse Engineering Notes & PYQs
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Showing {filteredNotes.length} curated study resources ready for instant preview and offline study.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-4">
        {/* Top search & Sort Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by subject, title, author, or keyword (e.g. CPU Scheduling, BCNF, FFT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <div className="relative w-full">
              <div className="flex items-center text-xs text-slate-400 mb-1">
                <ArrowUpDown className="w-3 h-3 mr-1 text-slate-400" />
                <span>Sort By</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated (★ 5.0)</option>
                <option value="downloads">Most Downloaded</option>
                <option value="newest">Recently Uploaded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dropdowns Row: Branch, Semester & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Discipline / Branch
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Disciplines (8 Branches)</option>
              {INITIAL_BRANCHES.map((b) => (
                <option key={b.id} value={b.shortCode}>
                  {b.shortCode} — {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Semesters (Sem 1 - 8)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={String(sem)}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Resource Category
            </label>
            <select
              value={selectedNoteType}
              onChange={(e) => setSelectedNoteType(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="all">All Categories</option>
              <option value="Handwritten">Handwritten Class Notes</option>
              <option value="Typed Notes">Typed Faculty Summaries</option>
              <option value="PYQ & Solutions">Solved 5-Year PYQs</option>
              <option value="Formula Sheet">Quick Formula Sheets</option>
              <option value="Lab Manual">Laboratory Manuals</option>
            </select>
          </div>
        </div>

        {/* Quick Type Filter Buttons (Interactive Buttons allowed per constitution) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-500 mr-1">Quick Filter:</span>
          {noteTypes.map((type) => {
            const isSelected = (type === 'All' && selectedNoteType === 'all') || selectedNoteType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedNoteType(type === 'All' ? 'all' : type)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 font-semibold'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Section */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/30 border border-slate-800/80 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/60 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Notes Found Matching Your Criteria</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Try adjusting your search terms, switching to another engineering semester, or resetting the filters.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-semibold text-xs transition-colors hover:bg-sky-400"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => {
            const bookmarked = isBookmarked(note.id);
            const isDownloadedRecently = downloadSuccessNoteId === note.id;

            return (
              <div
                key={note.id}
                className="group relative rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Clean unboxed metadata per Frontend Design Constitution */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-sky-400">{note.branch}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Sem {note.semester}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-300">{note.noteType}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(note.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        bookmarked
                          ? 'text-sky-400 bg-sky-950/60 border border-sky-800/40'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                      }`}
                      title={bookmarked ? 'Remove Bookmark' : 'Save for Later'}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-sky-400' : ''}`} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onPreviewNote(note)}
                    className="text-base font-bold text-white group-hover:text-sky-300 cursor-pointer transition-colors line-clamp-2"
                  >
                    {note.title}
                  </h3>

                  {/* Subject and Unit */}
                  <div className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1.5">
                    <span className="text-sky-400/90">{note.subject}</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-400 text-[11px] truncate">{note.unit}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                    {note.description}
                  </p>

                  {/* File specs: pages, format, size */}
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{note.pageCount} Pages</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.fileFormat}</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.fileSize}</span>
                    <span aria-hidden="true">·</span>
                    <span>{note.downloadsCount} downloads</span>
                  </div>
                </div>

                {/* Card Bottom: Author, Rating, Action buttons */}
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="text-slate-300 font-medium truncate max-w-[160px]">
                      {note.author.name}
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{note.rating}</span>
                      <span className="text-slate-500 text-[10px]">({note.ratingCount})</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onPreviewNote(note)}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      <span>Read Note</span>
                    </button>

                    <button
                      onClick={(e) => handleDownload(e, note)}
                      disabled={isDownloadedRecently}
                      className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isDownloadedRecently
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      {isDownloadedRecently ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
