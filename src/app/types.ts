
export type VoteType = 'up' | 'down';

export interface Votes {
 up: number;
 down: number;
}

// types.ts
export interface Feature {
    id: string;
    title: string;
    votes: {
      up: number;
      down: number;
    };
    userVote: 'up' | 'down' | null;
  }
  
  export interface FeatureVotingProps {
    features: Feature[];
    layout?: 'grid' | 'list' | 'masonry';
    columns?: 1 | 2 | 3 | 4;
    allowMultiple?: boolean;
    showConfetti?: boolean;
    spacing?: 'tight' | 'normal' | 'loose';
    onVote: (featureId: string, voteType: VoteType) => void; 
  }
  
  export interface FeatureCardProps {
    feature: Feature;
    disabled: boolean;
    onVote: (featureId: string, voteType: 'up' | 'down') => void;
  }
export type LayoutType = 'grid' | 'list' | 'masonry';
export type SpacingType = 'tight' | 'normal' | 'loose';


export type ContainerStylesMap = {

  grid: string;

  list: string;

  masonry: string;

};


export type GridStylesMap = {

  tight: string;

  normal: string;

  loose: string;

};
