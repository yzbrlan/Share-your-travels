<?php

include_once 'connect.php';

if(isset($_GET["title"])) {
    $title = $_GET["title"];
        $result = $conn->query("SELECT Description,Title,PATH,ImageID FROM travelimage WHERE Title like '%".$title."%'");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
}
if(isset($_GET["description"])) {
    $description = $_GET["description"];
    $result = $conn->query("
SELECT Description,Title,PATH,ImageID FROM travelimage WHERE Description like '%".$description."%'");
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($json);
}

?>