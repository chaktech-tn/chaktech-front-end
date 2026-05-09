"use client";
import React from 'react';
import { useMenu } from '@hooks/useMenu';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

const CheckoutProgressBar = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const { menu, isLoading } = useMenu('checkout', locale);

  if (isLoading || !menu || !menu.items || menu.items.length === 0) {
    return null;
  }

  const items = [...menu.items].sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // Find current step index based on URL
  const currentStep = items.findIndex(item => pathname.includes(item.url)) || 0;
  const activeIndex = currentStep === -1 ? 0 : currentStep;
  return (
    <div className="ck-checkout-progress py-10">
      <div className="container">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-orange-500 -translate-y-1/2 z-0 transition-all duration-700" 
            style={{ width: `${(activeIndex / (items.length - 1)) * 100}%` }}
          />

          {items.map((item, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            
            return (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-orange-500 text-white' 
                      : isCurrent 
                        ? 'bg-white border-4 border-orange-500 text-orange-500 scale-110 shadow-lg shadow-orange-100' 
                        : 'bg-white border-2 border-slate-200 text-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest ${
                  isCurrent ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgressBar;
