window.addEventListener("load", function () {
    var classes = "", oldClasses = "";
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var lat = document.getElementById("latitude");
    var long = document.getElementById("longitude");
    var city = document.getElementById("city");
    var country = document.getElementById("country");
    var continent = document.getElementById("continent");
    var modify = document.getElementById("modify_btn");
    var pic = document.getElementById("modify_img");

    modify.addEventListener('click', function () {
        if (title.value != "" && description.value != "") {
            // && lat.value != "" && long.value != "" && city.value != "" && country.value != "" && continent.value != ""
            // event.preventDefault();
            if (getCookie("user_uid") == "") {
                alert("Please log in first");
            } else {
                //Ajax
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "../pages/modify_data.php?title=" + title.value + "&description=" + description.value, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send();

                xhr.onload = function () {
                    var res = xhr.responseText;
                    location.href = "../pages/modify.php?id=" + getCookie('modify_id');

                    if (res == 1) {
                        alert("恭喜，已经修改成功");
                    } else {
                        alert("修改失败");
                    }

                }
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
            // if (lat.value == "") {
            //     classes = lat.parentNode.getAttribute("class");
            //     lat.parentNode.setAttribute("class", classes + " has-error");
            // }
            // if (long.value == "") {
            //     classes = long.parentNode.getAttribute("class");
            //     long.parentNode.setAttribute("class", classes + " has-error");
            // }
            // if (city.value == "") {
            //     classes = city.parentNode.getAttribute("class");
            //     city.parentNode.setAttribute("class", classes + " has-error");
            // }
            // if (country.value == "") {
            //     classes = long.parentNode.getAttribute("class");
            //     country.parentNode.setAttribute("class", classes + " has-error");
            // }
            // if (continent.value == "") {
            //     classes = long.parentNode.getAttribute("class");
            //     continent.parentNode.setAttribute("class", classes + " has-error");
            // }
        }
    });
    pic.addEventListener('click', function () {
        location.href = '../pages/photoDetail.php?id=' + getCookie('modify_id');
    })
});