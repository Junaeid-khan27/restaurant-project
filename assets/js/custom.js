const foods = [
    {
        id: '01',
        src: "Chicken_Burger.jpg",
        alt: "this is alt text",
        title: "Chicken Burger",
        price: 12,
        ratting: 4,
    },
    {
      id: '02',
        src: "Chicken_Cheese_Pizza.jpg",
        alt: "this is alt text",
        title: "Chicken Cheese Pizza",
        price: 15,
        ratting: 5,
    },
    {
      id: '03',
        src: "Chicken_Fry.jpg",
        alt: "this is alt text",
        title: "Chicken Fry",
        price: 32,
        ratting: 2,
    },
    {
      id: '04',
        src: "Chicken_Sandwich.jpg",
        alt: "this is alt text",
        title: "Chicken Sandwich",
        price: 7,
        ratting: 5,
    },
    {
      id: '05',
        src: "Fry_Nurger.jpg",
        alt: "this is alt text",
        title: "Fry Nurger",
        price: 10,
        ratting: 5,
    },
    {
      id: '06',
        src: "Grill_Chicken.jpg",
        alt: "this is alt text",
        title: "Grill Chicken",
        price: 3,
        ratting: 5,
    },
    {
      id: '07',
        src: "Pasta.jpg",
        alt: "this is alt text",
        title: "Pasta",
        price: 44,
        ratting: 2,
    },
    {
      id: '08',
        src: "Seekh_Kebab.jpg",
        alt: "this is alt text",
        title: "Seekh Kebab",
        price: 43,
        ratting: 5,
    }
];



let activeOnCartItem = [];


// function init;
foodSectionHandler();
collectCartDataHandler();
addToCart();
cartStatusHandler();
activeItemsRowHandler();
deleteActiveItem();
incrementHandler();
dicrementHandler();
clearcart();

// foodsection handler
function foodSectionHandler (){
    let rowDiv = document.getElementById('row_div');
    let foodItem = function (item){
        return    `<div class="col-lg-4 col-xl-3 col-md-6">
                    <div class="food-item">
                    <img src="assets/images/foods/${item.src}" alt=" ${item.alt} ">
                    <div class="info">
                        <h4>${item.title}</h4>
                        <div class="price-area">
                        <div class="ratting">
                        ${rattingHandler(item.ratting)}
                        </div>
                        <div class="price">
                            <span>$${item.price.toFixed(2)}</span>
                        </div>
                        </div>
                    </div>
                    <div class="btn-area">
                        <a data-id="${item.id}" class="add-to-cart-btn" href="#">Add to cart</a>
                    </div>
                    </div>
                </div>`;  
    }

    let output = foods.map( function (item){
      return foodItem(item);
    })

   

    function rattingHandler (n){
      let output = [];
      for (let i = 1; i <= 5; i++){
        output.push(`<i class="fa-solid ${n >= i && 'active'} fa-star"></i>`)
      }
      return output.join('');
    }

    rowDiv.innerHTML = output.join('');
    
}

// btn status change on click;
function btnStatusChangeHandler (dataIds, carDataId){
  // console.log(dataIds, carDataId);
  let aTag = document.querySelector(`[data-id="${carDataId}"]`);
  aTag.classList.add('added');
}

// add to cart handler;
function addToCart (){
  let addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartBtns.forEach( function (item){
    item.addEventListener('click', function (e){
      // e.target.classList.add('added');
    })
  })

}

// collect cart data handler;
function collectCartDataHandler (){
  let aTags = document.querySelectorAll('.add-to-cart-btn')
  let carDataId;

  aTags.forEach( function (aTag){
    aTag.addEventListener('click', function (e){
      e.preventDefault();

      carDataId = e.target.getAttribute('data-id')

      // push data to cart variablae;
      let activeData = foods.find( function (item){
        return item.id == carDataId;
      });

      if (activeOnCartItem.includes(activeData) == false){
         
        activeData.total_count = 1

        console.log(activeData); 

        activeOnCartItem.push(activeData);
      }

      cartStatusHandler(activeOnCartItem.length)
      let dataIds = activeOnCartItem.map( function (item){
        return item.id;
      })
      btnStatusChangeHandler(dataIds,carDataId);
      activeItemsRowHandler ();
    });
  });
 
}

