import type{ Challenge } from "./challenge";

export interface Story {
  id?: number;
  storyNumber: number;
  storyScript: string;
  challengeCount: number;
  chapterId: number;
  challengeItems?: Challenge[];

  createdAt?: string;
  updatedAt?: string;
}
