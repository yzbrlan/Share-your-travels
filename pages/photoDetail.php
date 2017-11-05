<?php
//error_reporting(0);

header("Content-Type:text/html;charset=utf-8");
include_once 'connect.php';

// retrieve form data
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
//$id = 60;
        $sql = "SELECT traveluser.username,travelImage.path,
travelImage.Title,travelImage.Description,travelImage.Latitude,travelImage.Longitude,
geocities.AsciiName,geocountries.countryname 
FROM travelImage,geocities,geocountries,travelUser where 
travelImage.ImageID=$id  and travelImage.cityCode=geocities.geonameid and 
travelImage.countrycodeISO=geocountries.ISO AND traveluser.UID=travelImage.UID order by travelImage.imageId";
        $result = $conn->query($sql);
        $imageDetailRow = $result->fetch_array(MYSQLI_ASSOC);

        $sqlNum = "select COUNT(imageId) AS favorNum from travelImageFavor WHERE imageId=$id";
        $resultNum = $conn->query($sqlNum);
        $numRow = $resultNum->fetch_array(MYSQLI_BOTH);
    }
}
$imagePath = $imageDetailRow["path"];;
$title = $imageDetailRow["Title"];
$description = $imageDetailRow["Description"];
$latitude = $imageDetailRow["Latitude"];
$longitude = $imageDetailRow["Longitude"];
$city = $imageDetailRow["AsciiName"];
$country = $imageDetailRow["countryname"];
$travelUser = $imageDetailRow["username"];
$favorNum = $numRow["favorNum"];
?>
<script>
    document.cookie = "favor_id=<?=$id?>"
</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Photo</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../css/font-awesome.min.css"/>
    <link rel="stylesheet" href="../css/pagesCSS/nav.css"/>
    <link rel="stylesheet" href="../css/pagesCSS/footer.css"/>
    <link rel="stylesheet" href="../css/pagesCSS/photoDetail.css"/>
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
                <a class="btn btn-success" id="loginAndReg" href="../pages/register.html">Register</a>
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
                    <table class="table table-bordered">
                        <colgroup>
                            <col class="col-xs-7">
                            <col class="col-xs-5"/>
                        </colgroup>
                        <thead>
                        <tr class="success">
                            <th colspan="2"
                                style="font-size:3em;font-family: 'Times New Roman' "><?php echo $title ?></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colspan="2" class="active"><em>By <?php

                                    if ($travelUser == null) {
                                        echo "No travelUser";
                                    } else {
                                        echo $travelUser;
                                    }
                                    ?></em></td>
                        </tr>
                        <tr>
                            <td>
                                <div style="height: 30em;"><img
                                            src="../travel-images/medium/<?php echo $imagePath; ?>"
                                            class="img-responsive img-thumbnail img-rounded"
                                            style="width: 100%;height: 100%"/>
                                </div>
                            </td>
                            <td>
                                <div class="table-responsive">
                                    <table class="table-bordered table table-detail">
                                        <thead>
                                        <tr class="danger ti">
                                            <th style="text-align: center">
                                                    <span class="glyphicon glyphicon-heart">
                                                   <a id="add"> </a>
                                                </span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><br/></td>
                                        </tr>
                                        <tr class="danger ti">
                                            <td style="text-align: center">Like number</td>
                                        </tr>
                                        <tr class="success">
                                            <td style="color: red;font-size: 2em;text-align: center"
                                                id="like"><?php echo $favorNum ?></td>
                                        </tr>
                                        <tr>
                                            <td><br/></td>
                                        </tr>
                                        <tr class="danger ti">
                                            <td style="text-align: center">Image Details</td>
                                        </tr>
                                        <tr class="success">
                                            <td> Country :<?php echo $country ?></td>
                                        </tr>
                                        <tr class="success">
                                            <td> City:<?php echo $city ?></td>
                                        </tr>
                                        <tr class="success">
                                            <td> Latitude:<?php echo $latitude ?></td>
                                        </tr>
                                        <tr class="success">
                                            <td> Longitude:<?php echo $longitude ?></td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="2" class="active" id="des">
                                <div><p><?php
                                        if ($description == null) {
                                            echo "No description";
                                        } else {
                                            echo $description;
                                        }
                                        ?></p></div>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <br/><br/><br/>
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
<script src="../js/pagesJS/photoDetail.js"></script>
</body>
</html>