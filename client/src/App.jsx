import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import { studentRoutes, publicRoutes, lecturerRoutes } from "./routes";
import { UserProvider } from "./userContext";


export default function App() {
  return (
    <UserProvider>
        <Router>
          <Routes>
            {/* Pubic Routes */}
            <Route path="/" element={<MainLayout />}>
              {publicRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
            {/* Private Routes */}
            <Route path="/student">
              {studentRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
            <Route path="/lecturer" element={<AdminLayout/>}>
              {lecturerRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
          </Routes>
        </Router>
      
    </UserProvider>

  );
}