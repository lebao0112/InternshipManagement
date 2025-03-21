import { useNavigate } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import { useState } from "react";

import axios from "axios";


export default function LoginPage() {
    const navigate = useNavigate();

    const [user, setUserState] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserState({ ...user, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();


        if (user.password === "" || user.username === "") {
            // setToast({ message: "Vui lòng nhập đầy đủ thông tin!", type: "error" });
            showErrorToast("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/login", user);
            if (response.status === 200 && response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                // setToast({ message: "Đăng nhập thành công!", type: "success" });
                showSuccessToast("Đăng nhập thành công");
                // await fetchUser(); // Gọi API để cập nhật user ngay lập tức
                if (response.data.role === "student")
                    navigate("/student");
                if (response.data.role === "lecturer")
                    navigate("/lecturer/courses");
            } else {
                showErrorToast("Đăng nhập thất bại");
            }
        } catch (error) {
            showErrorToast("Sai tên tài khoản hoặc mật khẩu");
            console.log(error);
        }
    };

    return (

        <div className="container">
            <div className="flex justify-center">
                <div className="w-96">
                    <h1 className="text-2xl font-semibold text-center">Đăng nhập</h1>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Tài khoản</label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="username"
                                    name="username"
                                    value={user.username}
                                    onChange={handleChange}
                                    className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Mật khẩu</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-3 text-gray-500" />
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    className="w-full px-10 py-2 border border-gray-300 rounded-md"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}