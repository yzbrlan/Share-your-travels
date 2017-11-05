<?php
include_once 'connect.php';

function formatBytes($size) {//存储数据单位转换
    $units = array(' B', ' KB', ' MB', ' GB', ' TB');
    for ($i = 0; $size >= 1024 && $i < 4; $i++)
        $size /= 1024;
    return round($size, 2).$units[$i];
}

if($_FILES['photofile']['error'] > 0) {//判断传入文件错误类型
    echo '上传失败 : ';
    switch ($_FILES['photofile']['error']) {
        case '1': echo '<p>抱歉,您上传的文件过大</p>';
            break;
        case '2': echo '<p>抱歉,您上传的文件过大</p>';
            break;
        case '3': echo '<p>抱歉,网络原因文件上传错误,请后退重新上传</p>';
            break;
        case '4': echo '<p>抱歉,请正确选择文件</p>';
            break;
        case '6': echo '<p>抱歉,系统错误,请联系管理员</p>';
            break;
        case '7': echo '<p>抱歉,系统错误,请联系管理员</p>';
            break;
    }
    exit;
}

$title = trim($_POST['title']);//html表单post到的信息
$description = trim($_POST['description']);
$lat = trim($_POST['lat']);
$long = trim($_POST['long']);
$city = trim($_POST['city']);
$country = trim($_POST['country']);
$uid=$_COOKIE['user_uid'];
$fileurl = $_FILES['photofile']['tmp_name'];//上传后的临时文件地址
$filename = $_FILES['photofile']['name'];//用户文件名
$filesize = formatBytes($_FILES['photofile']['size']);//调用单位转换函数,将B转换为MB

if(($_FILES['photofile']['type'] != "image/jpg") && (mime_content_type($fileurl) != "image/jpg")
    &&($_FILES['photofile']['type'] != "image/png") && (mime_content_type($fileurl) != "image/png")) {
    echo "<p style='color:red;'>您上传的文件貌似不是image/jpg,image/png格式的文件呢~</p>";
    echo "<p>请上传正确的image/jpg,image/png格式的文件~!</p>";
    exit;
}

$newname = $title.'.jpg';//创建新的文件名
$swichtype = iconv('utf-8','gbk',$newname);//将UTF-8编码转化为windows系统的GBK编码进行命名
move_uploaded_file($fileurl,$swichtype);//移动文件到置顶目录

echo "您正在上传 : ".$filename."<p> 大小 : ".$filesize."</p>".$newname."</p> ";

$address = $name.'.jpg';//创建以导入数据库的文件路径
$sql = "INSERT INTO `travelimage` ( `Title`, `Description`,`Latitude`,`Longitude`,`CityCode`,`CountryCodeISO`,`UID`,`PATH`) VALUES ('".$title."', '".$description."', '".$lat."', '".$long."', '".$city."', '".$country."', '".$uid."', '".$address."');";

$result = $conn -> query($sql);
if($result) {
    echo "<p style='color:green;'>恭喜,照片已经成功上传到云端~</p>";
}else {
    echo "<p style='color:red;'>抱歉,您上传的照片在云端已经有了呢~,您可以尝试重新搜索~</p>";
    exit;
}
$conn -> close();
?>
</body>
</html>
