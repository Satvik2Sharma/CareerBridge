import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  interactive = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-sm transition-all duration-200',
          hoverEffect && 'hover:border-slate-700 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5',
          interactive && 'cursor-pointer active:scale-[0.995]',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
