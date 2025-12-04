import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, UserPlus, UserMinus } from "lucide-react";
import {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  getAllParticipants,
  addParticipantToTeam,
  removeParticipantFromTeam,
  type CreateTeamPayload,
} from "../../api/admin";
import type { Team } from "../../types/team";
import type { Participant } from "../../types/participant";
import Button from "../../components/ui/Button";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState<CreateTeamPayload>({
    teamName: "",
    score: 0,
    image: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [teamsRes, participantsRes] = await Promise.all([
        getAllTeams(),
        getAllParticipants(),
      ]);
      setTeams(teamsRes.data?.teams || []);
      setParticipants(participantsRes.data?.participants || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (team?: Team) => {
    if (team) {
      setEditingTeam(team);
      setFormData({
        teamName: team.teamName,
        score: team.score,
        image: team.image || null,
      });
    } else {
      setEditingTeam(null);
      setFormData({
        teamName: "",
        score: 0,
        image: null,
      });
    }
    setShowModal(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTeam(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Prepare payload - remove null/empty image
      const payload = { ...formData };
      if (!payload.image || payload.image.trim() === '') {
        delete payload.image;
      }

      if (editingTeam) {
        await updateTeam(editingTeam.id!, payload);
      } else {
        await createTeam(payload);
      }
      await fetchData();
      handleCloseModal();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.[0]?.msg || 
                          "Operation failed";
      setError(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team?")) return;

    try {
      await deleteTeam(id);
      await fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete team");
    }
  };

  const handleAddParticipant = async (teamId: number, participantId: number) => {
    try {
      await addParticipantToTeam(teamId, participantId);
      await fetchData();
      setShowParticipantModal(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add participant");
    }
  };

  const handleRemoveParticipant = async (teamId: number, participantId: number) => {
    try {
      await removeParticipantFromTeam(teamId, participantId);
      await fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to remove participant");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-[YouMurderer] text-4xl text-red-600 tracking-wider">TEAMS</h1>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" />
          Add Team
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-black/40 backdrop-blur-xl border border-red-600/30 rounded-xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-[YouMurderer] text-xl text-red-600 mb-1">
                  {team.teamName}
                </h3>
                <p className="text-white/60 text-sm">Rank: {team.rank || "N/A"}</p>
                <p className="text-white/60 text-sm">Score: {team.score}</p>
                <p className="text-white/60 text-sm">
                  Members: {team.memberCount || team.members?.length || 0}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedTeam(team);
                    setShowParticipantModal(true);
                  }}
                  className="text-blue-400 hover:text-blue-300"
                  title="Manage Participants"
                >
                  <UserPlus size={18} />
                </button>
                <button
                  onClick={() => handleOpenModal(team)}
                  className="text-yellow-400 hover:text-yellow-300"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(team.id!)}
                  className="text-red-400 hover:text-red-300"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {team.members && team.members.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm mb-2">Members:</p>
                <div className="space-y-1">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-white/70">{member.fullname}</span>
                      <button
                        onClick={() => handleRemoveParticipant(team.id!, member.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <UserMinus size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Team Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/90 border border-red-600/50 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-[YouMurderer] text-2xl text-red-600">
                {editingTeam ? "Edit Team" : "Add Team"}
              </h2>
              <button onClick={handleCloseModal} className="text-white/70 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Team Name</label>
                <input
                  type="text"
                  required
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                  className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Score</label>
                <input
                  type="number"
                  required
                  value={formData.score}
                  onChange={(e) =>
                    setFormData({ ...formData, score: parseInt(e.target.value) || 0 })
                  }
                  className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value || null })
                  }
                  className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Optional"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900/50 border border-red-600 rounded">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <Button variant="secondary" type="button" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingTeam ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Participant Management Modal */}
      {showParticipantModal && selectedTeam && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/90 border border-red-600/50 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-[YouMurderer] text-2xl text-red-600">
                Manage Participants - {selectedTeam.teamName}
              </h2>
              <button
                onClick={() => {
                  setShowParticipantModal(false);
                  setSelectedTeam(null);
                }}
                className="text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {participants
                .filter((p) => !p.teamId || p.teamId === selectedTeam.id)
                .map((participant) => (
                  <div
                    key={participant.id}
                    className="flex justify-between items-center p-3 bg-black/40 rounded"
                  >
                    <span className="text-white">{participant.fullname}</span>
                    {participant.teamId === selectedTeam.id ? (
                      <button
                        onClick={() =>
                          handleRemoveParticipant(selectedTeam.id!, participant.id)
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleAddParticipant(selectedTeam.id!, participant.id)
                        }
                        className="text-green-400 hover:text-green-300"
                      >
                        Add
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

