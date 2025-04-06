import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute"
import InternshipCoursePage from "./pages/lecturer/InternshipCoursePage";
import CourseDetailPage from "./pages/lecturer/CourseDetailPage";
import InternshipDetail from "./pages/student/InternshipDetail";
import ResetPassword from "./pages/ResetPassword";
import InternshipDetailPage from "./pages/lecturer/InternshipDetailPage";
import AnnouncementManagementPage from "./pages/lecturer/AnnouncementManagementPage";
import CreateCvPage from "./pages/student/CreateCvPage";
import AnnouncementListPage from "./pages/student/AnnouncementListPage";

export const publicRoutes = [
  
  { path: "/", element: <LoginPage /> },
  { path: "/reset-password", element: <ResetPassword /> },
];


export const studentRoutes = [
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <h1>Dashboard</h1>
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <h1>Dashboard</h1>
      </ProtectedRoute>
    ),
  },
  {
    path: "internship-detail",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <InternshipDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "internship-detail/announcement-list/:course_id",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <AnnouncementListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "create-cv",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <CreateCvPage />
      </ProtectedRoute>
    ),
  },
];

export const lecturerRoutes = [
  {
    path: "/lecturer",
    element: (
      <ProtectedRoute allowedRoles={["lecturer"]}>
        <h1>Lecturer Page</h1>
      </ProtectedRoute>
    ),
  },
  {
    path: "courses",
    element: (
      <ProtectedRoute allowedRoles={["lecturer"]}>
        <InternshipCoursePage/>
      </ProtectedRoute>
    ),
  },
  {
    path: "courses/:course_id",
    element: (
      <ProtectedRoute allowedRoles={["lecturer"]}>
        <CourseDetailPage/>
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute allowedRoles={["lecturer"]}>
        <h1>Dashboard</h1>
      </ProtectedRoute>
    ),
  },
  {
    path: "internships/:internship_detail_id",
    element: (
      <ProtectedRoute allowedRoles={["lecturer"]}>
        <InternshipDetailPage/>
      </ProtectedRoute>
    ),
  },
  {
    path: "courses/:course_id/announcements",
    element: (
      <ProtectedRoute allowedRoles={["lecturer"]}>
        <AnnouncementManagementPage/>
      </ProtectedRoute>
    ),
  },
];


