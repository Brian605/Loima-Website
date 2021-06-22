const active = document.getElementById("active");
const inactive = document.getElementById("inactive");
const loader = document.getElementById("loader");

function getStatus(){
    $.ajax({
        url:"forms/bursary.php",
        method:"post",
        data:{"get_status":true},
        success:function(dat){
            console.log(dat);
            if(dat ==="active"){
                inactive.style.display="none";

                const user = JSON.parse(sessionStorage.getItem("user"));
                const nameInput = document.getElementById("name");

                const phoneInput = document.getElementById("phone");
                const regInput = document.getElementById("regno");
                const yearInput = document.getElementById("year");
                const instInput = document.getElementById("institution");
                const wardInput = document.getElementById("ward");

                nameInput.value=user.name;
phoneInput.value=user.phone;
regInput.value=user.regno;
yearInput.value=user.year;
instInput.value=user.institution;
wardInput.value=user.ward;

loader.style.display="none";
            
            }else{
                loader.style.display="none";
                inactive.style.display="block";  
                active.style.display="none";
            }
        }
    })
}


function getMyApplications(){
    loader.style.display="block";
    document.getElementById("myApplications").innerHTML='';
    var regno=JSON.parse(sessionStorage.getItem("user")).regno;
    $.ajax({
        url:"forms/bursary.php",
        method:"post",
        data:{"get_my_applications":true,
        "regno":regno},
        success: function(dat){
            console.log(dat);

            const response = JSON.parse(dat);

            response.forEach(element=>{
                const apps = document.createElement("div");
                apps.className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch form1 m-3";
                apps.setAttribute('data-aos','fade-up');

              apps.innerHTML='<div class="count-box">' +
                  '<i class="icofont-simple-smile text-warning"></i>' +
                  '<p  class="text-warning"><h4>' + element.date + '</h4></p>' +
                  '<h4 id="status" class="badge badge-secondary p-3 m-2"> <span class="text-warning">Status:</span>' + element.status + '</h4>' +
                  '</div>';

              document.getElementById("myApplications").appendChild(apps);
            });

            loader.style.display="none";

            $('#bsModal').modal('show');


        }
    });
}

function getAllApllications(){
    loader.style.display="block";
    
    $.ajax({
        url:"../forms/bursary.php",
        method:"post",
        data:{"get_all_applications":true},
        success: function(dat){
            console.log(dat);

            const response = JSON.parse(dat);

            response.forEach(element=>{
                const apps = document.createElement("div");
                apps.className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch form1 m-3 p-2";
                apps.setAttribute('data-aos','fade-up');

              apps.innerHTML='<div class="count-box">' +
                  '<i class="icofont-simple-smile text-warning"></i>' +
                  '<p ><h4  class="text-warning">Application Date: ' + element.date + '</h4></p>' +
                  '<p class="text-white" > <span class="text-warning">Name :</span>' + element.name + '<span class="text-warning"> Reg No:</span>' + element.regno + '</p>' +
                  '<p class="text-white" ><span class="text-warning"> Phone :</span>' + element.phone + '<span class="text-warning"> Institution:</span>' + element.institution + '</p>' +
                  '<p class="text-white" ><span class="text-warning"> Year :</span>' + element.year + '<span class="text-warning"> Ward:</span>' + element.ward + '</p>' +
                  '<p class="text-white" ><span class="text-warning"> Application Documents :</span> <a class="text-white" download href="' + element.docs + '"> <button class="btn btn-success">Download</button></a></p>' +
                  '<select class="form-control" name="'+element.id+'" oninput="manageApplications(this.name,this.value);">' +
                  '<option>Action</option>'+
                  '<option>Accept</option>' +
                  '<option>Reject</option>' +
                  '<option>Delete</option></select>'+
                  '<h4 id="status" class="badge badge-secondary p-3 m-2"> <span class="text-warning">Status :</span>' + element.status + '</h4>' +
                  '</div>';

              document.getElementById("bsApps").appendChild(apps);
            });

            loader.style.display="none";



        }
    });
}

function enableBursaryApplication() {
$.ajax({
    url:"../forms/bursary.php",
    method:"post",
    data:{"enable":true},
    success:function (dat) {
        console.log(dat);
document.getElementById("message").innerText="Bursary Application Enabled. Users Will Now Be Able To Apply";
$("#infoModal").modal("show");
    }
})
}

function disableBursaryApplication() {
    $.ajax({
        url:"../forms/bursary.php",
        method:"post",
        data:{"disable":true},
        success:function (dat) {
            console.log(dat);
            document.getElementById("message").innerText="Bursary Application Disabled. Users Will NOT Be Able To Apply";
            $("#infoModal").modal("show");
        }
    })
}

function manageApplications(id,option){
    document.getElementById("btn-award").name=id;
    document.getElementById("btn-reject").name=id;

    if (option==="Accept"){
       $("#acceptModal").modal("show");
    }
    if (option==="Reject"){
        $("#rejectModal").modal("show");
    }

    if (option==="Delete"){
       deleteBursary(id);
    }

}

function awardBursary(id) {
    const amount=document.getElementById("amount").value;
    const status="Awarded Ksh."+amount;
    $("#acceptModal").modal("hide");
    loader.style.display="block";

    $.ajax({
        url:"../forms/bursary.php",
        method:"post",
        data:{"award":true,
        "status":status,
        "id":id},
        success:function (dat) {
            console.log(dat);
            document.getElementById("message").innerText="Bursary Awarded .";
            loader.style.display="none";
            $("#infoModal").modal("show");
        }
    });

}

function rejectBursary(id) {
    let reason = document.getElementById("reason").value;
    reason="Rejected: "+reason;
    $("#rejectModal").modal("hide");
    loader.style.display="block";
    console.log(id);

    $.ajax({
        url:"../forms/bursary.php",
        method:"post",
        data:{"reject":true,
            "status":reason,
            "id":id},
        success:function (dat) {
            console.log(dat);
            document.getElementById("message").innerText="Bursary Rejected.";
            loader.style.display="none";
            $("#infoModal").modal("show");
        }
    });

}

function deleteBursary(id) {
     loader.style.display="block";
    $.ajax({
        url:"../forms/bursary.php",
        method:"post",
        data:{"delete_bursar":true,
            "id":id},
        success:function (dat) {
            console.log(dat);
            document.getElementById("message").innerText="Bursary Deleted";
            loader.style.display="none";
            $("#infoModal").modal("show");
        }
    });

}















