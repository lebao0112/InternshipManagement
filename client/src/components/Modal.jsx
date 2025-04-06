import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBriefcase } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

export default function Modal() {
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="bg-white p-6 rounded-lg w-1/3 relative shadow-lg z-50">
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    <FaTimes />
                </button>
                <h2 className="text-xl font-bold mb-4">Message</h2>
              
                
                <div className="flex justify-end gap-4 mt-4">
                    <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                        Hủy
                    </button>
                    <button  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}