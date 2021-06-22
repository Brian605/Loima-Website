var namView=document.getElementById("userName");
var json=JSON.parse(sessionStorage.getItem("user"));
namView.innerHTML=json.name;


function goToRegister(){
    window.location.replace("register.html");
}

function goToLogin(){
    window.location.replace("login.html");
}

function goToLoginFromAdmin(){
    window.location.replace("../login.html");
}


function goToMain(){
    window.location.replace("index.html");
}