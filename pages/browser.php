<?php
include_once 'connect.php';

if (isset($_GET["city"])) {
    $continent = $_GET["continent"];
    $country = $_GET["country"];
    $city = $_GET["city"];


    if ($city != "0") {
        $result = $conn->query("SELECT ImageID,PATH from travelimage WHERE CityCode = '" . $city . "'");
    } else {
        if ($country != "0") {
            $result = $conn->query("SELECT ImageID,PATH from travelimage WHERE CountryCodeISO = '" . $country . "'");
        } else {
            if ($continent != "0") {
                $result = $conn->query("SELECT travelimage.ImageID, travelimage.PATH from travelimage, geocountries WHERE geocountries.Continent ='" . $continent . "' and travelimage.CountryCodeISO = geocountries.ISO");
            } else {
                $result = $conn->query("SELECT PATH, ImageID FROM travelimage");
            }
        }
        $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($json);
//        echo $conn->error;

    }
}
?>