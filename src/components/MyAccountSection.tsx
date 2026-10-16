import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Bookmark, 
  Upload, 
  History, 
  Award, 
  Star, 
  Download, 
  Eye, 
  Trash2, 
  Edit3, 
  Check, 
  ExternalLink,
  BookOpen,
  LogOut,
  Layers,
  Sparkles
} from 'lucide-react';
import { Note, SectionType, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import { INITIAL_BRANCHES } from '../data/mockNotes';
import { generateAndDownloadNotePDF } from '../utils/pdfGenerator';

interface MyAccountSectionProps {
  onNavigate: (section: SectionType) => void;
  onPreviewNote: (note: Note) => void;
  onOpenAuthModal: () => void;
}

export const MyAccountSection: React.FC<MyAccountSectionProps> = ({
  onNavigate,
  onPreviewNote,
  onOpenAuthModal,
}) => {
  const { currentUser, isAuthenticated, logout, toggleBookmark, updateUserProfile } = useAuth();
  const { notes, deleteNote } = useNotes();

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'uploads' | 'history' | 'badges'>('bookmarks');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editCollege, setEditCollege] = useState(currentUser?.college || '');
  const [editBranch, setEditBranch] = useState(currentUser?.branch || 'Computer Science & Engineering');
  const [editSemester, setEditSemester] = useState(currentUser?.semester || 4);

  // If not logged in, prompt user
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/10">
          <UserIcon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Sign In to Access Your Academic Workspace
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Sync your bookmarked engineering notes, manage your uploaded study guides, and track your academic karma points.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={onOpenAuthModal}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-sky-500/20 active:scale-95"
          >
            Sign In with Google or Email
          </button>
        </div>
      </div>
    );
  }

  // Filter bookmarked notes
  const bookmarkedNotes = notes.filter((n) => currentUser.bookmarks.includes(n.id));

  // Filter notes uploaded by current user
  const userUploadedNotes = notes.filter(
    (n) => n.author.id === currentUser.id || n.author.name.toLowerCase() === currentUser.name.toLowerCase()
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName.trim(),
      college: editCollege.trim(),
      branch: editBranch,
      semester: Number(editSemester),
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-sky-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-sky-500/40 shadow-xl"
          />

          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/40">
                Sem {currentUser.semester}
              </span>
            </div>

            <div className="text-xs text-slate-300">
              {currentUser.branch} · {currentUser.college}
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-3 pt-1">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {currentUser.reputationPoints} Karma Points
              </span>
              <span>·</span>
              <span>{userUploadedNotes.length} Notes Uploaded</span>
              <span>·</span>
              <span>{currentUser.bookmarks.length} Bookmarks</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-sky-400" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 border border-slate-800 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile Edit Drawer / Form */}
      {isEditingProfile && (
        <form
          onSubmit={handleSaveProfile}
          className="p-5 rounded-2xl bg-slate-900 border border-sky-500/30 space-y-4 animate-in slide-in-from-top-2 duration-150"
        >
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Edit Academic Profile
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">College / University</label>
              <input
                type="text"
                value={editCollege}
                onChange={(e) => setEditCollege(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Branch</label>
              <input
                type="text"
                value={editBranch}
                onChange={(e) => setEditBranch(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Current Semester</label>
              <select
                value={editSemester}
                onChange={(e) => setEditSemester(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-sky-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Tabs Navigation */}
      <div className="border-b border-slate-800 flex items-center gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'bookmarks'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Notes ({bookmarkedNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('uploads')}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'uploads'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>My Contributions ({userUploadedNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'history'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Download History ({currentUser.downloadHistory?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`pb-3 transition-colors flex items-center gap-2 border-b-2 ${
            activeTab === 'badges'
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Badges & Reputation ({currentUser.badges?.length || 0})</span>
        </button>
      </div>

      {/* Tab 1: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedNotes.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-white">No Saved Notes Yet</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Bookmark notes in the Browse section or while reading to quickly access them before your exam.
              </p>
              <button
                onClick={() => onNavigate('browse')}
                className="px-4 py-2 rounded-lg bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 border border-sky-500/30 text-xs font-semibold"
              >
                Browse Notes Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-sky-400">{note.branch} · Sem {note.semester}</span>
                      <button
                        onClick={() => toggleBookmark(note.id)}
                        className="text-rose-400 hover:text-rose-300 text-[11px] font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <h4
                      onClick={() => onPreviewNote(note)}
                      className="text-sm font-bold text-white hover:text-sky-300 cursor-pointer transition-colors line-clamp-2"
                    >
                      {note.title}
                    </h4>

                    <div className="text-xs text-slate-400 mt-1">
                      {note.subject}
                    </div>

                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {note.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">{note.pageCount} Pages · {note.fileSize}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => generateAndDownloadNotePDF(note)}
                        className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 font-semibold text-xs flex items-center gap-1"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => onPreviewNote(note)}
                        className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Read</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Uploads */}
      {activeTab === 'uploads' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-xs text-slate-400">
              Manage the lecture notes, cheat sheets, and PYQs you shared with the student community.
            </div>
            <button
              onClick={() => onNavigate('upload')}
              className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New Note</span>
            </button>
          </div>

          {userUploadedNotes.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <Upload className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-white">You haven't uploaded any notes yet</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Upload your handwritten lecture notes or formula sheet to help fellow engineers and earn Karma points!
              </p>
              <button
                onClick={() => onNavigate('upload')}
                className="px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-bold text-xs"
              >
                Upload First Note (+50 Karma)
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {userUploadedNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-semibold text-sky-400">{note.branch} · Sem {note.semester}</span>
                      <span>·</span>
                      <span>{note.noteType}</span>
                      <span>·</span>
                      <span>Uploaded {note.uploadDate}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{note.title}</h4>
                    <div className="text-xs text-slate-400 flex items-center gap-4">
                      <span>{note.downloadsCount} downloads</span>
                      <span>{note.viewsCount} views</span>
                      <span className="text-amber-400">★ {note.rating} ({note.ratingCount} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      onClick={() => onPreviewNote(note)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {currentUser.downloadHistory?.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <History className="w-8 h-8 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-white">No Download History</div>
              <p className="text-xs text-slate-400">Notes you download for offline study will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden">
              {currentUser.downloadHistory.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{item.noteTitle}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Subject: {item.subject} · Downloaded on {new Date(item.downloadedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const matched = notes.find((n) => n.id === item.noteId);
                        if (matched) generateAndDownloadNotePDF(matched);
                      }}
                      className="px-2.5 py-1 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold flex items-center gap-1"
                      title="Download PDF again"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => {
                        const matched = notes.find((n) => n.id === item.noteId);
                        if (matched) onPreviewNote(matched);
                      }}
                      className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                    >
                      Re-read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Badges */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentUser.badges?.map((badge) => (
            <div
              key={badge.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white">{badge.name}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{badge.description}</p>
                <div className="text-[10px] text-slate-500 pt-1">
                  Unlocked on {badge.unlockedAt}
                </div>
              </div>
            </div>
          ))}

          {/* Locked Badge Teaser */}
          <div className="p-5 rounded-xl bg-slate-900/20 border border-slate-800/50 border-dashed flex items-start gap-4 opacity-60">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-300">Semester Legend</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reach 1,000+ Karma points and publish 5 notes downloaded 1,000+ times.
              </p>
              <div className="text-[10px] text-slate-600 font-mono">
                Progress: {currentUser.reputationPoints} / 1000
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
