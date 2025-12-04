import type{ Participant } from "./participant";

export interface Team {
  id?: number;
  teamName: string;
  score: number;
  image?: string | null;
  rank?: number | null;

  members?: Participant[];
  memberCount?: number;

  createdAt?: string;
  updatedAt?: string;
}
