import React from 'react';
import { Bookmark, Globe, Newspaper, Trophy, Activity, Info, Star } from 'lucide-react';
import { GameId } from '../types/game';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedGame: GameId | 'all';
  setSelectedGame: (game: GameId | 'all') => void;
  bookmarkCount: number;
  isBookmarksOpen: boolean;
  onOpenBookmarks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
  isBookmarksOpen,
  onOpenBookmarks,
}) => {
  const navItems = [
    { id: 'about', label: '페이지 소개', icon: Info },
    { id: 'links', label: '공식 & 커뮤니티', icon: Globe },
    { id: 'patches', label: '최신 패치노트', icon: Newspaper },
    { id: 'esports', label: 'e스포츠 일정', icon: Trophy },
    { id: 'server', label: '서버 상태', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0e14]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('about')}
              className="text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block shadow-sm shadow-indigo-500/50" />
              <span className="font-extrabold tracking-tight">GameNexus</span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest pl-1 border-l border-slate-700">KR</span>
            </button>
          </div>

          {/* Zone 2: Top View Switcher Buttons */}
          <nav className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Bookmarks Quick Pass Toggle) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenBookmarks}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer border ${
                isBookmarksOpen
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border-slate-700/70'
              }`}
              title={isBookmarksOpen ? '즐겨찾기 퀵패스 숨기기' : '즐겨찾기 퀵패스 표시'}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  isBookmarksOpen ? 'text-amber-400 fill-amber-400' : 'text-amber-400'
                }`}
              />
              <span className="hidden sm:inline">즐겨찾기</span>
              {bookmarkCount > 0 && (
                <span
                  className={`text-[11px] font-mono tabular-nums px-1.5 py-0.2 rounded font-semibold ${
                    isBookmarksOpen
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-amber-400/20 text-amber-300'
                  }`}
                >
                  {bookmarkCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex sm:hidden items-center justify-between pb-2.5 pt-1 gap-1 overflow-x-auto no-scrollbar border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

