import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  value: number;
  label: string;
  description?: string;
  suffix?: string;
  prefix?: string;
  icon?: LucideIcon;
  isPositive?: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  description,
  suffix = '',
  prefix = '',
  icon: Icon,
  isPositive = true,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  const springValue = useSpring(0, {
    duration: 3000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (value % 1 !== 0) {
        // For floats (like 99.99), keep 2 decimal places
        setDisplayValue(parseFloat(latest.toFixed(2)));
      } else {
        // For integers, round
        setDisplayValue(Math.round(latest));
      }
    });
  }, [springValue, value]);

  // Formatting for large numbers (comma separation)
  const formattedValue = new Intl.NumberFormat('en-US').format(displayValue);

  return (
    <motion.div
      ref={ref}
      className={`bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-2xl flex items-center gap-3 w-full sm:w-auto hover:-translate-y-1 hover:scale-105 hover:shadow-brand-blue/20 hover:border-brand-blue/30 transition-all duration-300 group ${className}`}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02 }}
      whileFocus={{ scale: 1.02 }}
      tabIndex={0}
    >
      {Icon && (
        <div className={`p-2 rounded-lg transition-colors duration-300 ${isPositive ? 'bg-green-500/10 text-green-400 group-hover:bg-green-500/20' : 'bg-blue-500/10 text-brand-glow group-hover:bg-blue-500/20'}`}>
          <Icon size={20} />
        </div>
      )}
      <div className="flex-1">
        <div className="text-white font-bold text-lg flex items-baseline">
          {prefix && <span className="mr-0.5">{prefix}</span>}
          <span>{formattedValue}</span>
          {suffix && <span className="text-sm ml-0.5 font-medium text-slate-300">{suffix}</span>}
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-wide font-semibold">{label}</div>
        {description && (
          <div className="text-[10px] text-slate-500 mt-1 leading-tight hidden sm:block">{description}</div>
        )}
      </div>
    </motion.div>
  );
};

export default MetricCard;

