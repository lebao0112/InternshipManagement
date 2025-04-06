import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export default function AnnouncementListPage() {
    const { course_id } = useParams();
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedMessage, setExpandedMessage] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        axios
            .get(`http://localhost:8000/announcements/get-announcement/${course_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setAnnouncements(res.data);
                } else if (res.data.data && Array.isArray(res.data.data)) {
                    setAnnouncements(res.data.data);
                } else {
                    setAnnouncements([]);
                }
                setLoading(false);
            })
            .catch(() => {
                alert("Failed to fetch announcements.");
                setLoading(false);
            });
    }, []);

    const isNew = (createdAt) => {
        const announcementDate = new Date(createdAt);
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000; 
        return (now - announcementDate) < (2 * oneDay); 
    };

    if (loading) {
        return <div className="text-center py-4">Đang tải...</div>;
    }
    return (
        <div className="p-5">
            <h1 className="text-xl font-semibold mb-4">Thông Báo</h1>
            {announcements.length === 0 ? (
                <p className="text-gray-500">Chưa có thông báo nào</p>
            ) : (
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className={`border rounded p-4 ${isNew(announcement.created_at) ? 'bg-stone-100' : ''}`}>
                            <div className="flex justify-between">
                                <h3 className="font-semibold truncate max-w-full">{announcement.title}</h3>
                                {isNew(announcement.created_at) && (
                                    <span className="text-red-500 font-bold">Mới!</span>
                                )}
                            </div>
                          
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
                            
                            <p className="text-sm text-gray-500 mt-2 italic">
                                {new Date(announcement.created_at).toLocaleString('vi-VN')}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

