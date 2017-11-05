<?php
include_once 'connect.php';

$type = $_GET['type'];
switch ($type) {
    case 'pic_first':
        $result = $conn->query("SELECT ImageID,Title,PATH FROM travelimage 
WHERE ImageID >= (SELECT floor(RAND() * (SELECT MAX(travelimage.ImageID) FROM travelimage))-5)  
ORDER BY ImageID LIMIT 5");
        $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//随机取5个图片
        echo json_encode($json);
        break;

    case 'pic_second':
        $result = $conn->query("SELECT ImageID,Title,Description,PATH FROM travelimage 
WHERE ImageID >= (SELECT floor(RAND() * (SELECT MAX(travelimage.ImageID) FROM travelimage))-6)  
ORDER BY ImageID LIMIT 6");
        $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//随机取6个图片
        echo json_encode($json);
        break;

    case 'pic_third':
        $result = $conn->query("SELECT ImageID,PATH FROM travelimage 
WHERE ImageID >= (SELECT floor(RAND() * (SELECT MAX(travelimage.ImageID) FROM travelimage))-12)  
ORDER BY ImageID LIMIT 12");
        $json = mysqli_fetch_all($result, MYSQLI_ASSOC);//随机取12个图片
        echo json_encode($json);
        break;
}


?>