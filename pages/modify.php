<?php
include_once 'connect.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
//$id=40;
        $sql = "SELECT travelImage.PATH,
travelImage.Title,travelImage.Description,travelImage.Latitude,travelImage.Longitude,
geocities.AsciiName,geocountries.countryName,geocontinents.ContinentName
FROM travelImage,geocities,geocountries,geocontinents where 
travelImage.ImageID=$id  and travelImage.cityCode=geocities.geonameid and 
travelImage.countrycodeISO=geocountries.ISO AND geocountries.Continent=geocontinents.ContinentCode order by travelImage.imageId";
        $result = $conn->query($sql);
        $row = $result->fetch_array(MYSQLI_ASSOC);
    }
}
$imagePath = $row["PATH"];;
$title = $row["Title"];
$description = $row["Description"];
$latitude = $row["Latitude"];
$longitude = $row["Longitude"];
$city = $row["AsciiName"];
$country = $row["countryName"];
$continent = $row["ContinentName"];
?>
<script>
    document.cookie = "modify_id=<?=$id?>"
</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Modify</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../css/font-awesome.min.css"/>
    <link rel="stylesheet" href="../css/pagesCSS/nav.css"/>
    <link rel="stylesheet" href="../css/pagesCSS/footer.css"/>
        <link rel="stylesheet" href="../css/pagesCSS/modify.css"/>
    <link rel="icon" href="../pic/icon.png"/>
    <script src="../js/jquery-3.0.0.min.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <script src="../js/md5.js"></script>
    <!--    <script src="../js/photoPlayer/jquery.jplayer.js"></script>-->
    <!--    <script src="../js/photoPlayer/ttw-photo-player-min.js"></script>-->
</head>

<body style="padding-top: 50px">

<!--导航栏-->
<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><span class=" icon-cloud"></span> Share Your Travels</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="home.html"><span class="icon-comments"> Home</span></a></li>
                <li><a href="browser.html"><span class="icon-cloud-upload"> Browser</span></a></li>
                <li><a href="search.html"><span class="icon-suitcase"> Search</span></a></li>
            </ul>
            <div class="navbar-form pull-right">
                <a class="btn btn-success" id="loginAndReg" href="register.html">Register</a>
                <button class="btn btn-default" id="loginAndReg1" data-toggle="modal" data-target="#user_Login">Log in
                </button>
                <a id="user_info_nav" href="#" style="visibility: hidden"><span id="user_name_nav"
                                                                                style="font-size: medium; color: white"></span>
                    <ul id="user_info_dropdown" style="top: 50px; right: 0;">
                        <li id="uploadUser">
                            <span class="glyphicon glyphicon-cloud-upload">
                                Upload
                            </span>
                        </li>
                        <li id="favorUser">
                            <span class="glyphicon glyphicon-star-empty">
                            MyFavor
                            </span>
                        </li>
                        <li id="photoUser">
                            <span class="glyphicon glyphicon-picture">
                            MyPhotos
                            </span>
                        </li>
                        <li id="exitUser">
                            <span class="glyphicon glyphicon-log-out">
                                Logout
                            </span>
                        </li>
                    </ul>
                </a>
            </div>
        </div><!-- /.nav-collapse -->
    </div><!-- /.container -->
</div>

