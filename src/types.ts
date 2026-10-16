export type SectionType = 'home' | 'browse' | 'branches' | 'upload' | 'account';

export type NoteType = 
  | 'Handwritten'
  | 'Typed Notes'
  | 'PYQ & Solutions'
  | 'Formula Sheet'
  | 'Lab Manual'
  | 'Presentation';

export interface NotePage {
  pageNumber: number;
  title: string;
  unit: string;
  content: string[];
  keyFormulasOrCode?: string[];
  examTips?: string[];
}

export interface Note {
  id: string;
  title: string;
  description: string;
  subject: string;
  branch: string;       // Short code e.g. "CSE"
  branchId: string;     // Normalized id e.g. "cse"
  semester: number;     // 1 to 8
  unit: string;         // e.g. "Unit 1: Graph Theory & Spanning Trees"
  noteType: NoteType;
  author: {
    id: string;
    name: string;
    college: string;
    avatarUrl?: string;
    verified?: boolean;
    badge?: string;
  };
  uploadDate: string;
  fileFormat: 'PDF' | 'DOCX' | 'ZIP';
  fileSize: string;
  pageCount: number;
  downloadsCount: number;
  viewsCount: number;
  rating: number;       // e.g. 4.9
  ratingCount: number;
  tags: string[];
  tableOfContents: string[];
  samplePages: NotePage[];
  syllabusCoverage: string; // e.g. "100% University Syllabus (All 5 Units)"
  examWeightageEstimate?: string;
}

export interface Branch {
  id: string;
  name: string;
  shortCode: string;
  iconName: string;
  description: string;
  totalNotes: number;
  semesters: number[];
  subjectsBySemester: Record<number, string[]>;
  colorScheme: {
    accent: string;
    bgGlow: string;
    border: string;
    text: string;
  };
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  college: string;
  branch: string;
  semester: number;
  reputationPoints: number;
  bookmarks: string[]; // Note IDs
  uploadedNotesCount: number;
  downloadHistory: Array<{
    noteId: string;
    downloadedAt: string;
    noteTitle: string;
    subject: string;
  }>;
  badges: UserBadge[];
}

export interface Review {
  id: string;
  noteId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userCollege: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
}

export interface BrowseFilters {
  subject?: string;
  branch?: string;
  semester?: number;
  noteType?: NoteType | 'All';
  searchQuery?: string;
  sortBy?: 'popular' | 'rating' | 'newest' | 'downloads';
}
