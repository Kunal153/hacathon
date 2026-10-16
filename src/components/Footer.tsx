import React from 'react';
import { BookOpen, Heart, Shield, Github, Globe, Layers, ArrowUp } from 'lucide-react';
import { SectionType } from '../types';
import { INITIAL_BRANCHES } from '../data/mockNotes';

interface FooterProps {
  onNavigate: (section: SectionType) => void;
  onSelectSubject: (subject: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectSubject }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topSubjects = [
    'Operating Systems',
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Digital Signal Processing',
    'Mechanics of Solids (Strength of Materials)',
    'Control Systems Engineering',
  ];

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">OmniNotes</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The open, peer-to-peer academic repository for engineering undergraduates. Access hand-drawn formula sheets, 5-year solved university PYQs, and verified lecture summaries.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-500 text-xs">
              <span>Open Academic Resource</span>
              <span>·</span>
              <span>For Engineering Students</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Platform
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('browse')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Browse Notes & PYQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('branches')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Branches & Syllabus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('upload')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Upload Your Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('account')}
                  className="hover:text-sky-400 transition-colors"
                >
                  Saved Notes & Karma
                </button>
              </li>
            </ul>
          </div>

          {/* Disciplines */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Engineering Disciplines
            </div>
            <ul className="space-y-2">
              {INITIAL_BRANCHES.slice(0, 5).map((b) => (
                <li key={b.id}>
                  <button
                    onClick={() => onNavigate('branches')}
                    className="hover:text-sky-400 transition-colors truncate max-w-full text-left"
                  >
                    {b.shortCode} — {b.name.split(' ')[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Subjects */}
          <div>
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] mb-3">
              Core Subjects
            </div>
            <ul className="space-y-2">
              {topSubjects.map((sub) => (
                <li key={sub}>
                  <button
                    onClick={() => onSelectSubject(sub)}
                    className="hover:text-sky-400 transition-colors truncate max-w-full text-left"
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} OmniNotes Academic Vault. Built for university & college engineering excellence.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-sky-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
