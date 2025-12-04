import { useEffect, useState } from "react";
import { Users, UsersRound, MessageSquare, Clock, Bell } from "lucide-react";
import { getAllParticipants, getAllTeams, getAllAuthorRequests } from "../../api/admin";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    participants: 0,
    teams: 0,
    pendingRequests: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [participantsRes, teamsRes] = await Promise.all([
          getAllParticipants(),
          getAllTeams(),
        ]);

        const requestsRes = await getAllAuthorRequests();
        const pendingRequests = requestsRes.filter((r) => r.status === "pending").length;

        setStats({
          participants: participantsRes.data?.count || 0,
          teams: teamsRes.data?.count || 0,
          pendingRequests,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Participants",
      value: stats.participants,
      icon: Users,
      link: "/admin/participants",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Teams",
      value: stats.teams,
      icon: UsersRound,
      link: "/admin/teams",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: MessageSquare,
      link: "/admin/author-requests",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Timer Control",
      value: "Active",
      icon: Clock,
      link: "/admin/timer",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Notifications",
      value: "Send",
      icon: Bell,
      link: "/admin/notifications",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="font-[YouMurderer] text-4xl text-red-600 mb-8 tracking-wider">
        ADMIN DASHBOARD
      </h1>

      {stats.loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.link}
                className={`
                  ${card.bgColor} border border-white/10 rounded-xl p-6
                  hover:border-red-600/50 transition-all
                  cursor-pointer
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={card.color} size={32} />
                </div>
                <h3 className="text-white/60 text-sm mb-2">{card.title}</h3>
                <p className={`${card.color} font-bold text-2xl`}>
                  {typeof card.value === "number" ? card.value : card.value}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

