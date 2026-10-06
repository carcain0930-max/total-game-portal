import React from 'react';
import { Bookmark, ExternalLink, X, Star } from 'lucide-react';
import { GameLink, GameId } from '../types/game';
import { GAMES } from '../data/gamesData';

interface BookmarksBarProps {
  bookmarkedIds: string[];
  allLinks: GameLink[];
  onRemoveBookmark: (linkId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarksBar: React.FC<BookmarksBarProps> = ({
  bookmarkedIds,
  allLinks,
  onRemoveBookmark,
  isOpen,
  onClose,
}) => {
  // Only render when the user toggles it open
  if (!isOpen) return null;

  const bookmarkedLinks = allLinks.filter((l) => bookmarkedIds.includes(l.id));

  const getGameBadge = (gameId: GameId) => {
    const game = GAMES.find((g) => g.id === gameId);
    return game?.shortName || gameId;
  };

  return (
    <aside aria-label="나만의 게이머 퀵패스 즐겨찾기" className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 shrink-0">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>나만의 게이머 퀵패스 (즐겨찾기)</span>
          <span className="text-slate-500 font-normal">
            ({bookmarkedLinks.length}개 등록됨)
          </span>
        </div>

        {bookmarkedLinks.length === 0 ? (
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>아래 바로가기 카드에서 별표(★) 아이콘을 누르면 자주 가는 OP.GG, 인벤, 공식 사이트를 여기에 모아둘 수 있습니다.</span>
            {isOpen && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
                title="닫기"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar flex-1 justify-start md:justify-end">
            {bookmarkedLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/90 hover:bg-slate-750 border border-slate-700/80 rounded-md text-xs text-slate-200 shrink-0 group transition-colors"
              >
                <span className="text-[10px] font-mono px-1 py-0.2 bg-slate-950 text-indigo-300 rounded font-semibold">
                  {getGameBadge(link.gameId)}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-indigo-300 flex items-center gap-1 max-w-[160px] truncate"
                >
                  <span className="truncate">{link.title}</span>
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-60 group-hover:opacity-100" />
                </a>
                <button
                  onClick={() => onRemoveBookmark(link.id)}
                  className="text-slate-500 hover:text-rose-400 p-0.5 rounded cursor-pointer ml-1"
                  title="즐겨찾기에서 제거"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {isOpen && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer shrink-0 ml-2"
                title="즐겨찾기 바 접기"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
