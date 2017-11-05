<?php
include_once 'connect.php';
$uid = $_COOKIE['user_uid'];
//$uid = 17;
$sql = "select ImageID,Title,PATH from travelImage WHERE UID='" . $uid . "'";
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_BOTH);
echo json_encode($row);

?>