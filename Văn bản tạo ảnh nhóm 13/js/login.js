//Elements của trang
const formlogin = document.getElementById("formlogin");
const emailelement = document.getElementById("email");
const passwordelement = document.getElementById("password");
const LoginError = document.getElementById("LoginError");
const registerLink = document.getElementById("registerLink");
const loginLink = document.getElementById("loginLink");

// lắng nghe sự kiện submit form đăng nhập tài khoản
formlogin.addEventListener("submit", function(e){
    // ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // validate dữ liệu đầu vào

    // lấy dữ liệu từ local về
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];

    // tìm kiếm email và mật khẩu người dùng nhập vào có tồn tại trên local không?
    const findUser = userLocal.find(user => user.email === emailelement.value && 
    user.password === passwordelement.value );

    if(!findUser){
         // nếu không thì thông báo cho người dùng nhập lại thông tin tài khoản.
        LoginError.style.display = "block";
    }else{
        // nếu có thì đăng nhập thành công và chuyển hướng về trang chủ
        window.location.href = "index.html";
        
        // lưu thông tin của user đăng nhập lên local
        localStorage.setItem("userLogin",JSON.stringify(findUser));

    }
    

   
});

