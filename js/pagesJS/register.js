/* change btn style */

var nameNum=0;
var passNum=0;
function loginStyle(emailInput, passInput, passAgain, loginBtn) {
    var classes = "", oldClasses = "";
    var userName = document.getElementById(emailInput);
    var userPass = document.getElementById(passInput);
    var userAgain = document.getElementById(passAgain);
    var login = document.getElementById(loginBtn);
    login.addEventListener("click", function (event) {
        if (userName.value != "" && userPass.value != "" && userAgain.value != "" && userPass.value == userAgain.value) {
            oldClasses = this.getAttribute("class");
            classes = oldClasses + " disabled";
            this.setAttribute("class", classes);
            this.innerHTML = "<i class='icon-refresh icon-spin'></i> 正在注册...";

            var nameU = userName.value;
            var passU = userPass.value;

            event.preventDefault();
            ajaxLogin(nameU, passU, oldClasses);

        } else {
            if (userPass.value == "") {
                classes = userPass.parentNode.getAttribute("class");
                userPass.parentNode.setAttribute("class", classes + " has-error");
            }
            if (userAgain.value == "") {
                classes = userAgain.parentNode.getAttribute("class");
                userAgain.parentNode.setAttribute("class", classes + " has-error");
            }
            if (userName.value == "") {
                classes = userName.parentNode.getAttribute("class");
                userName.parentNode.setAttribute("class", classes + " has-error");
            }
        }
    }, false);
    var focus = function () {
        this.parentNode.setAttribute("class", "input-group");
    };
    userName.addEventListener("focus", focus, false);
    userPass.addEventListener("focus", focus, false);
    userAgain.addEventListener("focus", focus, false);

}

/* Ajax注册 */
function ajaxLogin(name, pass, classes) {

    // console.log(passNum);
    if (nameNum === 1 && passNum === 1) {

        var xmlhttp;

        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "register.php?&email_address=" + name + "&password=" + pass, true);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText == "1") {
                    removeElem("form1");
                    document.getElementById("form-reg").innerHTML = "<h3>Welcome，" + name + "</h3><div id='backTo'><a href='../pages/home.html'><img class='img-responsive img-circle' src='../pic/default.jpg'>去登录!</a></div>";
                } else {
                    var login = document.getElementById("login_to");
                    login.setAttribute("class", classes);
                    login.innerHTML = "<i class='glyphicon glyphicon-log-in'></i> 注 册";
                    removeElem("warningTip");
                    var tips = "发生错误,注册失败！";
                    var form = document.getElementById("form-reg");
                    form.insertBefore(alertBox(tips, "warning"), form.childNodes[0]);
                }
            }
        };
        xmlhttp.send();
    } else {
        var login = document.getElementById("login_to");
        login.setAttribute("class", classes);
        login.innerHTML = "<i class='glyphicon glyphicon-log-in'></i> 注 册";
        removeElem("warningTip");
        var tips = "发生错误,注册失败！";
        var form = document.getElementById("form-reg");
        form.insertBefore(alertBox(tips, "warning"), form.childNodes[0]);
    }
}

/* Ajax验证用户名是否存在 */
function hasUserName() {
    var xmlhttp;
    var tips = document.getElementById("sameUsername");
    var name = document.getElementById("email_address").value;
    var patrn = /([\w\-]+\@[\w\-]+\.[\w\-]+)/;

    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", "hasUserName.php?name=" + name, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "1" && patrn.exec(name)) {

                tips.style.visibility = "";
                tips.style.color = "green";
                tips.innerHTML = "* 恭喜你,帐号可以使用!";
                nameNum=1;
            } else {
                tips.style.visibility = "";
                tips.style.color = "red";
                tips.innerHTML = "* 账号已被占用或格式不符合";
                nameNum=-1;
            }
        }
    };

}

// 验证密码是否为弱密码
function ifOk() {
    var patrn = /^[a-zA-Z]\w{5,17}$/;
    var tips = document.getElementById("passTip");
    var pass = document.getElementById("password").value;

    if (patrn.exec(pass)) {
        tips.style.visibility = "";
        tips.style.color = "green";
        tips.innerHTML = "* 恭喜你,密码可以使用!";
        passNum=1;
    } else {
        tips.style.visibility = "";
        tips.style.color = "red";
        tips.innerHTML = "* 以字母开头，长度在6~18之间，只能包含字符、数字和下划线";
        passNum=-1;
    }
}
/* 删除指定id的元素 */
function removeElem(elemId) {
    if (document.getElementById(elemId)) {
        var elem = document.getElementById(elemId);
        elem.parentNode.removeChild(elem);
    }
}

/* 新建提示框innerHTML */
function alertBox(tip, color) {
    var box = document.createElement("div");
    box.setAttribute("id", "warningTip");
    box.setAttribute("class", "alert alert-" + color + " alert-dismissible");
    box.setAttribute("role", "alert");
    box.innerHTML = "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><spanaria-hidden='true'>&times;</span></button>" + tip;
    return box;
}

/**
 * main()
 */

//绑定注册框样式事件
loginStyle("email_address", "password", "password-again", "login_to");

//Ajax检查用户名是否重复
var userName = document.getElementById("email_address");
userName.addEventListener("input", hasUserName, true);
var userPass = document.getElementById("password");
userPass.addEventListener("input", ifOk, true);