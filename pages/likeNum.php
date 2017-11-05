<?php
include_once 'connect.php';


$id = $_COOKIE['favor_id'];
$sqlNum = "select COUNT(imageId) AS favorNum from travelImageFavor WHERE imageId='" . $id . "'";
$resultNum = $conn->query($sqlNum);
$numRow = $resultNum->fetch_array(MYSQLI_BOTH);
$favorNum = $numRow["favorNum"];

echo $favorNum;

?>