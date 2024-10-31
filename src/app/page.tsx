"use client"
import React, { useState } from 'react';
import FeatureVoting from '@/components/ui/FeatureVoting';
import PricingSection from '@/components/ui/PricingSection';
import { type Feature, VoteType } from '@/app/types';
import { ArrowRight, Sparkles, BarChart3, Zap, Calendar } from 'lucide-react';
import Image from 'next/image';

const DEMO_DATA = {
  features: [
    { id: '1', title: "dark mode support", votes: { up: 245, down: 12 }, userVote: null },
    { id: '2', title: "custom vote button styles", votes: { up: 189, down: 34 }, userVote: null },
    { id: '3', title: "slack/discord notifications", votes: { up: 156, down: 45 }, userVote: null },
    { id: '4', title: "embed widget customization", votes: { up: 267, down: 8 }, userVote: null },
  ],
  roadmap: [
    { id: '1', title: "analytics dashboard v2", votes: { up: 423, down: 21 }, userVote: null },
    { id: '2', title: "mobile app support", votes: { up: 356, down: 43 }, userVote: null },
    { id: '3', title: "webhook integrations", votes: { up: 289, down: 67 }, userVote: null },
    { id: '4', title: "advanced user roles", votes: { up: 445, down: 12 }, userVote: null },
  ],
  feedback: [
    { id: '1', title: "more vote animation options", votes: { up: 89, down: 2 }, userVote: null },
    { id: '2', title: "bulk feature management", votes: { up: 67, down: 5 }, userVote: null },
    { id: '3', title: "better mobile responsive", votes: { up: 234, down: 23 }, userVote: null },
    { id: '4', title: "category sorting/filtering", votes: { up: 178, down: 15 }, userVote: null },
  ]
};
const CHANGELOG = [
  {
    date: '2024-02-15',
    version: 'v1.2.0',
    changes: [
      { type: 'feature', text: 'Added masonry layout support' },
      { type: 'feature', text: 'New analytics dashboard' },
      { type: 'fix', text: 'Fixed mobile responsiveness issues' }
    ]
  },
  {
    date: '2024-01-30',
    version: 'v1.1.0',
    changes: [
      { type: 'feature', text: 'Introduced multiple voting mode' },
      { type: 'feature', text: 'Added confetti animations' },
      { type: 'improvement', text: 'Enhanced voting performance' }
    ]
  },
  {
    date: '2024-01-15',
    version: 'v1.0.0',
    changes: [
      { type: 'feature', text: 'Initial release' },
      { type: 'feature', text: 'Basic voting functionality' },
      { type: 'feature', text: 'Three layout options' }
    ]
  }
];

export default function Home() {
const [demoType, setDemoType] = useState<'features' | 'roadmap' | 'feedback'>('features');
const [features, setFeatures] = useState<Feature[]>(DEMO_DATA[demoType]);

const handleDemoChange = (type: 'features' | 'roadmap' | 'feedback') => {
  console.log('handleDemoChange called with:', type);
  console.log('Current features:', DEMO_DATA[type]);
  setDemoType(type);
  setFeatures(DEMO_DATA[type]);
};
  const handleVote = (featureId: string, voteType: VoteType) => {
    setFeatures(prev => prev.map(feature => {
      if (feature.id !== featureId) return feature;
      const newVotes = { ...feature.votes };
      
      if (feature.userVote === voteType) {
        newVotes[voteType]--;
        return { ...feature, votes: newVotes, userVote: null };
      } else {
        if (feature.userVote) newVotes[feature.userVote]--;
        newVotes[voteType]++;
        return { ...feature, votes: newVotes, userVote: voteType };
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
              <Sparkles className="w-4 h-4 mr-2" />
              New: AI-powered insights now available
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Ship features your users
            <span className="text-blue-600"> actually want</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Beautiful feature voting widget that helps you validate ideas before writing code.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">
              View Documentation
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-500">TRUSTED BY INDIE HACKERS</p>
            <div className="flex justify-center gap-8 mt-4">
            <Image src="/athaswcad.jpg" alt="Company 1" height={162} width={162} />
            <Image src="/gokuug.jpg" alt="Company 2" height={162} width={162} />
            <Image src="/selo.jpg" alt="Company 3" height={162} width={162} />
            </div>
        </div>

        {/* Demo Section with Type Selector */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">This is actually it. Try it yourself!</h2>
            <div className="inline-flex rounded-lg border border-gray-200 p-1 mb-4">
              {(['features', 'roadmap', 'feedback'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => handleDemoChange(type)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition
                    ${demoType === type 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
            <FeatureVoting
              features={features}
              layout="masonry"
              allowMultiple={true}
              showConfetti={true}
              onVote={handleVote}
              columns={4}
            />
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-lg bg-white border border-gray-100">
            <Zap className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Drop-in widget that takes less than 5 minutes to set up</p>
          </div>
          <div className="p-6 rounded-lg bg-white border border-gray-100">
            <BarChart3 className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Rich Analytics</h3>
            <p className="text-gray-600">Track engagement and identify trending feature requests</p>
          </div>
          <div className="p-6 rounded-lg bg-white border border-gray-100">
            <Sparkles className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="font-semibold mb-2">Delightful UX</h3>
            <p className="text-gray-600">Smooth animations and interactions your users will love</p>
          </div>
        </div>

        {/* Changelog Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Changelog</h2>
          <div className="space-y-8">
            {CHANGELOG.map((release) => (
              <div key={release.version} className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-500">{release.date}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                    {release.version}
                  </span>
                </div>
                <ul className="space-y-2">
                  {release.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium
                        ${change.type === 'feature' ? 'bg-green-50 text-green-700' :
                          change.type === 'fix' ? 'bg-red-50 text-red-700' :
                          'bg-yellow-50 text-yellow-700'}`}>
                        {change.type}
                      </span>
                      <span className="text-gray-600">{change.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <PricingSection />
      </div>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2024 YourCompany. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">GitHub</a>
              <a href="#" className="text-gray-500 hover:text-gray-700">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}