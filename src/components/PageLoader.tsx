import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-brand-dark flex items-center justify-center">
      {/* Animated gradient ring */}
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-blue border-r-brand-light animate-spin" 
             style={{ animationDuration: '1s' }} />
        
        {/* Middle ring */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-brand-glow border-l-brand-blue animate-spin" 
             style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        
        {/* Inner glow */}
        <div className="absolute inset-4 rounded-full bg-brand-blue/20 blur-sm animate-pulse-slow" />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-brand-glow shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
        </div>
      </div>
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>
    </div>
  );
};

export default PageLoader;
