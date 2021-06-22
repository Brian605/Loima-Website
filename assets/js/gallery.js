function getGallery() {
    loader.style.display="block";
    $.ajax({
        url:"forms/gallery.php",
        method:"post",
        data:{"get_img":true},
        success:function (dat) {
            const response=JSON.parse(dat);

            response.forEach(element=>{
                const wrapper=document.createElement("div");
                wrapper.className="col-xl-3 mt-1 col-6 d-flex align-items-stretch";
                wrapper.setAttribute("data-aos","zoom-in");
                wrapper.setAttribute("data-aos-delay","100");

                wrapper.innerHTML=' <img src="' + element.url + '" ' +
                    'id="'+element.url+'"  onclick="showFullImage(this.id)" '+
                    'class="img-fluid img-thumbnail w-100" alt="loima">';
                document.getElementById("gallery").appendChild(wrapper);

            });
            loader.style.display="none";

        }
    })
}

function getAdminGallery() {
    loader.style.display = "block";
    $.ajax({
        url: "../forms/gallery.php",
        method: "post",
        data: {"get_img": true},
        success: function (dat) {
            const response = JSON.parse(dat);

            response.forEach(element => {
                const wrapper = document.createElement("div");
                wrapper.className = "col-xl-3 mt-1 col-6 d-flex align-items-stretch";
                wrapper.setAttribute("data-aos", "zoom-in");
                wrapper.setAttribute("data-aos-delay", "100");

                wrapper.innerHTML = ' <img src="' + element.url + '" ' +
                    'id="' + element.url + '" ' +
                    'class="img-fluid img-thumbnail w-100" onclick="showFullImage(this.id);" alt="loima"> <br><br><div class="carousel-caption">' +
                    '<button class="btn btn-danger text-white w-25 h-25" name="' + element.id + '" onclick="deleteGallery(this.name)">Delete</button></div>';
                document.getElementById("gallery").appendChild(wrapper);

            });
            loader.style.display = "none";

        }
    })

}

    function showFullImage(url) {
document.getElementById("image").src=url;
$("#imgModal").modal("show");

    }

function deleteGallery(id){
    loader.style.display = "block";
    $.ajax({
        url:"../forms/gallery.php",
        method:"post",
        data:{"id":id,"delete":true},
        success:function (dat) {
            console.log(dat);
            loader.style.display = "none";
            window.location.reload();
        }
    })
}
