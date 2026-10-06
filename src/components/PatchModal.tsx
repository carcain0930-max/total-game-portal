import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, Clock, Eye, MessageSquare, ArrowUpRight, TrendingUp, TrendingDown, RefreshCw, SlidersHorizontal, PlusCircle } from 'lucide-react';
import { PatchNoteItem, BalanceChange } from '../types/game';
import { GAMES } from '../data/gamesData';

interface PatchModalProps {
  patch: PatchNoteItem | null;
  onClose: () => void;
}

export const PatchModal: React.FC<PatchModalProps> = ({ patch, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (patch) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [patch, onClose]);

  if (!patch) return null;

  const game = GAMES.find((g) => g.id === patch.gameId);

  const getChangeBadge = (type: BalanceChange['type']) => {
    switch (type) {
      case 'buff':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            <TrendingUp className="w-3 h-3" />
            <span>상향 (BUFF)</span>
          </span>
        );
      case 'nerf':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
            <TrendingDown className="w-3 h-3" />
            <span>하향 (NERF)</span>
          </span>
        );
      case 'rework':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded">
            <RefreshCw className="w-3 h-3" />
            <span>스킬 개편 (REWORK)</span>
          </span>
        );
      case 'adjust':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
            <SlidersHorizontal className="w-3 h-3" />
            <span>조정 (ADJUST)</span>
          </span>
        );
      case 'new':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded">
            <PlusCircle className="w-3 h-3" />
            <span>신규 추가 (NEW)</span>
          </span>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="patch-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0f141f] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800/90 bg-slate-900/60 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-indigo-400 font-bold">{game?.name}</span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-slate-300 font-medium">버전 {patch.version}</span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {patch.date}
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                소요 {patch.readTime}
              </span>
            </div>

            <h2 id="patch-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {patch.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
            title="닫기 (ESC)"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
              패치 개요 및 개발자 의도
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {patch.summary}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-indigo-500 rounded-sm" />
              핵심 변경 요약 (Highlights)
            </h3>
            <ul className="space-y-2">
              {patch.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Balance Changes if Available */}
          {patch.balanceChanges && patch.balanceChanges.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-emerald-500 rounded-sm" />
                영웅 / 챔피언 / 무기 상세 밸런스 조정
              </h3>
              <div className="space-y-3">
                {patch.balanceChanges.map((change, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-white">
                        {change.name}
                      </span>
                      {getChangeBadge(change.type)}
                    </div>
                    <p className="text-xs text-slate-300">{change.summary}</p>
                    {change.details && change.details.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/60 space-y-1">
                        {change.details.map((detail, dIdx) => (
                          <div
                            key={dIdx}
                            className="text-xs text-slate-400 pl-3 border-l-2 border-slate-700/60 leading-relaxed"
                          >
                            {detail}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800/90 bg-slate-900/60 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            공식 게임 개발사 발표 내용을 기반으로 실시간 동기화되었습니다.
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-lg transition-colors cursor-pointer"
            >
              닫기
            </button>
            <a
              href={patch.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>공식 패치 전문 원문 보기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
