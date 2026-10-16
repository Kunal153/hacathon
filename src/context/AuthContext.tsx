import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { INITIAL_USER } from '../data/mockNotes';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  toggleBookmark: (noteId: string) => void;
  isBookmarked: (noteId: string) => boolean;
  recordDownload: (noteId: string, noteTitle: string, subject: string) => void;
  addReputationPoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'omninotes_user_profile';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_USER;
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync user storage', e);
    }
  }, [currentUser]);

  const loginWithGoogle = async () => {
    // Immediate simulated Google authentication
    await new Promise((resolve) => setTimeout(resolve, 600));
    const googleUser: User = {
      ...INITIAL_USER,
      id: 'google-user-' + Date.now(),
      name: 'Kunal Chaudhari',
      email: 'kunalchaudhari2008@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop',
    };
    setCurrentUser(googleUser);
  };

  const loginWithEmail = async (email: string, name?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const cleanName = name?.trim() || email.split('@')[0] || 'Student Scholar';
    const emailUser: User = {
      ...INITIAL_USER,
      id: 'email-user-' + Date.now(),
      name: cleanName,
      email: email,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`,
    };
    setCurrentUser(emailUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const toggleBookmark = (noteId: string) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const exists = prev.bookmarks.includes(noteId);
      const updatedBookmarks = exists
        ? prev.bookmarks.filter((id) => id !== noteId)
        : [...prev.bookmarks, noteId];
      return {
        ...prev,
        bookmarks: updatedBookmarks,
      };
    });
  };

  const isBookmarked = (noteId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.bookmarks.includes(noteId);
  };

  const recordDownload = (noteId: string, noteTitle: string, subject: string) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const filtered = prev.downloadHistory.filter((item) => item.noteId !== noteId);
      const newHistory = [
        {
          noteId,
          downloadedAt: new Date().toISOString(),
          noteTitle,
          subject,
        },
        ...filtered,
      ];
      return {
        ...prev,
        reputationPoints: prev.reputationPoints + 5,
        downloadHistory: newHistory.slice(0, 50),
      };
    });
  };

  const addReputationPoints = (points: number) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        reputationPoints: prev.reputationPoints + points,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loginWithGoogle,
        loginWithEmail,
        logout,
        updateUserProfile,
        toggleBookmark,
        isBookmarked,
        recordDownload,
        addReputationPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
