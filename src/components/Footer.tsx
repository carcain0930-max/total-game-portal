import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/90 bg-[#080b10] text-slate-400 py-10 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-indigo-500 inline-block" />
              <span>GameNexus KR</span>
            </div>
            <p className="text-slate-500 mt-1 max-w-md">
              리그 오브 레전드, 배틀그라운드, 오버워치 2, 발로란트 게이머를 위한 통합 링크 & 최신 패치노트 포털 서비스
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <a href="https://www.leagueoflegends.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Riot Games
            </a>
            <a href="https://www.krafton.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              KRAFTON
            </a>
            <a href="https://www.blizzard.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Blizzard Entertainment
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p>© {new Date().getFullYear()} GameNexus KR. All game titles, logos, and trademarks belong to their respective copyright holders.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>비공식 팬 허브 & 게이머 유틸리티</span>
            <span>·</span>
            <span>데이터 갱신 주기: 실시간</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
