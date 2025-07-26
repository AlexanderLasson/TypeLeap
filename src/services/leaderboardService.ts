import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface LeaderboardEntry {
  id?: string;
  name: string;
  wpm: number;
  accuracy: number;
  timestamp: Date;
}

export const leaderboardService = {
  // Add a new score to the leaderboard
  async addScore(entry: Omit<LeaderboardEntry, 'id' | 'timestamp'>): Promise<void> {
    try {
      await addDoc(collection(db, 'leaderboard'), {
        ...entry,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error adding score to leaderboard:', error);
      throw error;
    }
  },

  // Get top scores from the leaderboard
  async getTopScores(limitCount: number = 10): Promise<LeaderboardEntry[]> {
    try {
      const q = query(
        collection(db, 'leaderboard'),
        orderBy('wpm', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      const scores: LeaderboardEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        scores.push({
          id: doc.id,
          name: data.name,
          wpm: data.wpm,
          accuracy: data.accuracy,
          timestamp: data.timestamp.toDate()
        });
      });
      
      return scores;
    } catch (error) {
      console.error('Error getting leaderboard scores:', error);
      throw error;
    }
  }
}; 