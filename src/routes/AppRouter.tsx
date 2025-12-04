import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import LoginPage from "../pages/Login/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";
import MainPage from "../pages/Main/MainPage";
import ChaptersPage from "../pages/Chapters/ChaptersPage";
import CharactersPage from "../pages/Characters/CharactersPage";
import ClassboardPage from "../pages/Classboard/ClassboardPage";
import TimerPage from "../pages/Timer/TimerPage";
import ChallengePage from "../pages/Challenge/ChallengePage";
import ChallengeFormPage from "../pages/Challenge/ChallengeFormPage";

// Admin pages
import DashboardPage from "../pages/Admin/DashboardPage";
import ParticipantsPage from "../pages/Admin/ParticipantsPage";
import TeamsPage from "../pages/Admin/TeamsPage";
import AuthorRequestsPage from "../pages/Admin/AuthorRequestsPage";
import TimerControlPage from "../pages/Admin/TimerControlPage";
import NotificationsPage from "../pages/Admin/NotificationsPage";
import CalltoAuthor from "../pages/CalltoAuthor/CalltoAuthor";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="classboard" element={<ClassboardPage />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="timer" element={<TimerPage />} />
          <Route path="calltoauthor" element={<CalltoAuthor />} />

          {/* Chapters List */}
          <Route path="chapters" element={<ChaptersPage />} />

          {/* Challenges List for One Chapter */}
          <Route path="chapters/:chapterId" element={<ChallengePage />} />

          {/* Single Challenge Page (form ) */}
         <Route path="chapters/:chapterId/challenge/:challengeId" element={<ChallengeFormPage />} />

        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="admin" element={<DashboardPage />} />
          <Route path="admin/participants" element={<ParticipantsPage />} />
          <Route path="admin/teams" element={<TeamsPage />} />
          <Route path="admin/author-requests" element={<AuthorRequestsPage />} />
          <Route path="admin/timer" element={<TimerControlPage />} />
          <Route path="admin/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
