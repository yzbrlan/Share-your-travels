<?php
include_once 'connect.php';

$name = $_GET['name'];

$sql = "SELECT * FROM `traveluser` WHERE `UserName` LIKE '$name'";

$result = $conn -> query($sql);
$row = $result -> fetch_row();

if($row[0]==""){
    echo "1";
}else {
    echo "0";
}

?>