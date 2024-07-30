const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");

const btnMinus = document.getElementById("btn-minus");
const btnPlus = document.getElementById("btn-plus");
const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("add-to-cart");
const errorAddToCart = document.getElementById("error-add-to-cart");

const userCart = document.getElementById("user-cart");

let product;

function renderProductDetail() {
  const dbProduct = JSON.parse(localStorage.getItem("products"));
  const productId = JSON.parse(localStorage.getItem("productId"));
  product = dbProduct.find((el) => el.id == productId);

  productImage.src = product.image;
  productName.innerHTML = product.name;
  productPrice.innerHTML = product.price.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
  productDescription.innerHTML = product.description;

  // in giỏ hàng
  const userLogin = JSON.parse(localStorage.getItem("users-login"));
  const cart = userLogin.cart;
  userCart.innerHTML = cart.length;
}
renderProductDetail();

btnMinus.addEventListener("click", function () {
  if (+quantity.value > 1) {
    quantity.value = +quantity.value - 1;
    errorAddToCart.innerHTML = "";
  }
});

btnPlus.addEventListener("click", function () {
  quantity.value = +quantity.value + 1;
  errorAddToCart.innerHTML = "";
});

quantity.addEventListener("change", function () {
  errorAddToCart.innerHTML = "";
});

addToCart.addEventListener("click", function () {
  if (+quantity.value > product.stock) {
    errorAddToCart.style.color = "red";
    errorAddToCart.innerHTML = "Bạn đặt quá số lượng trong kho";
    return;
  }

  errorAddToCart.innerHTML = "";
  // luu vao gio hang: {productId: product.id, quantity: +quantity.value}

  const userLogin = JSON.parse(localStorage.getItem("users-login"));
  const cart = userLogin.cart;

  const index = cart.findIndex((el) => el.productId == product.id);
  if (index === -1) {
    // mua mới
    const newCartItem = {
      productId: product.id,
      quantity: +quantity.value,
    };
    cart.push(newCartItem);
    userLogin.cart = cart; // giỏ cũ đc gán bằng giỏ mới
    localStorage.setItem("users-login", JSON.stringify(userLogin));

    // vẽ lại giao diện
    quantity.value = 1;
    userCart.innerHTML = cart.length;

    errorAddToCart.innerHTML = "Bạn thêm vào giỏ hàng thành công";
    errorAddToCart.style.color = "green";
  } else {
    // mua thêm
    const totalQuantity = +cart[index].quantity + +quantity.value;
    if (totalQuantity <= product.stock) {
      cart[index].quantity = totalQuantity;
      userLogin.cart = cart; // giỏ cũ đc gán bằng giỏ mới
      localStorage.setItem("users-login", JSON.stringify(userLogin));
      // vẽ lại giao diện
      quantity.value = 1;
      userCart.innerHTML = cart.length;

      errorAddToCart.innerHTML = "Bạn thêm vào giỏ hàng thành công";
      errorAddToCart.style.color = "green";
    } else {
      errorAddToCart.style.color = "red";
      errorAddToCart.innerHTML = "Tổng số lượng bạn đặt quá số lượng trong kho";
    }
  }
});
