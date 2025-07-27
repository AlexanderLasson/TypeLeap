import { useState, useEffect } from 'react';
import { leaderboardService } from '../services/leaderboardService';
import type { LeaderboardEntry } from '../services/leaderboardService';

interface LeaderboardProps {
  isVisible: boolean;
  onClose: () => void;
  userWpm: number;
  userAccuracy: number;
}

const Leaderboard = ({ isVisible, onClose, userWpm, userAccuracy }: LeaderboardProps) => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userName, setUserName] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isVisible) {
      loadLeaderboard();
    }
  }, [isVisible]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const topScores = await leaderboardService.getTopScores(10);
      setScores(topScores);
    } catch (err) {
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitScore = async () => {
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await leaderboardService.addScore({
        name: userName.trim(),
        wpm: userWpm,
        accuracy: userAccuracy
      });
      
      setShowSubmitForm(false);
      setUserName('');
      await loadLeaderboard(); // Refresh the leaderboard
    } catch (err) {
      setError('Failed to submit score');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/frog.svg"
              alt="Frog"
              className="w-8 h-8"
            />
            <h2 className="text-2xl font-bold text-gray-800">TypeLeap Leaderboard</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {showSubmitForm ? (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Submit Your Score</h3>
            <p className="text-sm text-gray-600 mb-4">
              WPM: {userWpm} | Accuracy: {userAccuracy.toFixed(1)}%
            </p>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              maxLength={20}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmitScore}
                disabled={submitting}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
              <button
                onClick={() => setShowSubmitForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowSubmitForm(true)}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4"
          >
            Submit Your Score
          </button>
        )}

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-2">Top Scores</h3>
            {scores.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No scores yet. Be the first!</p>
            ) : (
              <div className="space-y-2">
                {scores.map((score, index) => {
                  const isTopThree = index < 3;
                  const getPositionStyle = () => {
                    switch (index) {
                      case 0: // 1st place for rank system
                        return {
                          bg: "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300",
                          icon: "👑🐸👑",
                          rank: "🥇"
                        };
                      case 1: // 2nd place
                        return {
                          bg: "bg-gradient-to-r from-gray-100 to-gray-300 border-gray-400",
                          icon: "🐸",
                          rank: "🥈"
                        };
                      case 2: // 3rd place
                        return {
                          bg: "bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300",
                          icon: "🐸",
                          rank: "🥉"
                        };
                      default:
                        return {
                          bg: "bg-gray-50",
                          icon: "",
                          rank: `${index + 1}`
                        };
                    }
                  };

                  const positionStyle = getPositionStyle();

                  return (
                    <div
                      key={score.id}
                      className={`flex justify-between items-center p-3 rounded border-2 ${positionStyle.bg} ${
                        isTopThree ? 'shadow-md transform scale-105' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{positionStyle.rank}</span>
                          {isTopThree && (
                            <span className="text-xl">{positionStyle.icon}</span>
                          )}
                        </div>
                        <span className={`font-medium ${isTopThree ? 'text-lg' : ''}`}>
                          {score.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${isTopThree ? 'text-xl' : 'text-lg'}`}>
                          {score.wpm} WPM
                        </div>
                        <div className="text-sm text-gray-500">
                          {score.accuracy.toFixed(1)}% accuracy
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard; 
