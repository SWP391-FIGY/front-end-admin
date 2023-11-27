import React from 'react';

import clsx from 'clsx';
import CountUp from 'react-countup';

export const CardStatistics = ({ label, value, color, prefix, suffix }) => {
  return (
    <div
      className={clsx('p-4 text-white rounded-lg shadow-lg w-full fade-up', {
        'bg-red-500 shadow-red-500/70': color === 'red',
        'bg-blue-500 shadow-blue-500/70': color === 'blue',
        'bg-green-500 shadow-green-500/70': color === 'green',
        'bg-yellow-500 shadow-yellow-500/70': color === 'yellow',
        'bg-indigo-500 shadow-indigo-500/70': color === 'indigo',
        'bg-purple-500 shadow-purple-500/70': color === 'purple',
        'bg-pink-500 shadow-pink-500/70': color === 'pink',
        'bg-gray-500 shadow-gray-500/70': color === 'gray',
        'bg-white shadow-white-500/70': color === 'white',
        'bg-black shadow-black-500/70': color === 'black',
        'bg-orange-500 shadow-orange-500/70': color === 'orange',
      })}
    >
      <div className="text-lg font-semibold">{label}</div>
      <div className="flex items-center gap-2 mt-4">
        {prefix}
        <div className="text-3xl h-9">
          <CountUp end={value} duration={2} />
        </div>
        {suffix}
      </div>
    </div>
  );
};
