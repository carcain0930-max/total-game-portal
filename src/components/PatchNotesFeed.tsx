import React, { useState } from 'react';
import { Newspaper, Search, Calendar, Clock, ArrowRight, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { GameId, PatchNoteItem, NewsCategory } from '../types/game';
import { PATCH_NOTES, GAMES } from '../data/gamesData';

interface PatchNotesFeedProps {
  selectedGame: GameId | 'all';
  onSelectPatch: (patch: PatchNoteItem) => void;
}

export const PatchNotesFeed: React.FC<PatchNotesFeedProps> = ({
  selectedGame,
  onSelectPatch,
}) => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatches = PATCH_NOTES.filter((item) => {
    // Game filter
    if (selectedGame !== 'all' && item.gameId !== selectedGame) {
      return false;
    }
    // Category filter
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchVersion = item.version.toLowerCase().includes(q);
      const matchHighlights = item.highlights.some((h) => h.toLowerCase().includes(q));
      const matchChanges = item.balanceChanges?.some(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.details?.some((d) => d.toLowerCase().includes(q))
      );
      return matchTitle || matchSummary || matchVersion || matchHighlights || matchChanges;
    }
    return true;
  });

  const getGameBadge = (gameId: GameId) => {
    const game = GAMES.find((g) => g.id === gameId);
    return game || { name: gameId, shortName: gameId };
  };

  const getCategoryLabel = (cat: NewsCategory) => {
    switch (cat) {
      case 'patch':
        return '정기 패치노트';
      case 'balance':
        return '밸런스 핫픽스';
      case 'esports':
        return 'e스포츠 소식';
      case 'notice':
        return '공식 공지사항';
    }
  };

  return (
    <section id="patch-notes-feed" className="py-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" />
            <span>INTEGRATED PATCH NOTES & NEWS</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            통합 최신 뉴스 및 패치 노트
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            4대 게임의 챔피언/영웅/요원 밸런스 조정, 맵 및 시스템 개편, 글로벌 e스포츠 대회 속보를 실시간으로 확인하세요
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="챔피언, 영웅, 무기, 밸런스 검색..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900/90 text-slate-200 border border-slate-700/80 rounded-lg placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs px-1 cursor-pointer"
            >
              지우기
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/60 border border-slate-800 rounded-lg mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          전체 보기 ({PATCH_NOTES.filter((p) => selectedGame === 'all' || p.gameId === selectedGame).length})
        </button>
        <button
          onClick={() => setActiveCategory('patch')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeCategory === 'patch'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          정기 패치노트
        </button>
        <button
          onClick={() => setActiveCategory('esports')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeCategory === 'esports'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          e스포츠 대회 속보
        </button>
      </div>

      {/* Feed List */}
      {filteredPatches.length === 0 ? (
        <div className="text-center py-14 px-4 bg-slate-900/30 rounded-xl border border-slate-800/80">
          <p className="text-base font-medium text-slate-300">검색어와 일치하는 패치노트 또는 뉴스가 없습니다.</p>
          <p className="text-xs text-slate-500 mt-1">다른 검색어를 입력하시거나 필터를 전체로 설정해 보세요.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-3 px-3 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPatches.map((patch) => {
            const game = getGameBadge(patch.gameId);

            return (
              <article
                key={patch.id}
                className="group relative rounded-xl border border-slate-800/80 bg-slate-900/70 hover:bg-slate-900/90 hover:border-slate-700/80 p-5 transition-all flex flex-col md:flex-row md:items-start justify-between gap-5"
              >
                {/* Main Content */}
                <div className="space-y-2.5 flex-1">
                  {/* Clean unboxed metadata separator */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-indigo-400">{game.name}</span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono text-slate-300 font-medium">버전 {patch.version}</span>
                    <span className="text-slate-600">·</span>
                    <span>{getCategoryLabel(patch.category)}</span>
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {patch.date}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3" />
                      {patch.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectPatch(patch)}
                    className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer hover:underline"
                  >
                    {patch.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                    {patch.summary}
                  </p>

                  {/* Key Highlights preview */}
                  <div className="pt-1.5 flex flex-wrap gap-2">
                    {patch.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="text-xs text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        <span className="truncate max-w-[280px] sm:max-w-md">{h}</span>
                      </span>
                    ))}
                    {patch.highlights.length > 3 && (
                      <span className="text-xs text-slate-500 py-0.5">
                        외 +{patch.highlights.length - 3}건
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Side Action Buttons */}
                <div className="flex md:flex-col items-center md:items-end gap-2.5 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => onSelectPatch(patch)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>상세 요약 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={patch.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>공식 원문</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
