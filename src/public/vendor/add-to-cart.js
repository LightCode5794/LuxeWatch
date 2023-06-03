// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  class Item {
    constructor(name, code, img, price, count) {
      this.name = name;
      this.code = code;
      this.price = price;
      this.img = img;
      this.count = count;
    }
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }


  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, code, img, price, count) {

    for (var item in cart) {
      if (cart[item].code === code) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, code, img, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function (code, count) {
    for (var i in cart) {
      if (cart[i].code === code) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (code) {
    for (var item in cart) {
      if (cart[item].code === code) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function (code) {
    for (var item in cart) {
      if (cart[item].code === code) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return totalCart;
  }

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      const item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = item.price * item.count;
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  var code = $(this).data('code');
  var img = $(this).data('img');
  shoppingCart.addItemToCart(name, code, img, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function () {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    // output += "<tr>"
    //   + "<td>" + cartArray[i].name + "</td>" 
    //   + "<td>(" + cartArray[i].price + ")</td>"
    //   + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-dark' data-code=" + cartArray[i].code + ">-</button>"
    //   + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
    //   + "<button class='plus-item btn btn-dark input-group-addon' data-code=" + cartArray[i].code + ">+</button></div></td>"
    //   + "<td><button class='delete-item btn btn-danger' data-code=" + cartArray[i].code + ">X</button></td>"
    //   + " = " 
    //   + "<td>" + cartArray[i].total + "</td>" 
    //   +  "</tr>";
    output += `
    <li>
  <div class="d-flex flex-nowrap align-items-center gap-3 fs-6">
    <div>
      <img src="${cartArray[i].img}"
        class="img-fluid img-thumbnail" alt="Sheep" style="width: 100px; min-width: 80px"/>
    </div>
    <div class="d-flex flex-column  flex-grow-1 gap-3 ">
      <div>${cartArray[i].name}</div>
      <div>${cartArray[i].price.toLocaleString(undefined, {minimumFractionDigits: 2})} VNĐ</div>
      <div class="qty">
        <div class="input-group">
          <button class='minus-item input-group-addon btn btn-dark' data-code="${cartArray[i].code}">-</button>
          <input type='number' class='item-count form-control' data-code='${cartArray[i].code}' value='${cartArray[i].count}'/>
            <button class='plus-item btn btn-dark input-group-addon' data-code="${cartArray[i].code}">+</button>
        </div>
      </div>
      <div style="min-width: 150px">${cartArray[i].total.toLocaleString(undefined, {minimumFractionDigits: 2})} VNĐ</div>
    </div>
    <button class='delete-item btn btn-danger btn-sm' data-code="${cartArray[i].code}">X</button>
  </div>
</li>
<hr/>
  
    `
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart().toLocaleString(undefined, {minimumFractionDigits: 2}) + ' VNĐ');
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
  var code = $(this).data('code')
  shoppingCart.removeItemFromCartAll(code);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
  var code = $(this).data('code')
  shoppingCart.removeItemFromCart(code);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
  var code = $(this).data('code')
  shoppingCart.addItemToCart('', code, '', 0, 0);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
 
  var code = $(this).data('code')
  var count = Number($(this).val());
  shoppingCart.setCountForItem(code, count);
  displayCart();
});

displayCart();
