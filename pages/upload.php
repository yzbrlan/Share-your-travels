<?php
include_once 'connect.php';
$title = trim($_POST['title']);//html表单post到的信息
$description = trim($_POST['description']);
$lat = trim($_POST['lat']);
$long = trim($_POST['long']);
$city = trim($_POST['city']);
$country = trim($_POST['country']);
$uid = $_COOKIE['user_uid'];


//获取上传文件信息
$upfile = $_FILES['photofile'];
//$filesize = formatBytes($_FILES['photofile']['size']);//调用单位转换函数,将B转换为MB
//$filesize = formatBytes($_FILES['photofile']['size']);//调用单位转换函数,将B转换为MB

//定义允许的类型
$typelist = array("image/jpeg", "image/jpg", "image/png", "image/gif");

//上传后存放的路径
$path = "upload/";//定义一个上传后的目录
$path1 = "../travel-images/square-medium/";//定义一个上传后的目录

//类型过滤
if (!in_array($upfile["type"], $typelist)) {
//    die("上传文件类型非法!" . $upfile["type"]);
    echo "<p style='color:red;'>您上传的文件貌似不是image/jpg,image/png格式的文件呢~</p>";
    echo "<p>请上传正确的image/jpg,image/png格式的文件~!</p>";
    exit;
}

//过滤上传文件的错误号
if ($upfile["error"] > 0) { //$upfile["error"]是文件错误机制，可以针对对应提示的错误编码来对应的显示错误信息。
//获取错误信息
    switch ($upfile['error']) {
        case 1:
            $info = "抱歉,您上传的文件过大.";
            break;
        case 2:
            $info = "抱歉,您上传的文件过大.";
            break;
        case 3:
            $info = "文件只有部分被上传";
            break;
        case 4:
            $info = "没有文件被上传.";
            break;
        case 6:
            $info = "找不到临时文件夹.";
            break;
        case 7:
            $info = "文件写入失败！";
            break;
    }
    echo("上传文件错误,原因:" . $info);  //die是直接把错误输出并且停止继续执行下去
    exit;
}

//本次上传文件大小的过滤（自己选择）删除后就可以不限制文件大小
if ($upfile['size'] > 100000000) {
    echo("上传文件大小超出限制");
    exit;
}

do { //为的是判断是否已经存在文件名称和路径
    //上传后的文件名定义
    $fileinfo = pathinfo($upfile["name"]);//解析上传文件名字
    $newfile = date("YmdHis") . rand(1000, 9999) . "." . $fileinfo["extension"];
//这里给文件的名字设置为当前时间年月日时分秒+随机设置数字，这一就可以防止名字冲突而覆盖了。
} while (file_exists($path . $newfile));

//执行文件上传
//判断是否是一个上传的文件
if (is_uploaded_file($upfile["tmp_name"])) {
//执行文件上传(移动上传文件)  -->需要移动文件到当前的路径
    if (move_uploaded_file($upfile["tmp_name"], $path1 . $newfile)) {
//        echo "文件上传成功!";//如果上传成功就提示成功
//注意：如果你是想把文件名存到数据库你需要在这里直接用sql语句执行添加东西到数据库就可以了，并且文件的路径+名字是:$path.$newfile.
//        if(move_uploaded_file($upfile["tmp_name"], $path . $newfile)){
//
//        }
        $result = $conn->query("SELECT max(ImageID) FROM travelimage");
        $max = $result->fetch_array(MYSQLI_BOTH);
        $max1 = $max[0] + 1;

        $sql = "INSERT INTO `travelimage` (`ImageID`,  `Title`, `Description`,`Latitude`,`Longitude`,`CityCode`,`CountryCodeISO`,`UID`,`PATH`) VALUES ('" . $max1 . "','" . $title . "', '" . $description . "', '" . $lat . "', '" . $long . "', '" . $city . "', '" . $country . "', '" . $uid . "', '" . $newfile . "')";
//        $sql="INSERT INTO travelimage (ImageID, Title, Description, Latitude, Longitude, CityCode, CountryCodeISO, UID, PATH) VALUES ('" . $title . "', '" . $description . "', '" . $lat . "', '" . $long . "', '" . $city . "', '" . $country . "', '" . $uid . "', '" . $newfile . "')";
        if ($conn->query($sql) === TRUE) {
            echo "文件上传成功";
        } else {
            echo $max1;
        }
//        }


    } else {
        echo("上传文件失败！"); //如果上传失败就提示失败
        exit;
    }
} else {
    echo("不是一个上传文件!"); //如果不是文件就提示这个
    exit;

}

?>
</body>
</html>