<!--主页面-->
<div id="divMain" class="container">
    <div class="row">
        <div class="col-xs-12" id="left_window">
            <div id="left_div">
                <div class="table-responsive">
                    <!--                    <form id="form_modify"  enctype="multipart/form-data">-->
                    <table class="table table-bordered">
                        <colgroup>
                            <col class="col-xs-7">
                            <col class="col-xs-5"/>
                        </colgroup>
                        <thead>
                        <tr class="success">
                            <th colspan="2" style="font-size:3em;font-family: 'Times New Roman' ">Modify Photo
                                Information
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div style="height: 35em"><img
                                            src="../travel-images/medium/<?php echo $imagePath; ?>"
                                            class="img-responsive img-thumbnail img-rounded " id="modify_img"
                                            style="width: 100%;height: 100%"/>
                                </div>
                            </td>
                            <td>
                                <div class="table-responsive">
                                    <table class="table-bordered table table-detail">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <span class="input-group-addon">标 题</span><input type="text"
                                                                                                 name="title"
                                                                                                 id="title"
                                                                                                 placeholder=" New Photo Name..."
                                                                                                 class="form-control"
                                                                                                 value="<?= $title ?>"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="input-group-addon">描述</span> <input name="description"
                                                                                                 id="description"
                                                                                                 placeholder=" New Photo Description..."
                                                                                                 value="<?= $description ?>"
                                                                                                 class="form-control"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="input-group-addon">城 市</span> <input type="text"
                                                                                                  name="city"
                                                                                                  id="city"
                                                                                                  placeholder=" New City..."
                                                                                                  class="form-control"
                                                                                                  value="<?= $city ?>"
                                                                                                  disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="input-group-addon">国 家</span> <input type="text"
                                                                                                  name="country"
                                                                                                  id="country"
                                                                                                  placeholder=" New Country..."
                                                                                                  class="form-control"
                                                                                                  value="<?= $country ?>"
                                                                                                  disabled/></td>
                                        </tr>
                                        <tr>
                                            <td><span class="input-group-addon">大 洲</span><input type="text"
                                                                                                 name="continent"
                                                                                                 id="continent"
                                                                                                 placeholder=" New Continent..."
                                                                                                 class="form-control"
                                                                                                 value="<?= $continent ?>"
                                                                                                 disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="input-group-addon">纬 度</span><input type="number"
                                                                                                 name="latitude"
                                                                                                 id="latitude"
                                                                                                 placeholder=" New Latitude"
                                                                                                 class="form-control"
                                                                                                 value="<?= $latitude ?>"
                                                                                                 disabled/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span class="input-group-addon">经 度</span> <input type="number"
                                                                                                  name="longitude"
                                                                                                  id="longitude"
                                                                                                  placeholder=" New Longitude"
                                                                                                  class="form-control"
                                                                                                  value="<?= $longitude ?>"
                                                                                                  disabled></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button id="modify_btn" type="submit" class="btn btn-danger"
                                                        data-dismiss="modal">
                                                    Submit
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
<!--                    </form>-->
                </div>
            </div>
        </div>
    </div>
</div>

<!--登陆框-->
<div class="modal fade" id="user_Login" tabindex="-1" role="dialog" aria-labelledby="user_Msg_to" aria-hidden="true">
    <div class="modal-dialog" id="userLoginBox">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="user_Msg_to">Log in</h4>
            </div>
            <div class="modal-body">
                <div id="inputBox" class="text-center">
                    <p>Login and you can do what you want</p>
                    <form id="form1">
                        <p>
                        <div id="div-email_address" class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input id="email_address" class="form-control" type="text" placeholder="Email address">
                        </div>
                        </p>
                        <p>
                        <div id="div-password" class="input-group">
                            <span class="input-group-addon"><i class="icon-key"></i></span>
                            <input id="user_pass" class="form-control" type="password" placeholder="Password">
                        </div>
                        </p>
                        <a id="login_to" class="btn btn-block btn-success">
                            <i class="glyphicon glyphicon-log-in"></i> Log in</a>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                    Close
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div id="qrCode">
    <img src="../pic/wxqrcode.png" class="img-responsive"/>
</div>
<div id="foot-div">
    <div>
        Copyright &copy; 2017 吴茜雅 CiCi & All rights reserved
    </div>
</div>
<script src="../js/newFunction.js"></script>
<script>
    //设置下拉框位置,绑定到窗口resize
    dropdownPosition();
    window.addEventListener("resize", dropdownPosition, false);
    //给登录框绑定样式事件
    loginStyle("email_address", "user_pass", "login_to");
    //识别登录状态
    window.addLoadEvent(checkLogin);
    //绑定退出登录按钮事件
    document.getElementById("exitUser").addEventListener("click", exitLogin, false);
    //登录框项目锁定
    document.getElementById("uploadUser").addEventListener("click", function () {
        document.getElementById("user_info_nav").setAttribute("href", "../pages/upload.html");
    }, false);
    document.getElementById("photoUser").addEventListener("click", function () {
        document.getElementById("user_info_nav").setAttribute("href", "../pages/myPhotos.html");
    }, false);
    document.getElementById("favorUser").addEventListener("click", function () {
        document.getElementById("user_info_nav").setAttribute("href", "../pages/myFavor.html");
    }, false);
</script>
<script src="../js/pagesJS/modify.js"></script>
</body>
</html>
