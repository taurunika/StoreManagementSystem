$(document).ready(()=>{

    console.log(localStorage.getItem("loginStatus")=="true")
    const loginform=document.getElementById("sign-in");
    
    localStorage.getItem("loginStatus")=="true"?window.location.assign("./OrderListing/OrderListing.html"):loginform.style.display="block";
    
    loginform.addEventListener("submit",(e)=>{
        e.preventDefault();
        if(e.target.Username.value==e.target.Password.value){
            alert("Login Successful")
            localStorage.setItem("loginStatus",true)
            window.location.assign("./OrderListing/OrderListing.html")
        }
        else{
            alert("Please enter valid credentials")
        }
    })
    })
    
