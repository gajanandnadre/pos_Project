let categorryUrl = "https://dummyjson.com/products/category-list";
let productsUrl = "https://dummyjson.com/products/category/";

//  get category list

$(document).ready(function () {
  //  get category list

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
                html += '   <div class="col-lg-4 ">';
                html += '       <div class="card" style="width: 18rem;">';
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
});
