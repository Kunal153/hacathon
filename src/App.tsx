import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider, useNotes } from './context/NotesContext';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { BrowseNotesSection } from './components/BrowseNotesSection';
import { BranchesSection } from './components/BranchesSection';
import { UploadNotesSection } from './components/UploadNotesSection';
import { MyAccountSection } from './components/MyAccountSection';
import { NotePreviewModal } from './components/NotePreviewModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Note, SectionType, BrowseFilters } from './types';

const VALID_SECTIONS: SectionType[] = ['home', 'browse', 'branches', 'upload', 'account'];

function AppContent() {
  const { notes } = useNotes();
  const [currentSection, setCurrentSection] = useState<SectionType>('home');
  const [browseFilters, setBrowseFilters] = useState<BrowseFilters>({});
  const [previewNote, setPreviewNote] = useState<Note | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Sync section with URL hash on initial load & popstate (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as SectionType;
      if (VALID_SECTIONS.includes(hash)) {
        setCurrentSection(hash);
      }
    };

    handleHashChange(); // Run on mount
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  // Standard tab navigation (clears filters when intentionally clicking navbar tabs)
  const handleNavigate = useCallback((section: SectionType, resetFilters = true) => {
    if (resetFilters && section === 'browse') {
      setBrowseFilters({});
    }
    setCurrentSection(section);
    window.location.hash = section;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filter handlers
  const handleSelectSubject = useCallback((subject: string) => {
    setBrowseFilters({ subject });
    setCurrentSection('browse');
    window.location.hash = 'browse';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectBranchAndSem = useCallback((branchCode: string, sem?: number) => {
    setBrowseFilters({ branch: branchCode, semester: sem });
    setCurrentSection('browse');
    window.location.hash = 'browse';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Top sticky Navbar */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area based on 5 Sections */}
      <main className="flex-1">
        {currentSection === 'home' && (
          <HomeSection
            notes={notes}
            onNavigate={handleNavigate}
            onSelectSubject={handleSelectSubject}
            onPreviewNote={(note) => setPreviewNote(note)}
          />
        )}

        {currentSection === 'browse' && (
          <BrowseNotesSection
            notes={notes}
            initialFilters={browseFilters}
            onPreviewNote={(note) => setPreviewNote(note)}
            onNavigate={handleNavigate}
          />
        )}

        {currentSection === 'branches' && (
          <BranchesSection
            onSelectBranchAndSem={handleSelectBranchAndSem}
            onSelectSubject={handleSelectSubject}
            onNavigate={handleNavigate}
          />
        )}

        {currentSection === 'upload' && (
          <UploadNotesSection
            onNavigate={handleNavigate}
            onPreviewNote={(note) => setPreviewNote(note)}
            onOpenAuthModal={() => setAuthModalOpen(true)}
          />
        )}

        {currentSection === 'account' && (
          <MyAccountSection
            onNavigate={handleNavigate}
            onPreviewNote={(note) => setPreviewNote(note)}
            onOpenAuthModal={() => setAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectSubject={handleSelectSubject}
      />

      {/* Interactive Note Preview Reader Modal */}
      <NotePreviewModal
        note={previewNote}
        onClose={() => setPreviewNote(null)}
      />

      {/* Firebase / Google Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <AppContent />
      </NotesProvider>
    </AuthProvider>
  );
}
