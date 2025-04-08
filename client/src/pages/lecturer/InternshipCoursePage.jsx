import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaFileImport, FaTimes, FaEye } from "react-icons/fa"; import { useParams } from "react-router-dom";


export default function InternshipCoursePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [internships, setInternships] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({ course_name: "", description: "" });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const navigate = useNavigate();

    const fetchCourses = () => {
        const token = localStorage.getItem("authToken");
        axios.get("http://localhost:8000/courses", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => setInternships(res.data))
            .catch((err) => console.error("Error fetching internships:", err));
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleAddCourse = () => {
        const token = localStorage.getItem("authToken");


        axios.post("http://localhost:8000/courses", newCourse, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                if (res.status === 201 || res.status === 200) {
                    setInternships([...internships, res.data]);
                    showSuccessToast("Thêm thành công");
                    setIsModalOpen(false);
                    fetchCourses();
                } else {
                    showErrorToast("Thêm thất bại");
                }
            })
            .catch((err) => {
                showErrorToast("Đã xảy ra lỗi");
                console.error("Error adding course:", err);
            });
    };
    const handleDeleteCourse = () => {
        const token = localStorage.getItem("authToken");
        axios.delete(`http://localhost:8000/courses/${courseToDelete}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                showSuccessToast("Xóa thành công");
                setIsDeleteModalOpen(false);
                fetchCourses();
            })
            .catch((err) => {
                showErrorToast("Đã xảy ra lỗi");
                console.error("Error deleting course:", err);
            });
    };
    return (
        <div className="p-6 relative">
            <h1 className="text-2xl font-bold mb-4">Quản lý thực tập</h1>
            <div className="flex gap-4 mb-4">
                <div className="flex items-center border rounded px-3 py-2 flex-grow">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-full outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                    <FaFilter /> Lọc
                </button>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    <FaPlus /> Thêm mới
                </button>
            </div>

            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Mã khóa học</th>
                        <th className="p-3 text-left">Tên khóa học</th>
                        <th className="p-3 text-left">Mô tả</th>
                        <th className="p-3 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {internships.map((course) => (
                        <tr key={course.course_id} className="border-t">
                            <td className="p-3">{course.course_code}</td>
                            <td className="p-3">{course.course_name}</td>
                            <td className="p-3">{course.description}</td>
                            <td className="p-3 flex justify-center gap-3">
                                <button className="text-blue-600 hover:text-blue-800" onClick={() => navigate(`/lecturer/courses/${course.course_id}`)}>
                                    <FaEye />
                                </button>
                                <button className="text-green-600 hover:text-green-800">
                                    <FaEdit />
                                </button>
                                <button className="text-red-600 hover:text-red-800" onClick={() => { setCourseToDelete(course.course_id); setIsDeleteModalOpen(true); }}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2">Trước</button>
                <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Tiếp</button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={() => setIsModalOpen(false)}></div>

                    <div className="bg-white p-6 rounded-lg w-1/3 relative shadow-lg z-50">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Thêm khóa học mới</h2>
                        <lable>Tên khoá học</lable>
                        <input
                            type="text"
                            placeholder="Tên khóa học"
                            className="w-full border p-2 mb-4 rounded"
                            value={newCourse.course_name}
                            onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
                        />
                        <lable>Mô tả</lable>
                        <textarea
                            placeholder="Mô tả"
                            className="w-full border p-2 mb-4 rounded"
                            value={newCourse.description}
                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        />
                        <div className="flex justify-end gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                                Hủy
                            </button>
                            <button onClick={handleAddCourse} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={() => setIsDeleteModalOpen(false)}></div>
                    <div className="bg-white p-6 rounded-lg w-1/3 relative shadow-lg z-50">
                        <button onClick={() => setIsDeleteModalOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Xác nhận xóa khóa học</h2>
                        <p>Bạn có chắc chắn muốn xóa khóa thực tập này không?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                                Hủy
                            </button>
                            <button onClick={handleDeleteCourse} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}