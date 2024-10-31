export type VoteType = 'up' | 'down';

export interface Votes {
  up: number;
  down: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  votes: Votes;
  userVote: VoteType | null;
}

export interface FeatureSection {
  title?: string;
  question?: string;
  features: Feature[];
  layout?: 'grid' | 'list' | 'masonry';
  columns?: 1 | 2 | 3 | 4;
}

export interface FeatureVotingProps {
  // Single section props
  features?: Feature[];
  layout?: 'grid' | 'list' | 'masonry';
  columns?: 1 | 2 | 3 | 4;
  
  // Multi section props
  sections?: FeatureSection[];
  
  // Common props
  allowMultiple?: boolean;
  showConfetti?: boolean;
  spacing?: 'tight' | 'normal' | 'loose';
  onVote: (featureId: string, voteType: VoteType) => void;
}

export interface FeatureCardProps {
  feature: Feature;
  layout: 'grid' | 'list' | 'masonry';
  disabled: boolean;
  onVote: (featureId: string, voteType: VoteType) => void;
}

export type LayoutType = 'grid' | 'list' | 'masonry';
export type SpacingType = 'tight' | 'normal' | 'loose';

export type ContainerStylesMap = Record<LayoutType, string>;
export type GridStylesMap = Record<SpacingType, string>;