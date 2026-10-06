import React from 'react';
import { Info, Sparkles, Globe, Newspaper, Trophy, Activity, Star, ArrowRight, ShieldCheck, Zap, Swords, ExternalLink } from 'lucide-react';
import { GAMES } from '../data/gamesData';
import { GameId } from '../types/game';

interface PageIntroProps {
  onNavigateTab: (tab: string) => void;
  onSelectGame: (gameId: GameId) => void;
}

export const PageIntro: React.FC<PageIntroProps> = ({ onNavigateTab, onSelectGame }) => {
  return (
    <div className="py-6 space-y-10">
      {/* Hero Welcome Section */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-[#0e131d] to-slate-950 p-6 sm:p-10 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GAMENEXUS KR 소개</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">게이머 올인원 포털 서비스</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            흩어져 있던 4대 대작 게임의 모든 것을{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              단 하나의 허브
            </span>
            에서
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            <strong>GameNexus KR</strong>은 대한민국에서 가장 사랑받는 4대 인기 게임인
            <strong> 리그 오브 레전드</strong>, <strong>배틀그라운드</strong>, <strong>오버워치 2</strong>, <strong>발로란트</strong>의
            공식 사이트, 랭커 전적 검색(OP.GG, 닥지지, 트래커), 대표 커뮤니티(인벤, 디시, 카페),
            최신 밸런스 패치 노트와 실시간 e스포츠 일정을 한눈에 모아 제공하는 통합 게이머 포털입니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('links')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>공식 & 커뮤니티 둘러보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('patches')}
              className="px-5 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Newspaper className="w-4 h-4" />
              <span>최신 패치노트 분석 확인</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Supported Games Showcase Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Swords className="w-5 h-5 text-indigo-400" />
              <span>지원 게임 라인업</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              각 게임 카드를 누르면 해당 게임의 전용 바로가기 목록으로 바로 이동합니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => {
                onSelectGame(game.id);
                onNavigateTab('links');
              }}
              className="group relative rounded-xl border border-slate-800 bg-slate-900/70 hover:border-indigo-500/80 hover:bg-slate-900 transition-all cursor-pointer overflow-hidden flex flex-col justify-between p-4"
            >
              {/* Artwork Background */}
              <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity">
                <img
                  src={game.bannerImage}
                  alt={game.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              </div>

              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950/70 px-2 py-0.5 rounded border border-slate-800">
                    {game.genre}
                  </span>
                  <span className="text-[11px] font-mono text-amber-300 font-semibold bg-slate-950/70 px-2 py-0.5 rounded border border-slate-800">
                    {game.currentPatch}
                  </span>
                </div>

                <div className="pt-4">
                  <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                    {game.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {game.developer}
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                  {game.tagline}
                </p>
              </div>

              <div className="relative z-10 pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">{game.serverRegion}</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>바로가기</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features Guide */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>핵심 제공 기능 및 이용 안내</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-800/50 text-indigo-400">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">01. 공식 포털 & 커뮤니티 원스톱 디렉토리</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              게임 공식 웹사이트(다운로드/공지), 프로 e스포츠 리그 페이지, OP.GG·닥지지·트래커 등 1위 전적 검색 도구,
              그리고 인벤·디시인사이드 갤러리·공식 카페 등 검증된 링크를 한곳에서 클릭 한 번으로 이동하고 주소를 복사할 수 있습니다.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-emerald-400">
                <Newspaper className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">02. 최신 패치노트 & 밸런스 변경점 분석</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              긴 패치 노트를 일일이 찾지 않아도 됩니다. 챔피언 및 영웅의 상향(Buff), 하향(Nerf), 리워크(Rework),
              맵 및 무기 변경 내역을 카드와 상세 모달로 깔끔하게 정리하여 핵심만 즉시 파악할 수 있습니다.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-800/50 text-amber-400">
                <Star className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">03. 나만의 게이머 퀵패스 (즐겨찾기)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              원하는 링크의 별표(★)를 누르면 우측 상단 '즐겨찾기' 메뉴에 즉시 등록됩니다. 상단 우측 '즐겨찾기' 버튼을 누르면
              퀵패스 바가 토글되어 언제든지 원하는 전적 사이트나 커뮤니티로 빠르게 접근할 수 있습니다.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-950/80 border border-purple-800/50 text-purple-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">04. e스포츠 대회 일정 & 한국 서버 상태</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              롤드컵, PGS, OWCS, VCT 등 실시간 진행 중인 경기 스코어와 대진표, 공식 중계 링크를 제공하며,
              라이엇·크래프톤·블리자드의 공식 한국 서버 응답 지연(Ping)과 점검 여부를 실시간으로 모니터링합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
