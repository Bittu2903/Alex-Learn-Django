import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Target, Award, Code, Database, Shield, Zap } from 'lucide-react';
import { StorySection } from './StorySection';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import { CategoryNav } from './CategoryNav';
import { interviewData } from '../data/interviewData';

export const InterviewApp: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set<string>());
  const [showStory, setShowStory] = useState(true);

  const categories = interviewData.categories;
  const currentCategoryData = categories[currentCategory];
  const currentQuestionData = currentCategoryData.questions[currentQuestion];

  const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const completedCount = completedQuestions.size;

  const markQuestionCompleted = () => {
    const questionId = `${currentCategory}-${currentQuestion}`;
    setCompletedQuestions(prev => new Set([...prev, questionId]));
  };

  const nextQuestion = () => {
    if (currentQuestion < currentCategoryData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentCategory < categories.length - 1) {
      setCurrentCategory(prev => prev + 1);
      setCurrentQuestion(0);
    }
    setShowAnswer(false);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1);
      setCurrentQuestion(categories[currentCategory - 1].questions.length - 1);
    }
    setShowAnswer(false);
  };

  const goToCategory = (categoryIndex: number) => {
    setCurrentCategory(categoryIndex);
    setCurrentQuestion(0);
    setShowAnswer(false);
    setShowStory(true);
  };

  const isCurrentQuestionCompleted = completedQuestions.has(`${currentCategory}-${currentQuestion}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Django Master Interview Prep
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Join Alex's journey through 5+ years of Django development challenges
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <ProgressBar 
            completed={completedCount} 
            total={totalQuestions} 
            currentCategory={currentCategoryData.title}
          />
        </div>

        {/* Category Navigation */}
        <CategoryNav 
          categories={categories}
          currentCategory={currentCategory}
          onCategorySelect={goToCategory}
          completedQuestions={completedQuestions}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Story Section */}
          <div className="lg:col-span-1">
            <StorySection 
              story={currentCategoryData.story}
              isVisible={showStory}
              onToggle={() => setShowStory(!showStory)}
            />
          </div>

          {/* Question Section */}
          <div className="lg:col-span-2">
            <QuestionCard
              question={currentQuestionData}
              showAnswer={showAnswer}
              isCompleted={isCurrentQuestionCompleted}
              onToggleAnswer={() => setShowAnswer(!showAnswer)}
              onMarkCompleted={markQuestionCompleted}
              questionNumber={currentQuestion + 1}
              totalQuestions={currentCategoryData.questions.length}
              categoryTitle={currentCategoryData.title}
            />

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={prevQuestion}
                disabled={currentCategory === 0 && currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Question {currentQuestion + 1} of {currentCategoryData.questions.length}</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span>{currentCategoryData.title}</span>
              </div>

              <button
                onClick={nextQuestion}
                disabled={currentCategory === categories.length - 1 && currentQuestion === currentCategoryData.questions.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>Master Django concepts through real-world scenarios • 50+ Interview Questions</p>
        </div>
      </div>
    </div>
  );
};