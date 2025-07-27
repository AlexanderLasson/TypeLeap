import { useState } from 'react';

interface TypingBenefitsProps {
  isVisible: boolean;
  onClose: () => void;
}

const TypingBenefits = ({ isVisible, onClose }: TypingBenefitsProps) => {
  const [activeTab, setActiveTab] = useState(0);
// sections for typing benefits popups (modular)
  const benefits = [
    {
      title: "Productivity Boost", 
      icon: "⚡",
      description: "Faster typing means more work completed in less time. Every minute saved adds up to hours of increased productivity. Just like a frog catching flies - the faster you are, the more you catch!",
      stats: "Typists with 60+ WPM are 40% more productive than those typing at 30 WPM.",
      tips: [
        "Practice regularly for 15-20 minutes daily",
        "Focus on accuracy first, speed will follow",
        "Use proper finger placement on home row keys"
      ]
    },
{
  title: "Frog Jokes",
  icon: "🐸☕️",
  description: "Here are some Frog jokes. I apologize in advance..",
  stats: "Jokes make an office space all the more better.",
  tips: [
    "What do frogs and coders have in common? Bugs keep them busy. :(",
    "If a frog parks illegaly, then hes definitely Toad.",
    "What's a frog's favourite year? A leap year."
  ]
}
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/frog.svg"
              alt="Frog"
              className="w-8 h-8"
            />
            <h2 className="text-2xl font-bold text-gray-800">Typing Speed</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {benefits.map((benefit, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {benefit.icon} {benefit.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-2">{benefits[activeTab].icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {benefits[activeTab].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {benefits[activeTab].description}
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600 font-semibold">📊</span>
              <span className="text-blue-800 font-semibold">Key Statistic</span>
            </div>
            <p className="text-blue-700">{benefits[activeTab].stats}</p>
          </div>

          {/* Tips */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              💡 Info
            </h4>
            <ul className="space-y-2">
              {benefits[activeTab].tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WPM Guide */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">🎯 WPM Speed Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">30-40 WPM</div>
                <div className="text-gray-600">Beginner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50-70 WPM</div>
                <div className="text-gray-600">Intermediate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">80+ WPM</div>
                <div className="text-gray-600">Advanced</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingBenefits; 
