import React from 'react';
import { Trophy, Target } from 'lucide-react';

interface ProgressBarProps {
  completed: number;
  total: number;
  currentCategory: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, currentCategory }) => {
  const percentage = Math.round((completed / total) * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Trophy className="w-4 h-4" />
          <span>{completed}/{total} Complete</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Currently in: {currentCategory}</span>
          <span className="font-medium text-indigo-600">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      {percentage === 100 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800 font-medium text-sm">
            🎉 Congratulations! You've completed all Django interview questions!
          </p>
        </div>
      )}
    </div>
  );
};