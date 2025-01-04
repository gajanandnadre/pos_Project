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
        if (i < 6) {

            // let upperCat = cat.toUpperCase();
            let formattedCat = cat
            .replace(/-/g, " ") // Replace hyphens with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase());
          // html += '<div id=' + cat +' >';
          html += ' <div class="card row-horizontal category"  style="width: 12rem; height: 12rem;" id= ' + cat + ">";
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
    },
  });

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
                html += '   <div class="col-lg-3 ">';
                html += '       <div class="card product" style="width: 18rem;" data-product-id='+product.id+'>';
                html += '            <img src="'+product.thumbnail+'" class="card-img-top" alt="...">';
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
    // for(data in product){
      // console.log(data);
      product.forEach(data => {

        html += `<tr>
                    <td>${i}</td>
                    <td>${data.title}</td>
                    <td>${data.price}</td>
                    <td>${data.qty}</td>
                    <td>
                    
                       <button type="button" class="delete-btn delete" data-id="${data.id}">Delete</button>
                    </td>
                 </tr>`

                 i++

      })
   
      
    // }
    $("#card tbody").html(html)
  }
}
