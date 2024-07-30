const listCartItem = document.getElementById("list-cart-item");

function renderCart() {
  let orderId = JSON.parse(localStorage.getItem("orderId"));
  let dbProduct = JSON.parse(localStorage.getItem("products"));
  let orders = JSON.parse(localStorage.getItem("orders"));
  let orderDetail = orders.find((el) => el.id == orderId);

  const cart = orderDetail.cart;

  let stringHTML = "";
  for (let i = 0; i <= cart.length - 1; i++) {
    const product = dbProduct.find((el) => el.id == cart[i].productId);
    stringHTML += `
        <tr>
            <td class="align-middle text-left">
                <p style="display: flex; align-items: center; gap: 12px; margin: 0; padding-left: 12px;">
                    <img src="${product.image}" alt="" style="width: 50px;">  
                ${product.name}
                </p>
            </td>
            <td class="align-middle">${product.price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}</td>
            <td class="align-middle">
                <div class="input-group quantity mx-auto">
                    ${cart[i].quantity}
                </div>
            </td>
            <td class="align-middle">${(
              cart[i].quantity * product.price
            ).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}</td>
        </tr>
    `;
  }
  listCartItem.innerHTML = stringHTML;
}
renderCart();
