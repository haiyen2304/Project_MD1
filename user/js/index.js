const containerFluidPt5 = document.getElementById("categories-fluid");
const listCategoryProduct = document.getElementById("list-category-product");
const SearchForProducts = document.getElementById("Search-for-products");

const userCart = document.getElementById("user-cart");

function renderCategory() {
  let dbCategory = JSON.parse(localStorage.getItem("category")) || [];
  let dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  let stringHTML = "";
  let images = [
    "../image/banh man.webp",
    "../image/banh my.jpg",
    "../image/banhsinhnhat.webp",
  ];

  for (let i = 0; i < dbCategory.length; i++) {
    let productFilter = dbProduct.filter(
      (el) => el.categoryId == dbCategory[i].id
    );
    const count = productFilter.length;
    stringHTML += `
    <div>
        <div>
            <a class="text-decoration-none" href="">
                <div class="cat-item d-flex align-items-center mb-4">
                    <div class="overflow-hidden" style="width: 100px; height: 100px;">
                        <img class="img-fluid" src="${images[i]}" alt="">
                    </div>
                    <div class="flex-fill pl-3">
                        <h6 style="padding-right: 20px;">${dbCategory[i].name}</h6>
                        <small class="text-body">${count} Sản phẩm</small>
                    </div>
                </div>
            </a>
        </div>
    </div>
    `;
  }
  containerFluidPt5.innerHTML = stringHTML;
}
renderCategory();

function renderProductOfCategory() {
  let dbCategory = JSON.parse(localStorage.getItem("category")) || [];
  let dbProduct = JSON.parse(localStorage.getItem("products")) || [];

  let stringCategoryHTML = "";
  for (let i = 0; i < dbCategory.length; i++) {
    let productOfCategory = dbProduct.filter(
      (el) => el.categoryId === dbCategory[i].id
    );

    productOfCategory = productOfCategory.filter((el) =>
      el.name
        .toLowerCase()
        .includes(SearchForProducts.value.trim().toLocaleLowerCase())
    );

    let stringProductHTML = "";
    for (let j = 0; j < productOfCategory.length; j++) {
      stringProductHTML += `
        <div class="px-xl-3 cursor-pointer" onclick="chooseProduct(${
          productOfCategory[j].id
        })">
          <div class="product_item">
            <div class="product-item bg-light mb-4">
              <div class="product-img position-relative overflow-hidden">
                <img class="img-fluid w-100" src="${
                  productOfCategory[j].image
                }" alt="">
                <div class="product-action">
                
              </div>
            </div>

            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate">${
                productOfCategory[j].name
              }</a>
              <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>${productOfCategory[j].price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}</h5>
                </div>
                <div class="d-flex align-items-center justify-content-center mb-1">
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    stringCategoryHTML += `
    <div class="container-fluid pt-5 pb-3">
      <h2 class="section-title position-relative text-uppercase mx-xl-5 mb-4"><span class="bg-secondary pr-3">
      ${dbCategory[i].name}
      </span></h2>

      <div style="display: flex;">
        ${stringProductHTML}
      </div>
    </div>
    `;
  }
  listCategoryProduct.innerHTML = stringCategoryHTML;
}
renderProductOfCategory();

//
//============================================
//
function chooseProduct(productId) {
  localStorage.setItem("productId", JSON.stringify(productId));
  window.location.href = "./detail.html";
}

function renderUserCart() {
  // in giỏ hàng
  const userLogin = JSON.parse(localStorage.getItem("users-login"));
  const cart = userLogin.cart;
  userCart.innerHTML = cart.length;
}
renderUserCart();
