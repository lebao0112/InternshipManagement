import { Outlet } from "react-router-dom";
import Sidebar2 from "../components/Sidebar2";

export default function StudentLayout() {
    return (
        <div className="flex">
            <Sidebar2 />
            <main className="flex-1 container px-4 py-6 ml-64">
                <Outlet />
            </main>
        </div>
    );
} 