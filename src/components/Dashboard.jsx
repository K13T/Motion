// import React from 'react';

// // Component chức năng có tên là EmbeddedDashboard
// const Dashboard = () => {
//     return (
//         <div>
//             {/* Phần tử Iframe nhúng Bảng điều khiển MongoDB */}
//             <iframe
//                 title=" Dashboard" // Thuộc tính Title để mô tả mục đích của iframe cho mục đích truy cập dễ dàng
//                 width="100%" // Thiết lập chiều rộng của iframe là 100% của khối chứa
//                 height="3400" // Thiết lập chiều cao của iframe là 3400 pixel
//                 src="https://charts.mongodb.com/charts-gia-tri-jnfzh/public/dashboards/e738bb8a-3e0c-4a87-a96a-2a3afa3016c5"
//                 // Địa chỉ URL nguồn của Bảng điều khiển được nhúng
//                 frameBorder="0" // Thiết lập độ dày khung của iframe là 0 để loại bỏ viền khung
//             ></iframe>
//         </div>
//     );
// };

// // Xuất ra Component EmbeddedDashboard để sử dụng ở nơi khác trong ứng dụng của bạn
// export default Dashboard;

import React from 'react';

// Component chức năng có tên là EmbeddedDashboard
const Dashboard = () => {
    const dashboardUrl = "https://charts.mongodb.com/charts-gia-tri-jnfzh/public/dashboards/e738bb8a-3e0c-4a87-a96a-2a3afa3016c5";

    return (
        <div>
            {/* Phần tử Iframe nhúng Bảng điều khiển MongoDB */}
            <iframe
                title="Dashboard" // Thuộc tính Title để mô tả mục đích của iframe cho mục đích truy cập dễ dàng
                width="100%" // Thiết lập chiều rộng của iframe là 100% của khối chứa
                height="3400" // Thiết lập chiều cao của iframe là 3400 pixel
                src={dashboardUrl} // Sử dụng biến để chứa URL nguồn của Bảng điều khiển được nhúng
                frameBorder="0" // Thiết lập độ dày khung của iframe là 0 để loại bỏ viền khung
            ></iframe>
        </div>
    );
};

// Xuất ra Component EmbeddedDashboard để sử dụng ở nơi khác trong ứng dụng của bạn
export default Dashboard;
