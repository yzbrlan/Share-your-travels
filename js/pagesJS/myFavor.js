window.addEventListener("load", function () {

    var pic = document.getElementsByClassName("img");
    var title = document.getElementsByClassName("title");
    var description = document.getElementsByClassName("description");
    var xhr = new XMLHttpRequest();
    var num = document.getElementsByClassName("pictable");
    var del = document.getElementsByClassName("delete");
    var page = document.getElementById("pages");
    var allPage = 1;

    //Ajax
    xhr.open("GET", "../pages/myFavor.php?", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();

    xhr.onload = function () {
        var res = xhr.responseText;
        // console.log(res);

        var data = JSON.parse(res);

        //得到总页数
        var pageNum = Math.ceil(data.length / 3);


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
                if (data[i]["Description"] == null) {
                    description[i].innerText = "No Description";
                }
                else {
                    description[i].innerText = data[i]["Description"];
                }
                num[i].style.display = "table-row";

                pic[i].addEventListener('click', function () {
                    location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                });
                title[i].addEventListener('click', function () {
                    location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                });
                description[i].addEventListener('click', function () {
                    location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                });
                del[i].addEventListener('click',function () {
                    _delete(data[i]["ImageID"]);
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

                        if (data[i + currentPage]["Description"] == null) {
                            description[i].innerText = "No Description";
                        }
                        else {
                            description[i].innerText = data[i + currentPage]["Description"];
                        }
                        num[i].style.display = "table-row";

                        pic[i].addEventListener('click', function () {
                            location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                        });
                        title[i].addEventListener('click', function () {
                            location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                        });
                        description[i].addEventListener('click', function () {
                            location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                        });
                        del[i].addEventListener('click',function () {
                            _delete(data[i+ currentPage]["ImageID"]);
                        });
                    }
                })
            }
        }
    };

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

    function _delete(id) {

        //Ajax
        xhr.open("GET", "../pages/myFavorDelete.php?id="+id, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send();

        xhr.onload = function () {
            var res = xhr.responseText;
            console.log(res);

            location.href='../pages/myFavor.html';

            if(res==0){
                alert('恭喜，已经取消收藏');
            }else {
                alert('操作失败，请重新尝试');
            }

        }
    }
});
