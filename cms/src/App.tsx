import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CmsShell } from "./layouts/CmsShell";
import LoginPage from "./pages/LoginPage.tsx";
import WriterDashboardPage from "./pages/WriterDashboardPage.tsx";
import ArticlesListPage from "./pages/ArticlesListPage.tsx";
import ArticleEditorPage from "./pages/ArticleEditorPage.tsx";
import ActivityLogPage from "./pages/ActivityLogPage.tsx";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage.tsx";
import WritersPage from "./pages/WritersPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import AssignmentsPage from "./pages/AssignmentsPage.tsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<CmsShell />}>
              <Route index element={<WriterDashboardPage />} />
              <Route path="articles" element={<ArticlesListPage />} />
              <Route path="articles/new" element={<ArticleEditorPage />} />
              <Route path="articles/:id" element={<ArticleEditorPage />} />
              <Route path="assignments" element={<AssignmentsPage />} />
              <Route
                element={<ProtectedRoute roles={["editor", "admin"]} />}
              >
                <Route path="writers" element={<WritersPage />} />
              </Route>
              <Route element={<ProtectedRoute roles={["admin"]} />}>
                <Route path="users" element={<UsersPage />} />
                <Route path="admin/analytics" element={<AdminAnalyticsPage />} />
                <Route path="admin/activity" element={<ActivityLogPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
