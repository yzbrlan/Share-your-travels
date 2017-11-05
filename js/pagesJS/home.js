$(function () {
    //鼠标滑过banner，左右按钮进行显示和隐藏
    $(".banner").hover(function () {
        $(".lr").show();
    }, function () {
        $(".lr").hide();
    });

    //点击下面的小按钮，图片进行左右切换效果
    $(".anniu li").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        var num = $(this).index();
        $(".pic").animate({marginLeft: -1100 * num}, "slow");
    });

    //图片自动轮播效果
    var a = 0;
    var automatic = setInterval(function () {
        a++;
        a = a % 5;
        $(".pic").animate({marginLeft: -1100 * a}, "slow");
        $(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
    }, 6000);

    //点击左右按钮，图片进行切换效果
    $(".pre").click(function () {
        a--;
        a = (a + 5) % 5;
        $(".pic").animate({marginLeft: -1100 * a}, "slow");
        $(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
    });
    $(".next").click(function () {
        a++;
        a = a % 5;
        $(".pic").animate({marginLeft: -1100 * a}, "slow");
        $(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
    });
});

window.addEventListener("load", function () {
    var url1 = "../pages/home.php?type=pic_first";
    var url2 = "../pages/home.php?type=pic_second";
    var url3 = "../pages/home.php?type=pic_third";

    //下面的一共五个图片
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url1, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();

    xhr.onload = function () {
        let title1 = document.getElementsByClassName("pic_title");
        let pic = document.getElementsByClassName("hotpic");

        let res = xhr.responseText;
        let obj = JSON.parse(res);

        for (let i = 0; i < 5; i++) {
            pic[i].setAttribute("src", "../travel-images/large/" + obj[i]["PATH"]);
            title1[i].innerHTML = obj[i]["Title"];
            pic[i].addEventListener('click', function () {
                location.href = "../pages/photoDetail.php?id=" + obj[i]["ImageID"];
            });
            title1[i].addEventListener('click', function () {
                location.href = "../pages/photoDetail.php?id=" + obj[i]["ImageID"];
            });
        }
    };

    //下面的一共六个图片
   refreshpic2();

    //12点击添加
    document.getElementById('refresh1').addEventListener("click", function () {
        refreshpic2();
    });


   //6refresh
    function refreshpic2() {
        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", url2, true);
        xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr2.send();

        xhr2.onload = function () {
            let title2 = document.getElementsByClassName("title2");
            let pic2 = document.getElementsByClassName("hotpic2");
            let description = document.getElementsByClassName("description");
            let view = document.getElementsByClassName("view");

            let res = xhr2.responseText;
            let obj = JSON.parse(res);
            console.log(obj);

            for (let i = 0; i < 6; i++) {
                pic2[i].setAttribute("src", "../travel-images/square-medium/" + obj[i]["PATH"]);
                title2[i].innerHTML = obj[i]["Title"];


                if (obj[i]["Description"] == null) {
                    description[i].innerHTML = "No description";
                } else {
                    description[i].innerHTML = obj[i]["Description"];
                }

                pic2[i].addEventListener('click', function () {
                    location.href = "../pages/photoDetail.php?id=" + obj[i]["ImageID"];
                });
                title2[i].addEventListener('click', function () {
                    location.href = "../pages/photoDetail.php?id=" + obj[i]["ImageID"];
                });
                view[i].addEventListener('click', function () {
                    location.href = "../pages/photoDetail.php?id=" + obj[i]["ImageID"];
                });
                description[i].addEventListener('click', function () {
                    location.href = "../pages/photoDetail.php?id=" + obj[i]["ImageID"];
                });
            }
        };
    }

    //下面的一共12个图片
    refreshpic3();

    //12点击添加
    document.getElementById('refresh2').addEventListener("click", function () {
        refreshpic3();
    });

    //12refresh
    function refreshpic3() {
        let xhr3 = new XMLHttpRequest();
        xhr3.open("GET", url3, true);
        xhr3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr3.send();

        xhr3.onload = function () {
            let pic3 = document.getElementsByClassName("hotpic3");

            let res = xhr3.responseText;
            let obj = JSON.parse(res);

            for (let i = 0; i < 12; i++) {
                pic3[i].setAttribute("src", "../travel-images/large/" + obj[i]["PATH"]);

                pic3[i].addEventListener('click', function () {
                    location.href = "../pages/photoDetail.php?id=" + obj[i]["ImageID"];
                });
            }
        };
    }

});