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
import NotificationsPage from "./pages/NotificationsPage.tsx";
import RedirectsPage from "./pages/RedirectsPage.tsx";
import ExercisesListPage from "./pages/ExercisesListPage.tsx";
import ExerciseEditorPage from "./pages/ExerciseEditorPage.tsx";
import RecipesListPage from "./pages/RecipesListPage.tsx";
import RecipeEditorPage from "./pages/RecipeEditorPage.tsx";
import KnowledgePagesListPage from "./pages/KnowledgePagesListPage.tsx";
import KnowledgePageEditorPage from "./pages/KnowledgePageEditorPage.tsx";

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
              <Route path="notifications" element={<NotificationsPage />} />
              <Route
                element={<ProtectedRoute roles={["editor", "admin"]} />}
              >
                <Route path="writers" element={<WritersPage />} />
                <Route path="redirects" element={<RedirectsPage />} />
                <Route path="exercises" element={<ExercisesListPage />} />
                <Route path="exercises/new" element={<ExerciseEditorPage />} />
                <Route path="exercises/:id" element={<ExerciseEditorPage />} />
                <Route path="recipes" element={<RecipesListPage />} />
                <Route path="recipes/new" element={<RecipeEditorPage />} />
                <Route path="recipes/:id" element={<RecipeEditorPage />} />
                <Route
                  path="programs"
                  element={<KnowledgePagesListPage />}
                />
                <Route
                  path="programs/new"
                  element={<KnowledgePageEditorPage />}
                />
                <Route
                  path="programs/:id"
                  element={<KnowledgePageEditorPage />}
                />
                <Route path="reviews" element={<KnowledgePagesListPage />} />
                <Route
                  path="reviews/new"
                  element={<KnowledgePageEditorPage />}
                />
                <Route
                  path="reviews/:id"
                  element={<KnowledgePageEditorPage />}
                />
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
