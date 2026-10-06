import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GameFilterBar } from './components/GameFilterBar';
import { CompactGameHeader } from './components/CompactGameHeader';
import { BookmarksBar } from './components/BookmarksBar';
import { PageIntro } from './components/PageIntro';
import { LinkDirectory } from './components/LinkDirectory';
import { PatchNotesFeed } from './components/PatchNotesFeed';
import { PatchModal } from './components/PatchModal';
import { EsportsSchedule } from './components/EsportsSchedule';
import { ServerStatusWidget } from './components/ServerStatusWidget';
import { Footer } from './components/Footer';
import { GameId, PatchNoteItem } from './types/game';
import { GAME_LINKS } from './data/gamesData';

export default function App() {
  const [selectedGame, setSelectedGame] = useState<GameId | 'all'>('all');
  const [activeTab, setActiveTab] = useState('about');
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [activePatchModal, setActivePatchModal] = useState<PatchNoteItem | null>(null);

  // Initial favorites: OP.GG, Dak.gg PUBG, Overbuff, Tracker.gg Valorant
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gamenexus_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['lol-opgg', 'pubg-dakgg', 'ow2-overbuff', 'val-tracker'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('gamenexus_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (linkId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(linkId) ? prev.filter((id) => id !== linkId) : [...prev, linkId]
    );
  };

  const handleRemoveBookmark = (linkId: string) => {
    setBookmarkedIds((prev) => prev.filter((id) => id !== linkId));
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Bar Navigation (Buttons for views) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        bookmarkCount={bookmarkedIds.length}
        isBookmarksOpen={isBookmarksOpen}
        onOpenBookmarks={() => setIsBookmarksOpen((prev) => !prev)}
      />

      {/* Bookmarks Quick Pass Bar (Toggled by top-right button) */}
      <BookmarksBar
        bookmarkedIds={bookmarkedIds}
        allLinks={GAME_LINKS}
        onRemoveBookmark={handleRemoveBookmark}
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
      />

      {/* Game Filter Bar */}
      <GameFilterBar
        selectedGame={selectedGame}
        onSelectGame={setSelectedGame}
      />

      {/* Main Content Area: Strictly shows ONLY the content of the selected button */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-10">
        {/* Context Header for sub-views */}
        {activeTab !== 'about' && (
          <CompactGameHeader
            selectedGame={selectedGame}
            activeTab={activeTab}
          />
        )}

        {/* 0. Only show Page Introduction when 'about' button is active */}
        {activeTab === 'about' && (
          <PageIntro
            onNavigateTab={(tab) => setActiveTab(tab)}
            onSelectGame={(gameId) => setSelectedGame(gameId)}
          />
        )}

        {/* 1. Only show Link Directory when 'links' button is active */}
        {activeTab === 'links' && (
          <LinkDirectory
            selectedGame={selectedGame}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* 2. Only show Patch Notes Feed when 'patches' button is active */}
        {activeTab === 'patches' && (
          <PatchNotesFeed
            selectedGame={selectedGame}
            onSelectPatch={(patch) => setActivePatchModal(patch)}
          />
        )}

        {/* 3. Only show Esports Schedule when 'esports' button is active */}
        {activeTab === 'esports' && (
          <EsportsSchedule selectedGame={selectedGame} />
        )}

        {/* 4. Only show Server Status when 'server' button is active */}
        {activeTab === 'server' && (
          <ServerStatusWidget selectedGame={selectedGame} />
        )}
      </main>

      {/* Patch Note Detail Modal */}
      <PatchModal
        patch={activePatchModal}
        onClose={() => setActivePatchModal(null)}
      />

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
}

