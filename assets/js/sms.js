function sendSmsToSelected(){
    var selectedBoxes=[];
    var boxes=document.getElementsByClassName("select");

    for(var i=0;i<boxes.length;i++){
        if(boxes[i].checked==true){
            selectedBoxes.push(boxes[i].name);
        }
    }

    if(selectedBoxes.length<1 || selectedBoxes==null){
        alert("Select Users First..");
        return;
    }
makeApiCall(appendCountryCode(selectedBoxes));

}

function appendCountryCode(numArray){
    var updatedList=[];
    for (var i in numArray){

        if(numArray[i].startsWith("01")){
        var newNum=numArray[i].replace("01","2547");
        updatedList.push(newNum);
    }else{
        
        var newNum=numArray[i].replace("07","2547");
        updatedList.push(newNum);
    }


    }

    return updatedList;
}

function makeApiCall(list){


    var message="LOIMA STUDENTS ASSOCIATION "+document.getElementById("sms").value +" dial *495*5# to unsubscribe ";  
    if(message==null || message==undefined){
        alert("Cannot send Blank Message");
        return;
    }
    
alert("Sending...");
    var counter=0;
    for (var i in list){
        var userName="Dynasty";
        var apiKey="J2z3Tk07YKRRtqWjVR0D1Z06FS7q0x8XlbdPY0vGSmmeV6ZZGV";
        var sender="SMARTLINK";
        var msgtype=5;
        var dlr=0;
        var to=list[i];

        $.ajax({
            url:"https://sms.movesms.co.ke/api/compose",
            method:"POST",
            data:{
                "username":userName,
                "api_key":apiKey,
                "sender":sender,
                "to":to,
                "message":message,
                "msgtype":msgtype,
                "dlr":dlr
            },
            success:function(dat){
                console.log(dat);
                counter++;

                if(counter==list.length){
                    alert("Success..");
                    //window.location.reload();
                }
            }
        })

       
    }
   
   
   


   





}

function generateRecipientsList(list){
    return list.join(", ");
}