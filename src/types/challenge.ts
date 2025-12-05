export interface Challenge {
  id?: number;
  name: string;
  description?: string | null;
  photo?: string | null;
  flag: string;
  storyNumber: number;
  challengeScore: number;
  maxAttempts?: number; // Maximum number of attempts allowed for this challenge (defaults to 4)
  storyId: number;
  submissionStatus?: {
    solved: boolean;
    attemptCount: number;
    remainingAttempts: number;
    submissions?: any[];
  };

  createdAt?: string;
  updatedAt?: string;
}
