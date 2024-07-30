const userCart = document.getElementById("user-cart");
const listCartItem = document.getElementById("list-cart-item");
const subtotal = document.getElementById("subtotal");
const totalPay = document.getElementById("total-pay");
const shipPrice = document.getElementById("ship-price");
const order = document.getElementById("order");
const errorOrder = document.getElementById("error-order");

let shipMoney = 20000;

function renderUserCart() {
  // in giỏ hàng
  const userLogin = JSON.parse(localStorage.getItem("users-login"));
  // console.log(userLogin);
  if (userLogin) {
    const cart = userLogin.cart;
    userCart.innerHTML = cart.length;
  }
}
renderUserCart();

function renderListCartItem() {
  const userLogin = JSON.parse(localStorage.getItem("users-login"));
  if (!userLogin) {
    return;
  }
  const cart = userLogin.cart;
  const dbProduct = JSON.parse(localStorage.getItem("products"));

  let stringCartItemHTML = "";
  let sumPrice = 0;

  if (cart.length == 0) {
    shipMoney = 0;
  } else {
    shipMoney = 20000;
  }

  for (let i = 0; i <= cart.length - 1; i = i + 1) {
    const product = dbProduct.find((el) => el.id == cart[i].productId);
    stringCartItemHTML += `
        <tr>
            <td class="align-middle text-left"><img src="${
              product.image
            }" alt="" style="width: 50px;">  
                ${product.name}
            </td>
            <td class="align-middle">${product.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}</td>
            <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                        <button  class="btn btn-sm btn-primary btn-minus" onclick="btnMinus(${
                          cart[i].productId
                        })"  >
                            <i  class="fa fa-minus"></i>                          
                        </button>
                    </div>
                    <input type="text" disabled
                        class="form-control form-control-sm bg-secondary border-0 text-center"
                        value="${cart[i].quantity}">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus" onclick="btnPlus(${
                          cart[i].productId
                        })">
                            <i class="fa fa-plus"></i>                         
                        </button>
                    </div>
                </div>
            </td>
            <td class="align-middle">${(
              cart[i].quantity * product.price
            ).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}</td>
            <td  class="align-middle">
                <button onclick="deleteCartItem(${
                  cart[i].productId
                })" class="btn btn-sm btn-danger">
                    <i class="fa fa-times"></i>
                </button>
            </td>
        </tr>
    `;
    sumPrice += cart[i].quantity * product.price;
  }
  listCartItem.innerHTML = stringCartItemHTML;
  subtotal.innerHTML = sumPrice.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  shipPrice.innerHTML = shipMoney.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  totalPay.innerHTML = (sumPrice + shipMoney).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}

renderListCartItem();

function deleteCartItem(deleteId) {
  let result = confirm("Bạn có đồng ý xóa hay không?");
  if (!result) {
    return;
  }

  let userLogin = JSON.parse(localStorage.getItem("users-login"));
  let cart = userLogin.cart;
  let deleteIndex = cart.findIndex((el) => el.productId == deleteId);
  cart.splice(deleteIndex, 1);
  userLogin.cart = cart;
  localStorage.setItem("users-login", JSON.stringify(userLogin));

  renderListCartItem();
  renderUserCart();
}

order.addEventListener("click", function () {
  let userLogin = JSON.parse(localStorage.getItem("users-login"));

  if (!userLogin) {
    alert("Bạn chưa đăng nhập");
    return;
  }

  let cart = userLogin.cart;
  if (cart.length == 0) {
    errorOrder.innerHTML = "Giỏ hàng của bạn rỗng";
    totalPay.innerHTML = Number(0).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return;
  } else {
    errorOrder.innerHTML = "";
    window.location.href = "./checkout.html";
  }
});

function btnMinus(id) {
  let userLogin = JSON.parse(localStorage.getItem("users-login"));
  let cart = userLogin.cart;
  let index = cart.findIndex((el) => el.productId == id);
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    userLogin.cart = cart;
    localStorage.setItem("users-login", JSON.stringify(userLogin));
    renderListCartItem();
  }
}

function btnPlus(idx) {
  let userLogin = JSON.parse(localStorage.getItem("users-login"));
  let dbProduct = JSON.parse(localStorage.getItem("products"));
  let product = dbProduct.find((el) => el.id == idx);

  let cart = userLogin.cart;
  let index = cart.findIndex((el) => el.productId == idx);
  if (cart[index].quantity < product.stock) {
    cart[index].quantity += 1;
    userLogin.cart = cart;
    localStorage.setItem("users-login", JSON.stringify(userLogin));
    renderListCartItem();
  }
}