// cart status handler;
function cartStatusHandler (count = 0){
  let cartStatus = document.getElementById('cartStatus');
  cartStatus.innerHTML = count;
}

// add item into popup table;
function activeItemsRowHandler (){
  let tableBody = document.getElementById('table-item-body');
  let tableRow = function (src, title, price, id, total_count){
return   ` <tr>
              <th>
                <img src="assets/images/foods/${src}" alt="img">
              </th>
              <td>
                <span>${title}</span>
              </td>
              <td>
                <span>$${price.toFixed(2)}</span>
              </td>
              <td>
                <div class="amount-area">
                  <span class="amount">${total_count}</span>
                  <span class="plus ">
                    <i data-id="${id}" class="fa-solid fa-plus increment_btn"></i>
                  </span>
                  <span class="minus">
                    <i data-id="${id}" class="fa-solid fa-minus dicrement_btn"></i>
                  </span>
                </div>
              </td>
              <td>
                <span>$${(price * total_count).toFixed(2)}</span>
              </td>
              <td>
                <div class="action">
                  <i data-id="${id}" class="fa-solid fa-trash active-item-delete-btn"></i>
                </div>
              </td>
            </tr>`;
  }

  let finalOutput = activeOnCartItem.map( function (item){
    return tableRow(item.src, item.title, item.price, item.id, item.total_count);
  });

  if (activeOnCartItem.length == 0){
    tableBody.innerHTML = `<tr>
                <td colspan="6">
                  <p class="p-2 text-center mb-0">No Data Found😢😢</p>
                </td>
              </tr>`;
  }
  else {
    
  tableBody.innerHTML = finalOutput.join('');
  }

  // final total;
  let finalTotal = activeOnCartItem.map( function (item){
    return item.price * item.total_count;
  })

  finalTotal = finalTotal.reduce( function (total, n){
    return total + n;
  }, 0)

  document.getElementById('final_total').innerHTML = finalTotal.toFixed(2);

}

// delete item from popup table;
function deleteActiveItem() {
  let deleteBtns = document.querySelectorAll('.active-item-delete-btn');
  let tableBody = document.querySelector('#table-item-body');

  tableBody.addEventListener('click', function (e){
    if (e.target.classList.contains('active-item-delete-btn') == true){
      let dataId = e.target.getAttribute('data-id');
      console.log(activeOnCartItem);
      activeOnCartItem = activeOnCartItem.filter( function (item){
        return item.id != dataId;
      })
      activeItemsRowHandler();
    }
  })
}


function incrementHandler (){
  let tableBody = document.getElementById('table-item-body');
  tableBody.addEventListener('click', function (e){
    e.preventDefault();
    let cheek = e.target.classList.contains('increment_btn');
    if (cheek) {
      let dataId = e.target.getAttribute('data-id');
      console.log(dataId);

      let updateActiveOnCartItem = activeOnCartItem.map( function (item){
        if (item.id == dataId){
          item.total_count = item.total_count < 20 ? item.total_count + 1 : 20;
          // item.total_count = item.total_count + 1;
        }

        return item;
      })

      activeOnCartItem = updateActiveOnCartItem;

      activeItemsRowHandler();

    }
  })
}

function dicrementHandler (){
  let tableBody = document.getElementById('table-item-body');
  tableBody.addEventListener('click', function (e){
    e.preventDefault();
    let cheek = e.target.classList.contains('dicrement_btn');
    if (cheek) {
      let dataId = e.target.getAttribute('data-id');
      console.log(dataId);

      // let getData = activeOnCartItem.find( function (item){
      //   return item.id == dataId;
      // })

      let updateActiveOnCartItem = activeOnCartItem.map( function (item){
        if (item.id == dataId){
          item.total_count = item.total_count > 1 ? item.total_count - 1 : 0;
          // item.total_count = item.total_count - 1;
        }

        return item;
      })

      activeOnCartItem = updateActiveOnCartItem;

      activeItemsRowHandler();

    }
  })
}

// Clear Cart;
function clearcart (){
  let clearCart = document.getElementById('clear_cart');
  clearCart.addEventListener('click', function(e){
    e.preventDefault();
    activeOnCartItem = [];
    activeItemsRowHandler();

    btnStatusChangeHandler(activeOnCartItem);
  })
}


