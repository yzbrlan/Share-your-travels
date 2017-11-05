<?php
include_once 'connect.php';

//$user_name = trim($_GET['user_name']);
$user_name = trim($_GET['email_address']);
$user_pass = md5($_GET['password']);

$sql = "INSERT INTO `traveluser` (`UserName`, `Pass`, `State`, `DateJoined`) VALUES ('$user_name', '$user_pass','1',now())";

if ($conn->query($sql) === TRUE) {
    echo "1";
} else {
    echo "0";
}

//$conn->close();
?>