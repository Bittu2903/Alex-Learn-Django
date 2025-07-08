import React from 'react';
import { Database, Shield, Zap, Code, Globe, Settings } from 'lucide-react';

interface Category {
  title: string;
  icon: string;
  questions: any[];
}

interface CategoryNavProps {
  categories: Category[];
  currentCategory: number;
  onCategorySelect: (index: number) => void;
  completedQuestions: Set<string>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ 
  categories, 
  currentCategory, 
  onCategorySelect,
  completedQuestions 
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'database': return <Database className="w-5 h-5" />;
      case 'shield': return <Shield className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'code': return <Code className="w-5 h-5" />;
      case 'globe': return <Globe className="w-5 h-5" />;
      case 'settings': return <Settings className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const getCompletedCount = (categoryIndex: number) => {
    return categories[categoryIndex].questions.filter((_, questionIndex) => 
      completedQuestions.has(`${categoryIndex}-${questionIndex}`)
    ).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => {
        const isActive = index === currentCategory;
        const completedCount = getCompletedCount(index);
        const totalQuestions = category.questions.length;
        const isCompleted = completedCount === totalQuestions;
        
        return (
          <button
            key={index}
            onClick={() => onCategorySelect(index)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              isActive 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${
                isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {getIcon(category.icon)}
              </div>
              <h4 className={`font-semibold ${
                isActive ? 'text-indigo-800' : 'text-gray-800'
              }`}>
                {category.title}
              </h4>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {completedCount}/{totalQuestions} questions
              </span>
              {isCompleted && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Complete
                </span>
              )}
            </div>
            
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-indigo-500'
                }`}
                style={{ width: `${(completedCount / totalQuestions) * 100}%` }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};