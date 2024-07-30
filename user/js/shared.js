const textAccount = document.getElementById("text-account");
const itemMenuAccount = document.getElementById("item-menu-account");

let show = false;

function renderAccount() {
  const usersLogin = JSON.parse(localStorage.getItem("users-login"));
  if (usersLogin) {
    textAccount.innerText = usersLogin.username;
    itemMenuAccount.innerHTML = `
    <button class="dropdown-item" type="button" onclick="userLogout()" >Đăng xuất</button>
  `;
  } else {
    textAccount.innerText = "Đăng nhập";
    itemMenuAccount.innerHTML = `
    <button class="dropdown-item" type="button" onclick="gotoSignin()" >Sign in</button>
  `;
  }
}
renderAccount();

textAccount.onclick = function () {
  if (show) {
    show = false;
    itemMenuAccount.style.display = "none";
  } else {
    show = true;
    itemMenuAccount.style.display = "block";
  }
};

function userLogout() {
  const users = JSON.parse(localStorage.getItem("users"));
  const usersLogin = JSON.parse(localStorage.getItem("users-login"));

  const index = users.findIndex((el) => el.id === usersLogin.id);
  users[index] = usersLogin;

  localStorage.setItem("users", JSON.stringify(users));

  localStorage.removeItem("users-login");
  window.location.reload();
}

function gotoSignin() {
  window.location.href = "../auth/login.html";
}
