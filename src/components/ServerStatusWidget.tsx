import React, { useState } from 'react';
import { Activity, CheckCircle2, RefreshCw, Server, Wifi } from 'lucide-react';
import { SERVER_STATUSES } from '../data/gamesData';
import { GameId } from '../types/game';

interface ServerStatusWidgetProps {
  selectedGame: GameId | 'all';
}

export const ServerStatusWidget: React.FC<ServerStatusWidgetProps> = ({ selectedGame }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('방금 전 (실시간)');

  const filteredStatuses = SERVER_STATUSES.filter(
    (s) => selectedGame === 'all' || s.gameId === selectedGame
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('방금 전 정상 핑 확인 완료');
    }, 600);
  };

  return (
    <section id="server-status" className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>REAL-TIME SERVICE & SERVER HEALTH</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            게임사별 한국 공식 서버 운용 현황
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            라이엇 게임즈, 크래프톤, 블리자드 엔터테인먼트의 매치메이킹 및 인증 서버 상태
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-slate-400">{lastUpdated}</span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            <span>상태 새로고침</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredStatuses.map((server) => (
          <div
            key={server.gameId}
            className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">{server.gameName}</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" />
                <span>{server.status}</span>
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <span className="text-slate-500 block text-[11px]">서비스 대상</span>
              <span className="font-medium text-slate-300">{server.service}</span>
            </div>

            <div className="pt-2 border-t border-slate-800/70 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block">응답 지연</span>
                <span className="font-mono tabular-nums text-slate-200 font-semibold flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  {server.ping}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">가용성</span>
                <span className="font-mono tabular-nums text-slate-200 font-semibold">
                  {server.uptime}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/60 leading-tight">
              {server.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
