<?php
include_once 'connect.php';
$uid = $_COOKIE['user_uid'];
//$uid=17;
$sql = "select travelimage.ImageID,travelimage.Title,travelimage.PATH,travelimage.Description from travelImage,travelimagefavor WHERE travelimagefavor.ImageID=travelimage.ImageID and travelimagefavor.UID='" . $uid . "'";
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_BOTH);
echo json_encode($row);

?>