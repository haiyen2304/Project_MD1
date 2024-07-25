const addProduct = document.getElementById("addProduct"); // thêm sản phẩm
const listProduct = document.getElementById("list-product"); // danh sách sp
const selectSort = document.getElementById("select-sort"); //sawsp xep
const inputSearchName = document.getElementById("input-search-name"); // ô tìm tên
const paginationProduct = document.getElementById("pagination-product"); //phân trang

const pageSize = 3; // kích cỡ 1 trang chứa sản phẩm
let totalPage = 1; // tổng số trang
let currentPage = 1; // trang hiện tại đang đứng

// khi ấn vào nút " thêm sản phẩm " thì sẽ thực hiện hành động chuyển trang
addProduct.onclick = function () {
  window.location.href = "./addProduct.html";
};

//
function renderProduct() {
  let dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const dbCategory = JSON.parse(localStorage.getItem("category")) || [];

  // lọc tìm kiếm
  dbProduct = dbProduct.filter((el) =>
    el.name.toLowerCase().includes(inputSearchName.value.trim().toLowerCase())
  );

  // phân trang===
  renderPagination(dbProduct); // lọc xong rồi phân trang
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > dbProduct.length) {
    end = dbProduct.length;
  }
  dbProduct = dbProduct.slice(start, end); //new db đã cắt

  // sắp xếp===
  switch (selectSort.value) {
    case "nomal":
      break;
    case "aes":
      dbProduct.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "des":
      dbProduct.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  // render ra nội dung chính==
  let stringHTML = "";
  for (let i = 0; i < dbProduct.length; i++) {
    stringHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${dbProduct[i].name}</td>
        <td>
          <img width="100px" src="${dbProduct[i].image}" />
        </td>
        <td>${dbProduct[i].price.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}</td>
        <td>${dbProduct[i].description}</td>
        <td>${dbProduct[i].stock}</td>
        <td>
        ${dbCategory.find((el) => el.id === dbProduct[i].categoryId).name}
        </td>
        <td>
            <button class="update" onclick="enterUpdate(${
              dbProduct[i].id
            })" >Sửa</button>
            <button class="update" onclick="deleteProduct(${
              dbProduct[i].id
            })" >Xóa</button>
        </td>
    </tr>
    `;
  }
  listProduct.innerHTML = stringHTML;
}
renderProduct();
//===================
function deleteProduct(idDelete) {
  const result = confirm("Ban co chac muon xoa");
  if (!result) {
    return;
  }
  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const indexDelete = dbProduct.findIndex((el) => el.id === idDelete);
  dbProduct.splice(indexDelete, 1);
  localStorage.setItem("products", JSON.stringify(dbProduct));
  renderProduct();
}
//====================
function enterUpdate(idUpdate) {
  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const productUpdate = dbProduct.find((el) => el.id === idUpdate);

  localStorage.setItem("productUpdate", JSON.stringify(productUpdate));
  window.location.href = "./updateProduct.html";
}

//=============================================
function renderPagination(dbProductFilter) {
  let paginationHTML = "";
  totalPage = Math.ceil(dbProductFilter.length / pageSize);
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
  renderProduct();
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
  renderProduct();
}

//===============
function search() {
  currentPage = 1;
  renderProduct();
}
