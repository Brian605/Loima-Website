 function getBlogPosts(){
     $.ajax({
         url:"forms/blog.php",
         method:"POST",
         data:{"get_blogs":true},
         success:function(dat){

            var response=JSON.parse(dat);
console.log(response);

for(var i in response){
    var element=response[i]; 
    //With no image attached
    if(element.url=="none"){
        var blogs=document.createElement("div");
        blogs.classList.add("row");
        blogs.classList.add("text-white");

    var div=
    '<div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">'+
     '<h3 class="text-warning text-bold"> '+element.title+' </h3>'+
      '<p> '+
      element.description
       +
      ' </p>'+
      '<button class="btn btn-danger dlt-btn" id="'+element.id+'" style="display:none" onclick="deleteBlog(this.id)">Delete</button>'+
    '</div><hr class="bg-white w-100"/>';
blogs.innerHTML=div;
  document.getElementById("blogs-div").appendChild(blogs);
    }else{
        var blogs=document.createElement("div");
        blogs.classList.add("row");
        blogs.classList.add("text-white");
        blogs.classList.add("m-2");
    
    var div=
    '<div class="col-lg-4" data-aos="fade-right">'+
    '<img src="'+element.url+'" class="img-fluid img-thumbnail" alt="Post Image">'+
    '</div>'+
    '<div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">'+
     '<h3 class="text-warning text-bold"> '+element.title+' </h3>'+
      '<p> '+
      element.description
       +
      ' </p>'+
      '<button class="btn btn-danger dlt-btn m-2" id="'+element.id+'" style="display:none" onclick="deleteBlog(this.id)">Delete</button>'+
    '</div> <hr class="bg-white w-100"/>';
blogs.innerHTML=div;
  document.getElementById("blogs-div").appendChild(blogs); 
    }

}//end for

var deleteButtons=document.getElementsByClassName("dlt-btn");
  if(JSON.parse(sessionStorage.getItem("user")).role=="admin" || JSON.parse(sessionStorage.getItem("user")).role=="super"){
    for (var i=0; i<deleteButtons.length;i++){
      deleteButtons[i].style.display="block";
    }
  } 

           

         }//end success
     });//end ajax
 }

 function deleteFile(name){

    $.ajax({
        url:"forms/files.php",
        method:"POST",
        data:{"delete":true,"name":name},
        success:function(dat){
            window.location.reload();
        }
    });

 }

 function deleteBlog(id){

    $.ajax({
        url:"forms/blog.php",
        method:"POST",
        data:{"delete":true,"id":id},
        success:function(dat){
            window.location.reload();
        }
    });

 }

 function getFiles(){
     $.ajax({
         url:"forms/files.php"
,
method:"POST",
data:{"get_files":true}
,
success:function(dat){
var response=JSON.parse(dat);
response.forEach(element=>{

    var filesDiv =document.createElement("div");
    filesDiv.className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch form1 m-3";
   
    var div='<div class="count-box">'+
    '<i class="icofont-file text-warning"></i>'+
     '<p  class="text-warning"><h4 id="date">'+element.name+'</h4></p>'+
    '<p class="text-white">Click Download to download this file</p>'+
    '<a href="'+element.url+'" download ><button class="btn btn-success">Download</button></a>'+
    '<button class="btn m-3 btn-danger dlt-btn" id="'+element.name+'" onclick="deleteFile(this.id)" style="display:none">Delete</button>'+
  '</div>';

  filesDiv.innerHTML=div;
  document.getElementById("filesDiv").appendChild(filesDiv);

});

var deleteButtons=document.getElementsByClassName("dlt-btn");
  if(JSON.parse(sessionStorage.getItem("user")).role=="admin" || JSON.parse(sessionStorage.getItem("user")).role=="super"){
    for (var i=0; i<deleteButtons.length;i++){
      deleteButtons[i].style.display="block";
    }
  } 

}     
});
 }

