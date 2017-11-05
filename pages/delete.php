<?php
include_once "connect.php";
$id = $_GET['id'];
$sql = "UPDATE travelimage set UID=null WHERE ImageID='" . $id . "' ";

if ($conn->query($sql) === TRUE) {
    echo "1";
} else {
    echo -1;
}


?>