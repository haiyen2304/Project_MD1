const inputCategoryName = document.getElementById("input-category-name");
const btnNo = document.getElementById("btn-no");
const btnYes = document.getElementById("btn-yes");
const errorCategoryName = document.getElementById("error-category-name");
const listCategory = document.getElementById("list-category");
const titelForm = document.getElementById("titel-form");
const sortCategoryName = document.getElementById("sort-category-name"); // đã đặt
const inputSearchName = document.getElementById("input-search-name");

let idUpdateLocal = null;

// tạo hành động cho nút YES (đồng ý thêm)
btnYes.onclick = function () {
  const dbCategory = JSON.parse(localStorage.getItem("category")) || []; // lôi dữ liệu ở local về
  const categoryName = inputCategoryName.value.trim();

  let id = 1; // đặt tên cho ID
  if (dbCategory.length > 0) {
    id = dbCategory[dbCategory.length - 1].id + 1;
  }

  if (!categoryName) {
    // nếu tên rỗng
    errorCategoryName.innerHTML = `!!! hãy nhập lại tên, tên bạn nhập đang rỗng`;
    return;
  }
  //===========//tìm vị trí của name trong dbCategory mà bằng với tên mới nhập
  const index = dbCategory.findIndex(function (e) {
    return e.name.toLowerCase() == categoryName.toLowerCase();
  });
  if (index !== -1) {
    errorCategoryName.innerHTML = `!!! tên đã tồn tại`;
    return;
  }
  //===========//
  if (idUpdateLocal) {
    const indexUpdate = dbCategory.findIndex(function (e) {
      return e.id === idUpdateLocal;
    }); // tìm vị trí xem idUpdateLocal(sửa) = bằng với ID nào của dbCategory

    dbCategory[indexUpdate].name = categoryName; // lấy name của vị trí đó, thay bằng tên ở ô input
    // tên cũ sẽ được thay bằng tên mới categoryName ở ô input
    localStorage.setItem("category", JSON.stringify(dbCategory));
    renderCategory();
    btnNo.onclick();
    return;
  }

  // tạo dữ liệu mới, để nhét vào================
  const newName = {
    id: id,
    name: categoryName,
  };
  // cho vào mảng dữ liệu
  dbCategory.push(newName);
  // nhét dữ liệu lên
  localStorage.setItem("category", JSON.stringify(dbCategory));
  // rồi mọi thứ trong input sẽ rỗng
  btnNo.onclick();
  renderCategory();
};

//================================
btnNo.onclick = function () {
  titelForm.innerHTML = `THÊM DANH MỤC`;
  inputCategoryName.value = "";
  errorCategoryName.innerHTML = ``;
  idUpdateLocal = null;
};

//=======================================================================
function renderCategory() {
  //sắp xếp theo sort
  let dbCategory = JSON.parse(localStorage.getItem("category")) || [];

  //========== lọc tra tên  ============
  dbCategory = dbCategory.filter(function (e) {
    return e.name
      .toLowerCase()
      .includes(inputSearchName.value.trim().toLowerCase());
  });

  switch (sortCategoryName.value) {
    case "nomal":
      break;
    case "aes":
      dbCategory.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "des":
      dbCategory.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  //========== render ra==============
  let stringHTML = "";
  for (let i = 0; i < dbCategory.length; i++) {
    stringHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${dbCategory[i].name}</td>
            <td>
                <button onclick="updateCategory(${
                  dbCategory[i].id
                })" class="update">Sửa</button>
                <button onclick="deleteCategory(${
                  dbCategory[i].id
                })" class="update">Xóa</button>
            </td>
        </tr>
    `;
  }
  listCategory.innerHTML = stringHTML;
}
renderCategory();

//=========================================================================
// truyền vào id muốn xóa :idDelete, xem có giống e.id là id của dbCatagory
function deleteCategory(idDelete) {
  let result = confirm("bạn có đồng ý xóa không");
  if (!result) {
    return;
  }
  const dbCategory = JSON.parse(localStorage.getItem("category")) || [];
  const indexDelete = dbCategory.findIndex(function (e) {
    return e.id === idDelete;
  });

  dbCategory.splice(indexDelete, 1);
  localStorage.setItem("category", JSON.stringify(dbCategory));
  renderCategory();
}

//===================================sửa update=============================
function updateCategory(idUpdate) {
  const dbCategory = JSON.parse(localStorage.getItem("category")) || [];
  const indexUpdate = dbCategory.findIndex(function (e) {
    return e.id === idUpdate;
  });
  inputCategoryName.value = dbCategory[indexUpdate].name;
  titelForm.innerHTML = `SỬA DANH MỤC`;
  idUpdateLocal = idUpdate;
}

// ===============================sort khi thay đổi=============================
sortCategoryName.onchange = function () {
  renderCategory();
};
