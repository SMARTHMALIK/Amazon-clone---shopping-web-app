// const products=[
//   {
//     image :'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name :'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating :{
//       stars: 4.5,
//       count :87
//     },
//     priceCents: 29900,
//   },
//   {
//     image :'images/products/intermediate-composite-basketball.jpg',
//     name :'Intermediate Size Basketball',
//     rating :{
//       stars: 4,
//       count :127
//     },
//     priceCents: 49800,
//   },
//   {
//     image :'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name :'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating :{
//       stars: 4.5,
//       count :56
//     },
//     priceCents: 59900,    
//   }
// ];
import { cart ,addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let productHtml='';
products.forEach((product)=>{
  productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getImageUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container ">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`;
})

document.querySelector('.js-product-grid')
.innerHTML = productHtml;

function updateCartQuantity(){
  
  const cartQuantity=calculateCartQuantity();
  
  document.querySelector('.js-cart-quantity').
    innerHTML = cartQuantity;

}

updateCartQuantity();


document.querySelectorAll('.js-add-to-cart').
  forEach((button)=> {
    
    let addMessageTimeout;
    
    button.addEventListener('click',()=>{
      const {productId} = button.dataset;
      
      addToCart(productId);
      updateCartQuantity();
      
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`); 
      
      addedMessage.classList.add('added-to-cart-visible'); 

      if(addMessageTimeout){
        clearTimeout(addMessageTimeout);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      addMessageTimeout = timeoutId;
    
    });    
  });
  // updateCartQuantity();