import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';

const ACTUAL_PRICING = {
  FREE: {
    features: [
      'single button widget',
      'basic dashboard',
      'export to csv',
      'ONE confetti animation',
      'forever free'
    ],
    limits: {
      feedback: 250,
      storage: '90 days',
    },
    price: 0
  },
  PRO: {
    features: [
      'everything in free',
      'multiple layouts',
      'smart triggers',
      'basic api access',
      'response templates',
    ],
    limits: {
      feedback: 2500,
      storage: '1 year',
    },
    price: 15
  }
};

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const getPrice = (monthly: number) => {
    if (monthly === 0) return 'Free';
    const price = isAnnual ? monthly * 10 : monthly;
    return `$${price}${isAnnual ? '/yr' : '/mo'}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-sm font-medium text-blue-600 mb-2 inline-block">PRICING</span>
        <h2 className="text-3xl font-bold mb-3">Start free, upgrade when ready</h2>
        <p className="text-gray-600 text-lg">Simple pricing for indie devs and small teams</p>
        
        <div className="inline-flex items-center bg-gray-50 rounded-full p-1 mt-8">
          <button 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all
              ${!isAnnual ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </button>
          <button 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1
              ${isAnnual ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setIsAnnual(true)}
          >
            Yearly
            <span className="text-green-600 text-xs font-semibold px-1.5 py-0.5 bg-green-50 rounded-full">
              -17%
            </span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(ACTUAL_PRICING).map(([tier, plan]) => (
          <div 
            key={tier}
            className={`bg-white rounded-xl border transition-all
              ${tier === 'PRO' 
                ? 'border-blue-500 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-medium mb-1">{tier}</h3>
                  <div className="text-3xl font-bold">
                    {getPrice(plan.price)}
                  </div>
                </div>
                {tier === 'PRO' && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    MOST POPULAR
                  </span>
                )}
              </div>

              <button 
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors mb-6
                  ${tier === 'PRO'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-black text-white hover:bg-gray-800'}`}
              >
                {tier === 'FREE' ? 'Start Building' : 'Upgrade Now'}
              </button>

              <div className="space-y-4">
                <div className="flex items-baseline gap-2 text-sm">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span><strong>{plan.limits.feedback}</strong> feedback items/mo</span>
                </div>
                <div className="flex items-baseline gap-2 text-sm">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span><strong>{plan.limits.storage}</strong> data retention</span>
                </div>

                <div className="pt-4 border-t">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-2">
          Free migrations • Cancel anytime • No credit card required
        </p>
        <p className="text-xs text-gray-400">
          Need more? Contact us for custom enterprise pricing
        </p>
      </div>
    </div>
  );
};

export default PricingSection;