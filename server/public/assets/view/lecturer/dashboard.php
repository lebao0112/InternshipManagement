<?php $this->layout('../layouts/lecturer_layout', ['title' => 'Dashboard']) ?>


  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/5 bg-white shadow-md p-4">
      <button class="w-full bg-gray-200 text-left p-2 rounded mb-2">
        Quản lý thực tập
      </button>
      <button class="w-full bg-gray-200 text-left p-2 rounded mb-2">
        Danh sách thực tập
      </button>
      <button class="w-full bg-gray-200 text-left p-2 rounded mb-2">
        Thông tin cá nhân
      </button>
      <button class="w-full bg-red-500 text-white text-left p-2 rounded">
        Đăng xuất
      </button>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <div class="flex space-x-4 mb-4">
        <select class="border p-2 rounded w-1/4">
          <option>Chọn kỳ thực tập</option>
          <option>Kỳ 1</option>
          <option>Kỳ 2</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm sinh viên"
          class="border p-2 rounded flex-1" />
        <button class="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm SV
        </button>
        <button class="bg-green-500 text-white px-4 py-2 rounded">
          Import Excel
        </button>
      </div>
      <div class="bg-white p-6 shadow-md rounded h-auto">
        <table
          id="studentTable"
          class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-black text-white">
              <th class="border border-gray-300 p-2">Mã SV</th>
              <th class="border border-gray-300 p-2">Họ và Tên</th>
              <th class="border border-gray-300 p-2">Lớp</th>
              <th class="border border-gray-300 p-2">Ngành</th>
              <th class="border border-gray-300 p-2">Công ty thực tập</th>
              <th class="border border-gray-300 p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2">SV002</td>
              <td class="border border-gray-300 p-2">Trần Thị B</td>
              <td class="border border-gray-300 p-2">CNTT02</td>
              <td class="border border-gray-300 p-2">Công nghệ thông tin</td>
              <td class="border border-gray-300 p-2">Công ty ABC</td>
              <td
                class="border border-gray-300 p-2 justify-center flex gap-2">
                <button class="bg-yellow-500 text-white px-2 py-1 rounded">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                  </svg>
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">SV002</td>
              <td class="border border-gray-300 p-2">Trần Thị B</td>
              <td class="border border-gray-300 p-2">CNTT02</td>
              <td class="border border-gray-300 p-2">Công nghệ thông tin</td>
              <td class="border border-gray-300 p-2">Công ty ABC</td>
              <td
                class="border border-gray-300 p-2 justify-center flex gap-2">
                <button class="bg-yellow-500 text-white px-2 py-1 rounded">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                  </svg>
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">SV002</td>
              <td class="border border-gray-300 p-2">Trần Thị B</td>
              <td class="border border-gray-300 p-2">CNTT02</td>
              <td class="border border-gray-300 p-2">Công nghệ thông tin</td>
              <td class="border border-gray-300 p-2">Công ty ABC</td>
              <td
                class="border border-gray-300 p-2 justify-center flex gap-2">
                <button class="bg-yellow-500 text-white px-2 py-1 rounded">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                  </svg>
                </button>
                <button class="bg-red-500 text-white px-2 py-1 rounded">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      let rows = document.querySelectorAll("#studentTable tbody tr");
      rows.forEach((row, index) => {
        if (index % 2 === 0) {
          row.classList.add("bg-gray-100");
        } else {
          row.classList.add("bg-gray-200");
        }
      });
    });
  </script>



