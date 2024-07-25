const btnLogout = document.getElementById("btn-logout");

btnLogout.onclick = function () {
  localStorage.removeItem("admin-login");
  window.location.href = "../../user/index.html";
};
