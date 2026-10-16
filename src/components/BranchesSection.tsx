import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Radio, 
  Cog, 
  Zap, 
  Building2, 
  Terminal, 
  FlaskConical, 
  BookOpen, 
  ArrowRight, 
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { SectionType, Branch } from '../types';
import { INITIAL_BRANCHES } from '../data/mockNotes';

interface BranchesSectionProps {
  onSelectBranchAndSem: (branchCode: string, sem?: number) => void;
  onSelectSubject: (subject: string) => void;
  onNavigate: (section: SectionType) => void;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  onSelectBranchAndSem,
  onSelectSubject,
  onNavigate,
}) => {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('cse');
  const [selectedSemesters, setSelectedSemesters] = useState<Record<string, number>>({
    cse: 4,
    aids: 4,
    ece: 4,
    me: 3,
    ee: 4,
    ce: 4,
    it: 3,
    che: 3,
  });

  const activeBranch = INITIAL_BRANCHES.find((b) => b.id === selectedBranchId) || INITIAL_BRANCHES[0];
  const activeSemester = selectedSemesters[activeBranch.id] || 4;

  const handleSemesterChange = (branchId: string, sem: number) => {
    setSelectedSemesters((prev) => ({
      ...prev,
      [branchId]: sem,
    }));
  };

  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Cog': return <Cog className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const activeSubjects = activeBranch.subjectsBySemester[activeSemester] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-semibold tracking-wider uppercase text-sky-400">
          Academic Curriculum & Structure
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Engineering Branches & Semester Syllabus
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Navigate core curriculum paths from Semester 1 through 8. Jump directly into subject lecture notes, previous year exam papers, and question banks.
        </p>
      </div>

      {/* Branch Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
        {INITIAL_BRANCHES.map((branch) => {
          const isActive = branch.id === selectedBranchId;
          return (
            <button
              key={branch.id}
              onClick={() => setSelectedBranchId(branch.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-500/15 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <span className={isActive ? 'text-sky-400' : 'text-slate-400'}>
                {getBranchIcon(branch.iconName)}
              </span>
              <span>{branch.shortCode}</span>
            </button>
          );
        })}
      </div>

      {/* Active Branch Showcase Hero */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                {getBranchIcon(activeBranch.iconName)}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {activeBranch.name} ({activeBranch.shortCode})
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  {activeBranch.totalNotes} Active Study Documents & Solutions
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed pt-1">
              {activeBranch.description}
            </p>
          </div>

          <button
            onClick={() => onSelectBranchAndSem(activeBranch.shortCode, activeSemester)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-md shrink-0"
          >
            <span>Browse All {activeBranch.shortCode} Notes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Semester Tabs */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>Select Semester</span>
            </h3>
            <span className="text-xs text-slate-400">
              Active: Semester {activeSemester}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const isSelected = activeSemester === sem;
              return (
                <button
                  key={sem}
                  onClick={() => handleSemesterChange(activeBranch.id, sem)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 shadow-sm'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  Sem {sem}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subjects for Active Semester */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-white">
                Semester {activeSemester} Core Subjects & Modules
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any subject below to instantly view notes, syllabus outlines, and PYQ solutions.
              </p>
            </div>

            <button
              onClick={() => onSelectBranchAndSem(activeBranch.shortCode, activeSemester)}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
            >
              <span>View Semester {activeSemester} Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeSubjects.map((subject, idx) => (
              <div
                key={subject}
                onClick={() => onSelectSubject(subject)}
                className="group cursor-pointer p-4 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/40 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-sky-400 group-hover:scale-105 transition-transform">
                    0{idx + 1}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                      {subject}
                    </h5>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>{activeBranch.shortCode}</span>
                      <span>·</span>
                      <span>Semester {activeSemester}</span>
                    </div>
                  </div>
                </div>

                <div className="text-sky-400 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discipline Quick Comparison Cards */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-white">
          All 8 Engineering Streams Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_BRANCHES.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-sky-400">
                    {getBranchIcon(b.iconName)}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {b.shortCode}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{b.name}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-500">{b.totalNotes} Notes</span>
                <button
                  onClick={() => {
                    setSelectedBranchId(b.id);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className="text-sky-400 hover:text-sky-300 font-semibold"
                >
                  Inspect Syllabus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
