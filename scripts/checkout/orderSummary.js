import { calculateCartQuantity, cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import{getProduct, products} from"../../data/products.js";
import { formatCurrency } from "../utils/money.js";

import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";


export function renderOrderSummary(){


  let cartSummaryHtml='';
  cart.forEach((cartItem)=>{

    const {productId} = cartItem;

    const matchingProduct= getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption=getDeliveryOption(deliveryOptionId);

    const dateString  = calculateDeliveryDate(deliveryOption);
    
    cartSummaryHtml+=`
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price js-product-price-${matchingProduct.id}">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity js-update-quantity-${matchingProduct.id}"
                    data-product-id = "${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id ="${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link"
                    data-product-id ="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHtml(matchingProduct,cartItem)}
                </div>
              </div>
            </div>

    `;

  });

  function deliveryOptionsHtml(matchingProduct,cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{
      const dateString  = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0 
      ? 'Free'
      : `&#x20b9;${formatCurrency(deliveryOption.priceCents)}-`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
      html += `
            <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" 
            data-product-id = "${matchingProduct.id}" 
            data-delivery-option-id = "${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' :''}
                  class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>`;
    });

    return html;
  }


  document.querySelector('.js-order-summary').
  innerHTML=cartSummaryHtml;

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click',()=>{
      const {productId,deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });


  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const {productId} = link.dataset;
      removeFromCart(productId);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();

    });
  }); 

  document.querySelectorAll('.js-update-quantity').forEach((link)=>{
    link.addEventListener('click',()=>{
      const{productId} = link.dataset;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
      
    });
  });

  function saveQuatity(productId){  
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    if(container)container.classList.remove('is-editing-quantity');

    const quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    updateQuantity(productId,quantity);
    if(quantity > 0 && quantity <= 1000){
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML=`Quantity: <span class="quantity-label">${quantity}</span>`
      renderCheckoutHeader();
    }else if(quantity === 0){ 
      container.remove();
      renderCheckoutHeader();
      removeFromCart(productId);
    }
    else alert('Quantity should be between 0 to 1000');
  }


  document.querySelectorAll('.save-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const{productId} = link.dataset;
      saveQuatity(productId);
      renderPaymentSummary();
    });
  });


  document.querySelectorAll('.quantity-input').forEach((link)=>{
    link.addEventListener('keydown',(event)=>{
      if(event.key === 'Enter'){
        const{productId} = link.dataset;
        saveQuatity(productId);
        renderPaymentSummary();
      }
    });
  });
}