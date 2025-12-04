import { useState, useEffect } from "react";
import { Check, X as XIcon, Trash2 } from "lucide-react";
import {
  getAllAuthorRequests,
  updateAuthorRequestStatus,
  deleteAuthorRequest,
  type AuthorRequest,
} from "../../api/admin";
import Button from "../../components/ui/Button";

export default function AuthorRequestsPage() {
  const [requests, setRequests] = useState<AuthorRequest[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, [filter]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = filter === "all" ? undefined : filter;
      const allRequests = await getAllAuthorRequests(status);
      setRequests(allRequests);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load requests");
      console.error("Failed to load requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      setError(null);
      await updateAuthorRequestStatus(id, "approved");
      await loadRequests();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to approve request");
    }
  };

  const handleReject = async (id: number) => {
    try {
      setError(null);
      await updateAuthorRequestStatus(id, "rejected");
      await loadRequests();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reject request");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    try {
      setError(null);
      await deleteAuthorRequest(id);
      await loadRequests();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete request");
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-[YouMurderer] text-4xl text-red-600 tracking-wider">
          AUTHOR REQUESTS
        </h1>
        {pendingCount > 0 && (
          <span className="px-4 py-2 bg-yellow-600/30 text-yellow-400 rounded-lg">
            {pendingCount} Pending
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-2 rounded-lg transition-all
              ${
                filter === f
                  ? "bg-red-600/30 text-red-400 border border-red-600/50"
                  : "bg-black/40 text-white/70 hover:bg-white/5"
              }
            `}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-600 rounded">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            <p>No requests found</p>
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="bg-black/40 backdrop-blur-xl border border-red-600/30 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-[YouMurderer] text-xl text-red-600 mb-2">
                    {request.participantName || request.participant?.fullname || "Unknown"}
                  </h3>
                  <p className="text-white/70 text-sm">
                    Email: {request.participantEmail || request.participant?.email || "N/A"}
                  </p>
                  {(request.teamName || request.participant?.team?.teamName) && (
                    <p className="text-white/70 text-sm">
                      Team: {request.teamName || request.participant?.team?.teamName}
                    </p>
                  )}
                  <p className="text-white/70 text-sm">
                    Date: {new Date(request.createdAt).toLocaleString()}
                  </p>
                  {request.message && (
                    <p className="text-white/80 mt-2 p-3 bg-black/40 rounded">
                      {request.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      px-3 py-1 rounded text-xs
                      ${
                        request.status === "pending"
                          ? "bg-yellow-600/30 text-yellow-400"
                          : request.status === "approved"
                          ? "bg-green-600/30 text-green-400"
                          : "bg-red-600/30 text-red-400"
                      }
                    `}
                  >
                    {request.status}
                  </span>
                </div>
              </div>

              {request.status === "pending" && (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(request.id)}
                  >
                    <Check size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleReject(request.id)}
                  >
                    <XIcon size={16} className="mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(request.id)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

