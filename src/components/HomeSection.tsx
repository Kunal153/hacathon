import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  Download, 
  Eye, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Layers, 
  Bookmark,
  Share2
} from 'lucide-react';
import { Note, SectionType } from '../types';
import { INITIAL_BRANCHES } from '../data/mockNotes';
import { useAuth } from '../context/AuthContext';

interface HomeSectionProps {
  notes: Note[];
  onNavigate: (section: SectionType) => void;
  onSelectSubject: (subject: string) => void;
  onPreviewNote: (note: Note) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  notes,
  onNavigate,
  onSelectSubject,
  onPreviewNote,
}) => {
  const { toggleBookmark, isBookmarked } = useAuth();
  const [heroSearch, setHeroSearch] = useState('');

  const trendingNotes = [...notes].sort((a, b) => b.downloadsCount - a.downloadsCount).slice(0, 4);

  const featuredSubjects = [
    'Operating Systems',
    'Data Structures & Algorithms',
    'Foundations of Machine Learning',
    'Digital Signal Processing',
    'Mechanics of Solids (Strength of Materials)',
    'Database Management Systems',
    'Control Systems Engineering',
    'Design of Concrete Structures (RCC)'
  ];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onSelectSubject(heroSearch.trim());
    } else {
      onNavigate('browse');
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950">
        {/* Ambient subtle glow background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Quiet text kicker instead of pill badge */}
          <div className="text-xs font-semibold tracking-wider uppercase text-sky-400">
            Open Academic Repository for Engineering Students
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Every Equation, Algorithm & Derivation.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-sky-200">
              One Open Vault.
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Free high-yield classroom notes, 5-year solved university PYQs, and formula cheat sheets prepared by university rankers and faculty.
          </p>

          {/* Search Form */}
          <form 
            onSubmit={handleHeroSearchSubmit}
            className="max-w-2xl mx-auto pt-2"
          >
            <div className="relative flex items-center shadow-2xl rounded-xl bg-slate-900/90 border border-slate-700/80 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all p-1.5">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search subject, branch, or topic (e.g. Operating Systems, AVL Trees, SFD/BMD)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs tracking-wide transition-colors shrink-0 shadow-sm"
              >
                Search Vault
              </button>
            </div>
          </form>

          {/* Quick Subject Discovery Links */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500">Popular right now:</span>
            {featuredSubjects.slice(0, 4).map((sub) => (
              <button
                key={sub}
                onClick={() => onSelectSubject(sub)}
                className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-800 transition-colors"
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Live Academic Metric Strip */}
        <div className="max-w-5xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-center p-2">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">15,000+</div>
            <div className="text-xs text-slate-400 mt-1">Verified Semester Notes</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold text-sky-400 tracking-tight">8 Branches</div>
            <div className="text-xs text-slate-400 mt-1">Semesters 1 through 8</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">4.9 / 5.0</div>
            <div className="text-xs text-slate-400 mt-1">Student Satisfaction Score</div>
          </div>
          <div className="text-center p-2 border-l border-slate-800">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-400 tracking-tight">100% Free</div>
            <div className="text-xs text-slate-400 mt-1">Open Peer-to-Peer Access</div>
          </div>
        </div>
      </section>

      {/* Engineering Branches Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-sky-400">
              Discipline Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Select Your Engineering Discipline
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tailored curriculum roadmaps and notes aligned with major university guidelines.
            </p>
          </div>
          <button
            onClick={() => onNavigate('branches')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors group"
          >
            <span>View All 8 Branches & Semesters</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_BRANCHES.slice(0, 4).map((branch) => (
            <div
              key={branch.id}
              onClick={() => onNavigate('branches')}
              className="cursor-pointer group p-5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold text-sky-400 px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/40">
                    {branch.shortCode}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {branch.totalNotes} Notes
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {branch.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {branch.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-300">
                <span>Semesters 1 - 8</span>
                <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending & High-Yield Notes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-sky-400">
              Exam Hall Essentials
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Highest-Rated Student Notes
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Checked for formula accuracy, clean handwriting, and comprehensive syllabus coverage.
            </p>
          </div>
          <button
            onClick={() => onNavigate('browse')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors group"
          >
            <span>Browse Complete Vault</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {trendingNotes.map((note) => {
            const bookmarked = isBookmarked(note.id);
            return (
              <div
                key={note.id}
                className="group relative rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Clean unboxed metadata per Frontend Design Constitution */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sky-400">{note.branch}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Semester {note.semester}</span>
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

                  <h3 
                    onClick={() => onPreviewNote(note)}
                    className="text-lg font-bold text-white group-hover:text-sky-300 cursor-pointer transition-colors line-clamp-1"
                  >
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {note.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author and Action Footer */}
                <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300">
                      {note.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-slate-200 font-medium line-clamp-1">{note.author.name}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{note.author.college}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{note.rating}</span>
                      <span className="text-slate-500 text-[10px]">({note.ratingCount})</span>
                    </div>

                    <button
                      onClick={() => onPreviewNote(note)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Subject Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800">
          <div className="max-w-2xl mb-6">
            <h3 className="text-xl font-bold text-white">
              Targeted Semester Subjects
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Directly jump into lecture notes, unit-wise question banks, and laboratory guides.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {featuredSubjects.map((subject) => (
              <button
                key={subject}
                onClick={() => onSelectSubject(subject)}
                className="px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-sky-500/10 hover:text-sky-300 hover:border-sky-500/40 border border-slate-700/80 text-xs font-medium text-slate-200 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>{subject}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Quality Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white">Handwriting & Formula Verified</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every upload is reviewed for illegible scans, missing steps in derivations, and completeness across syllabus units.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white">PYQ Exam Paper Solutions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Past 5 years of university examinations solved step-by-step with proper marking scheme breakdowns and diagrams.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-white">High Academic Reputation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Top student uploaders earn academic karma, verified contributor badges, and peer praise across engineering institutes.
            </p>
          </div>
        </div>
      </section>

      {/* Contributor CTA banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/30 via-slate-900 to-sky-950/40 border border-sky-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Have semester notes or cheat sheets?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Share your handwritten summaries, formula sheets, or lab manuals. Help thousands of juniors prepare for semester finals and build your academic profile.
            </p>
          </div>
          <button
            onClick={() => onNavigate('upload')}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-sky-500/25 shrink-0 active:scale-95 flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Upload Your Notes</span>
          </button>
        </div>
      </section>
    </div>
  );
};
