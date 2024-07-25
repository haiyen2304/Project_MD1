const usersLogin = JSON.parse(localStorage.getItem("users-login"));
const textAccount = document.getElementById("text-account");
const itemMenuAccount = document.getElementById("item-menu-account");

let show = false;

if (usersLogin) {
  textAccount.innerText = usersLogin.username;
  itemMenuAccount.innerHTML = `
    <button class="dropdown-item" type="button" onclick="userLogout()" >Logout</button>
  `;
} else {
  textAccount.innerText = "Đăng nhập";
  itemMenuAccount.innerHTML = `
    <button class="dropdown-item" type="button" onclick="gotoSignin()" >Sign in</button>
  `;
}

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
  localStorage.removeItem("users-login");
  window.location.reload();
}

function gotoSignin() {
  window.location.href = "../auth/login.html";
}
