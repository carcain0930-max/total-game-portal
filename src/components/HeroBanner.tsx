import React from 'react';
import { ExternalLink, Flame, Shield, Swords, Crosshair, ArrowRight, Sparkles } from 'lucide-react';
import { GameId, GameInfo } from '../types/game';
import { GAMES } from '../data/gamesData';

interface HeroBannerProps {
  selectedGame: GameId | 'all';
  onSelectGame: (game: GameId | 'all') => void;
  onExploreLinks: (gameId?: GameId) => void;
  onExplorePatches: (gameId?: GameId) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  selectedGame,
  onSelectGame,
  onExploreLinks,
  onExplorePatches,
}) => {
  const activeGame = selectedGame !== 'all' ? GAMES.find((g) => g.id === selectedGame) : null;

  const getGameIcon = (id: GameId) => {
    switch (id) {
      case 'lol':
        return <Swords className="w-5 h-5 text-amber-400" />;
      case 'pubg':
        return <Crosshair className="w-5 h-5 text-yellow-500" />;
      case 'ow2':
        return <Shield className="w-5 h-5 text-orange-400" />;
      case 'valorant':
        return <Flame className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#111622] to-[#0b0e14]">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/60 via-slate-900/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading and Value Prop */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>실시간 4대 인기 게임 통합 포털</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">공식 포털 · 커뮤니티 · 최신 패치</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
              대한민국 4대 대작 게임의{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                공식 사이트 & 커뮤니티
              </span>
              와 패치노트를 한 곳에서
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              리그 오브 레전드, 배틀그라운드, 오버워치 2, 발로란트. 흩어져 있던 공식 공지,
              전적 검색 툴(OP.GG, 닥지지, 트래커), 대표 커뮤니티(인벤, 디시, 카페)와 최신 밸런스 패치 정보를
              지연 없이 실시간으로 탐색하세요.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onExploreLinks(selectedGame !== 'all' ? selectedGame : undefined)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-sm shadow-indigo-600/30 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>전체 바로가기 디렉토리</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onExplorePatches(selectedGame !== 'all' ? selectedGame : undefined)}
                className="px-5 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/70 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>최신 패치노트 요약보기</span>
              </button>
            </div>

            {/* Live Status Row */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>KR 공식 서버 4개사 전상태 정상</span>
              </div>
              <span className="text-slate-700">|</span>
              <div>
                <span>최신 패치 반영: </span>
                <span className="text-slate-200 font-mono font-medium">2024.10 최신 업데이트</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Game Showcase Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {GAMES.map((game) => {
              const isSelected = selectedGame === game.id;
              return (
                <div
                  key={game.id}
                  onClick={() => onSelectGame(isSelected ? 'all' : game.id)}
                  className={`group relative rounded-xl border p-3.5 transition-all cursor-pointer overflow-hidden flex flex-col justify-between min-h-[160px] ${
                    isSelected
                      ? 'border-indigo-500 bg-slate-900/95 shadow-md shadow-indigo-500/20'
                      : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  {/* Subtle Card Background Image */}
                  <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity">
                    <img
                      src={game.bannerImage}
                      alt={game.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 rounded-md bg-slate-950/70 border border-slate-800/80">
                        {getGameIcon(game.id)}
                      </div>
                      <span className="text-[11px] font-mono tabular-nums text-slate-300 bg-slate-950/70 px-2 py-0.5 rounded border border-slate-800">
                        {game.currentPatch}
                      </span>
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                        {game.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{game.genre}</p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">{game.developer.split(' ')[0]}</span>
                    <span className="text-[11px] font-medium text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      {isSelected ? '선택 해제' : '포커스'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
