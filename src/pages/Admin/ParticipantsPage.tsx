import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import {
  getAllParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
  getAllTeams,
  type CreateParticipantPayload,
  type UpdateParticipantPayload,
} from "../../api/admin";
import type { Participant } from "../../types/participant";
import type { Team } from "../../types/team";
import Button from "../../components/ui/Button";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [formData, setFormData] = useState<CreateParticipantPayload>({
    fullname: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    registrationNumber: "",
    role: "participant",
    teamId: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [participantsRes, teamsRes] = await Promise.all([
        getAllParticipants(),
        getAllTeams(),
      ]);
      setParticipants(participantsRes.data?.participants || []);
      setTeams(teamsRes.data?.teams || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (participant?: Participant) => {
    if (participant) {
      setEditingParticipant(participant);
      setFormData({
        fullname: participant.fullname,
        email: participant.email,
        phoneNumber: participant.phoneNumber,
        username: participant.username,
        password: "",
        registrationNumber: participant.registrationNumber,
        role: participant.role,
        teamId: participant.teamId || null,
      });
    } else {
      setEditingParticipant(null);
      setFormData({
        fullname: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        registrationNumber: "",
        role: "participant",
        teamId: null,
      });
    }
    setShowModal(true);
    setError(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingParticipant(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingParticipant) {
        const payload: UpdateParticipantPayload = { ...formData };
        if (!payload.password) delete payload.password;
        await updateParticipant(editingParticipant.id, payload);
      } else {
        await createParticipant(formData);
      }
      await fetchData();
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this participant?")) return;

    try {
      await deleteParticipant(id);
      await fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete participant");
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
        <h1 className="font-[YouMurderer] text-4xl text-red-600 tracking-wider">
          PARTICIPANTS
        </h1>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" />
          Add Participant
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-black/40 backdrop-blur-xl border border-red-600/30 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-600/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {participants.map((participant) => (
                <tr key={participant.id} className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {participant.fullname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white/70">
                    {participant.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white/70">
                    {participant.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        participant.role === "admin"
                          ? "bg-red-600/30 text-red-400"
                          : participant.role === "author"
                          ? "bg-blue-600/30 text-blue-400"
                          : "bg-green-600/30 text-green-400"
                      }`}
                    >
                      {participant.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white/70">
                    {participant.team?.teamName || "No Team"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => handleOpenModal(participant)}
                      className="text-blue-400 hover:text-blue-300 mr-4"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(participant.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/90 border border-red-600/50 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-[YouMurderer] text-2xl text-red-600">
                {editingParticipant ? "Edit Participant" : "Add Participant"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullname}
                    onChange={(e) =>
                      setFormData({ ...formData, fullname: e.target.value })
                    }
                    className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Username</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Password {editingParticipant && "(leave empty to keep current)"}
                  </label>
                  <input
                    type="password"
                    required={!editingParticipant}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, registrationNumber: e.target.value })
                    }
                    className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as "admin" | "participant" | "author",
                      })
                    }
                    className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="participant">Participant</option>
                    <option value="admin">Admin</option>
                    <option value="author">Author</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Team</label>
                  <select
                    value={formData.teamId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamId: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    className="w-full bg-black/40 border border-red-600/50 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">No Team</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.teamName}
                      </option>
                    ))}
                  </select>
                </div>
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
                  {editingParticipant ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

