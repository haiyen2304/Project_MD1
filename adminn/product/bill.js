const listBill = document.getElementById("list-bill"); // danh sách sp
const selectSort = document.getElementById("select-sort"); //sawsp xep
const inputSearchName = document.getElementById("input-search-name"); // ô tìm tên
const paginationProduct = document.getElementById("pagination-product"); //phân trang

const pageSize = 3; // kích cỡ 1 trang chứa sản phẩm
let totalPage = 1; // tổng số trang
let currentPage = 1; // trang hiện tại đang đứng

function renderBill() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // lọc tìm kiếm
  orders = orders.filter((el) =>
    el.fullname
      .toLowerCase()
      .includes(inputSearchName.value.trim().toLowerCase())
  );

  // phân trang===
  renderPagination(orders); // lọc xong rồi phân trang
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > orders.length) {
    end = orders.length;
  }
  orders = orders.slice(start, end); //new db đã cắt

  // sắp xếp===
  switch (selectSort.value) {
    case "nomal":
      break;
    case "aes":
      // orders.sort((a, b) => a.name.localeCompare(b.name));
      orders.sort((a, b) => new Date(a.date) - new Date(b.date));

      break;
    case "des":
      orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }

  // render ra nội dung chính==
  let stringHTML = "";
  for (let i = 0; i < orders.length; i++) {
    stringHTML += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${
                          users.find((el) => el.id == orders[i].userId).username
                        }</td>    <!-- tìm id của users xem có id nào trùng với id của người đặt => thì lấy ra tên -->
                        <td>${orders[i].fullname}</td>
                        <td>${orders[i].email}</td>
                        <td>${orders[i].numberPhone}</td>
                        <td>${orders[i].address}</td>
                        <td>${orders[i].note}</td>
                        <td>${orders[i].date}</td>
                        <td>${orders[i].totalMoney.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}</td>
                        <td>${
                          orders[i].status == 0
                            ? "Mới đặt"
                            : orders[i].status == 1
                            ? "Chấp nhận"
                            : "Từ chối"
                        }</td>
                        <td>
                          <button class="update" onclick="seenCart(${
                            orders[i].id
                          })">Chi tiết</button>
                        </td>
                        <td>
                            <button style="display: ${
                              orders[i].status == 0 ? "" : "none"
                            }"  onclick="changeStatus(${
      orders[i].id
    }, 1)" class="update">Chấp nhận</button>
                            <button style="display: ${
                              orders[i].status == 0 ? "" : "none"
                            }" onclick="changeStatus(${
      orders[i].id
    }, 2)" class="update" onclick="cancelOrders(${
      orders[i].id
    })">Từ chối</button>
                        </td>
                    </tr>
    `;
  }
  listBill.innerHTML = stringHTML;
}
renderBill();

function changeStatus(orderId, status) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const index = orders.findIndex((el) => el.id == orderId);
  console.log(index);
  orders[index].status = status;
  localStorage.setItem("orders", JSON.stringify(orders));
  renderBill();
}

//===================
function cancelOrders(idDelete) {
  const result = confirm("Ban co chac muon xoa");
  if (!result) {
    return;
  }
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const indexDelete = orders.findIndex((el) => el.id === idDelete);
  orders.splice(indexDelete, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderBill();
}

//=============================================
function renderPagination(orders) {
  let paginationHTML = "";
  totalPage = Math.ceil(orders.length / pageSize);
  if (totalPage == 0) {
    currentPage = 0;
    paginationProduct.innerHTML = "";
    return;
  }

  paginationHTML += `
    <div>
      <button class="click" onclick="changePage('previous')" >
          << 
      </button>
    </div>
  `;

  for (let i = 1; i <= totalPage; i++) {
    paginationHTML += `
      <span class="next ${currentPage == i ? "sang" : ""}" 
        onclick="clickPage(${i})"
      >
        ${i}
      </span>
    `;
  }

  paginationHTML += `
    <div>
      <button class="click" onclick="changePage('next')" >
        >>
      </button>
    </div>
  `;

  paginationProduct.innerHTML = paginationHTML;
}

//======================================
function clickPage(pageI) {
  currentPage = pageI;
  renderBill();
}

//============================
function changePage(status) {
  switch (status) {
    case "previous":
      if (currentPage > 1) {
        currentPage -= 1;
      }
      break;
    case "next":
      if (currentPage < totalPage) {
        currentPage += 1;
      }
      break;
  }
  renderBill();
}

//===============
function search() {
  currentPage = 1;
  renderBill();
}
function seenCart(id) {
  localStorage.setItem("orderId", JSON.stringify(id));
  window.location.href = "./orderDetail.html";
}
