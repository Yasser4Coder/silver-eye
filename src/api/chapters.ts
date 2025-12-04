import api from "./axiosInstance";
import type { Chapter } from "../types/chapter";

export interface ChapterStatus {
  status: "open" | "closed" | "upcoming" | "not_found";
  opensAt: string | null;
  closesAt: string | null;
  isOpen: boolean;
  timeUntilOpen?: number;
  timeRemaining?: number;
  closedBy?: string;
}

export interface ChapterWithStatus extends Chapter {
  status?: ChapterStatus;
}

export interface GetAllChaptersResponse {
  success: boolean;
  message: string;
  data: {
    chapters: ChapterWithStatus[];
    count: number;
  };
}

export async function getAllChapters(): Promise<ChapterWithStatus[]> {
  const res = await api.get<GetAllChaptersResponse>("/chapters");
  return res.data.data.chapters;
}

export interface GetChapterStatusResponse {
  success: boolean;
  message: string;
  data: {
    status: ChapterStatus;
  };
}

export async function getChapterStatus(chapterId: number): Promise<ChapterStatus> {
  const res = await api.get<GetChapterStatusResponse>(`/chapters/${chapterId}/status`);
  return res.data.data.status;
}

export interface GetChapterChallengesResponse {
  success: boolean;
  message: string;
  data: {
    chapter: ChapterWithStatus;
  };
}

export async function getChapterChallenges(chapterId: number): Promise<ChapterWithStatus> {
  const res = await api.get<GetChapterChallengesResponse>(`/chapters/${chapterId}/challenges`);
  return res.data.data.chapter;
}

export interface GetChallengeDetailsResponse {
  success: boolean;
  message: string;
  data: {
    challenge: any;
  };
}

export async function getChallengeDetails(challengeId: number): Promise<any> {
  const res = await api.get<GetChallengeDetailsResponse>(`/challenges/${challengeId}/details`);
  return res.data.data.challenge;
}

export interface SubmitChallengeAnswerRequest {
  answer: string;
}

export interface SubmitChallengeAnswerResponse {
  success: boolean;
  message: string;
  data: {
    isCorrect: boolean;
    attemptNumber?: number;
    remainingAttempts?: number;
    pointsAwarded?: number;
    newTeamScore?: number;
    alreadySolved?: boolean;
    maxAttemptsReached?: boolean;
    chapterClosed?: boolean;
  };
}

export async function submitChallengeAnswer(
  challengeId: number,
  answer: string
): Promise<SubmitChallengeAnswerResponse> {
  const res = await api.post<SubmitChallengeAnswerResponse>(
    `/challenges/${challengeId}/submit`,
    { answer }
  );
  return res.data;
}

