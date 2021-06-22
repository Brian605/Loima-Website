
var validationStatus=document.getElementById("message");

var loader2=document.getElementById("loader2");

var nameInput=document.getElementById("name");
var emailInput=document.getElementById("email");
var phoneInput=document.getElementById("phone");
var regInput=document.getElementById("regno");
var yearInput=document.getElementById("year");
var instInput=document.getElementById("institution");
var wardInput=document.getElementById("ward");

var password1Input=document.getElementById("pass1");
var password2Input=document.getElementById("pass2");

function registerUser(){
  var name=nameInput.value;
  var email=emailInput.value;
  var phone=phoneInput.value;
  var year=yearInput.value;
  var regno=regInput.value;
  var pass1=password1Input.value;
  var pass2=password2Input.value;
  var institution=instInput.value;
  var ward=wardInput.value;
  
  if (institution==null || institution==="" ||institution===undefined) {
    validationStatus.innerText="The Institution cannot be empty";
    $("#infoModal").modal("show");
    return;
  }

  if (ward==null || ward==="" ||ward===undefined) {
    validationStatus.innerHTML="The username cannot be empty";
    $("#infoModal").modal("show");
    return;
  }

  if (name==null || name==="" ||name===undefined) {
    validationStatus.innerHTML="The username cannot be empty";
    $("#infoModal").modal("show");
    return;
  }
  
  var specialChars=['@','#','$','_','&',':',';','!','?',',','-','+','(',')','/','~'];
  
  for (var i in specialChars) {
    if(name.includes(specialChars[i])){
      validationStatus.innerHTML="The username cannot contain special symbols";
      $("#infoModal").modal("show");
    return;
    }
  }

  if(phone.length!==10){
    validationStatus.innerHTML="The phoneNumber can only be 10 numbers";
    $("#infoModal").modal("show");
    return;
  }
  
  if(regno.length>13 ||regno.length<10){
    validationStatus.innerHTML="The Reg Number is invalid";
    $("#infoModal").modal("show");
    return;
  }
  
  if(pass1==="" || pass1!==pass2){
    validationStatus.innerHTML="Passwords Don't match";
    $("#infoModal").modal("show");
    return;
  }
  

  loader2.style.display="block";


  $.ajax({
    url:"forms/auth.php",
    method:"POST",
    data:{
      "name":name,
      "phone": phone,
      "institution":institution,
      "ward":ward,
      "email":email,
      "regno":regno,
      "year":year,
      "pass":pass1,
      "mode":"register"
    },
    success: function(resp){
      console.log(resp);
    var response= JSON.parse(resp);
  if(response.success===true){
    goToLogin();
    
  } else {
    validationStatus.innerHTML=response.message;
    loader2.style.display="none";
    $("#infoModal").modal("show");
    }},
error: function(xhr){
  console.log(xhr.statusText);
  console.log(xhr.status);
  validationStatus.innerText=xhr.message
  $("#infoModal").modal("show");
}

    
  });
  return false;
  
  
}


function loginUser(){
  loader2.style.display="block";
  var rememberMe=document.getElementById("remember");
  var email=emailInput.value;
  var passInput=document.getElementById("password");
var pass=passInput.value;

$.ajax({
  url:"forms/auth.php",
  method:"POST",
  data:{
    "email":email,
    "pass":pass,
    "mode":"login"
  }
  ,success: function(dat){
    console.log(dat);

    var response=JSON.parse(dat);
    if(response.success===true){
      if(rememberMe.checked===true){
localStorage.setItem("user",JSON.stringify({"name":response.name,"email":response.email,"regno":response.regno,"status":response.status,"year":response.year,"role":response.role,"institution":response.institution,"ward":response.ward,"phone":response.phone}))
sessionStorage.setItem("user",JSON.stringify({"name":response.name,"email":response.email,"regno":response.regno,"status":response.status,"year":response.year,"role":response.role,"institution":response.institution,"ward":response.ward,"phone":response.phone}))
}else{
    sessionStorage.setItem("user",JSON.stringify({"name":response.name,"email":response.email,"regno":response.regno,"status":response.status,"year":response.year,"role":response.role,"institution":response.institution,"ward":response.ward,"phone":response.phone}))
 
  }
  loader2.style.display="none";
      goToMain();
    }else{
      loader2.style.display="none";
      alert(response.message);
    }
  }
});
  

}

function logoutUser(){
  localStorage.removeItem("user");
  sessionStorage.clear();
window.location.reload();
}

function fetchChartData(){
  $.ajax({
    url:"../forms/get_users.php",
    method:"POST",
    data:{"analytics":true},
    success:function(dat){

      var response=JSON.parse(dat);
      console.log(response);

      var xVals=[];
      var yVals=[];
      var cColors=[];
      var totalUsers=0;

      var colorsArray=["orange","wheat","green","white","yellow","almond","teal","indigo"];
      var i=0;
      response.forEach(element => {
        xVals.push(element.year);
        yVals.push(element.count);
        cColors.push(colorsArray[i]);
        totalUsers+=parseInt(element.count);
        i++;

      });

      new Chart("myChart",{
        type: "bar",
        data:{
          labels: xVals,
    datasets: [{
      backgroundColor: cColors,
      data: yVals
    }]
        },
        options: {
          title: {
            display: true,
            text: ""
          }
        }
      });

      document.getElementById("totalUsers").innerHTML=totalUsers;
    }
  });
}

