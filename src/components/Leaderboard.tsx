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
          <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
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
                {scores.map((score, index) => (
                  <div
                    key={score.id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-600 w-6">
                        {index + 1}
                      </span>
                      <span className="font-medium">{score.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{score.wpm} WPM</div>
                      <div className="text-sm text-gray-500">
                        {score.accuracy.toFixed(1)}% accuracy
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard; 