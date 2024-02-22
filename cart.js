let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let shopItemsData = [{
  id: "pehla",
  name: "pink sparkly nails",
  price: 500,
  description: "pastel line art on acrylic permanent nails",
  img: "firstpic.jpg",
},
{
  id: "dusra",
  name: "pink heart acrylic nails",
  price: 2000,
  description: "red white and pink detailed line art",
  img: "pic1.jpg",
},
{
  id: "tesra",
  name: "pink sparkly nails",
  price: 2000,
  description: "pastel line art on acrylic permanent nails",
  img: "myimage5.jpg",
},
{
  id: "chautha",
  name: "bunny theme red nails",
  price: 500,
  description: "detailed nail art with bunny and hearts with builder gel",
  img: "myimage4.png",
},
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartamount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || {};
        return `
          <div class="cart-item">
            <img width="220" src=${search.img} alt="your product" />
            <div class="details">
              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${search.name}</p>
                  <p class="cart-item-price">$ ${search.price}</p>
                </h4>
                <i onclick="removeItem('${id}')" class="bi bi-x-lg"></i>
              </div>
              <div class="buttons">
                <i onclick="decrement('${id}')" class="bi bi-dash"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment('${id}')" class="bi bi-plus"></i>
              </div>
              <h3>$ ${item * parseInt(search.price)}</h3>
            </div>
          </div>
        `;
      })
      .join("");
  } else {
    ShoppingCart.innerHTML = "";
    if (label) {
      label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
          <button class="HomeBtn">Back to home</button>
        </a>
      `;
    }
  }
};

generateCartItems();

let increment = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({ id: id, item: 1 });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined || search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || {};
        return item * parseInt(search.price);
      })
      .reduce((x, y) => x + y, 0);
    if (label) {
      label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    }
  } else {
    if (label) {
      label.innerHTML = "";
    }
  }
};

TotalAmount();
