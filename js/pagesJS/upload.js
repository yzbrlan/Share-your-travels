/* 修改input样式 */
function formStyle(nameInput, descriptionInput, latitude, longitude, cityInput, countryInput, continentInput, loginBtn) {
    var classes = "", oldClasses = "";
    var title = document.getElementById(nameInput);
    var description = document.getElementById(descriptionInput);
    var lat = document.getElementById(latitude);
    var long = document.getElementById(longitude);
    var city = document.getElementById(cityInput);
    var country = document.getElementById(countryInput);
    var continent = document.getElementById(continentInput);
    var login = document.getElementById(loginBtn),
        file = document.getElementById("photo_file");
    login.addEventListener("click", function (event) {
        if (title.value != "" && description.value != "" && lat.value != "" && long.value != "" && country.value != "" && continent.value != "" && file.value != "") {
            event.preventDefault();
            if (getCookie("user_uid") == "") {
                alert("Please log in first");
            } else {
                oldClasses = this.getAttribute("class");
                classes = oldClasses + " disabled";
                this.setAttribute("class", classes);
                this.innerHTML = "<i class='icon-refresh icon-spin'></i> During uploading";

                //ajax upload
                var form = document.getElementById("form_upload");
                var progress1 = document.getElementById("prog1");
                var value = document.getElementById("show_pro");
                var formData = new FormData(form);

                var xmlhttp;


                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                } else {// code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.open("POST", '../pages/upload.php', true);
                xmlhttp.send(formData);

                var upload = xmlhttp.upload;
                upload.onprogress = function (e) {
                    var sum = Math.round((e.loaded / e.total) * 100);
                    value.innerHTML = sum + "%";
                    progress1.style.width = sum + "%";
                };


                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        // document.getElementById("result").innerHTML = xmlhttp.responseText;
                        document.getElementById("photo_btn").setAttribute("class", "btn btn-primary btn-lg pull-right");
                        document.getElementById("photo_btn").innerHTML = "Upload Photo";
                        let x = xmlhttp.responseText;
                        // alert('文件上传成功');
                        // alert('nihao');
                        // btn.removeAttribute("disabled");
                        //
                        if (x === "文件上传成功") {
                            alert('文件上传成功');
                        } else {
                            alert(x);
                        }

                    }
                };
            }
        } else {
            if (title.value == "") {
                classes = title.parentNode.getAttribute("class");
                title.parentNode.setAttribute("class", classes + " has-error");
            }
            if (description.value == "") {
                classes = description.parentNode.getAttribute("class");
                description.parentNode.setAttribute("class", classes + " has-error");
            }
            if (lat.value == "") {
                classes = lat.parentNode.getAttribute("class");
                lat.parentNode.setAttribute("class", classes + " has-error");
            }
            if (long.value == "") {
                classes = long.parentNode.getAttribute("class");
                long.parentNode.setAttribute("class", classes + " has-error");
            }
            if (city.value == "") {
                classes = city.parentNode.getAttribute("class");
                city.parentNode.setAttribute("class", classes + " has-error");
            }
            if (country.value == "") {
                classes = long.parentNode.getAttribute("class");
                country.parentNode.setAttribute("class", classes + " has-error");
            }
            if (continent.value == "") {
                classes = long.parentNode.getAttribute("class");
                continent.parentNode.setAttribute("class", classes + " has-error");
            }
        }
    });
    var focus = function () {
        this.parentNode.setAttribute("class", "input-group input-group-lg");
    };
    title.addEventListener("focus", focus, false);
    description.addEventListener("focus", focus, false);
    lat.addEventListener("focus", focus, false);
    long.addEventListener("focus", focus, false);
    city.addEventListener("focus", focus, false);
    country.addEventListener("focus", focus, false);
}

//判断是否登陆
if (getCookie("user_uid") == "") {
    var tips = "只有登录后才可以上传图片哦 ! ",
        form = document.getElementById("left_window"),
        btn = document.getElementById("photo_btn");
    form.insertBefore(alertBox(tips, "warning"), form.childNodes[0]);
    btn.setAttribute("disabled", "disabled")
}

//上传框style
formStyle("photo_name", "photo_description", "latitude", "longitude", "city_name", "country_name", "continent_name", "photo_btn");


