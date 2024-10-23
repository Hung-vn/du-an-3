// Lấy ra elements của trang
const formregister = document.getElementById("formregister");
const usernameelement = document.getElementById("username");
const emailelement = document.getElementById("email");
const passwordelement = document.getElementById("password");
const repasswordelement = document.getElementById("repassword");

// Element liên quan đến lỗi 
const usernameerror = document.getElementById("usernameerror");
const emailerror = document.getElementById("emailerror");
const passworderror = document.getElementById("passworderror");
const repassworderror = document.getElementById("repassworderror");

// lấy dữ liệu từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

/**
 * Validate địa chỉ email - validate email javascript(web)
 * @param {*} email : chuỗi email người dùng nhập vào.
 * @returns : dữ liệu nếu email đúng định dạng, undifined nếu email không đúng định dạng.
 * author: DQB(24/9/2024)
 */

function validateEmail (email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  

// Lắng nghe sự kiện submit form đăng ký tài khoản
formregister.addEventListener("submit", function(e) {
    // Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // khai báo biến user
    let user;

    // Validate dữ liệu đầu vào
    if (!usernameelement.value) {
        // Hiển thị lỗi 
        usernameerror.style.display = "block";
    } else {
        // Ẩn lỗi
        usernameerror.style.display = "none";
    }

    if (!emailelement.value) {
        // Hiển thị lỗi 
        emailerror.style.display = "block";
    } else {
        // Ẩn lỗi
        emailerror.style.display = "none";
        // kiểm tra định dạng email
        if(!validateEmail(emailelement.value)){
        // Hiển thị lỗi 
        emailerror.style.display = "block";
        emailerror.innerHTML = "Email không đúng định dạng";
        }
    }

    if (!passwordelement.value) {
        // Hiển thị lỗi 
        passworderror.style.display = "block";
    } else {
        // Ẩn lỗi
        passworderror.style.display = "none";
    }

    if (!repasswordelement.value) {
        // Hiển thị lỗi 
        repassworderror.style.display = "block";
    } else {
        // Ẩn lỗi
        repassworderror.style.display = "none";
    }

    // kiểm tra mật khẩu với nhập lại mật khẩu
    if(!repasswordelement.value){
        repassworderror.style.display = "block";
        repassworderror.innerHTML = "Mật khẩu nhập lại không để rỗng";
    }
    else if(passwordelement.value !== repasswordelement.value){
        repassworderror.style.display = "block";
        repassworderror.innerHTML = "Mật khẩu không khớp";
    }else{
        repassworderror.style.display = "none";
    }

    // gửi dữ liệu từ form lên localStorage
    
    if(usernameelement.value && 
        emailelement.value && 
        passwordelement.value && 
        repasswordelement.value && 
        passwordelement.value == repasswordelement.value && 
        validateEmail(emailelement.value)){
            // lấy dữ liệu từ form và gộp thành đối tượng user (người sử dụng)
            const user = {
                userId: Math.ceil(Math.random() * 10000000000),
                userName: usernameelement.value,
                email: emailelement.value,
                password: passwordelement.value,
            };

            // push user  vào trong mảng userLocal:
            userLocal.push(user);

            // lưu trữ dữ liệu lên local:
            localStorage.setItem("users", JSON.stringify(userLocal));

            // chuyển hướng về trang đăng nhập sau 1 giây
            setTimeout(function(){
                window.location.href = "login.html";
            })
            

    }

    
    
});
