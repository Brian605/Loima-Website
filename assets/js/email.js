function sendEmailToSelected(message){
    var selectedBoxes=[];
    const boxes=document.getElementsByClassName("select");

    for(var i=0;i<boxes.length;i++){
        if(boxes[i].checked===true){
            selectedBoxes.push(boxes[i].name);
        }
    }

    if(selectedBoxes.length < 1){
        document.getElementById("message").innerText="Select Users First..";
        $("#infoModal").modal("show");
        return;
    }
    sendEmail(message, selectedBoxes);

}

function sendEmailReady() {
    const message=document.getElementById("email").value;
    $("#mailModal").modal("hide");

    if (message==null || message==="" || message===undefined){
        document.getElementById("message").innerText="Cannot send empty message";
        $("#infoModal").modal("show");
        return;
    }
    sendEmailToSelected(message);

}

function sendEmail(message,mailList) {
    var counter=0;
    mailList.forEach(addr=>{
        $.ajax({
            url:"../forms/email.php",
            method:"POST",
            data:{"address":addr,
                "message":message
            },
            success:function (dat) {
                console.log(dat);
                counter++;
                if (counter===mailList.length){
                    document.getElementById("message").innerText="Sent";
                    $("#infoModal").modal("show");
                }

            }
        })
    });




}