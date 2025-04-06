import React, { useState } from "react";
import axios from "axios";


export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = sessionStorage.getItem("tempToken");

    const handleReset = () => {
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu không khớp. Vui lòng nhập lại.");
            return;
        }

        axios
            .put("http://localhost:8000/change-password", {
                new_password: newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                alert("Mật khẩu đã được thay đổi.");
                console.log(res);
                // Lưu token thật sau khi đổi
                localStorage.setItem("authToken", token);
                sessionStorage.removeItem("tempToken");
                window.location.href = "/student"; // chuyển hướng sau khi đổi mật khẩu
            })
            .catch(() => alert("Thất bại. Vui lòng thử lại."));
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Đổi mật khẩu lần đầu</h2>
            <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-4">Nhập lại mật khẩu</h2>
            <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
            />
            <button
                onClick={handleReset}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Đổi mật khẩu
            </button>
        </div>
    );
}
