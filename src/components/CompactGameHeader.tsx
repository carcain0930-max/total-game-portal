import React from 'react';
import { GameId } from '../types/game';
import { GAMES } from '../data/gamesData';
import { Globe, Newspaper, Trophy, Activity, Swords, Crosshair, Shield, Flame, Sparkles } from 'lucide-react';

interface CompactGameHeaderProps {
  selectedGame: GameId | 'all';
  activeTab: string;
}

export const CompactGameHeader: React.FC<CompactGameHeaderProps> = ({
  selectedGame,
  activeTab,
}) => {
  const activeGame = selectedGame !== 'all' ? GAMES.find((g) => g.id === selectedGame) : null;

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'about':
        return { title: 'GameNexus KR 서비스 소개', desc: '4대 대작 게임 통합 포털 안내 및 주요 기능 활용법' };
      case 'links':
        return { title: '공식 사이트 & 커뮤니티 바로가기', desc: '검증된 개발사 공식 포털, 전적 검색 및 국내외 커뮤니티' };
      case 'patches':
        return { title: '최신 패치노트 & 밸런스 업데이트', desc: '실시간 패치 변경 사항, 챔피언/영웅 밸런스 및 개발자 노트' };
      case 'esports':
        return { title: '글로벌 e스포츠 대회 일정', desc: '공식 리그 경기 일정, 대진표 및 실시간 생중계 링크' };
      case 'server':
        return { title: '한국 공식 서버 운용 현황', desc: '실시간 매치메이킹 응답 지연(Ping) 및 서버 가용성 모니터링' };
      default:
        return { title: '통합 포털', desc: '게임 정보 및 바로가기' };
    }
  };

  const { title, desc } = getTabLabel(activeTab);

  if (activeGame) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 my-6 bg-slate-950">
        {/* Background Artwork */}
        <div className="absolute inset-0 opacity-30">
          <img
            src={activeGame.bannerImage}
            alt={activeGame.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e14] via-[#0b0e14]/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{activeGame.developer}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-mono">{activeGame.genre}</span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-amber-300">{activeGame.currentPatch}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>{activeGame.name}</span>
              <span className="text-sm font-normal text-slate-400 font-mono">({activeGame.nameEn})</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {activeGame.tagline}
            </p>
          </div>

          <div className="shrink-0 bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3.5 space-y-1 text-right">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              현재 확인 중인 메뉴
            </div>
            <div className="text-sm font-bold text-indigo-300">{title}</div>
            <div className="text-[11px] text-slate-400">{desc}</div>
          </div>
        </div>
      </div>
    );
  }

  // All Games Header
  return (
    <div className="rounded-2xl border border-slate-800/80 my-6 bg-gradient-to-r from-slate-900/80 via-indigo-950/20 to-slate-900/80 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>전체 4대 대작 게임 (LoL · PUBG · OW2 · VALORANT)</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {desc}
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
        <span>실시간 연동 데이터</span>
      </div>
    </div>
  );
};
