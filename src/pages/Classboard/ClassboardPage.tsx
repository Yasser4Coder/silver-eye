import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { getAllTeams } from "../../api/teams";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../hooks/useAuth";
import type { Team } from "../../types/team";

export default function ClassboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [previousRanks, setPreviousRanks] = useState<Record<number, number>>({});
  const { socket, connected } = useSocket();
  const { user } = useAuth();

  // Fetch initial teams
  useEffect(() => {
    fetchTeams();
  }, []);

  // Listen for WebSocket team updates
  useEffect(() => {
    if (!socket || !connected) return;

    // Join classboard room
    socket.emit("join:classboard");

    const handleTeamsUpdate = (data: { teams: Team[] }) => {
      updateTeamsWithAnimation(data.teams);
    };

    socket.on("teams:update", handleTeamsUpdate);

    return () => {
      socket.off("teams:update", handleTeamsUpdate);
    };
  }, [socket, connected]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await getAllTeams();
      const teamsData = response.teams || [];
      updateTeamsWithAnimation(teamsData);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTeamsWithAnimation = (newTeams: Team[]) => {
    // Store previous ranks before updating
    const currentRanks: Record<number, number> = {};
    teams.forEach((team) => {
      if (team.id) {
        currentRanks[team.id] = team.rank || 999;
      }
    });

    // Sort by rank (ascending - rank 1 is best)
    const sortedTeams = [...newTeams].sort((a, b) => {
      const rankA = a.rank || 999;
      const rankB = b.rank || 999;
      return rankA - rankB;
    });

    // Update previous ranks for next comparison
    setPreviousRanks(currentRanks);
    setTeams(sortedTeams);
  };

  const getRankChange = (teamId: number | undefined): "up" | "down" | "same" => {
    if (!teamId) return "same";
    const previousRank = previousRanks[teamId];
    const currentTeam = teams.find((t) => t.id === teamId);
    const currentRank = currentTeam?.rank || 999;

    if (!previousRank || previousRank === 999) return "same";
    if (currentRank < previousRank) return "up"; // Lower rank number = better position
    if (currentRank > previousRank) return "down"; // Higher rank number = worse position
    return "same";
  };

  const getRankIcon = (change: "up" | "down" | "same") => {
    switch (change) {
      case "up":
        return <TrendingUp className="text-green-400" size={16} />;
      case "down":
        return <TrendingDown className="text-red-400" size={16} />;
      default:
        return <Minus className="text-gray-400" size={16} />;
    }
  };

  const getRankColor = (rank: number | null | undefined) => {
    if (!rank) return "text-white/70";
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-white/70";
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-between text-white py-10 overflow-hidden">
      {/* List container */}
      <div className="w-full max-w-4xl flex flex-col gap-4 overflow-auto px-4 pl-16">
        <AnimatePresence mode="popLayout">
          {teams.map((team, index) => {
            const rankChange = getRankChange(team.id);
            const rank = team.rank || index + 1;
            const isUserTeam = user?.teamId === team.id;

            return (
              <div key={team.id} className="relative flex items-center">
                {/* Arrow indicator - outside and to the left of the card */}
                {isUserTeam && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute -left-12 z-10"
                  >
                    <div className="relative">
                      <ArrowRight 
                        className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" 
                        size={32}
                        strokeWidth={2.5}
                      />
                      <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full" />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    layout: { 
                      type: "spring",
                      stiffness: 100,
                      damping: 25,
                      duration: 1.5
                    },
                  }}
                  className={`
                    border border-red-600/40 bg-red-600/20 hover:bg-red-600/30 
                    transition-all px-6 py-4 rounded-xl flex items-center 
                    justify-between backdrop-blur-sm w-full
                    ${rank === 1 ? "ring-2 ring-yellow-400/50 shadow-lg shadow-yellow-400/20" : ""}
                    ${isUserTeam ? "ring-2 ring-cyan-400/50 border-cyan-400/50 shadow-lg shadow-cyan-400/20" : ""}
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank with trophy for top 3 */}
                    <div className="flex items-center gap-2">
                      {rank === 1 && <Trophy className="text-yellow-400" size={24} />}
                      {rank === 2 && <Trophy className="text-gray-300" size={24} />}
                      {rank === 3 && <Trophy className="text-orange-400" size={24} />}
                      <span
                        className={`text-3xl font-bold font-[CFAnarchy] ${getRankColor(
                          rank
                        )}`}
                      >
                        {rank}
                      </span>
                    </div>

                    {/* Team Name */}
                    <div className="flex flex-col">
                      <span className="text-xl font-[CFAnarchy] tracking-widest">
                        {team.teamName}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <span>Score: {team.score}</span>
                        {team.memberCount !== undefined && (
                          <span>• Members: {team.memberCount}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rank Change Indicator */}
                  {rankChange !== "same" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1"
                    >
                      {getRankIcon(rankChange)}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </AnimatePresence>

        {teams.length === 0 && (
          <div className="text-center py-12 text-white/60">
            <p>No teams found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <h2 className="font-[CFAnarchy] text-5xl tracking-widest mt-6">
        MIND PROFILING
      </h2>
    </div>
  );
}
