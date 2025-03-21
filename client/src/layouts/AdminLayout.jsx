import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 container px-4 py-6 ml-64">
                <Outlet />
            </main>
        </div>
    );
}
