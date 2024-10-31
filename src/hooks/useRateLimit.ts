// hooks/useRateLimit.ts
import { useState, useCallback } from 'react';

const VOTE_LIMITS = {
  window: '1h',
  max: 10
} as const;

export const useRateLimit = (projectId: string) => {
  const [voteCount, setVoteCount] = useState(0);
  const [isLimited, setIsLimited] = useState(false);
  
  const checkLimit = useCallback(() => {
    const votes = JSON.parse(localStorage.getItem(`votes_${projectId}`) || '[]');
    const hourAgo = Date.now() - 3600000;
    const recentVotes = votes.filter((time: number) => time > hourAgo);
    
    return recentVotes.length >= VOTE_LIMITS.max;
  }, [projectId]);

  const addVote = useCallback(() => {
    const votes = JSON.parse(localStorage.getItem(`votes_${projectId}`) || '[]');
    votes.push(Date.now());
    localStorage.setItem(`votes_${projectId}`, JSON.stringify(votes));
    setVoteCount(prev => prev + 1);
    setIsLimited(checkLimit());
  }, [projectId, checkLimit]);

  return { isLimited, addVote, voteCount };
};