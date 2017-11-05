
/* 构建window.onLoad能运行多个函数的函数 */
function addLoadEvent(func) {
    var oldOnLoad = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnLoad();
            func();
        }
    }
}

/* 修改input样式 */
function loginStyle(nameInput, passInput, loginBtn) {
    var classes = "", oldClasses = "";
    var userName = document.getElementById(nameInput);
    var userPass = document.getElementById(passInput);
    var login = document.getElementById(loginBtn);
    login.addEventListener("click", function (event) {
        if (userName.value != "" && userPass.value != "") {
            oldClasses = this.getAttribute("class");
            classes = oldClasses + " disabled";
            this.setAttribute("class", classes);
            this.innerHTML = "<i class='icon-refresh icon-spin'></i> 正在登陆...";

            var nameU = userName.value;
            var passU = userPass.value;

            event.preventDefault();
            ajaxLogin(nameU, passU, oldClasses);

        } else {
            if (userName.value == "") {
                classes = userName.parentNode.getAttribute("class");
                userName.parentNode.setAttribute("class", classes + " has-error");
            }
            if (userPass.value == "") {
                classes = userPass.parentNode.getAttribute("class");
                userPass.parentNode.setAttribute("class", classes + " has-error");
            }
        }
    }, false);
    var focus = function () {
        this.parentNode.setAttribute("class", "input-group");
    };
    userName.addEventListener("focus", focus, false);
    userPass.addEventListener("focus", focus, false);
}

/* Ajax登录 */
function ajaxLogin(name, pass, classes) {
    var xmlhttp;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "../pages/loginByNav.php?user_name=" + name + "&user_pass=" + pass, false);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText != 0) {
                var textArray = xmlhttp.responseText.split("|");
                document.getElementById("inputBox").innerHTML = "<h3>欢迎回来，" + textArray[1] + "</h3>";
                document.getElementById("user_name_nav").innerHTML = " " + textArray[1] + "，欢迎你！";
                document.getElementById("user_info_nav").style.visibility = "";
                document.getElementById("loginAndReg").style.visibility = "hidden";
                document.getElementById("loginAndReg1").style.visibility = "hidden";

                var exp = new Date();
                var passHash = hex_md5(pass);
                exp.setTime(exp.getTime() + 60 * 1000 * 60 * 24);
                document.cookie = "user_uid=" + textArray[0] + ";expires=" + exp.toGMTString();
                document.cookie = "photo_key_code=" + passHash + ";expires=" + exp.toGMTString();

                removeElem("warningTip");
                if (document.getElementById("photo_btn")) {
                    document.getElementById("photo_btn").removeAttribute("disabled");
                }
            } else {
                var login = document.getElementById("login_to");
                login.setAttribute("class", classes);
                login.innerHTML = "<i class='glyphicon glyphicon-log-in'></i>Log in";
                removeElem("warningTip");
                var tips = "账号或密码错误！";
                var form = document.getElementById("form1");
                form.insertBefore(alertBox(tips, "warning"), form.childNodes[0]);
            }
        }
    };
    xmlhttp.send();
}

/* 新建提示框innerHTML */
function alertBox(tip, color) {
    var box = document.createElement("div");
    box.setAttribute("id", "warningTip");
    box.setAttribute("class", "alert alert-" + color + " alert-dismissible");
    box.setAttribute("role", "alert");
    box.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" + tip;
    return box;
}

/* 下拉框偏移量 */
function dropdownPosition() {
    var windowWidth = document.body.clientWidth;
    var divMainWidth = document.getElementById("divMain").clientWidth;
    var navWidth = Math.ceil((windowWidth - divMainWidth) / 2 + 50) + "px";
    var dropDown = document.getElementById("user_info_dropdown");
    dropDown.style.right = navWidth;
}

/* 删除指定id的元素 */
function removeElem(elemId) {
    if (document.getElementById(elemId)) {
        var elem = document.getElementById(elemId);
        elem.parentNode.removeChild(elem);
    }
}

/* 获取指定cookie */
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name)
            return arr[1];
    }
    return "";
}

/* 读取cookie识别登录状态 */
function checkLogin() {
    if (getCookie("user_uid") != "" && getCookie("photo_key_code") != "") {
        var id = getCookie("user_uid"),
            pass = getCookie("photo_key_code"),
            xmlhttp;

        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != 0) {
                    var textArray = xmlhttp.responseText.split("|");
                    document.getElementById("user_name_nav").innerHTML = " " + textArray[1] + "，欢迎你！";
                    document.getElementById("user_info_nav").style.visibility = "";
                    document.getElementById("loginAndReg").style.visibility = "hidden";
                    document.getElementById("loginAndReg1").style.visibility = "hidden";

                    // player(textArray[0]);
                    if (document.getElementById("photo_btn")) {
                        document.getElementById("photo_btn").removeAttribute("disabled");
                    }

                } else {
                    //wait
                }
            }
        };
        xmlhttp.open("GET", "../pages/loginByCookie.php?user_id=" + id + "&user_pass=" + pass, true);
        xmlhttp.send();
    }
}

/* 退出登录刷新页面,删除cookie状态 */
function exitLogin() {
    document.cookie = "user_uid=";
    document.cookie = "photo_id=";
    document.cookie = "photo_key_code=";
    window.location.reload(true);
}


// /* 从List收藏歌曲 */
// function addByList(e) {
//     var tr = e.parentNode.parentNode,
//         img = tr.firstChild.firstChild,
//         url = img.getAttribute("src");
//     var name = tr.childNodes[1].innerHTML,
//         art = tr.childNodes[2].innerHTML;
//     var user = getCookie("user_uid");
//     var phpurl = "data/userlist/addphoto.php?name=" + name + "&art=" + art + "&cover=" + url + "&user=" + user;
//     if (user != "") {
//         e.setAttribute("href", phpurl);
//     } else {
//         removeElem("warningTip");
//         var tips = "登录后才能进行收藏 ! ";
//         var form = document.getElementById("photo_box_play");
//         form.insertBefore(alertBox(tips, "warning"), form.childNodes[0]);
//         e.removeAttribute("target");
//     }
// }
