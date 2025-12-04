import api from "./axiosInstance";

// ============ PARTICIPANTS ============
export interface CreateParticipantPayload {
  fullname: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  registrationNumber: string;
  role?: "admin" | "participant" | "author";
  teamId?: number | null;
}

export interface UpdateParticipantPayload {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  password?: string;
  registrationNumber?: string;
  role?: "admin" | "participant" | "author";
  teamId?: number | null;
}

export async function getAllParticipants() {
  const res = await api.get("/participants");
  return res.data;
}

export async function getParticipantById(id: number) {
  const res = await api.get(`/participants/${id}`);
  return res.data;
}

export async function createParticipant(payload: CreateParticipantPayload) {
  const res = await api.post("/participants", payload);
  return res.data;
}

export async function updateParticipant(id: number, payload: UpdateParticipantPayload) {
  const res = await api.put(`/participants/${id}`, payload);
  return res.data;
}

export async function deleteParticipant(id: number) {
  const res = await api.delete(`/participants/${id}`);
  return res.data;
}

// ============ TEAMS ============
export interface CreateTeamPayload {
  teamName: string;
  score?: number;
  image?: string | null;
}

export interface UpdateTeamPayload {
  teamName?: string;
  score?: number;
  image?: string | null;
}

export async function getAllTeams() {
  const res = await api.get("/teams");
  return res.data;
}

export async function getTeamById(id: number) {
  const res = await api.get(`/teams/${id}`);
  return res.data;
}

export async function createTeam(payload: CreateTeamPayload) {
  const res = await api.post("/teams", payload);
  return res.data;
}

export async function updateTeam(id: number, payload: UpdateTeamPayload) {
  const res = await api.put(`/teams/${id}`, payload);
  return res.data;
}

export async function deleteTeam(id: number) {
  const res = await api.delete(`/teams/${id}`);
  return res.data;
}

export async function addParticipantToTeam(teamId: number, participantId: number) {
  const res = await api.post(`/teams/${teamId}/participants`, { participantId });
  return res.data;
}

export async function removeParticipantFromTeam(teamId: number, participantId: number) {
  const res = await api.delete(`/teams/${teamId}/participants/${participantId}`);
  return res.data;
}

// ============ TIMER ============
export interface TimerState {
  id?: number;
  timeLeft: number; // in seconds
  displayTime?: number; // calculated display time
  isRunning: boolean;
  isPaused: boolean;
  startTime?: number | null;
  pausedAt?: number | null;
  createdAt?: string;
  updatedAt?: string;
}

export async function getTimer(): Promise<TimerState> {
  const res = await api.get("/timer");
  return res.data.data.timer;
}

export async function setTimer(timeInSeconds: number): Promise<TimerState> {
  const res = await api.post("/timer", { timeInSeconds });
  return res.data.data.timer;
}

export async function startTimer(): Promise<TimerState> {
  const res = await api.post("/timer/start");
  return res.data.data.timer;
}

export async function pauseTimer(): Promise<TimerState> {
  const res = await api.post("/timer/pause");
  return res.data.data.timer;
}

export async function resumeTimer(): Promise<TimerState> {
  const res = await api.post("/timer/resume");
  return res.data.data.timer;
}

export async function stopTimer(): Promise<TimerState> {
  const res = await api.post("/timer/stop");
  return res.data.data.timer;
}

export async function resetTimer(): Promise<TimerState> {
  const res = await api.post("/timer/reset");
  return res.data.data.timer;
}

// ============ AUTHOR REQUESTS ============
export interface AuthorRequest {
  id: number;
  participantId: number;
  participantName?: string;
  participantEmail?: string;
  teamName?: string;
  message?: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  participant?: {
    id: number;
    fullname: string;
    email: string;
    username: string;
    teamId?: number | null;
    team?: {
      id: number;
      teamName: string;
    };
  };
}

export async function getAllAuthorRequests(status?: "pending" | "approved" | "rejected"): Promise<AuthorRequest[]> {
  const params = status ? { status } : {};
  const res = await api.get("/author-requests", { params });
  return res.data.data.requests;
}

export async function getAuthorRequestById(id: number): Promise<AuthorRequest> {
  const res = await api.get(`/author-requests/${id}`);
  return res.data.data.request;
}

export async function createAuthorRequest(participantId: number, message?: string): Promise<AuthorRequest> {
  const res = await api.post("/author-requests", { participantId, message });
  return res.data.data.request;
}

export async function updateAuthorRequestStatus(id: number, status: "approved" | "rejected"): Promise<AuthorRequest> {
  const res = await api.put(`/author-requests/${id}/status`, { status });
  return res.data.data.request;
}

export async function deleteAuthorRequest(id: number): Promise<void> {
  await api.delete(`/author-requests/${id}`);
}

