<?php
include_once 'connect.php';
//
//if(!$conn){
//    echo '-1';
//    exit;
//}

$user_name = trim($_GET['user_name']);
$user_pass = md5($_GET['user_pass']);

$sql="SELECT * FROM `traveluser` WHERE `UserName` = '".$user_name."'";
$result=$conn -> query($sql);
$row = $result -> fetch_row();

if($row[0]==""||$user_pass!=$row[2]){
    echo "0";
}else{
    $test = $row[0].'|'.$row[1].'|'.$row[2].'|'.$row[3].'|'.$row[4].'|'.$row[5];

    echo $test;
}

?>