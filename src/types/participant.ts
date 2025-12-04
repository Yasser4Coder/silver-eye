import type { Team } from "./team";

export interface Participant {
  id: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  username: string;
  registrationNumber: string;
  role: 'admin' | 'participant' | 'author';
  teamId?: number | null;
  team?: Team | null;
  createdAt: string;
  updatedAt: string;
}
