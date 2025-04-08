import { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import axios from "axios";

export default function InternshipDetailPage() {
    const { internship_detail_id } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");
    
    useEffect(() => {
        axios
            .get(`http://localhost:8000/lecturer/internships/${internship_detail_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setDetail(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch(() => {
                alert("Không tìm thấy dữ liệu.");
                navigate(-1);
            });
    }, [internship_detail_id]);

    const handleStatusUpdate = (newStatus) => {
        axios
            .put(
                `http://localhost:8000/lecturer/internships/${internship_detail_id}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                alert("Cập nhật trạng thái thành công.");
                setDetail({ ...detail, status: newStatus });
            })
            .catch(() => alert("Lỗi khi cập nhật."));
    };

    const handleCvNoteUpdate = (feedback) => {
        axios
            .put(
                `http://localhost:8000/lecturer/internships/${internship_detail_id}/feedback`,
                { feedback: feedback },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                alert("Cập nhật trạng thái thành công.");
                setDetail({ ...detail, feedback: feedback });
            })
            .catch(() => alert("Lỗi khi cập nhật."));
    };

    if (loading) return <div className="p-6 text-center">Đang tải...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-5 p-3 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
                {detail.student_name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">Họ tên: {detail.first_name + " " + detail.last_name}</p>
            <p className="text-sm text-gray-500 mb-4">MSSV: {detail.student_code}</p>

            <div className="space-y-3">
                <p><strong>Công ty:</strong> {detail.company_name}</p>
                <p><strong>Địa chỉ:</strong> {detail.company_address}</p>
                <p><strong>Ngành nghề:</strong> {detail.industry}</p>
                <p><strong>Người hướng dẫn:</strong> {detail.supervisor_name} ({detail.supervisor_email}, {detail.supervisor_phone})</p>
                <p><strong>Vị trí:</strong> {detail.job_position}</p>
                <p><strong>Mô tả công việc:</strong> {detail.job_description}</p>
                <div className="flex:col">
                    <p>
                        <strong>CV:</strong>{" "}
                        {detail.cv_file ? (
                            <a
                                href={`http://localhost:8000/${detail.cv_file}`}
                                className="text-blue-600 underline"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Xem CV
                            </a>
                        ) : (
                            "Chưa có"
                        )}

                    </p>
                    <lable>Nhận xét CV:</lable>
                    <textarea type="textarea" className="border-1 w-full p-2 mt-2" placeholder={detail.feedback} onChange={(e) => setFeedback(e.target.value)} />
                    <button className="bg-blue-200 p-2 rounded-md hover:bg-blue-400 hover:text-white" onClick={() => handleCvNoteUpdate(feedback)}>Thêm nhận xét</button>
                </div>
                
                <p>
                    <strong>Trạng thái:</strong>{" "}
                    <span
                        className={`font-semibold ${detail.status === "pending"
                                ? "text-yellow-600"
                                : detail.status === "approved"
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                    >
                        {detail.status}
                    </span>
                </p>
            </div>

            {detail.status === "pending" && (
                <div className="mt-6 flex gap-4 justify-center">
                    <button
                        onClick={() => handleStatusUpdate("approved")}
                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                    >
                        ✅ Duyệt
                    </button>
                    <button
                        onClick={() => handleStatusUpdate("rejected")}
                        className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                    >
                        ❌ Từ chối
                    </button>
                </div>
            )}
        </div>
    );
}
