const formUpdateProduct = document.getElementById("form-update-product"); //yasuo
const selectCategory = document.getElementById("select-category");
const inputImage = document.getElementById("input-image");
const imageProduct = document.getElementById("image-product");
const errorProduct = document.getElementById("error-product");

const imputProductName = document.getElementById("product-name");
const imputProductDescription = document.getElementById("product-description");
const imputProductStock = document.getElementById("product-stock");
const imputProductPrice = document.getElementById("product-price");
const productImage = document.getElementById("product-image");

let categoryId = null;
let fileImageLocal = null;

function renderCategoryOption() {
  const dbCategory = JSON.parse(localStorage.getItem("category")) || [];
  let stringHTML = "";
  stringHTML += `
        <option value=${0} selected disabled >Chon loai banh</option>
        `;
  for (let i = 0; i <= dbCategory.length - 1; i++) {
    stringHTML += `
        <option value=${dbCategory[i].id} >${dbCategory[i].name}</option>
        `;
  }
  selectCategory.innerHTML = stringHTML;
}
renderCategoryOption();
//==================================================

function selectCategoryId() {
  categoryId = selectCategory.value; // option đang lưu giữ value là ID
}

//================================================================
formUpdateProduct.addEventListener("submit", function (event) {
  //yasuo
  event.preventDefault(); // k load sự thay đổi do submit
  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const productUpdate = JSON.parse(localStorage.getItem("productUpdate")) || {};

  const formData = new FormData(this); //sylas
  const newProduct = {};

  for (let [key, value] of formData.entries()) {
    newProduct[key] = value;
  }
  newProduct.id = productUpdate.id;
  newProduct.name = newProduct.name.trim();
  newProduct.price = +newProduct.price;
  newProduct.stock = +newProduct.stock;

  newProduct.categoryId = +categoryId;
  newProduct.image = fileImageLocal;

  // console.log(newProduct);
  // kiem tra xem co bi loi hay ko nhap truong nao khong
  const result = checkDataProduct(newProduct);

  if (!result) {
    return;
  }

  console.log("lam viec update", newProduct);

  const index = dbProduct.findIndex((el) => el.id === newProduct.id);
  dbProduct[index] = {
    ...newProduct,
  };
  localStorage.setItem("products", JSON.stringify(dbProduct));

  this.reset();
  localStorage.removeItem("productUpdate");
  fileImageLocal = null;
  categoryId = null;
  imageProduct.src = "";
  window.location.href = "./product.html";
});

// ===============================================================

inputImage.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    // A
    fileImageLocal = reader.result;

    imageProduct.src = fileImageLocal;
  };

  reader.readAsDataURL(file); // yasuo R goi A
});
//=======================================================
function checkDataProduct(newProduct) {
  const productUpdate = JSON.parse(localStorage.getItem("productUpdate")) || {};

  if (!newProduct.name) {
    errorProduct.innerHTML = "Nhap ten";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const index = dbProduct.findIndex(
    (el) => el.name.toLowerCase() == newProduct.name.toLowerCase()
  );
  if (newProduct.name !== productUpdate.name && index !== -1) {
    errorProduct.innerHTML = "Ten bi trung";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  if (newProduct.stock < 0) {
    errorProduct.innerHTML = "So luong > 0";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  if (newProduct.price < 0) {
    errorProduct.innerHTML = "Gia > 0";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  if (newProduct.categoryId == 0) {
    errorProduct.innerHTML = "Chon loai sp";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  if (!newProduct.image) {
    errorProduct.innerHTML = "Chon anh";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  return true;
}
//============================================
function renderProductUpdate() {
  const productUpdate = JSON.parse(localStorage.getItem("productUpdate")) || {};

  imputProductName.value = productUpdate.name;
  imputProductDescription.value = productUpdate.description;
  imputProductStock.value = productUpdate.stock;
  imputProductPrice.value = productUpdate.price;
  selectCategory.value = productUpdate.categoryId;
  imageProduct.src = productUpdate.image;
  fileImageLocal = productUpdate.image;
  categoryId = productUpdate.categoryId;
}
renderProductUpdate();
