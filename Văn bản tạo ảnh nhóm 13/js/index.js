// lấy dữ liệu trên local
const userLogin = JSON.parse(localStorage.getItem("userLogin"));

const userLoginelement = document.getElementById("userLogin");
const registerLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');
const logoutButton = document.getElementById('logoutButton');
const homeLink = document.getElementById('homeLink');

if(userLogin){
    // hiển thị tên của user đang đăng nhập lên header
    userLoginelement.innerHTML = userLogin.userName;
    registerLink.style.display = "none";
    loginLink.style.display = "none";
}else{
    // nếu không có sự đăng nhập thì giữ nguyên trang chủ ban đầu
    userLoginelement.innerHTML ="";
    registerLink.style.display = "block";
    loginLink.style.display = "block";
}

// Hàm để cập nhật navbar(tên tự đặt ngẫu nhiên)
function updateNavbar() {
    if (userLogin) {

        // Ẩn liên kết Đăng ký và Đăng nhập
        registerLink.style.display = "none"; // Ẩn liên kết Đăng ký
        loginLink.style.display = "none";    // Ẩn liên kết Đăng nhập
        userLoginelement.style.display = "block"; // Hiện thông báo chào mừng
    } else {
        userLoginelement.innerHTML = "";
        userLoginelement.style.display = "none"; // Ẩn thông báo chào mừng
        // Hiện lại các liên kết khi chưa đăng nhập
        registerLink.style.display = "block"; // Hiện liên kết Đăng ký
        loginLink.style.display = "block";    // Hiện liên kết Đăng nhập
        logoutButton.style.display = "none";
    }
}

// Gọi hàm để cập nhật navbar khi trang được tải
updateNavbar();

// Xử lý đăng xuất
logoutButton.addEventListener("click", function() {
    localStorage.removeItem("userLogin"); // Xóa thông tin người dùng khỏi localStorage
    updateNavbar(); // Cập nhật navbar
    location.reload();// load lại trang
});

// Xử lý sự kiện nhấn vào Trang chủ
homeLink.addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    updateNavbar(); // Cập nhật navbar trước khi tải lại
    location.reload(); // Tải lại trang
});
   