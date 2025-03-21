import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaFilter, FaPlus, FaFileImport, FaTimes, FaUpload, FaTrash } from "react-icons/fa";

export default function CourseDetailPage() {
    const { course_id } = useParams();
    const [course, setCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios.get(`http://localhost:8000/courses/${course_id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => setCourse(res.data))
            .catch((err) => console.error("Error fetching course details:", err));
    }, [course_id]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios.get(`http://localhost:8000/internships/${course_id}/students`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => setStudents(res.data))
            .catch((err) => console.error("Error fetching students:", err));
    }, [course_id]);

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
    };

    const handleClickUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Đặt lại giá trị input trước khi chọn file mới
            fileInputRef.current.click();
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        if (event.dataTransfer.files.length > 0) {
            setSelectedFile(event.dataTransfer.files[0]);
        }
    };
    const handleImport = () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("course_id", course_id);

        const token = localStorage.getItem("authToken");
        axios.post("http://localhost:8000/students/import", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                setIsImportModalOpen(false);
                showSuccessToast("Import sinh viên thành công");
            })
            .catch((err) => {
                console.error("Error importing students:", err);
                showErrorToast("Đã xảy ra lỗi");
            });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Chi tiết khóa học</h1>
            <div className="mb-6 p-4 border rounded-lg bg-white shadow-md">
                <p><strong>Mã khóa học:</strong> {course?.course_code}</p>
                <p><strong>Tên khóa học:</strong> {course?.course_name}</p>
                <p><strong>Mô tả:</strong> {course?.description}</p>
            </div>

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
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    <FaPlus /> Thêm sinh viên
                </button>
                <button onClick={() => setIsImportModalOpen(true)} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    <FaFileImport /> Import Excel
                </button>
            </div>

            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Mã sinh viên</th>
                        <th className="p-3 text-left">Tên sinh viên</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.student_id} className="border-t">
                            <td className="p-3">{student.student_code}</td>
                            <td className="p-3">{student.first_name + " " + student.last_name}</td>
                            <td className="p-3">{student.email}</td>
                            <td className={`p-3 ${student.status === 'pending' ? 'text-yellow-500' : student.status === 'approved' ? 'text-green-500' : 'text-red-300'}`}><strong>{student.status}</strong></td>
                               

                        </tr>
                    ))}
                </tbody>
            </table>

            {isImportModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={() => setIsImportModalOpen(false)}></div>
                    <div className="bg-white p-6 rounded-lg w-1/3 relative shadow-lg z-50">
                        <button onClick={() => setIsImportModalOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Import danh sách sinh viên</h2>
                        <div
                            className={`border-dashed border-2 p-6 rounded-lg text-center cursor-pointer ${dragActive ? 'border-blue-500' : 'border-gray-400'}`}
                            onClick={handleClickUpload}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <FaUpload className="text-gray-500 text-2xl mx-auto mb-3" />
                            <p>Kéo và thả file vào đây hoặc nhấn để chọn file</p>
                            <input ref={fileInputRef} type="file" className="hidden" accept=".xlsx" onChange={handleFileUpload} />
                        </div>
                        {selectedFile && (
                            <div className="text-center mt-2 flex justify-center items-center gap-2">
                                <p>File đã chọn: {selectedFile.name}</p>
                                <button onClick={handleRemoveFile} className="text-red-600 hover:text-red-800">
                                    <FaTimes/>
                                </button>
                            </div>
                        )}
                        <div className="flex justify-end gap-4 mt-4">
                            <button onClick={() => setIsImportModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                                Hủy
                            </button>
                            <button onClick={handleImport} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
