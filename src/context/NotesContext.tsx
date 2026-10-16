import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note, Branch, Review } from '../types';
import { INITIAL_NOTES, INITIAL_BRANCHES, INITIAL_REVIEWS } from '../data/mockNotes';
import { useAuth } from './AuthContext';

interface NotesContextType {
  notes: Note[];
  branches: Branch[];
  addNote: (
    newNoteData: Omit<Note, 'id' | 'uploadDate' | 'downloadsCount' | 'viewsCount' | 'rating' | 'ratingCount'>
  ) => Note;
  addReview: (noteId: string, rating: number, comment: string) => void;
  getReviewsForNote: (noteId: string) => Review[];
  incrementDownload: (noteId: string) => void;
  incrementView: (noteId: string) => void;
  deleteNote: (noteId: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const NOTES_STORAGE_KEY = 'omninotes_uploaded_notes';
const REVIEWS_STORAGE_KEY = 'omninotes_all_reviews';

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, addReputationPoints } = useAuth();

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem(NOTES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_NOTES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to sync notes to local storage', e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to sync reviews to local storage', e);
    }
  }, [reviews]);

  const addNote = (
    newNoteData: Omit<Note, 'id' | 'uploadDate' | 'downloadsCount' | 'viewsCount' | 'rating' | 'ratingCount'>
  ): Note => {
    const id = `note-${Date.now()}`;
    const newNote: Note = {
      ...newNoteData,
      id,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadsCount: 1,
      viewsCount: 1,
      rating: 5.0,
      ratingCount: 1,
    };

    setNotes((prev) => [newNote, ...prev]);

    // Give 50 reputation karma points to author
    if (currentUser) {
      addReputationPoints(50);
    }

    return newNote;
  };

  const addReview = (noteId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      noteId,
      userId: currentUser?.id || 'guest-user',
      userName: currentUser?.name || 'Academic Scholar',
      userAvatar: currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      userCollege: currentUser?.college || 'Engineering Institute',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };

    setReviews((prev) => [newReview, ...prev]);

    // Recalculate rating on the note
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          const newCount = note.ratingCount + 1;
          const newAvg = Number(((note.rating * note.ratingCount + rating) / newCount).toFixed(1));
          return {
            ...note,
            rating: newAvg,
            ratingCount: newCount,
          };
        }
        return note;
      })
    );

    if (currentUser) {
      addReputationPoints(10);
    }
  };

  const getReviewsForNote = (noteId: string): Review[] => {
    return reviews.filter((r) => r.noteId === noteId);
  };

  const incrementDownload = (noteId: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          return { ...note, downloadsCount: note.downloadsCount + 1 };
        }
        return note;
      })
    );
  };

  const incrementView = (noteId: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === noteId) {
          return { ...note, viewsCount: note.viewsCount + 1 };
        }
        return note;
      })
    );
  };

  const deleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        branches: INITIAL_BRANCHES,
        addNote,
        addReview,
        getReviewsForNote,
        incrementDownload,
        incrementView,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
