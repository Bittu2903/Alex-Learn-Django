import React from 'react';
import { Eye, EyeOff, CheckCircle, Target, Code2 } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  answer: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
  codeExample?: string;
  followUp?: string;
}

interface QuestionCardProps {
  question: Question;
  showAnswer: boolean;
  isCompleted: boolean;
  onToggleAnswer: () => void;
  onMarkCompleted: () => void;
  questionNumber: number;
  totalQuestions: number;
  categoryTitle: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  showAnswer,
  isCompleted,
  onToggleAnswer,
  onMarkCompleted,
  questionNumber,
  totalQuestions,
  categoryTitle
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-600">
              {categoryTitle} • Question {questionNumber}/{totalQuestions}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
            {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 leading-tight">{question.question}</h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {question.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Answer Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onToggleAnswer}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          
          {showAnswer && !isCompleted && (
            <button
              onClick={onMarkCompleted}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Complete
            </button>
          )}
        </div>

        {showAnswer && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="prose prose-sm text-gray-700 leading-relaxed">
                {question.answer.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2 last:mb-0">{paragraph}</p>
                ))}
              </div>
            </div>

            {question.codeExample && (
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 text-sm">
                  <Code2 className="w-4 h-4" />
                  <span>Code Example</span>
                </div>
                <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                  <code>{question.codeExample}</code>
                </pre>
              </div>
            )}

            {question.followUp && (
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm font-medium text-blue-800 mb-1">Follow-up Question:</p>
                <p className="text-sm text-blue-700">{question.followUp}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};