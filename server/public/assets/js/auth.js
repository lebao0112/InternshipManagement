$(document).ready(function () {
  let token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html"; 
  }

  $.ajax({
    url: "http://localhost:8000/api/me", 
    type: "GET",
    headers: { Authorization: "Bearer " + token },
    success: function (response) {
      let userRole = response.role;

      if (
        window.location.pathname.includes("student") &&
        userRole !== "student"
      ) {
        alert("Bạn không có quyền truy cập trang này!");
        window.location.href = "login.html";
      }
      if (
        window.location.pathname.includes("lecturer") &&
        userRole !== "lecturer"
      ) {
        alert("Bạn không có quyền truy cập trang này!");
        window.location.href = "../auth/login.html";
      }
    },
    error: function (xhr) {
      alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      localStorage.removeItem("token");
      window.location.href = "../auth/login.html";
    },
  });
});
