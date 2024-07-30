const userCart = document.getElementById("user-cart");
const productOrder = document.getElementById("product-order");
const subtotal = document.getElementById("subtotal");
const shipMoney = document.getElementById("ship-money");
const moneyTotal = document.getElementById("money-total");

const create = document.getElementById("create");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const numberPhone = document.getElementById("number-phone");
const address = document.getElementById("address");
const note = document.getElementById("note");

const error = document.getElementById("error");

let ship = 20000;
let sum = 0;

//========================= đẩy thông tin người mua lên cart[]

function renderUserCart() {
  // in giỏ hàng
  const userLogin = JSON.parse(localStorage.getItem("users-login"));
  const cart = userLogin.cart;
  userCart.innerHTML = cart.length;
}
renderUserCart();

function renderProductOrder() {
  const usersLogin = JSON.parse(localStorage.getItem("users-login"));
  const dbProduct = JSON.parse(localStorage.getItem("products"));
  let stringCartOrderHTML = "";
  let cart = usersLogin.cart;
  sum = 0;
  for (let i = 0; i <= cart.length - 1; i = i + 1) {
    const index = dbProduct.findIndex((el) => el.id == cart[i].productId);
    stringCartOrderHTML += `
        <div class="d-flex justify-content-between">
        <p>${dbProduct[index].name}</p>
        <p>${(cart[i].quantity * dbProduct[index].price).toLocaleString(
          "it-IT",
          {
            style: "currency",
            currency: "VND",
          }
        )}</p>
        </div>
    `;

    sum = sum + cart[i].quantity * dbProduct[index].price;
  }
  productOrder.innerHTML = stringCartOrderHTML;
  subtotal.innerHTML = sum.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  shipMoney.innerHTML = ship.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  moneyTotal.innerHTML = (sum + ship).toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
}
renderProductOrder();

//=========================================
create.addEventListener("click", function () {
  const result = checkValidate();

  if (!result) {
    return;
  }
  // b1: keo gior order tren local ve
  let userLogin = JSON.parse(localStorage.getItem("users-login")) || [];
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let cart = userLogin.cart;
  let id = 1; // đặt tên cho ID
  if (orders.length > 0) {
    id = orders[orders.length - 1].id + 1;
  }
  // b2
  const newOrderItem = {
    id: id,
    fullname: firstName.value + " " + lastName.value,
    userId: userLogin.id,
    email: email.value,
    numberPhone: numberPhone.value,
    address: address.value,
    note: note.value,
    date: new Date(),
    status: 0,
    totalMoney: sum + ship,
    cart: cart,
  };

  // b3: push them vao order
  orders.push(newOrderItem);
  localStorage.setItem("orders", JSON.stringify(orders));
  // b4: luu
  // b5: xoa cart trong userLogin
  userLogin.cart = [];
  localStorage.setItem("users-login", JSON.stringify(userLogin));

  renderProductOrder();
  window.location.href = "./index.html";
});

//=========================================
function checkValidate() {
  if (!firstName.value) {
    error.innerHTML = "Hãy điền họ người nhận";
    return false;
  } else {
    error.innerHTML = "";
  }
  if (!lastName.value) {
    error.innerHTML = "Hãy điền tên người nhận";
    return false;
  } else {
    error.innerHTML = "";
  }
  if (!email.value) {
    error.innerHTML = "Hãy điền Email người nhận";
    return false;
  } else {
    error.innerHTML = "";
  }
  if (!numberPhone.value) {
    error.innerHTML = "Hãy điền số điện thoại người nhận";
    return false;
  } else {
    error.innerHTML = "";
  }
  if (!address.value) {
    error.innerHTML = "Hãy điền địa chỉ nngười nhận";
    return false;
  } else {
    error.innerHTML = "";
  }

  return true;
}
