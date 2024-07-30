// đăng kí LOGIN
const errorSignin = document.getElementById("error-signin");
const errorLogin = document.getElementById("error-login");
const registerUsername = document.getElementById("register-username");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerConfirmPassword = document.getElementById(
  "register-confirm-password"
);

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function register() {
  const dbUser = JSON.parse(localStorage.getItem("users")) || [];

  let newId = 1;
  if (dbUser.length > 0) {
    newId = dbUser[dbUser.length - 1].id + 1;
  }
  const newUser = {
    id: newId,
    username: registerUsername.value.trim(),
    email: registerEmail.value.trim(),
    password: registerPassword.value.trim(),
    role: 0,
    status: true,
    cart: [],
  };

  // kiểm tra Name
  if (!newUser.username) {
    errorSignin.innerHTML = "Nhập tên";
    return;
  } else {
    errorSignin.innerHTML = "";
  }

  // kiểm tra nhập đúng kiểm email
  if (!emailPattern.test(newUser.email)) {
    errorSignin.innerHTML = "Nhập email";
    return;
  } else {
    errorSignin.innerHTML = "";
  }

  // kiểm tra email có trùng hay k
  const index = dbUser.findIndex((el) => el.email === newUser.email);
  if (index !== -1) {
    errorSignin.innerHTML = "Email bị trùng";
    return;
  } else {
    errorSignin.innerHTML = "";
  }

  // kiểm tra số lượng kí tự password
  if (newUser.password.length < 6) {
    errorSignin.innerHTML = "Nhập password đủ 6 kí tự";
    return;
  } else {
    errorSignin.innerHTML = "";
  }

  if (registerConfirmPassword.value != newUser.password) {
    errorSignin.innerHTML = "Xác nhận lại chưa đúng password";
    return;
  } else {
    errorSignin.innerHTML = "";
  }

  dbUser.push(newUser);
  localStorage.setItem("users", JSON.stringify(dbUser));

  registerUsername.value = "";
  registerEmail.value = "";
  registerPassword.value = "";
  registerConfirmPassword.value = "";
  alert("Bạn đã đăng ký thành công, hãy đăng nhập!");
}

//=================================================================
// đăng nhập ======================================================
const inputUserEmail = document.getElementById("input-user-email");
const inputUserPassword = document.getElementById("input-user-password");
function login() {
  const dbUser = JSON.parse(localStorage.getItem("users"));

  const account = {
    email: inputUserEmail.value,
    password: inputUserPassword.value,
  };

  const userCheck = dbUser.find((el) => el.email == account.email);
  // kiểm tra email
  if (!userCheck) {
    errorLogin.innerHTML = "Sai thông tin";
    return;
  } else {
    errorLogin.innerHTML = "";
  }
  // kiểm tra password
  if (userCheck.password !== account.password) {
    errorLogin.innerHTML = "Sai thông tin";
    return;
  } else {
    errorLogin.innerHTML = "";
  }
  // kiểm tra xem tài khoản có bị BAN k
  if (!userCheck.status) {
    errorLogin.innerHTML = "Tài khoản đã bị khóa";
    return;
  } else {
    errorLogin.innerHTML = "";
  }

  inputUserEmail.value = "";
  inputUserPassword.value = "";

  // đẩy cho dữ liệu lên local
  if (userCheck.role == 0) {
    localStorage.setItem("users-login", JSON.stringify(userCheck));
    window.location.href = "../user/index.html";
  } else {
    localStorage.setItem("admin-login", JSON.stringify(userCheck));
    window.location.href = "../adminn/user/user.html";
  }
}
