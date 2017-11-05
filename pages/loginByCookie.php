<?php
$username='root';
$userpass='';
$host='127.0.0.1';
$database='pj2';
$conn=new mysqli($host,$username,$userpass,$database);
if(!$conn){
    echo '-1';
    exit;
}

$user_id = trim($_GET['user_id']);
$user_pass = $_GET['user_pass'];

$sql="SELECT * FROM `traveluser` WHERE `UID` = '".$user_id."' ";
$result=$conn -> query($sql);
$row = $result -> fetch_row();

if($row[0]==""||$user_pass!=$row[2]){
    echo "0";
}else{
    $test = $row[0].'|'.$row[1].'|'.$row[2].'|'.$row[3].'|'.$row[4].'|'.$row[5];
    echo $test;
}

?>