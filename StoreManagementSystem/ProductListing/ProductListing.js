$(document).ready(()=>{
    const tablebody=$("tbody");
    const url="https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";
    const checkbox=$("#filter-wrapper input")
    let productInfo=[];
    let checked={
        expired:true,
        lowStock:true
    }

    const logoutbtn=$("#logout-btn");
    logoutbtn.click(()=>{
        localStorage.setItem("loginStatus",false)
        window.location.assign("../index.html")
    })

    const createTableRow=(id,name,brand,date,price,stock)=>{
        const row=$("<tr>");
        row.addClass("table-content");
        const prodid=$("<td>").text(id).css("color","#8c8c8c")
        const prodname=$("<td>").text(name)
        const prodbrand=$("<td>").text(brand).css("color","#8c8c8c")
        const prodexpiry=$("<td>").text(date.split("-")[0] + " " +date.split("-")[1] + ", "+date.split("-")[2])
        const prodamount=$("<td>").text(`$${price}`).css("color","#8c8c8c")
        const prodstock=$("<td>").text(stock).css("color","#8c8c8c")
        row.append(prodid,prodname,prodbrand,prodexpiry,prodamount,prodstock);
        return row;
    }

    $.get(url,(resp)=>{
        productInfo=resp;
        resp.map(product =>{
            const createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
            tablebody.append(createdRow);
        })

    })


    checkbox.click((e)=>{
        tablebody.html("");
        checked[e.target.name]=e.target.checked;
        let count=0;
             if(checked.expired===false && checked.lowStock===true){
                productInfo.map(product=>{

                    if(new Date(product.expiryDate)>new Date())  {
                    let createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
                    count++;
                    tablebody.append(createdRow);
                    }
                })
             }
             else if(checked.expired===true && checked.lowStock===false){
                productInfo.map(product=>{
                    if(product.stock>=100)  {
                    let createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
                    count++;
                    tablebody.append(createdRow);
                    }
                })
             }
             else if(checked.expired===false && checked.lowStock===false){
                productInfo.map(product=>{
                    if(product.stock>=100 && new Date(product.expiryDate)>new Date()){
                    let createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
                    count++;
                    tablebody.append(createdRow);
                    }
                })
             }
             else{
                productInfo.map(product=>{
                    let createdRow=createTableRow(product.id,product.medicineName,product.medicineBrand,product.expiryDate,product.unitPrice,product.stock)
                    count++;
                    tablebody.append(createdRow);
                })
             }


            $("#ProductCount").text(count)
    })


})
