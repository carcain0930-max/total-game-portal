export type GameId = 'lol' | 'pubg' | 'ow2' | 'valorant';

export interface GameInfo {
  id: GameId;
  name: string;
  nameEn: string;
  shortName: string;
  developer: string;
  genre: string;
  releaseYear: number;
  themeColor: string; // Tailwind color class or hex
  accentColor: string;
  bannerImage: string;
  tagline: string;
  serverRegion: string;
  currentPatch: string;
  status: '정상 운용' | '점검 예정' | '부분 지연';
}

export type LinkCategory = 'official' | 'esports' | 'stats' | 'community';

export interface GameLink {
  id: string;
  gameId: GameId;
  title: string;
  category: LinkCategory;
  url: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
}

export type NewsCategory = 'patch' | 'balance' | 'esports' | 'notice';

export interface BalanceChange {
  name: string;
  type: 'buff' | 'nerf' | 'rework' | 'adjust' | 'new';
  summary: string;
  details?: string[];
}

export interface PatchNoteItem {
  id: string;
  gameId: GameId;
  version: string;
  title: string;
  category: NewsCategory;
  date: string;
  readTime: string;
  summary: string;
  highlights: string[];
  balanceChanges?: BalanceChange[];
  externalUrl: string;
  views?: number;
  commentsCount?: number;
}

export interface EsportsMatch {
  id: string;
  gameId: GameId;
  tournament: string;
  teamA: { name: string; score?: number; code: string };
  teamB: { name: string; score?: number; code: string };
  status: 'live' | 'upcoming' | 'finished';
  time: string;
  stage: string;
  broadcastUrl: string;
}
