// input样式

window.addEventListener("load", function () {
// function formStyle(titleInput, descriptionInput, searchBtn, byTitle, byDescription, pages,warning) {
//    function form() {
//
//    }
    //得到输入框的数据
    var bt = document.getElementById("filterBt");

    //得到result的元素
    var result = document.getElementsByClassName("result")[0];
    var pic = document.getElementsByClassName("img");
    var title = document.getElementsByTagName("h2");
    var num = document.getElementsByTagName("dt");
    var description = document.getElementsByTagName("p");
    var page = document.getElementById("pages");
    var xhr = new XMLHttpRequest();
    var allPage = 1;

    //点击事件
    bt.addEventListener("click", function (event) {
        // console.log("nihh");
        // 首先将所有的都清空
        clear();

        //提示清空
        document.getElementById("warning").innerText = "";//提示清空

        //得到两个inputbox里的输入
        var filterTitle = document.getElementById("filterTitle").value;
        var filterDescription = document.getElementById("filterDescription").value;


        //如果选中getDataTitle
        if (document.getElementById("byTitle").checked) {
            if (filterTitle.length < 2) {
                var warning = document.getElementById("warning");
                warning.innerText = "请输入更长的标题，获得确切的结果";
            }
            else {

                getData("title=", filterTitle);
            }

        }
        //如果选中getDataDescription
        else if (document.getElementById("byDescription").checked) {
            if (filterDescription.length < 2) {
                var warning = document.getElementById("warning");
                warning.innerText = "请输入更长的描述，获得确切的结果";
            }
            else {
                getData("description=", filterDescription);
            }
        }
        else {
            var warning = document.getElementById("warning");
            warning.innerText = "请选择其中一个输入";
        }
    });

    // 拿到数据
    function getData(url, value) {
        //Ajax
        xhr.open("GET", "../pages/search.php?" + url + value, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send();

        xhr.onload = function () {
            var res = xhr.responseText;
            console.log(res);

            var data = JSON.parse(res);

            //得到总页数
            var pageNum = Math.ceil(data.length / 3);

            var page = document.getElementById("pages");
            // var result = document.getElementById("result");

            if (res == "[]") {
                //把第一部分的都改了
                title[0].innerText = "No result";
                title[0].className = "noResult";
                description[0].setAttribute("hidden", "hidden");
                pic[0].setAttribute("hidden", "hidden");
                num[1].style.display = "block";
            } else {
                //第一部分还原
                title[0].className = "";
                description[0].removeAttribute("hidden");
                pic[0].removeAttribute("hidden");


                //循环组装页面按钮
                for (let i = 1; i <= pageNum; i++) {
                    let newPage = document.createElement("div");
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
                    num[i + 1].style.display = "block";

                    pic[i].addEventListener('click', function () {
                        location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                    });
                    title[i].addEventListener('click', function () {
                        location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                    });
                    description[i].addEventListener('click', function () {
                        location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                    });
                }

                //点击页面转换事件
                for (let i = 1; i <= pageNum; i++) {

                    document.getElementById("page" + i).addEventListener("click", function () {

                        //首先将这个页面内容的都清空
                        for (var i = 0; i < 3; i++) {
                            if (i == 3) break;
                            pic[i].setAttribute("src", "");
                            title[i].innerText = "";
                            description[i].innerText = "";
                            num[i + 1].style.display = "none";
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
                            num[i + 1].style.display = "block";

                            pic[i].addEventListener('click', function () {
                                location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                            });
                            title[i].addEventListener('click', function () {
                                location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                            });
                            description[i].addEventListener('click', function () {
                                location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                            });
                        }
                    })
                }
            }
        }
    }


    // 清空数据
    function clear() {
        for (var i = 0; i < 3; i++) {
            // if (i == 3) break;
            pic[i].setAttribute("src", "");
            title[i].innerText = "";
            description[i].innerText = "";
            num[i + 1].style.display = "none";
        }
        while (page.firstChild) {
            page.removeChild(page.firstChild);
        }
    }

});

