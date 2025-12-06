/**
 * Classboard Freeze Configuration
 *
 * Set FREEZE_ENABLED to true to freeze the leaderboard with the scores below.
 * Set to false to return to normal, real-time leaderboard.
 *
 * This is used to create suspense for participants.
 */

export const FREEZE_ENABLED = true; // Change to false to disable freeze mode

// Frozen team scores - displayed in order when freeze mode is enabled
// Teams are listed in the exact ranking order desired
export const FROZEN_TEAMS = [
  { teamName: "THE SAVIORS", score: 465 },
  { teamName: "IN SPY", score: 465 },
  { teamName: "RB3", score: 450 },
  { teamName: "TRIPLE VIBES", score: 450 },
  { teamName: "NEXT", score: 445 },
  { teamName: "IDK", score: 440 },
  { teamName: "THE MATRIX", score: 425 },
  { teamName: "SIGMA", score: 425 },
  { teamName: "M9", score: 415 },
  { teamName: "CRIMSON ROSES", score: 415 },
  { teamName: "EX EB", score: 395 },
  { teamName: "THE SILVER BULLET", score: 395 },
  { teamName: "3RT", score: 390 },
  { teamName: "THE SENTINELS", score: 370 },
  { teamName: "SAUCE", score: 365 },
  { teamName: "THE PHOENIX", score: 365 },
  { teamName: "NEN TRAS", score: 0 },
];

/**
 * Apply frozen scores to real teams data
 * Matches teams by team name and applies frozen scores/ranks
 */
export const applyFrozenScores = (realTeams: any[]) => {
  // Create a map of frozen scores by team name (case-insensitive)
  const frozenScoresMap = new Map<string, number>();
  FROZEN_TEAMS.forEach((frozenTeam) => {
    frozenScoresMap.set(frozenTeam.teamName.toUpperCase(), frozenTeam.score);
  });

  // Match real teams with frozen scores and maintain order from FROZEN_TEAMS
  const teamMap = new Map<string, any>();
  realTeams.forEach((team) => {
    const teamNameUpper = (team.teamName || "").toUpperCase();
    teamMap.set(teamNameUpper, team);
  });

  // Build result array in the exact order specified in FROZEN_TEAMS
  const result: any[] = [];

  FROZEN_TEAMS.forEach((frozenTeam, index) => {
    const teamNameUpper = frozenTeam.teamName.toUpperCase();
    const realTeam = teamMap.get(teamNameUpper);

    if (realTeam) {
      // Team exists in real data - use it with frozen score
      result.push({
        ...realTeam,
        score: frozenTeam.score,
        rank: index + 1, // Sequential ranks (1, 2, 3, ...)
      });
    } else {
      // Team doesn't exist in real data - create placeholder
      result.push({
        id: index + 1000, // Temporary ID
        teamName: frozenTeam.teamName,
        score: frozenTeam.score,
        rank: index + 1,
        memberCount: 0,
        Participants: [],
      });
    }
  });

  // Add any real teams that weren't in the frozen list (keep their original scores)
  realTeams.forEach((team) => {
    const teamNameUpper = (team.teamName || "").toUpperCase();
    const isInFrozenList = FROZEN_TEAMS.some(
      (ft) => ft.teamName.toUpperCase() === teamNameUpper
    );

    if (!isInFrozenList) {
      // Calculate rank for teams not in frozen list
      // They should be ranked after all frozen teams
      const rank = result.length + 1;
      result.push({
        ...team,
        rank: rank,
      });
    }
  });

  // Sort non-frozen teams by score (descending) and reassign ranks
  const frozenCount = FROZEN_TEAMS.length;
  const nonFrozenTeams = result.slice(frozenCount);
  const sortedNonFrozen = nonFrozenTeams.sort((a, b) => {
    const scoreA = a.score || 0;
    const scoreB = b.score || 0;
    return scoreB - scoreA;
  });

  // Reassign ranks for non-frozen teams
  sortedNonFrozen.forEach((team, index) => {
    team.rank = frozenCount + index + 1;
  });

  // Return frozen teams first, then sorted non-frozen teams
  return [...result.slice(0, frozenCount), ...sortedNonFrozen];
};
