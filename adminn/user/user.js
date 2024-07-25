const listUsers = document.getElementById("list-users");
const inputSearchName = document.getElementById("input-search-name");
const paginationUser = document.getElementById("pagination-user");
const selectSort = document.getElementById("select-sort"); //sap xep

const pageSize = 5; // kích cỡ 1 trang chứa sản phẩm
let totalPage = 1; // tổng số trang
let currentPage = 1; // trang hiện tại đang đứng

// let dbUser = JSON.parse(localStorage.getItem("users")) || [];
// dbUser.push({
//   id: 1,
//   username: "admin",
//   email: "admin@gmail.com",
//   password: "admin123",
//   status: true,
//   role: 1,
// });
// localStorage.setItem("users", JSON.stringify(dbUser));

function renderUser() {
  let dbUser = JSON.parse(localStorage.getItem("users")) || [];

  // tim kiem theo ten
  dbUser = dbUser.filter((el) =>
    el.username
      .toLowerCase()
      .includes(inputSearchName.value.trim().toLowerCase())
  );

  // phan trang

  renderPagination(dbUser); // lọc xong rồi phân trang
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > dbUser.length) {
    end = dbUser.length;
  }
  dbUser = dbUser.slice(start, end); //new db đã cắt

  // sap xep
  switch (selectSort.value) {
    case "nomal":
      break;
    case "aes":
      dbUser.sort((a, b) => a.username.localeCompare(b.username));
      break;
    case "des":
      dbUser.sort((a, b) => b.username.localeCompare(a.username));
      break;
  }

  //=====render ra nội dung chính==
  let stringHTML = "";
  for (let i = 0; i < dbUser.length; i++) {
    stringHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${dbUser[i].username}</td>
            <td>${dbUser[i].email}</td>
            <td>${dbUser[i].status ? "Active" : "Ban"}</td>
            <td>${dbUser[i].role ? "Admin" : "User"}</td>
            <td>
                <button class="update ${
                  dbUser[i].role ? "hidden" : ""
                }"  onclick="changStatus(${dbUser[i].id})">${
      dbUser[i].status ? "Ban" : "Active"
    }
                </button>
            </td>
        </tr>
    `;
  }
  listUsers.innerHTML = stringHTML;
}
renderUser();

//================================================

//active=== ban====
function changStatus(id) {
  let dbUser = JSON.parse(localStorage.getItem("users")) || [];
  const index = dbUser.findIndex(function (e) {
    return e.id === id;
  });

  dbUser[index].status = !dbUser[index].status;
  localStorage.setItem("users", JSON.stringify(dbUser));
  renderUser();
}

//=============================================

function renderPagination(dbUser) {
  let paginationHTML = "";
  totalPage = Math.ceil(dbUser.length / pageSize);
  if (totalPage == 0) {
    currentPage == 0;
    paginationUser.innerHTML = "";
    return;
  }
  paginationHTML += `
  <div><button class="click" onclick="changePage('previous')"><< </button></div>
  `;
  for (let i = 1; i <= totalPage; i++) {
    paginationHTML += `
    <span class="next ${
      currentPage == i ? "sang" : ""
    } " onclick="clickPage(${i})"  >${i}</span>
    `;
  }
  paginationHTML += `
  <div> <button class="click"  onclick="changePage('next')">>></button></div>
  `;

  paginationUser.innerHTML = paginationHTML;
}

//===========
function changePage(action) {
  switch (action) {
    case "previous":
      if (currentPage > 1) {
        currentPage--;
      }
      break;
    case "next":
      if (currentPage < totalPage) {
        currentPage++;
      }
      break;
  }
  renderUser();
}

//==============
function clickPage(idPage) {
  currentPage = idPage;
  renderUser();
}
