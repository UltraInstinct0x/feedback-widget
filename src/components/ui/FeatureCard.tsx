import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureCardProps } from '@/app/types';

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  feature, 
  disabled,
  onVote,
  layout = 'grid' 
}) => {
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
        {/* Title */}
        <h3 className="text-base font-medium text-gray-900 mb-2">
          {feature.title}
        </h3>
        
        {/* Description - Always visible, no animations */}
        <p className="text-sm text-gray-600 mb-3">
          {feature.description}
        </p>

        {/* Vote counts */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1.5">
            <ThumbsUp 
              className={`w-4 h-4 ${feature.userVote === 'up' ? 'text-green-600' : 'text-gray-400'}`}
            />
            <span className={feature.userVote === 'up' ? 'text-green-600' : 'text-gray-500'}>
              {feature.votes.up}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={feature.userVote === 'down' ? 'text-red-600' : 'text-gray-500'}>
              {feature.votes.down}
            </span>
            <ThumbsDown 
              className={`w-4 h-4 ${feature.userVote === 'down' ? 'text-red-600' : 'text-gray-400'}`}
            />
          </div>
        </div>
      </div>

      {/* Progress bar */}
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

      {/* Voting overlay - only thing that appears on hover */}
      <AnimatePresence>
        {isHovered && !disabled && (
          <motion.div 
            className="absolute inset-0 bg-white bg-opacity-98 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              onClick={() => onVote(feature.id, 'up')}
              className={`flex-1 flex items-center justify-center gap-2 transition-colors
                ${feature.userVote === 'up' 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                {feature.userVote === 'up' ? 'Voted' : 'Yes, please!'}
              </span>
            </button>
            <div className="w-px bg-gray-100" />
            <button 
              onClick={() => onVote(feature.id, 'down')}
              className={`flex-1 flex items-center justify-center gap-2 transition-colors
                ${feature.userVote === 'down' 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <span className="text-sm font-medium">
                {feature.userVote === 'down' ? 'Passed' : 'Not needed'}
              </span>
              <ThumbsDown className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};