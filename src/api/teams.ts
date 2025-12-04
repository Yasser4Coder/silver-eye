import api from "./axiosInstance";
import type { Team } from "../types/team";

export async function getAllTeams(): Promise<{ teams: Team[]; count: number }> {
  const res = await api.get("/teams");
  return res.data.data;
}

export async function getTeamById(id: number): Promise<Team> {
  const res = await api.get(`/teams/${id}`);
  return res.data.data.team;
}

