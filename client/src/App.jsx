import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import LecturerLayout from "./layouts/LecturerLayout";
import { studentRoutes, publicRoutes, lecturerRoutes } from "./routes";
import { UserProvider } from "./userContext";


export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Pubic Routes */}
          <Route path="/" >
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
          {/* Private Routes */}
          <Route path="/student" element={<StudentLayout />}>
            {studentRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
          <Route path="/lecturer" element={<LecturerLayout />}>
            {lecturerRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </Router>

    </UserProvider>

  );
}