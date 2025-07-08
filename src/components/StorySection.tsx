import React from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface StorySectionProps {
  story: {
    title: string;
    content: string;
    context: string;
  };
  isVisible: boolean;
  onToggle: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ story, isVisible, onToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div 
        className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <h3 className="font-semibold">Story Context</h3>
        </div>
        {isVisible ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      
      {isVisible && (
        <div className="p-6 space-y-4">
          <h4 className="text-xl font-bold text-gray-800">{story.title}</h4>
          <div className="prose prose-sm text-gray-600">
            <p className="leading-relaxed">{story.content}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
            <p className="text-sm text-indigo-800 font-medium">Interview Context:</p>
            <p className="text-sm text-indigo-700 mt-1">{story.context}</p>
          </div>
        </div>
      )}
    </div>
  );
};