import type { Story } from "./story";

export interface Chapter {
  id?: number;
  chapterNumber: number;
  chapterId: string;
  chapterImage?: string | null;
  chapterScript: string;
  opensAt?: string | null;
  duration?: number | null;

  stories?: Story[];

  createdAt?: string;
  updatedAt?: string;
}
