let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let shopItemsData = [{
        id: "pehla",
        name: "pink sparkly nails",
        price: "₹500",
        description: "pastel line art on acrylic permanent nails",
        img: "firstpic.jpg",
    },
    {
        id: "dusra",
        name: "pink heart acrylic nails",
        price: "₹2000",
        description: "red white and pink detailed line art",
        img: "pic1.jpg",
    },
    {
        id: "tesra",
        name: "pink sparkly nails",
        price: "₹2000",
        description: "pastel line art on acrylic permanent nails",
        img: "myimage5.jpg",
    },
    {
        id: "chautha",
        name: "bunny theme red nails",
        price: "₹500",
        description: "detailed nail art with bunny and hearts with builder gel",
        img: "myimage4.png",
    },
];

let generateShop = () => {
    return shopItemsData.map((x) => {
        return `
            <div class="item">
                <img width="220" src="${x.img}" alt="${x.name}">
                <div class="details">
                    <h3>${x.name}</h3>
                    <p>${x.description}</p>
                    <div class="price-quantity">
                        <h2>${x.price}</h2>
                        <div class="buttons">
                            <i onclick="decrement('${x.id}')" class="bi bi-dash"></i>
                            <div id="${x.id}" class="quantity">0</div>
                            <i onclick="increment('${x.id}')" class="bi bi-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

shop.innerHTML = generateShop();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    update(id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(id);
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

