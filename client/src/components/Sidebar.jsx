import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    }


    return (
        <aside className="w-64 h-screen bg-[#0063CD] text-white p-5 fixed">
            <h2 className="text-xl font-bold mb-5 mt-6">Admin Panel</h2>
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link to="courses" className="flex items-center gap-2  p-2 rounded hover:bg-blue-400">
                            <FaBriefcase /> Quản lý thực tập
                        </Link>
                    </li>
                    {/* <li className="mb-4">
                        <Link to="" className="flex items-center gap-2  p-2 rounded hover:bg-blue-400">
                            <FaUser /> Tài khoản (Profile)
                        </Link>
                    </li> */}
                    <li>
                        <button className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-blue-400" onClick={handleLogout}>
                            <FaSignOutAlt /> Đăng xuất
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}