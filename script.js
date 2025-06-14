const cart = [];
let total = 0;

const menuItems = [
  { name: "Margherita Pizza", price: 150 },
  { name: "Cold Coffee", price: 80 },
];

function renderMenu() {
  const container = document.getElementById('menu-items');
  menuItems.forEach((item, index) => {
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(index) {
  cart.push(menuItems[index]);
  total += menuItems[index].price;
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById('cart-items');
  cartDiv.innerHTML = cart.map(i => `<p>${i.name} - ₹${i.price}</p>`).join('');
  document.getElementById('total').innerText = total;
}

function showOrderForm() {
  document.getElementById('order-form').style.display = 'block';
  document.getElementById('orderSummary').value = cart.map(i => i.name).join(', ');
  document.getElementById('orderTotal').value = total;
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  fetch("https://sheetdb.io/api/v1/dhrll3tf1xndi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data })
  })
  .then(res => res.json())
  .then(response => {
    alert("Order submitted successfully!");
    location.reload();
  })
  .catch(error => alert("Error sending order."));
});

renderMenu();
