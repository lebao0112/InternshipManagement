import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InternshipDetail = () => {
  const [form, setForm] = useState({
    internship_detail_id: "",
    company_name: "",
    company_address: "",
    industry: "",
    supervisor_name: "",
    supervisor_phone: "",
    supervisor_email: "",
    job_position: "",
    job_description: "",
    course_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [cvFile, setCvFile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  // Fetch internship detail
  useEffect(() => {
    axios
      .get("http://localhost:8000/student/internship-detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setForm(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to fetch internship detail.");
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // 1. Cập nhật thông tin thực tập
      await axios.put("http://localhost:8000/student/internship-detail", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // 2. Nếu có file CV, upload sau khi form thành công
      if (cvFile) {
        const formData = new FormData();
        formData.append("cv", cvFile);

        const res = await axios.post("http://localhost:8000/student/upload-cv", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setForm((prev) => ({ ...prev, cv_file: res.data.file }));
      }

      alert("Cập nhật thành công.");
    } catch (error) {
      console.error("Error updating internship detail:", error);
      alert("Có lỗi xảy ra khi cập nhật.");
    }
  };


  // const handleCVUpload = (file) => {
  //   const formData = new FormData();
  //   formData.append("cv", file);

  //   axios
  //     .post("http://localhost:8000/student/upload-cv", formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       alert("Upload CV thành công!");
  //       setForm({ ...form, cv_file: res.data.file });
  //     })
  //     .catch(() => {
  //       alert("Lỗi khi upload CV");
  //     });
  // };


  if (loading) return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-4xl mt-5 mx-auto">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-start text-blue-600">
          Thông tin thực tập
        </h2>
        <button className="bg-stone-300 text-white px-6 py-2 rounded hover:bg-stone-500 relative">
          <FaBell className="text-2xl" onClick={() => navigate(`announcement-list/${form.course_id}`)}/>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          </span>
        </button>
      </div>
     

      {form.lecturer_name && (
        <p className="text-sm text-gray-500 mb-6 text-start">
          Giảng viên hướng dẫn:{" "}
          <span className="font-semibold text-blue-700">{form.lecturer_name}</span>
        </p>
      )}

      <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium mb-1">Tên công ty</label>
          <input
            type="text"
            name="company_name"
            value={form["company_name"] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Địa chỉ công ty</label>
          <input
            type="text"
            name="company_address"
            value={form["company_address"] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Ngành nghề</label>
          <input
            type="text"
            name="industry"
            value={form["industry"] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Người hướng dẫn</label>
          <input
            type="text"
            name="supervisor_name"
            value={form["supervisor_name"] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Số điện thoại người hướng dẫn</label>
          <input 
            type="text"
            name="supervisor_phone"
            value={form["supervisor_phone"] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email người hướng dẫn</label>
          <input
            type="text"
            name="supervisor_email"
            value={form["supervisor_email"] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Vị trí thực tập</label>
          <input
            type="text"
            name="job_position"
            value={form["job_position"] || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

       
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Mô tả vị trí thực tập</label>
          <textarea
            name="job_description"
            value={form.job_description || ""}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
        <div className="bg-green-100 md:col-span-2 p-2 rounded-md max-w-4xl border-l-4 border-green-500">
          <div>
            <label className="block font-medium mb-1">Cập nhật CV (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setCvFile(e.target.files[0])}
              className="w-full border rounded px-3 py-2"
            />

            {form.cv_file && (
              <p className="text-sm text-green-600 mt-2">
                📎 CV hiện tại:{" "}
                <a href={`http://localhost:8000/${form.cv_file}`} target="_blank" rel="noreferrer" className="underline text-blue-600">
                  Xem CV
                </a>
              </p>
            )}
          </div>
          <div className="mt-2">
            <label className="block font-medium mb-1">Nhận xét của giảng viên</label>
            <p class="text-gray-500 mb-6 text-start max-w-full overflow-wrap">
             sss
            </p>

          </div>
        </div>
        
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternshipDetail;
