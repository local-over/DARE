'use client';

export default function Logo({ size = 'medium', animated = true, className = '' }) {
  const sizeClasses = {
    small: 'w-7 h-7',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const innerSize = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-7 h-7',
    xl: 'w-10 h-10',
  };

  return (
    <div className={`relative flex items-center justify-center group ${sizeClasses[size] || sizeClasses.medium} ${className}`}>
      {/* Outer ambient pulsing aura */}
      <div 
        className={`absolute inset-0 rounded-full bg-white/20 blur-md transition-all duration-700 group-hover:bg-white/40 group-hover:scale-125 ${
          animated ? 'animate-pulse' : ''
        }`} 
      />

      {/* Rotating orbital ring */}
      <div 
        className={`absolute -inset-1 rounded-full border border-white/20 border-t-white/80 ${
          animated ? 'animate-[spin_6s_linear_infinite]' : ''
        }`} 
      />

      {/* Main White Circle Logo */}
      <div 
        className={`relative z-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-white via-neutral-100 to-neutral-300 shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500 group-hover:scale-110 ${sizeClasses[size] || sizeClasses.medium}`}
      >
        {/* Core dark geometric accent */}
        <div className={`rounded-full bg-black ${innerSize[size] || innerSize.medium} flex items-center justify-center shadow-inner`}>
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
        </div>
      </div>
    </div>
  );
}
