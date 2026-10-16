import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Upload, 
  Bookmark, 
  Layers, 
  User as UserIcon, 
  LogIn, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { SectionType } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';

interface NavbarProps {
  currentSection: SectionType;
  onNavigate: (section: SectionType, resetFilters?: boolean) => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onOpenAuthModal,
}) => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { notes } = useNotes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const bookmarkCount = currentUser?.bookmarks?.length || 0;

  // Filter top 4 quick matching notes for search dropdown
  const matchingNotes = quickSearchQuery.trim().length > 1
    ? notes.filter(n => 
        n.title.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
        n.subject.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
        n.branch.toLowerCase().includes(quickSearchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const navItems: Array<{ id: SectionType; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'browse', label: 'Browse Notes', icon: <Search className="w-4 h-4" /> },
    { id: 'branches', label: 'Branches & Syllabus', icon: <Layers className="w-4 h-4" /> },
    { id: 'upload', label: 'Upload Notes', icon: <Upload className="w-4 h-4" /> },
    { id: 'account', label: 'My Account', icon: <UserIcon className="w-4 h-4" /> },
  ];

  const handleNavClick = (section: SectionType) => {
    onNavigate(section, true);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors">
                OmniNotes
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800/60">
                Hub
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Engineering Notes & Exam Vault
            </p>
          </div>
        </button>

        {/* Quick Search Bar with Instant Results */}
        <div className="relative flex-1 max-w-xs md:max-w-sm hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes, subjects (e.g. OS, DSA)..."
              value={quickSearchQuery}
              onChange={(e) => setQuickSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && quickSearchQuery.trim()) {
                  handleNavClick('browse');
                }
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
          </div>

          {/* Quick Suggestions Dropdown */}
          {searchFocused && matchingNotes.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[10px] uppercase font-semibold text-slate-400 px-2 py-1 tracking-wider">
                Matching Engineering Notes
              </div>
              <div className="space-y-1">
                {matchingNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => {
                      onNavigate('browse', false);
                      setQuickSearchQuery('');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-200 group-hover:text-sky-400 line-clamp-1">
                        {note.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="text-sky-400">{note.branch} · Sem {note.semester}</span>
                        <span>·</span>
                        <span>{note.subject}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.id === 'account' && bookmarkCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-sky-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                    {bookmarkCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action / Auth Button */}
        <div className="flex items-center gap-2.5">
          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('account')}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-sky-500"
                title="View Account & Bookmarks"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-sky-500/40"
                />
                <div className="hidden xl:block text-left text-xs">
                  <div className="font-semibold text-slate-200 line-clamp-1">{currentUser.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-sky-400 font-mono">{currentUser.reputationPoints} Karma</div>
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20 hover:opacity-95 active:scale-95 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes, subjects..."
                value={quickSearchQuery}
                onChange={(e) => setQuickSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNavClick('browse');
                  }
                }}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'account' && bookmarkCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
                      {bookmarkCount} Saved
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400">{currentUser.college}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-rose-400 hover:text-rose-300 font-medium px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold rounded-lg bg-sky-500 text-slate-950 font-medium"
              >
                Sign In with Google / Email
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
