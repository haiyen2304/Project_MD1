// thêm sản phẩm
const formAddProduct = document.getElementById("form-add-product"); //yasuo
const selectCategory = document.getElementById("select-category");
const inputImage = document.getElementById("input-image");
const imageProduct = document.getElementById("image-product");
const errorProduct = document.getElementById("error-product");

let categoryId = null;
let fileImageLocal = null;

// in ra các option bánh
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

//lấy ra tên option, sau khi đã lựa chọn ==========================
function selectCategoryId() {
  categoryId = document.getElementById("select-category").value;
}

//==================================================================
formAddProduct.addEventListener("submit", function (event) {
  //yasuo
  event.preventDefault(); // ngăn chặn sự kiện load lại trang
  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const formData = new FormData(this); //sylas

  const newProduct = {};

  for (let [key, value] of formData.entries()) {
    newProduct[key] = value;
  }

  let id = 1;
  if (dbProduct.length > 0) {
    id = dbProduct[dbProduct.length - 1].id + 1;
  }
  // gắn chuyển đổi giữ liệu cho đúng kiểu
  newProduct.id = id;
  newProduct.categoryId = +categoryId;
  newProduct.image = fileImageLocal;

  newProduct.name = newProduct.name.trim();
  newProduct.price = +newProduct.price;
  newProduct.stock = +newProduct.stock;

  console.log("thong tin san pham moi: ", newProduct);
  // console.log(newProduct);
  // kiem tra xem co bi loi hay ko nhap truong nao khong
  const result = checkDataProduct(newProduct);
  if (!result) {
    return;
  }

  dbProduct.push(newProduct);
  localStorage.setItem("products", JSON.stringify(dbProduct));

  this.reset();
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
  reader.readAsDataURL(file); //yasuo R goi A
});

//=================================================
function checkDataProduct(newProduct) {
  if (!newProduct.name) {
    errorProduct.innerHTML = "Nhập tên";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  const dbProduct = JSON.parse(localStorage.getItem("products")) || [];
  const index = dbProduct.findIndex(
    (el) => el.name.toLowerCase() == newProduct.name.toLowerCase()
  );
  if (index !== -1) {
    errorProduct.innerHTML = "Tên bị trùng";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  if (newProduct.stock <= 0) {
    errorProduct.innerHTML = "Số lượng lớn hơn 0";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  if (newProduct.price <= 0) {
    errorProduct.innerHTML = "Giá lớn hơn 0";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  if (newProduct.categoryId == 0) {
    errorProduct.innerHTML = "Chọn loại sẩn phẩm";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  if (!newProduct.image) {
    errorProduct.innerHTML = "Chọn ảnh";
    return false;
  } else {
    errorProduct.innerHTML = "";
  }

  return true;
}
