import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute"
import InternshipCoursePage from "./pages/InternshipCoursePage";
import CourseDetailPage from "./pages/CourseDetailPage";
export const publicRoutes = [
  
  { path: "/", element: <LoginPage /> },

];


export const studentRoutes = [
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <h1>Student Page</h1>
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
];


