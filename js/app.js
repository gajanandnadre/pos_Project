
let categorryUrl = "https://dummyjson.com/products/category-list";
let productsUrl = "https://dummyjson.com/products/category/";
let singleProductUrl = "https://dummyjson.com/products/";
//  get category list

$(document).ready(function () {
  //  get category list
  renderCart();

  $.ajax({
    url: categorryUrl, // CATRGORY URL
    method: "GET",
    data: {},
    success: function (response) {
      let html = "";
      var i = 0;
      response.forEach((cat) => {
        if (i < 8) {

            // let upperCat = cat.toUpperCase();
            let formattedCat = cat
            .replace(/-/g, " ") // Replace hyphens with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase());
          // html += '<div id=' + cat +' >';
          html += ' <div class="card row-horizontal category"  style="width: 8rem; height: 8rem;" id= ' + cat + ">";
          html += ' <img src="./images/' + cat +'.png" class="card-img-top horizontal-row" alt="...">';
          html += ' <div class="card-body"> ';
          html += '<h5 class="card-title"  >' + formattedCat + "</h5>";
          html += " </div> ";
          html += "  </div>  ";
          // html +=    '  </div>  '  ;
        }
        i++;
      });
      $("#category").html(html);
      initSlider();
    },
  });

  function initSlider() {
    const slider = $(".slider");
    const sliderWrapper = $(".slider-wrapper");
    const cardWidth = $(".card").outerWidth(true); // Include margins
    const visibleCards = Math.floor(sliderWrapper.width() / cardWidth);
    let currentIndex = 0;

    $(".next-btn").on("click", function () {
        const totalCards = slider.children().length;
        if (currentIndex + visibleCards < totalCards) {
            currentIndex++;
            updateSlider();
        }
    });

    $(".prev-btn").on("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    function updateSlider() {
        const offset = -(currentIndex * cardWidth);
        slider.css("transform", `translateX(${offset}px)`);
    }
}

  $(document).on("click", ".category", function () {
    var val = $(this).attr("id");
   
    $.ajax({
        url:productsUrl+val,
        method: "GET",
        data: {},
        success:function(response){
            // console.log(response);
            // alert(val)

            let html = "";

            response.products.forEach(product => {
                html += '   <div class="col-lg-2 ">';
                html += '       <div class="card product" style="width: 13rem;" data-product-id='+product.id+'>';
                html += '            <img src="'+product.thumbnail+'" class="card-img-top product-img-top" alt="...">';
                html += '           <div class="card-body">';
                html += '         <h3 class="card-title">'+product.title+'</h3>';
                html += '        <p class="card-text ">'+product.warrantyInformation+'</p>';
                html += '       <a href="#" class="Amount">'+product.price+'</a>';
                html += '       </div>';
                html += '    </div>';
                html += '  </div>';
            })
            $("#products").html(html);
            
        }
    })
  });

   $(document).on("click",".product",function(e){
    let productid = $(this).data("product-id");
    // console.log(productid)
    $.ajax({
      url : singleProductUrl + productid,
      method : "GET",
      data : {},
      success : function(product){
        // console.log(product);
        updateCart(product);
        
        

      },
      error : function(){
        console.log("Something wents wrong");
        
      }
    })
   })
   $(document).on("click", ".delete-btn", function () {
    var productId = $(this).data("id");
    const cart = loadCart();
    const updatedCart = cart.filter(item => item.id !== productId); // Remove the product
    saveCart(updatedCart);
    renderCart(); // Re-render the cart after deletion
  });


   

   

function updateCart(product){
  
  const cart = loadCart();
  const productIndex = cart.findIndex(item => item.id === product.id);
  // console.log(productIndex);
  
  // console.log(cart);
  // console.log(product);
  
  if(productIndex !== -1){
    cart[productIndex].qty++;
  }else{
    cart.push({...product,qty : 1})
  }
  saveCart(cart);
  renderCart();
  // console.log(qty);
  
}
function saveCart(cart){
  localStorage.setItem("cart",JSON.stringify(cart));
}
function loadCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderCart(){
  if(localStorage.getItem("cart")){
    var product = localStorage.getItem("cart");
    product = JSON.parse(product);
    
    var html = "";
    var i = 1;
    let TotalQty = 0;
    let TotalPrice = 0;
    // for(data in product){
      // console.log(data);
      product.forEach(data => {
          let total = data.price * data.qty
        html += `<tr>
                    <td>${i}</td>
                    <td>${data.title}</td>
                    <td>${data.price.toFixed(2)}</td>
                    <td>${data.qty}</td>
                    <td> ${total} </td>
                    <td>
                    
                       <button type="button" class="delete-btn delete" data-id="${data.id}">Delete</button>
                    </td>
                 </tr>`

                 i++
                TotalQty += data.qty;
                 TotalPrice += total;

      })
        let totalRow = `<tr>
                        <td class="totalprice"> = </td>
                        <td class="totalprice"> Total Price and 
                        
                        Qty </td>
                        <td class="totalprice">  </td>
                        <td class="totalprice"> ${TotalQty}</td>
                        <td class="totalprice"> ${TotalPrice.toFixed(2)}</td>
                        </tr>`
   
      
    // }
    
    $("#card tbody").html(html)
    $("#card tbody").append(totalRow)
    
    
  }else{
    $("#card tbody").html("")

  }
}
        $(document).on("click","#clear",function(){
          // console.log("yes");
          
        if(confirm("Are you sure")){
          localStorage.clear();
          renderCart();
        }  

        })

 
});
  

 
