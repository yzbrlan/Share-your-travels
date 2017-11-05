<?php
include_once 'connect.php';
$time = $_GET['itime'];
$uid = $_COOKIE['user_uid'];
$id = $_COOKIE['favor_id'];

$sql = "SELECT ImageID FROM travelimagefavor WHERE UID = '" . $uid . "' and imageID='" . $id . "'";
$result = $conn->query($sql);
$row = $result->fetch_row();

if ($time == 2) {
    if ($row[0] == "") {
        echo "0";
    } else {
        echo "1";
    }
} else {
    if ($row[0] == "") {
        $insert = "INSERT INTO travelimagefavor (`UID`, `ImageID`) VALUES ('$uid', '$id')";
        if ($conn->query($insert) === TRUE) {
            echo "1";
        } else {
            echo "0";
        }
    } else {
        $concel = "DELETE from travelimagefavor WHERE UID='" . $uid . "' and  ImageID='" . $id . "'";
        if ($conn->query($concel) === TRUE) {
            echo "0";
        } else {
            echo "1";
        }
    }
}
?>