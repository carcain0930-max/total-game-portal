import React from 'react';
import { GameId } from '../types/game';
import { GAMES } from '../data/gamesData';
import { Grid, Swords, Crosshair, Shield, Flame } from 'lucide-react';

interface GameFilterBarProps {
  selectedGame: GameId | 'all';
  onSelectGame: (game: GameId | 'all') => void;
}

export const GameFilterBar: React.FC<GameFilterBarProps> = ({
  selectedGame,
  onSelectGame,
}) => {
  const getIcon = (id: GameId | 'all') => {
    switch (id) {
      case 'all':
        return <Grid className="w-4 h-4" />;
      case 'lol':
        return <Swords className="w-4 h-4 text-amber-400" />;
      case 'pubg':
        return <Crosshair className="w-4 h-4 text-yellow-500" />;
      case 'ow2':
        return <Shield className="w-4 h-4 text-orange-400" />;
      case 'valorant':
        return <Flame className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="w-full bg-[#0d121c] border-y border-slate-800/80 sticky top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          {/* Segmented Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800/80 shrink-0">
            <button
              onClick={() => onSelectGame('all')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedGame === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {getIcon('all')}
              <span>전체 4대 게임</span>
            </button>

            {GAMES.map((game) => {
              const isSelected = selectedGame === game.id;
              return (
                <button
                  key={game.id}
                  onClick={() => onSelectGame(game.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {getIcon(game.id)}
                  <span>{game.name}</span>
                  <span
                    className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                      isSelected
                        ? 'bg-indigo-700/60 text-indigo-100'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {game.currentPatch}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Context Summary */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400 shrink-0">
            {selectedGame === 'all' ? (
              <span>전체 4개 게임의 통합 디렉토리 및 뉴스 피드를 탐색 중입니다</span>
            ) : (
              <span>
                <strong className="text-white font-medium">
                  {GAMES.find((g) => g.id === selectedGame)?.name}
                </strong>
                의 전용 공식 사이트, 커뮤니티, 패치 노트만 표시 중입니다
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
