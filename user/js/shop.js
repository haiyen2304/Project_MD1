const userCart = document.getElementById("user-cart");
const listProduct = document.getElementById("list-product");
const inputSearchName = document.getElementById("Search-for-products");
const btnFilterCategory = document.getElementById("btn-filter-category");
const listCategory = document.getElementById("list-category");

const paginationProduct = document.getElementById("pagination-product"); //phân trang

let categoryIdFilter = null;
let statusSort = "aes";

const pageSize = 6; // kích cỡ 1 trang chứa sản phẩm
let totalPage = 1; // tổng số trang
let currentPage = 1; // trang hiện tại đang đứng

const dbCategory = JSON.parse(localStorage.getItem("category"));
//==================danh sách category
function renderCategory() {
  let stringCategoryHTML = "";
  stringCategoryHTML += `
    <a class="dropdown-item" onclick="filterByCategory(${0})">Tất cả</a>
  `;
  for (let i = 0; i <= dbCategory.length - 1; i = i + 1) {
    stringCategoryHTML += `
    <a class="dropdown-item" onclick="filterByCategory(${dbCategory[i].id})">${dbCategory[i].name}</a>
    `;
  }
  listCategory.innerHTML = stringCategoryHTML;
}

renderCategory();
function filterByCategory(categoryById) {
  categoryIdFilter = categoryById;
  listCategory.style.display = "none";
  renderProductShop();
}
//=========

btnFilterCategory.addEventListener("click", function () {
  if (listCategory.style.display == "block") {
    listCategory.style.display = "none";
  } else {
    listCategory.style.display = "block";
  }
});

//================================================
function renderUserCart() {
  // in giỏ hàng
  const userLogin = JSON.parse(localStorage.getItem("users-login"));
  if (userLogin) {
    const cart = userLogin.cart;
    userCart.innerHTML = cart.length;
  }
}
renderUserCart();

function renderProductShop() {
  let dbProduct = JSON.parse(localStorage.getItem("products"));
  // lọc tìm kiếm
  dbProduct = dbProduct.filter((el) =>
    el.name.toLowerCase().includes(inputSearchName.value.trim().toLowerCase())
  );
  // lọc theo category
  if (categoryIdFilter) {
    dbProduct = dbProduct.filter((el) => el.categoryId == categoryIdFilter);
  }

  // phân trang
  renderPagination(dbProduct); // lọc xong rồi phân trang
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  if (end > dbProduct.length) {
    end = dbProduct.length;
  }
  dbProduct = dbProduct.slice(start, end); //new db đã cắt

  // sắp xếp theo giá
  switch (statusSort) {
    case "aes":
      dbProduct.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "des":
      dbProduct.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }
  //render
  let stringShopHTML = "";
  for (let i = 0; i <= dbProduct.length - 1; i = i + 1) {
    stringShopHTML += `
        <div class="col-lg-4 col-md-6 col-sm-6 pb-1 cursor-pointer" onclick="chooseProduct(${
          dbProduct[i].id
        })">
            <div class="box-shadow bg-light mb-4">
                <div class="product-img position-relative overflow-hidden">
                    <img class="img-fluid w-100" src="${
                      dbProduct[i].image
                    }" alt="">
                </div>
                <div class="text-center py-4">
                    <a class="h6 text-decoration-none text-truncate" href="">${
                      dbProduct[i].name
                    }</a>
                    <div class="d-flex align-items-center justify-content-center mt-2">
                        <h5>${dbProduct[i].price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}</h5>
                    </div>
                    <div>Số lượng còn trong kho : ${dbProduct[i].stock}</div>
                    <div class="d-flex align-items-center justify-content-center mb-1">
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small class="fa fa-star text-primary mr-1"></small>
                        <small>(99)</small>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
  listProduct.innerHTML = stringShopHTML;
}
renderProductShop();

function sortPrice(status) {
  statusSort = status;
  renderProductShop();
}

//============
function renderPagination(dbProductFilter) {
  let paginationHTML = "";
  totalPage = Math.ceil(dbProductFilter.length / pageSize);
  if (totalPage == 0) {
    currentPage = 0;
    paginationProduct.innerHTML = "";
    return;
  }

  paginationHTML += `
  <li class="page-item disabled" onclick="changePage('previous')">
    <a class="page-link">Previous</span></a>
  </li>
    
  `;

  for (let i = 1; i <= totalPage; i++) {
    paginationHTML += `
    <li class="page-item next ${currentPage == i ? "active" : ""}" 
        onclick="clickPage(${i})""><a class="page-link">${i}</a></li>
    `;
  }

  paginationHTML += `
  <li class="page-item" onclick="changePage('next')">
    <a class="page-link">Next</a>
  </li>
  `;

  paginationProduct.innerHTML = paginationHTML;
}

//======================================
function clickPage(pageI) {
  currentPage = pageI;
  renderProductShop();
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
  renderProductShop();
}

//==========
function chooseProduct(productId) {
  localStorage.setItem("productId", JSON.stringify(productId));
  window.location.href = "./detail.html";
}
