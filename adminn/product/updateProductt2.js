const selectCategory = document.getElementById("select-category");

function renderCategoryOption() {
  const dbCatagory = JSON.parse(localStorage.getItem("category")) || [];
  let stringHTML = "";
  stringHTML += `
  <option value ${0} selected disabled>Chọn Loại Bánh</option>`;
  for (let i = 0; i <= dbCatagory.length - 1; i++) {
    stringHTML += `
    <option value=${dbCatagory[i].id}>${dbCatagory[i].name}</option>
    `;
  }
  selectCategory.innerHTML = stringHTML;
}
renderCategoryOption();

//=====================================================
// gắn ID cho selec, selec lấy value của option, option giữ Value là ID
let categoryId = null;
function selectCategoryId() {
  categoryId = selectCategory.value;
}

//=========================================================
formUpdateProduct.addEventListener("submit", function (event) {
  event.preventDefault(); // ngăn k cho load do submit;
  const dbProduct = JSON.parse(localStorage.getItem(""));
});
