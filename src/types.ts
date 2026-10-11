export type PlayerColor = 'yellow' | 'red';
export type GameEdition = '2016' | '2010';

export interface PlayerState {
  name: string;
  color: PlayerColor;
  bagos: number;
  bankAccount?: number; // 2010 Reserve
  investments?: number; // 2010 Reserve (-2 to +3)
  fairPoints: number;
  availableBarrels: number;
  exportedBarrels: number;
  multiplierBarrels: number;
}

export type PhaseType = 
  | 'start_of_year' 
  | 'action_1' 
  | 'action_2' 
  | 'maintenance' 
  | 'production' 
  | 'fair' 
  | 'final_bonus_action' 
  | 'end_magnate_benefits'
  | 'game_over';

export interface RuleClarification {
  id: string;
  title: string;
  category: 'quadrel' | 'production' | 'wine_value' | 'sales_export' | 'fair_magnates' | 'cellars' | 'two_player' | 'end_game' | 'bank_economy';
  question: string;
  answer: string;
  tip?: string;
  pageRef?: string;
  tags: string[];
  edition?: '2016' | '2010' | 'both';
  isDifference?: boolean;
}

export interface SetupStep {
  id: string;
  title: string;
  category: 'general' | 'board' | 'player_board' | 'two_player_focus';
  description: string;
  details: string[];
  isTwoPlayerSpecial?: boolean;
  edition?: '2016' | '2010' | 'both';
}

export interface VersionDifferenceItem {
  id: string;
  category: 'finances' | 'workers' | 'magnates' | 'sales' | 'quadrel' | 'scoring' | 'setup';
  title: string;
  v2010: {
    title: string;
    description: string;
    keyPoints: string[];
    rulebookRef?: string;
  };
  v2016: {
    title: string;
    description: string;
    keyPoints: string[];
    rulebookRef?: string;
  };
  impact: 'high' | 'medium' | 'low';
  strategicTip: string;
}

export interface FinalScoreData {
  // Fair VP accumulated (Fair 1, Fair 2, Fair 3)
  fair1VP: number;
  fair2VP: number;
  fair3VP: number;
  // Money
  bagos: number; // 2016 cash in hand
  bankAccount: number; // 2010 bank track (0 to 24)
  // Wine quality sum (2016 only)
  wines: number[]; // e.g. [3, 9, 7, 5] -> floor(val/2) for each in 2016
  // Export columns majorities won
  exportCol1VP: number;
  exportCol2VP: number;
  exportCol3VP: number;
  exportCol4VP: number;
  exportCol5VP: number;
  exportBarrelsCount: number; // for tie-breaker
  // Multipliers
  multiplierTilesVP: number;
  // Direct VP from export placements
  directExportSlotsVP: number;
}
