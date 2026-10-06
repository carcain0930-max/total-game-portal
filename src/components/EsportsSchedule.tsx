import React from 'react';
import { Trophy, Radio, ExternalLink, Calendar, Swords } from 'lucide-react';
import { EsportsMatch, GameId } from '../types/game';
import { UPCOMING_MATCHES, GAMES } from '../data/gamesData';

interface EsportsScheduleProps {
  selectedGame: GameId | 'all';
}

export const EsportsSchedule: React.FC<EsportsScheduleProps> = ({ selectedGame }) => {
  const matches = UPCOMING_MATCHES.filter(
    (m) => selectedGame === 'all' || m.gameId === selectedGame
  );

  const getGameName = (gameId: GameId) => {
    return GAMES.find((g) => g.id === gameId)?.shortName || gameId;
  };

  return (
    <section id="esports-schedule" className="py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>GLOBAL ESPORTS TOURNAMENT SCHEDULE</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            주요 e스포츠 대회 경기 및 중계 일정
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            롤 월드 챔피언십, 배그 PGS 글로벌 시리즈, 오버워치 OWCS 아시아, 발로란트 VCT 실시간 매치 정보
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 flex flex-col justify-between"
          >
            {/* Match Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 font-medium">
                <span className="text-indigo-400 font-bold">{getGameName(match.gameId)}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 font-medium">{match.tournament}</span>
              </div>

              {match.status === 'live' ? (
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded animate-pulse">
                  <Radio className="w-3 h-3" />
                  <span>LIVE 진행 중</span>
                </span>
              ) : match.status === 'finished' ? (
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  경기 종료
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                  <Calendar className="w-3 h-3" />
                  {match.time}
                </span>
              )}
            </div>

            {/* Scoreboard / Teams display */}
            <div className="py-4 flex items-center justify-between gap-4">
              {/* Team A */}
              <div className="flex-1 text-center sm:text-left">
                <div className="text-[11px] text-slate-500 font-mono">{match.teamA.code}</div>
                <div className="font-bold text-white text-base truncate">{match.teamA.name}</div>
              </div>

              {/* VS or Score */}
              <div className="flex flex-col items-center justify-center shrink-0 px-3">
                {match.teamA.score !== undefined && match.teamB.score !== undefined ? (
                  <div className="font-mono text-lg font-bold tabular-nums text-white bg-slate-800/80 px-3 py-1 rounded border border-slate-700">
                    <span className={match.teamA.score > match.teamB.score ? 'text-amber-400' : 'text-slate-300'}>
                      {match.teamA.score}
                    </span>
                    <span className="text-slate-500 mx-1.5">:</span>
                    <span className={match.teamB.score > match.teamA.score ? 'text-amber-400' : 'text-slate-300'}>
                      {match.teamB.score}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs font-bold text-slate-500 bg-slate-800 px-2.5 py-1 rounded">
                    VS
                  </div>
                )}
                <span className="text-[10px] text-slate-400 mt-1">{match.stage}</span>
              </div>

              {/* Team B */}
              <div className="flex-1 text-center sm:text-right">
                <div className="text-[11px] text-slate-500 font-mono">{match.teamB.code}</div>
                <div className="font-bold text-white text-base truncate">{match.teamB.name}</div>
              </div>
            </div>

            {/* Footer Broadcast Link */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">{match.stage}</span>
              <a
                href={match.broadcastUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
              >
                <span>공식 중계 및 대진표 보기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
