module.exports = function invoiceHTML(sale, customer, items, subtotal) {
    return `
    
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Example 1</title>
    <link rel="stylesheet" href="style.css" media="all" />

    <style>
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }
    
    a {
      color: #5D6975;
      text-decoration: underline;
    }
    
    body {
      position: relative;
      width: 21cm;  
      height: 29.7cm; 
      margin-right: 40px;
      margin-left: 40px;
      color: #001028;
      background: #FFFFFF; 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      font-family: Arial;
    }
    
    header {
      padding: 10px 0;
      margin-bottom: 30px;
    }
    
    #logo {
      text-align: center;
      margin-bottom: 10px;
      background-image: url(/logo.jpg);
    }
    
    #logo img {
      width: 90px;
    }
    
    h1 {
      border-top: 1px solid  #5D6975;
      border-bottom: 1px solid  #5D6975;
      color: #5D6975;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: center;
      margin: 0 0 20px 0;
      background: url(dimension.png);
    }
    
    #project {
      float: left;
    }
    
    #project span {
      color: #5D6975;
      text-align: right;
      width: 52px;
      margin-right: 10px;
      display: inline-block;
      font-size: 0.9em;
    }
    
    #company {
      float: right;
      text-align: right;
    }
    
    #project div,
    #company div {
      white-space: nowrap;        
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
      margin-top: 40px;
    }
    
    table tr:nth-child(2n-1) td {
      background: #F5F5F5;
    }
    
    table th,
    table td {
      text-align: center;
    }
    
    table th {
      padding: 5px 20px;
      color: #5D6975;
      border-bottom: 1px solid #C1CED9;
      white-space: nowrap;        
      font-weight: normal;
    }
    
    table .service,
    table .desc {
      text-align: left;
    }
    
    table td {
      padding: 20px;
      text-align: right;
    }
    
    table td.service,
    table td.desc {
      vertical-align: top;
    }
    
    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }
    
    table td.grand {
      border-top: 1px solid #5D6975;;
    }
    
    #notices .notice {
      color: #5D6975;
      font-size: 1.2em;
    }
    
    footer {
      color: #5D6975;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #C1CED9;
      padding: 8px 0;
      text-align: center;
    }
    </style>
  </head>
  <body>
    <header class="clearfix">
      <div id="logo">
        
      </div>
      <h1>INVOICE - ${sale.orderNo}</h1>
      <div id="company" class="clearfix">
        <div>Ninetees Collection</div>
        <div>No.147, Kandy Rd, Weweldeniya</div>
        <div>0763125822</div>
        <div><a href="mailto:nineteescollection@gmail.com">nineteescollection@gmail.com</a></div>
      </div>
      <div id="project">
        <div><span>Client</span> ${customer.username}</div>
        <div><span>Address</span> ${customer.address}</div>
        <div><span>Email</span> <a href="${customer.email}"> ${customer.email}</a></div>
        <div><span>Date</span> ${new Date().toLocaleDateString()}</div>
        <div><span>Time</span> ${new Date().toLocaleTimeString()}</div>
      </div>
    </header>

    <main style="margin-top: 30px">
      <table style="margin-left: 50px;margin-right: 50px">
        <thead>
          <tr>
            <th class="service">Product</th>
            <th class="desc">Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Discounted Price</th>
            <th></th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${tableBody(items, subtotal)}
        </tbody>
      </table>
      <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">You will be received your order within 5 working days..</div>
      </div>
    </main>
    <footer>
      Invoice was created on a computer and is valid without the signature and seal.
    </footer>
  </body>
</html>
`
}

function tableBody(items, subtotal) {
  return `  
  <tbody>
    ${items.map((p) => {
        return (
          `<tr>
            <td class="service">
                ${p.productNo} -  ${p.productName} -  ${p.user.size}
            </td>
            <td class="desc">
              ${p.user.quantity}
            </td>
            ${p.discount && p.discount != 0 ? (
              `<td class="unit">Rs. ${p.price}</td>`
            ) : (
              `<td class="unit">Rs. ${p.price}</td>`
            )}
            <td class="unit">Rs. ${parseInt(p.price) - parseInt(p.discountedPrice ? p.discountedPrice: 0)}</td>
            <td class="unit">Rs.  ${p.discountedPrice ? p.discountedPrice : p.price}</td>
            <td class="unit">${p.user.quantity} X Rs. ${p.discountedPrice ? p.discountedPrice : p.price}</td>
            <td class="qty">
              <strong>Rs. ${p.user.total}</strong>
            </td>
            <td></td>
          </tr>    
          `
        )
      })}  
          <tr>
            <td class="service"></td>
            <td class="desc"></td>
            <td class="unit"></td>
            <td class="unit"></td>
            <td class="unit"></td>
            <td class="unit"><h2><strong>Subtotal</strong></h2></td>
            <td class="qty">
              <h2><strong> Rs. ${subtotal}</strong></h2>
            </td>
            <td></td>
          </tr>         
  
  </tbody>
  `
}


// function tableBody(items) {
//   return `  
//   <tbody>
//     ${items.map((p) => {
//         return (
//           `<tr>
//             <td>
//               <div className="row">
//                 <div className="col-7 mt-2">
//                   <p>${p.productNo}</p>
//                   <div className="row">
//                     <div className="col-6">
//                       <p>
//                         <strong style="margin-right:40%">
//                           ${p.productName}
//                         </strong>
//                       </p>
//                     </div>
//                     <div className="col-6">
//                       <p>
//                         Size: <strong>${p.user.size}</strong>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </td>
//             <td className="text-center mt-3">
//               ${p.user.quantity}
//             </td>
//             ${p.discount && p.discount != 0 ? (
//               `<td className="text-center">
//                 <span style="text-decoration:line-through">Rs. {p.price}
//                 </span>
//                 <strong style="color:red">Rs. {p.discountedPrice}
//                 </strong>
//               </td>`
//             ) : (
//               `<td className="text-center">Rs. ${p.price}</td>`
//             )}

//             <td className="text-center">
//               <strong>Rs. ${p.user.total}</strong>
//             </td>
//             <td>
//             </td>
//           </tr>          
//         `
//         )
//       })}
  
//   </tbody>
//   `
// }