function getAllUsers(){
  loader.style.display="block";
  $.ajax({
    url:"../forms/get_users.php",
    method:"POST",
    data:{"admin_users":true},
    success:function(dat){
      console.log(dat);
      var response=JSON.parse(dat);
response.forEach(element=>{

  var tableRow=document.createElement("tr");
  tableRow.innerHTML='<td class="text-light">' + element.regno + '</td><td class="text-light">' + element.name + '</td><td class="text-light">' + element.phone + '</td><td class="text-light">' + element.year + '</td><td class="text-light"><input type="checkbox" name="' + element.phone + '" oninput="updateSelectCount(this);" class="select"></td>';
document.getElementById("usersTable").appendChild(tableRow);
});

loader.style.display="none";
    }

  });
}

function updateSelectCount(box){
  var counterView=document.getElementById("selectedUsers");
  var count=parseInt(counterView.innerText);

  if(box.checked===true){
    counterView.innerHTML=(count+1);
  }else{
    counterView.innerHTML=(count-1);
  }

}

function getEmailUsers(){
  $.ajax({
    url:"../forms/get_users.php",
    method:"POST",
    data:{"admin_users":true},
    success:function(dat){
      var response=JSON.parse(dat);
response.forEach(element=>{

  var tableRow=document.createElement("tr");
  var tableData='<td class="text-light">'+element.regno+'</td><td class="text-light">'+element.name+'</td><td class="text-light">'+element.email+'</td><td class="text-light">'+element.year+'</td><td class="text-light"><input type="checkbox" name="'+element.email+'" oninput="updateSelectCount(this);" class="select"></td>';
tableRow.innerHTML=tableData;
document.getElementById("usersTable").appendChild(tableRow);
});

    }

  });
}


function getManageUsers(){
  $.ajax({
    url:"../forms/get_users.php",
    method:"POST",
    data:{"admin_users":true},
    success:function(dat){
      var response=JSON.parse(dat);
response.forEach(element=>{

  var tableRow=document.createElement("tr");
  var tableData='<td class="text-light">'+element.regno+'</td><td class="text-light">'+element.name+'</td><td class="text-light">'+element.phone+'</td><td class="text-light">'+element.year+'</td><td class="text-light">'+element.status+'</td><td class="text-light">'+element.role+'</td><td class="text-light"><select class="form-control" type="checkbox" name="'+element.regno+'" oninput="manageUser(this.name,this.value)"><option>Select Action</option><option> Make Admin</option><option> Remove Admin</option><option> Activate Account </option><option>Delete User</option> <option>Deactivate Account</option></select></td>';
tableRow.innerHTML=tableData;
document.getElementById("usersTable").appendChild(tableRow);
});

    }

  });
}

function manageUser(regno, action){

  switch (action) {
    case "Make Admin": makeAdmin(regno);
      
      break;
      case "Remove Admin":removeAdmin(regno);
      
      break;
      case "Activate Account":activateAccount(regno);
      
      break;
      case "Delete User":deleteUser(regno);
      
      break;
      case "Deactivate Account":deactivateAccounts(regno);
      
      break;
    default:
      break;
  }

}

function makeAdmin(regno){
  loader2.style.display="block";

  $.ajax({
    url:"../forms/auth.php",
    method:"POST",
    data:{"task":"make admin","regno":regno},
    success:function (dat){
      loader2.style.display="none";  
      alert("Success");
     window.location.reload();
    }
  })
}

function removeAdmin(regno){
  if(JSON.parse(sessionStorage.getItem("user")).role !="super"){
    alert("Only The Super Admin Can Remove Admin");
    return;
  }
  loader2.style.display="block";

  $.ajax({
    url:"../forms/auth.php",
    method:"POST",
    data:{"task":"remove admin","regno":regno},
    success:function (dat){
      loader2.style.display="none";  
      alert("Success");
     window.location.reload();
    }
  })
}

function activateAccount(regno){
  
  loader2.style.display="block";

  $.ajax({
    url:"../forms/auth.php",
    method:"POST",
    data:{"task":"activate account","regno":regno},
    success:function (dat){
      loader2.style.display="none";  
      alert("Success");
     window.location.reload();
    }
  })
}


function deleteUser(regno){
  
  loader2.style.display="block";

  $.ajax({
    url:"../forms/auth.php",
    method:"POST",
    data:{"task":"delete","regno":regno},
    success:function (dat){
      loader2.style.display="none";  
      alert("Success");
     window.location.reload();
    }
  })
}

function activateAllAccounts(){
  
  loader2.style.display="block";

  $.ajax({
    url:"../forms/auth.php",
    method:"POST",
    data:{"task":"activateall","regno":true},
    success:function (dat){
      loader2.style.display="none";  
      alert("Success");
     window.location.reload();
    }
  })
}

function deleteAllUsers(){
  
  loader2.style.display="block";

  $.ajax({
    url:"../forms/auth.php",
    method:"POST",
    data:{"task":"deleteall","regno":true},
    success:function (dat){
      loader2.style.display="none";  
      alert("Success");
     window.location.reload();
    }
  })
}


function deactivateAccounts(){
  
  loader2.style.display="block";

  $.ajax({
    url:"../forms/auth.php",
    method:"POST",
    data:{"task":"deactivate account","regno":true},
    success:function (dat){
      loader2.style.display="none";  
      alert("Success");
     window.location.reload();
    }
  })
}



function deactivateAllAccounts(){
  
  loader2.style.display="block";

  $.ajax({
    url:"../forms/auth.php",
    method:"POST",
    data:{"task":"deactivateall","regno":true},
    success:function (dat){
      loader2.style.display="none";  
      alert("Success");
     window.location.reload();
    }
  })
}
