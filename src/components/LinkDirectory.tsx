import React, { useState } from 'react';
import { ExternalLink, Star, Copy, Check, Search, Globe, Trophy, BarChart2, MessageSquare, Compass } from 'lucide-react';
import { GameId, GameLink, LinkCategory } from '../types/game';
import { GAMES, GAME_LINKS } from '../data/gamesData';

interface LinkDirectoryProps {
  selectedGame: GameId | 'all';
  bookmarkedIds: string[];
  onToggleBookmark: (linkId: string) => void;
}

export const LinkDirectory: React.FC<LinkDirectoryProps> = ({
  selectedGame,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [activeCategory, setActiveCategory] = useState<LinkCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredLinks = GAME_LINKS.filter((link) => {
    // Game filter
    if (selectedGame !== 'all' && link.gameId !== selectedGame) {
      return false;
    }
    // Category filter
    if (activeCategory !== 'all' && link.category !== activeCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const game = GAMES.find((g) => g.id === link.gameId);
      const matchTitle = link.title.toLowerCase().includes(q);
      const matchDesc = link.description.toLowerCase().includes(q);
      const matchGame = game ? game.name.toLowerCase().includes(q) || game.shortName.toLowerCase().includes(q) : false;
      return matchTitle || matchDesc || matchGame;
    }
    return true;
  });

  const getCategoryInfo = (cat: LinkCategory) => {
    switch (cat) {
      case 'official':
        return { label: '공식 포털/지원', icon: <Globe className="w-3.5 h-3.5 text-sky-400" /> };
      case 'esports':
        return { label: '공식 e스포츠', icon: <Trophy className="w-3.5 h-3.5 text-amber-400" /> };
      case 'stats':
        return { label: '전적 & 메타 통계', icon: <BarChart2 className="w-3.5 h-3.5 text-emerald-400" /> };
      case 'community':
        return { label: '대표 커뮤니티', icon: <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> };
    }
  };

  const getGameBadge = (gameId: GameId) => {
    const game = GAMES.find((g) => g.id === gameId);
    return game || { name: gameId, shortName: gameId, accentColor: '#6366f1' };
  };

  return (
    <section id="links-directory" className="py-8">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>DIRECT LINK DIRECTORY</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            공식 사이트 및 대표 커뮤니티 바로가기
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            신뢰할 수 있는 개발사 공식 웹사이트, 프로 e스포츠 포털, 랭커 전적 검색 사이트 및 활발한 유저 커뮤니티 링크
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="사이트명, 전적 검색, 인벤, 갤러리..."
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

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/60 border border-slate-800 rounded-lg mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          전체 카테고리 ({GAME_LINKS.filter((l) => selectedGame === 'all' || l.gameId === selectedGame).length})
        </button>
        <button
          onClick={() => setActiveCategory('official')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeCategory === 'official'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>공식 포털/지원</span>
        </button>
        <button
          onClick={() => setActiveCategory('stats')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeCategory === 'stats'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>전적 & 메타 통계</span>
        </button>
        <button
          onClick={() => setActiveCategory('community')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeCategory === 'community'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
          <span>대표 커뮤니티</span>
        </button>
        <button
          onClick={() => setActiveCategory('esports')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeCategory === 'esports'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>공식 e스포츠</span>
        </button>
      </div>

      {/* Grid of Link Cards */}
      {filteredLinks.length === 0 ? (
        <div className="text-center py-14 px-4 bg-slate-900/30 rounded-xl border border-slate-800/80">
          <p className="text-base font-medium text-slate-300">검색 조건과 일치하는 사이트 링크가 없습니다.</p>
          <p className="text-xs text-slate-500 mt-1">검색어를 변경하거나 카테고리 필터를 초기화해 보세요.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-3 px-3 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            검색 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLinks.map((link) => {
            const isBookmarked = bookmarkedIds.includes(link.id);
            const game = getGameBadge(link.gameId);
            const cat = getCategoryInfo(link.category);

            return (
              <div
                key={link.id}
                className="group relative rounded-xl border border-slate-800/80 bg-slate-900/70 hover:bg-slate-900/90 hover:border-slate-700/90 p-4 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header Metadata (Zero-pill discipline: unboxed text with subtle separator) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2.5">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-indigo-400 font-semibold">{game.name}</span>
                      <span className="text-slate-600">·</span>
                      <span className="flex items-center gap-1 text-slate-300">
                        {cat.icon}
                        <span>{cat.label}</span>
                      </span>
                    </div>

                    {/* Bookmark Star Button */}
                    <button
                      onClick={() => onToggleBookmark(link.id)}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'text-amber-400 bg-amber-400/10'
                          : 'text-slate-500 hover:text-amber-400 hover:bg-slate-800'
                      }`}
                      title={isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                      aria-label={`${link.title} 즐겨찾기`}
                    >
                      <Star
                        className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Title & Badge */}
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors flex items-start justify-between gap-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1.5 focus:outline-none focus:text-indigo-300"
                    >
                      <span>{link.title}</span>
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {link.description}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-slate-800/70 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[170px]">
                    {link.url.replace(/^https?:\/\//, '')}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => handleCopy(link.id, link.url, e)}
                      className="p-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors cursor-pointer flex items-center gap-1"
                      title="주소 복사"
                    >
                      {copiedId === link.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px] text-emerald-400">복사됨</span>
                        </>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-800/40 rounded transition-colors flex items-center gap-1.5"
                    >
                      <span>바로가기</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
