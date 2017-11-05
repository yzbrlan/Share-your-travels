<?php

include_once 'connect.php';
$id=$_GET['id'];
$uid = $_COOKIE['user_uid'];

$concel = "DELETE from travelimagefavor WHERE UID='" . $uid . "' and  ImageID='" . $id . "'";
if ($conn->query($concel) === TRUE) {
    echo "0";
} else {
    echo "1";
}

?>