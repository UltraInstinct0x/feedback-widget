import React, { useState } from 'react';
import { FeatureCard } from './FeatureCard';
import confetti from 'canvas-confetti';
import { 
  FeatureVotingProps,
  VoteType,
  GridStylesMap,
  Feature,
  LayoutType,
} from '@/app/types';

function yeetConfetti(): void {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.8 }
  });
}

const FeatureVoting: React.FC<FeatureVotingProps> = ({
  features,
  sections,
  layout = 'grid',
  columns = 4,
  allowMultiple = false,
  showConfetti = true,
  spacing = 'normal',
  onVote
}) => {
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());
  const [hasConfettied, setHasConfettied] = useState<boolean>(false);

  const gridStyles: GridStylesMap = {
    tight: 'gap-2',
    normal: 'gap-4',
    loose: 'gap-6'
  };

  const handleVote = (featureId: string, voteType: VoteType): void => {
    if (!allowMultiple && votedFeatures.size > 0 && !votedFeatures.has(featureId)) {
      return;
    }

    onVote(featureId, voteType);

    const newVotedFeatures = new Set(votedFeatures);
    if (votedFeatures.has(featureId)) {
      newVotedFeatures.delete(featureId);
    } else {
      if (!allowMultiple) newVotedFeatures.clear();
      newVotedFeatures.add(featureId);
    }
    setVotedFeatures(newVotedFeatures);

    if (voteType === 'up' && showConfetti && !hasConfettied) {
      yeetConfetti();
      setHasConfettied(true);
    }
  };

  const getContainerStyles = (sectionLayout: LayoutType, sectionColumns: number) => ({
    grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${sectionColumns} ${gridStyles[spacing]}`,
    list: `flex flex-col ${gridStyles[spacing]}`,
    masonry: `columns-1 md:columns-2 lg:columns-${sectionColumns} space-y-4`
  });

  const renderFeatureSection = (
    sectionFeatures: Feature[], 
    sectionLayout: LayoutType = layout,
    sectionColumns: number = columns
  ) => {
    const containerStyles = getContainerStyles(sectionLayout, sectionColumns);
    return (
      <div className={containerStyles[sectionLayout]}>
        {sectionFeatures.map((feature) => (
          <FeatureCard 
            key={feature.id} 
            feature={feature}
            disabled={!allowMultiple && votedFeatures.size > 0 && !votedFeatures.has(feature.id)}
            onVote={handleVote}
            layout={sectionLayout}
          />
        ))}
      </div>
    );
  };

  if (sections) {
    return (
      <div className="space-y-16">
        {sections.map((section, index) => (
          <div key={index}>
            {section.title && (
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
            )}
            {section.question && (
              <p className="text-gray-600 mb-6">{section.question}</p>
            )}
            {renderFeatureSection(
              section.features, 
              section.layout, 
              section.columns
            )}
          </div>
        ))}
      </div>
    );
  }

  return renderFeatureSection(features || []);
};

export default FeatureVoting;