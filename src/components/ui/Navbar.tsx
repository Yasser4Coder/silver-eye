import { Link, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { pathname } = useLocation();

  const isActive = (p: string) => pathname === p;

  const [open, setOpen] = useState(false);

  const links = [
    { path: "/chapters", label: "CHAPTERS" },
    { path: "/characters", label: "CHARACTERS" },
    { path: "/classboard", label: "CLASSBOARD" },
    { path: "/timer", label: "TIMER" },
    { path: "/calltoauthor", label: "CALL TO AUTHOR" },
  ];

  return (
    <nav
    
  className="
    relative z-50
    w-[95%] h-20 mx-auto
    bg-white/5
    backdrop-blur-2xl
    border border-white/10
    shadow-[0_0_25px_rgba(255,0,0,0.08)]
    rounded-xl
    flex items-center justify-between
    px-6 md:px-10 mt-2
  "


    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 cursor-pointer">
        <div className="w-14 h-14 rounded-full flex items-center justify-center">
          <img src={logo} alt="silver eye" />
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-12">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              font-[YouMurderer] text-xl tracking-wider transition-all duration-200
              ${
                isActive(link.path)
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }
            `}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* User Dropdown (desktop) */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-red-600 bg-black/40 flex items-center justify-center">
              <User className="text-red-500" size={26} />
            </div>

            <div className="flex flex-col leading-tight text-white">
              <span className="font-semibold text-lg">
                {user?.fullname || user?.username || "User"}
              </span>
              <span className="text-sm opacity-80">{user?.username || ""}</span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 bg-black/90 border border-red-600/40 text-white shadow-xl">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-red-500/40" />

            {user?.role === "admin" && (
              <>
                <Link to="/admin">
                  <DropdownMenuItem className="cursor-pointer hover:bg-red-600/30">
                    Admin Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-red-500/40" />
              </>
            )}

            <DropdownMenuItem
              className="cursor-pointer hover:bg-red-600/30"
              onClick={() => logout()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Menu Content */}
      {open && (
        <div
          className="
            absolute top-20 left-0 w-full
            bg-black/80 backdrop-blur-xl
            border-t border-red-600/30
            flex flex-col items-center gap-6 py-6
            md:hidden
          "
        >
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`
                font-[YouMurderer] text-2xl tracking-widest
                ${
                  isActive(link.path)
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                }
              `}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile User Dropdown (simple version) */}
          <button
            onClick={() => logout()}
            className="
              text-lg text-red-500 mt-4
              border border-red-600 px-6 py-2 rounded-xl
              hover:bg-red-600/30 transition
            "
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
