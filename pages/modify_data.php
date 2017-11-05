<?php
include_once 'connect.php';

$title = trim($_GET['title']);//html表单post到的信息
$description = trim($_GET['description']);
//$lat = trim($_POST['latitude']);
//$long = trim($_POST['longitude']);
//$city = trim($_POST['city']);
//$country = trim($_POST['country']);
//$continent = trim($_POST['continent']);
$id = $_COOKIE['modify_id'];

$sql = "update travelimage set Title='" . $title . "',Description='" . $description . "' where ImageID='" . $id . "'";
if ($conn->query($sql) === true) {
    echo 1;
} else {
    echo -1;
}

?>