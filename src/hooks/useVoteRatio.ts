// hooks/useVoteRatio.ts
import { useMemo } from 'react';

export interface Votes {
  up: number;
  down: number;
}

export const useVoteRatio = (votes: Votes) => {
  return useMemo(() => {
    const total = votes.up + votes.down;
    if (!total) return '0.0';
    
    return ((votes.up / total) * 100).toFixed(1);
  }, [votes.up, votes.down]);
};