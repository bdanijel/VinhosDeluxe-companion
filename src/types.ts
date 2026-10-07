export type PlayerColor = 'yellow' | 'red';

export interface PlayerState {
  name: string;
  color: PlayerColor;
  bagos: number;
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
  | 'game_over';

export interface RuleClarification {
  id: string;
  title: string;
  category: 'quadrel' | 'production' | 'wine_value' | 'sales_export' | 'fair_magnates' | 'cellars' | 'two_player' | 'end_game';
  question: string;
  answer: string;
  tip?: string;
  pageRef?: string;
  tags: string[];
}

export interface SetupStep {
  id: string;
  title: string;
  category: 'general' | 'board' | 'player_board' | 'two_player_focus';
  description: string;
  details: string[];
  isTwoPlayerSpecial?: boolean;
}

export interface FinalScoreData {
  // Fair VP accumulated (Fair 1, Fair 2, Fair 3)
  fair1VP: number;
  fair2VP: number;
  fair3VP: number;
  // Money (Bagos)
  bagos: number;
  // Wine quality sum
  wines: number[]; // e.g. [3, 9, 7, 5] -> floor(val/2) for each
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
