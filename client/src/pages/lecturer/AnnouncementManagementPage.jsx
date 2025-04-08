import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

export default function AnnouncementManagementPage() {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const { course_id } = useParams();
    const [expandedMessage, setExpandedMessage] = useState(null);
    
    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) {
                return;
            }
            const response = await axios.get(`http://localhost:8000/announcements/get-announcement/${course_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(token);
            // Đảm bảo response.data là một mảng
            if (Array.isArray(response.data)) {
                setAnnouncements(response.data);
            } else if (response.data.data && Array.isArray(response.data.data)) {
                setAnnouncements(response.data.data);
            } else {
                setAnnouncements([]);
            }
        } catch (error) {
            console.error('Failed to fetch announcements', error);
            setAnnouncements([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (course_id) {
            fetchAnnouncements();
        }
    }, [course_id]);

    const handleAddAnnouncement = async (e) => {
        e.preventDefault();
        try {
           
            const token = localStorage.getItem("authToken");
            if (!token) {
                return;
            }
            
            const response = await axios.post(`http://localhost:8000/announcements/create-announcement`, {
                course_id,
                title,
                message
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status !== 200){
              showErrorToast(response.data.message);
              return;
            }
            showSuccessToast("Thêm thông báo thành công");
            // Tải lại danh sách thông báo sau khi thêm
            fetchAnnouncements();
            setTitle('');
            setMessage('');
        } catch (error) {
            console.error('Failed to add announcement', error);
            showErrorToast("Không thể thêm thông báo");
        }
    };

    const handleDeleteAnnouncement = async (id) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
               
                return;
            }
            await axios.delete(`http://localhost:8000/announcements/delete-announcement/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }       
            });
            showSuccessToast("Xóa thông báo thành công");
            fetchAnnouncements();
        } catch (error) {
            showErrorToast("Không thể xóa thông báo");
            console.error(error);
          
        }
    };



    if (loading) {
        return <div className="text-center py-4">Đang tải...</div>;
    }

    return (
        <div className="container mx-auto px-4 mt-5">
            <h1 className="text-2xl font-bold mb-6">Quản lý Thông Báo</h1>
            
          

            <form onSubmit={handleAddAnnouncement} className="mb-8">
                <div className="mb-4">
                    <label >Tiêu đề thông báo</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nhập tiêu đề thông báo"
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label>Nội dung thông báo</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nhập nội dung thông báo"
                        className="w-full p-2 border rounded"
                        rows="4"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Thêm Thông Báo
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-4">Danh sách Thông Báo</h2>
            {announcements.length === 0 ? (
                <p className="text-gray-500">Chưa có thông báo nào</p>
            ) : (
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="border rounded p-4">
                            <h3 className="font-semibold truncate max-w-full">{announcement.title}</h3>
                            <div className="mt-2">
                                <p className={`text-gray-600 break-words whitespace-pre-wrap ${announcement.id === expandedMessage ? '' : 'line-clamp-3'}`}>
                                    {announcement.message}
                                </p>
                                {announcement.message.length > 150 && (
                                    <button 
                                        onClick={() => setExpandedMessage(announcement.id === expandedMessage ? null : announcement.id)}
                                        className="text-blue-500 text-sm hover:text-blue-700 mt-1"
                                    >
                                        {announcement.id === expandedMessage ? 'Thu gọn' : 'Xem thêm'}
                                    </button>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                {new Date(announcement.created_at).toLocaleString('vi-VN')}
                            </p>
                            <button 
                                onClick={() => handleDeleteAnnouncement(announcement.id)} 
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                            >
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
