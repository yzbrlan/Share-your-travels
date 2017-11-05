 // 点击事件
function addFavor() {

    var add = document.getElementById("add");
    var inner = add.innerHTML;

    if (getCookie("user_uid") == "") {
        add.innerHTML = 'Add to my favor';
    } else {
        ifAdd(2);
    }

    add.addEventListener("click", function () {
        if (getCookie("user_uid") == "") {
            alert("Please log in first");
        } else {
            ifAdd(3);
            changeNum();
        }
    })
}

// 利用ajax进行判断和改变
function ifAdd(time) {
    var xmlhttp;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // document.getElementById("add").innerHTML = "geafv";
            if (xmlhttp.responseText == "1") {
                document.getElementById("add").innerText = "已添加";
            } else {
                document.getElementById("add").innerText = "Add to my favor";
            }
        }
    };
    xmlhttp.open("GET", "../pages/photoDetailAdd.php?itime=" + time, true);
    xmlhttp.send();
}

// 改变num的值
function changeNum() {
    var xmlhttp;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("like").innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", "../pages/likeNum.php", true);
    xmlhttp.send();
}

addFavor();
