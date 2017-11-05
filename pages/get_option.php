<?php
include_once 'connect.php';

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit(500);
}

$type = $_GET['type'];

switch ($type) {
    case 'get_continent_list':
        $result = $conn->query("SELECT ContinentCode,ContinentName from geocontinents");
        $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($json);
        break;

    case 'get_country_list':
        $value = $_GET['value'];
        $result = $conn->query("SELECT ISO,CountryName,Continent from geocountries where Continent='" . $value . "'");
        $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($json);
        break;

    case 'get_city_list':
        $value = $_GET['value'];
        $result = $conn->query("SELECT GeoNameID,AsciiName,CountryCodeISO from geocities WHERE CountryCodeISO='" . $value . "'");
        $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($json);
        break;
}

?>