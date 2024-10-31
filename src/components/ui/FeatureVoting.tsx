"use client"

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  FeatureVotingProps,
  FeatureCardProps,
  VoteType,
  ContainerStylesMap,
  GridStylesMap
} from '@/app/types';

function yeetConfetti(): void {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.8 }
  });
}

const FeatureVoting = ({ 
  features,
  layout = 'grid',
  columns = 4,
  allowMultiple = false,
  showConfetti = true,
  spacing = 'normal',
  onVote
}: FeatureVotingProps): JSX.Element => {
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());
  const [hasConfettied, setHasConfettied] = useState<boolean>(false);

  const handleVote = (featureId: string, voteType: VoteType): void => {
    if (!allowMultiple && votedFeatures.size > 0 && !votedFeatures.has(featureId)) {
      return;
    }

    // Call parent's vote handler
    onVote(featureId, voteType);

    // Handle voted features set for multiple/single mode
    const newVotedFeatures = new Set(votedFeatures);
    if (votedFeatures.has(featureId)) {
      newVotedFeatures.delete(featureId);
    } else {
      if (!allowMultiple) newVotedFeatures.clear();
      newVotedFeatures.add(featureId);
    }
    setVotedFeatures(newVotedFeatures);

    // Yeet confetti only on first upvote
    if (voteType === 'up' && showConfetti && !hasConfettied) {
      yeetConfetti();
      setHasConfettied(true);
    }
  };

  const gridStyles: GridStylesMap = {
    tight: 'gap-2',
    normal: 'gap-4',
    loose: 'gap-6'
  };

  const containerStyles: ContainerStylesMap = {
    grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} ${gridStyles[spacing]}`,
    list: `flex flex-col ${gridStyles[spacing]}`,
    masonry: 'columns-1 md:columns-2 lg:columns-4 space-y-4'
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({ feature, disabled }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const ratio = ((feature.votes.up / (feature.votes.up + feature.votes.down)) * 100).toFixed(1);

    return (
      <motion.div 
        className={`relative bg-white rounded-xl border border-gray-100 overflow-hidden 
          ${disabled ? 'opacity-50 pointer-events-none' : 'hover:shadow-sm'} transition-all duration-200
          ${layout === 'masonry' ? 'break-inside-avoid' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4">
          <h3 className="text-base font-medium text-gray-900">{feature.title}</h3>
          
          <div className="flex justify-between items-center mt-2 text-sm">
            <motion.div 
              className="flex items-center gap-1.5"
              animate={{ scale: feature.userVote === 'up' ? 1.05 : 1 }}
            >
              <span className={feature.userVote === 'up' ? 'text-green-600' : 'text-gray-500'}>
                {feature.votes.up}
              </span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1.5"
              animate={{ scale: feature.userVote === 'down' ? 1.05 : 1 }}
            >
              <span className={feature.userVote === 'down' ? 'text-red-600' : 'text-gray-500'}>
                {feature.votes.down}
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="h-0.5 w-full bg-gray-50"
          animate={{ opacity: isHovered ? 0 : 1 }}
        >
          <motion.div 
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${ratio}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <AnimatePresence>
          {isHovered && !disabled && (
            <motion.div 
              className="absolute inset-0 bg-white bg-opacity-98 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button 
                onClick={() => handleVote(feature.id, 'up')}
                className={`flex-1 flex items-center justify-center gap-2 transition-colors
                  ${feature.userVote === 'up' 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {feature.userVote === 'up' ? 'Voted' : 'Yes'}
                </span>
              </button>
              <div className="w-px bg-gray-100" />
              <button 
                onClick={() => handleVote(feature.id, 'down')}
                className={`flex-1 flex items-center justify-center gap-2 transition-colors
                  ${feature.userVote === 'down' 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <span className="text-sm font-medium">
                  {feature.userVote === 'down' ? 'Passed' : 'Pass'}
                </span>
                <ThumbsDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className={containerStyles[layout]}>
      {features.map((feature) => (
        <FeatureCard 
          key={feature.id} 
          feature={feature}
          disabled={!allowMultiple && votedFeatures.size > 0 && !votedFeatures.has(feature.id)}
          onVote={handleVote}
        />
      ))}
    </div>
  );
};

export default FeatureVoting;