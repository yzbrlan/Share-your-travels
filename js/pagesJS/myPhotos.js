window.addEventListener("load", function () {

    var pic = document.getElementsByClassName("img");
    var title = document.getElementsByTagName("h1");
    var modify = document.getElementsByClassName("modify");
    var del = document.getElementsByClassName("delete");

    var num = document.getElementsByClassName("num");
    var page = document.getElementById("pages");
    var allPage = 1;


    //Ajax
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "../pages/myPhotos.php?", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();

    xhr.onload = function () {
        var res = xhr.responseText;
        console.log(res);

        var data = JSON.parse(res);

        //得到总页数
        var pageNum = Math.ceil(data.length / 3);

        // console.log(pageNum);

        clear();
        if (res == "[]") {

        } else {
            //循环组装页面按钮
            for (let i = 1; i <= pageNum; i++) {
                var newPage = document.createElement("div");
                newPage.id = "page" + i;
                newPage.innerText = i;
                page.appendChild(newPage);
                page.style.textAlign = "center";
            }

            //只显示当前页的图片
            document.getElementById("page" + allPage).className = "page1";
            for (let i = 0; i < data.length; i++) {
                if (i == 3)break;//只显示当前页的图片，大于3张时需要用页面按钮来控制

                pic[i].setAttribute("src", "../travel-images/square-medium/" + data[i]["PATH"]);
                title[i].innerText = data[i]["Title"];
                if (data[i]["Title"] == null) {
                    title[i].innerText = "No Title";
                }
                else {
                    title[i].innerText = data[i]["Title"];
                }
                num[i].style.display = "table-row";

                pic[i].addEventListener('click', function () {
                    location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                });
                title[i].addEventListener('click', function () {
                    location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                });
                modify[i].addEventListener('click', function () {
                    if (getCookie("user_uid") == "") {
                        alert("Please log in first");
                    } else {
                        location.href = '../pages/modify.php?id=' + data[i]["ImageID"];
                    }
                });
                del[i].addEventListener('click', function () {
                    if (getCookie("user_uid") == "") {
                        alert("Please log in first");
                    } else {
                        _delete(data[i]["ImageID"]);
                    }
                });
            }

            //点击页面转换事件
            for (let i = 1; i <= pageNum; i++) {

                document.getElementById("page" + i).addEventListener("click", function () {

                    //首先将这个页面内容的都清空
                    for (let i = 0; i < 3; i++) {
                        num[i].style.display = "none";
                        pic[i].removeAttribute("src");
                    }

                    document.getElementById("page" + allPage).className = "";
                    this.className = "page1";
                    allPage = this.innerText;

                    //用于看剩下的数目
                    var picNum = data.length - 3 * this.innerText + 3;

                    //控制当前照片的位置
                    var currentPage = this.innerText * 3 - 3;

                    for (let i = 0; i < picNum; i++) {
                        if (i == 3) break;//如果大于三个则需要分页

                        pic[i].setAttribute("src", "../travel-images/square-medium/" + data[i + currentPage]["PATH"]);
                        title[i].innerText = data[i + currentPage]["Title"];

                        if (data[i + currentPage]["Title"] == null) {
                            title[i].innerText = "No Title";
                        }
                        else {
                            title[i].innerText = data[i + currentPage]["Title"];
                        }
                        num[i].style.display = "table-row";

                        pic[i].addEventListener('click', function () {
                            location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                        });
                        title[i].addEventListener('click', function () {
                            location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                        });
                        modify[i].addEventListener('click', function () {
                            if (getCookie("user_uid") == "") {
                                alert("Please log in first");
                            } else {
                                location.href = '../pages/modify.php?id=' + data[i + currentPage]["ImageID"];
                            }
                        });
                        del[i].addEventListener('click', function () {
                            if (getCookie("user_uid") == "") {
                                alert("Please log in first");
                            } else {
                                _delete(data[i + currentPage]["ImageID"]);
                            }
                        });
                    }
                })
            }
        }
    };


    function _delete(id) {
        let xhr2 = new XMLHttpRequest();

        xhr2.open("GET", "../pages/delete.php?id=" + id, true);
        xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr2.send();

        xhr2.onload = function () {
            var res2 = xhr2.responseText;
            console.log(res2);


            if (res2 == 1) {
                // clear();
                // _page();
                location.href = "myPhotos.html";
                alert("恭喜，成功删除");
            } else {
                alert("请再试一次" + res2);
            }
        }
    }

    // 清空数据
    function clear() {
        for (let i = 0; i < 3; i++) {
            num[i].style.display = "none";
            pic[i].removeAttribute("src");
        }
        while (page.firstChild) {
            page.removeChild(page.firstChild);
        }
    }

    /* 删除指定id的元素 */
    function removeElem(elemId) {
        if (document.getElementById(elemId)) {
            var elem = document.getElementById(elemId);
            elem.parentNode.removeChild(elem);
        }
    }
})
;
