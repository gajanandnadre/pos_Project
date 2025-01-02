let categorryUrl = "https://dummyjson.com/products/category-list";
let productsUrl = "https://dummyjson.com/products/category/";
let singleProductUrl = "https://dummyjson.com/products/";

//  get category list

$(document).ready(function () {
  //  get category list
  getCartItem();

  $.ajax({
    url: categorryUrl, // CATRGORY URL
    method: "GET",
    data: {},
    success: function (response) {
      let html = "";
      var i = 0;
      response.forEach((cat) => {
        if (i < 5) {

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
    console.log(productid)
    $.ajax({
      url : singleProductUrl + productid,
      method : "GET",
      data : {},
      success : function(product){
        // console.log(product);
        
        
        var productObj = {};
        productObj.productid = product.id;
        productObj.pname = product.title;
        productObj.price = product.price;
        productObj.qty = 1;
        
        if(localStorage.getItem("products")){
          let productsList = localStorage.getItem("products");
          productsList = JSON.parse(productsList);
          let qty = productsList.qty
          qty += 1
          productObj.qty = qty;
          // console.log(qty);
        }
        
          localStorage.setItem("products",JSON.stringify(productObj));
        
        getCartItem();

      }
    })
   })
   $(document).on("click","#deleted",function(e){
    if(confirm("Are you sure?")){
      localStorage.removeItem("products");
      getCartItem();
    }
   })




});

function getCartItem(){
  if(localStorage.getItem("products")){
    var product = localStorage.getItem("products");
    product = JSON.parse(product);
    var html = "";
    var i = 1;
    // for(data in product){
      // console.log(data);
      html += `<tr>
                    <td>${product.pname}</td>
                    <td>${product.price}</td>
                    <td>${product.qty}</td>
                    <td>
                    
                        <a href="#" class="action-btn delete" id="deleted">Delete</a>
                    </td>
                </tr>`
      
    // }
    $("#card tbody").append(html)
  }
}
