$(document).ready(()=>{
  const tablebody=$("tbody");
  const url="https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders";
  const checkbox=$("#filter-wrapper input")
  let orderdetails=[];
  let checked={
      New:true,
      Delivered:true,
      InTransit:true,
      Packed:true
  }
  const logoutbtn=$("#logout-btn");
  logoutbtn.click(()=>{
      localStorage.setItem("loginStatus",false)
      window.location.assign("../index.html")
  })

  const createTableRow=(id,customer,date,time, amount,status)=>{
      const row=$("<tr>");
      row.addClass("table-content");
      const orderid=$("<td>").text(id).css("color","#8c8c8c")
      const cust=$("<td>").text(customer)
      const orderdate=$("<td>").text(date.split("-")[0] + " " +date.split("-")[1] + ", "+date.split("-")[2])
      var br = $("<br>");
      var span = $("<span>");
      span.addClass("blur-text").text(time);
      orderdate.append(br, span);
      const orderamount=$("<td>").text(`$${amount}`).css("color","#8c8c8c")
      const orderstatus=$("<td>").text(status)
      row.append(orderid,cust,orderdate,orderamount,orderstatus);
      return row;
  }

  $.get(url,(resp)=>{
      orderdetails=resp;
      resp.map(order =>{
          const createdRow=createTableRow(order.id,order.customerName, order.orderDate, order.orderTime, order.amount,order.orderStatus)
          tablebody.append(createdRow);
      })
      
  })

  checkbox.click((e)=>{
      tablebody.text("");
      checked[e.target.name]=e.target.checked;
      let count=0;
      orderdetails.map(order=>{
          if(checked[order.orderStatus]){
              const createdRow=createTableRow(order.id,order.customerName, order.orderDate, order.orderTime, order.amount,order.orderStatus)
              count++;
              tablebody.append(createdRow);
          }
      })
          $("#OrderCount").text(count)
  })


})
  