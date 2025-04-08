import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { FaUser, FaSignOutAlt, FaBriefcase } from "react-icons/fa";
import { SiReaddotcv } from "react-icons/si"; 
import { useNavigate } from "react-router-dom";
import UserContext from '../userContext';

export default function Sidebar2() {
    const navigate = useNavigate();
    const { user, loading, error } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    }
    if (loading) return <p>Loading...</p>; // Optionally handle loading state
    if (error) return <p>Error: {error}</p>;

    return (
        <aside className="w-64 h-screen bg-[#0063CD] text-white p-5 fixed">
            <h2 className="text-xl  mb-5 mt-6">Xin chào <span className="font-bold">{user.full_name}</span></h2>
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link to="internship-detail" className="flex items-center gap-2  p-2 rounded hover:bg-blue-400">
                            <FaBriefcase /> Thực tập
                        </Link>
                    </li>
                    {/* <li className="mb-4">
                        <Link to="" className="flex items-center gap-2  p-2 rounded hover:bg-blue-400">
                            <FaUser /> Tài khoản (Profile)
                        </Link>
                    </li> */}
                    <li className="mb-4">
                        <Link to="create-cv" className="flex items-center gap-2  p-2 rounded hover:bg-blue-400">
                            <SiReaddotcv /> Tạo CV với AI
                        </Link>
                    </li>
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