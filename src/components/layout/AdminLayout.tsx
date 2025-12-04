import { Link, useLocation, Outlet } from "react-router-dom";
import { 
  Users, 
  UsersRound, 
  Clock, 
  MessageSquare,
  Home,
  LogOut
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.svg";

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { path: "/admin", label: "Dashboard", icon: Home },
    { path: "/admin/participants", label: "Participants", icon: Users },
    { path: "/admin/teams", label: "Teams", icon: UsersRound },
    { path: "/admin/author-requests", label: "Author Requests", icon: MessageSquare },
    { path: "/admin/timer", label: "Timer Control", icon: Clock },
  ];

  return (
    <div className="h-screen flex bg-black/40">
      {/* Sidebar */}
      <aside className="w-64 bg-black/60 backdrop-blur-xl border-r border-red-600/30 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-red-600/30">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Silver Eye" className="w-10 h-10" />
            <div>
              <h1 className="font-[YouMurderer] text-red-600 text-xl tracking-wider">
                ADMIN
              </h1>
              <p className="text-white/60 text-xs">{user?.fullname || user?.username}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive(link.path)
                      ? "bg-red-600/30 text-red-500 border border-red-600/50"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-[YouMurderer] tracking-wider">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-red-600/30">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-red-600/20 hover:text-red-500 transition-all"
          >
            <LogOut size={20} />
            <span className="font-[YouMurderer] tracking-wider">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

