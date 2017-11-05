window.addEventListener("load", function () {
    var continent_sel = document.getElementById("continent_sel");
    var country_sel = document.getElementById("country_sel");
    var city_sel = document.getElementById("city_sel");
    var btn = document.getElementById("browser_btn");
    var allPage = 1;
    var num = document.getElementsByClassName("pictable");
    var numRow = 1;
    var page = document.getElementById("pages");

    //逐级过滤
    fetch("../pages/get_option.php?type=get_continent_list").then(function (rsp) {
        return rsp.text();
    }).then(function (data) {
        // console.log(data);
        data = JSON.parse(data);

        while (continent_sel.firstChild) {
            continent_sel.removeChild(continent_sel.firstChild);
        }
        var opt = document.createElement("option");
        opt.setAttribute("value", "0");
        opt.appendChild(document.createTextNode("Filter by Continent"));
        continent_sel.appendChild(opt);

        data.forEach(function (continent) {
            let opt = document.createElement("option");
            opt.setAttribute("value", continent.ContinentCode);
            opt.appendChild(document.createTextNode(continent.ContinentName));
            continent_sel.appendChild(opt);
        })
    });

    continent_sel.onchange = function () {
        // 获得被选择的值的 index
        var continent_index = continent_sel.options[continent_sel.selectedIndex].value;
        // console.log(index);
        // getCountry(index);
        fetch("../pages/get_option.php?type=get_country_list&value=" + continent_index).then(function (rsp) {
            return rsp.text();
        }).then(function (data) {
            // console.log(data);
            data = JSON.parse(data);

            while (country_sel.firstChild) {
                country_sel.removeChild(country_sel.firstChild);
            }
            var opt = document.createElement("option");
            opt.setAttribute("value", "0");
            opt.appendChild(document.createTextNode("Filter by Country"));
            country_sel.appendChild(opt);


            while (city_sel.firstChild) {
                city_sel.removeChild(city_sel.firstChild);
            }
            var opt = document.createElement("option");
            opt.setAttribute("value", "0");
            opt.appendChild(document.createTextNode("Filter by City"));
            city_sel.appendChild(opt);


            data.forEach(function (country) {
                let opt = document.createElement("option");
                opt.setAttribute("value", country.ISO);
                opt.appendChild(document.createTextNode(country.CountryName));
                country_sel.appendChild(opt);
            })
        });

    };
    country_sel.onchange = function () {
        // 获得被选择的值的 index
        var country_index = country_sel.options[country_sel.selectedIndex].value;

        fetch("../pages/get_option.php?type=get_city_list&value=" + country_index).then(function (rsp) {
            return rsp.text();
        }).then(function (data) {

            console.log(data);

            data = JSON.parse(data);

            while (city_sel.firstChild) {
                city_sel.removeChild(city_sel.firstChild);
            }
            var opt = document.createElement("option");
            opt.setAttribute("value", "0");
            opt.appendChild(document.createTextNode("Filter by City"));
            city_sel.appendChild(opt);

            data.forEach(function (city) {
                let opt = document.createElement("option");
                opt.setAttribute("value", city.GeoNameId);
                opt.appendChild(document.createTextNode(city.AsciiName));
                city_sel.appendChild(opt);
            })
        });
    };


    // for (let i = 0; i < 4; i++) {
    //     num[i].style.display = "none";
    // }
    clear();
    //开始筛选
    btn.addEventListener('click', function () {
        clear();

        //得到节点
        var selectedContinent = document.getElementById("continent_sel").selectedIndex;
        var selectedValue = document.getElementById("continent_sel").options[selectedContinent].value;

        var selectedCountry = document.getElementById("country_sel").selectedIndex;
        var selectedCountryValue = document.getElementById("country_sel").options[selectedCountry].value;

        var selectedCity = document.getElementById("city_sel").selectedIndex;
        var selectedCityValue = document.getElementById("city_sel").options[selectedCity].value;

        //拿到数据
        fetch("../pages/browser.php?continent=" + selectedValue + "&country=" + selectedCountryValue + "&city=" + selectedCityValue).then(function (rsp) {

            return rsp.json();
        }).then(function (data) {
            // console.log(data);

            var pageNum = Math.ceil(data.length / 16);
            var result = document.getElementsByClassName("result");

            var page = document.getElementById("pages");

            for (let i = 1; i <= pageNum; i++) {
                let newPage = document.createElement("div");
                newPage.id = "page" + i;
                newPage.innerText = i;
                page.appendChild(newPage);
                page.style.textAlign = "center";
            }

            //只显示当前页面
            document.getElementById("page" + 1).className = "page1";

            for (let i = 0; i < data.length; i++) {
                if (i == 16)break;
                result[i].setAttribute("src", "../travel-images/square-medium/" + data[i]["PATH"]);
                result[i].addEventListener('click', function () {
                    location.href = '../pages/photoDetail.php?id=' + data[i]["ImageID"];
                });
                numRow = Math.ceil((i + 1) / 4);
            }

            for (let i = 0; i < numRow; i++) {
                num[i].style.display = "table-row";
            }

            // console.log(numRow);
            //点击页面转换
            for (let k = 1; k <= pageNum; k++) {
                document.getElementById("page" + k).addEventListener("click", function () {

                    //首先将这个页面内容的都清空
                    for (let i = 0; i < 4; i++) {
                        num[i].style.display = "none";
                    }


                    document.getElementById("page" + allPage).className = "";
                    this.className = "page1";
                    allPage = this.innerText;


                    var result = document.getElementsByClassName("result");
                    for (let i = 0; i < 16; i++) {
                        result[i].removeAttribute("src");
                    }
                    var picNum = data.length - 16 * this.innerText + 16;
                    var currentPage = this.innerText * 16 - 16;

                    for (let i = 0; i < picNum; i++) {
                        if (i == 16) break;
                        result[i].setAttribute("src", "../travel-images/square-medium/" + data[i + currentPage]["PATH"]);
                        result[i].addEventListener('click', function () {
                            location.href = '../pages/photoDetail.php?id=' + data[i + currentPage]["ImageID"];
                        });
                        numRow = Math.ceil((i + 1) / 4);
                        // console.log(i);
                    }

                    for (let i = 0; i < numRow; i++) {
                        num[i].style.display = "table-row";
                    }
                    // console.log(numRow);
                });
            }
        });
    });

    //清空数据
    function clear() {
        var result = document.getElementsByClassName("result");
        for (let i = 0; i < 16; i++) {
            result[i].removeAttribute("src");
        }
        for (let i = 0; i < 4; i++) {
            num[i].style.display = "none";
        }
        while (page.firstChild) {
            page.removeChild(page.firstChild);
        }
    }

});
