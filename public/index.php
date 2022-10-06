<?php
require"./../.env";


header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8"); 
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE"); 
header("Access-Control-Max-Age: 3600"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost:3306";
$username = "root";
$password = getenv("PASSWORD");

//$text = $_POST["textarea"];
//$name = $_POST["username"];
//$submit = $_POST["submitbutton"];


$requestType = $_SERVER["REQUEST_METHOD"];

if($requestType == "GET") {
try {
    $conn = new PDO("mysql:host=$servername:dbname=pipper",$username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $statement = $conn->query("select * from pipper.pips order by pip_ID DESC");
    $result = $statement->fetchAll(\PDO::FETCH_ASSOC);

    echo json_encode($result);


} catch (PDOException $e) {
    echo "Connection failed". $e->getMessage();
}
}

elseif ($requestType =="POST"){

    $input = (array) json_decode(file_get_contents('php://input'), TRUE);
    $text = $input["message"];
    $name = $input["username"];

    //$text = $_POST["message"];
    //$name = $_POST["username"];

    //$sql = "INSERT INTO pips (username, message) VALUES ('$name', '$text')";
    $conn = new PDO("mysql:host=$servername:dbname=pipper",$username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO pipper.pips (username, message) VALUES (:name,:text)";
    $stmt= $conn->prepare($sql);
    $stmt->execute(array(
        'text' => $text,
        'name' => $name,
    ));
}

elseif ($requestType == "DELETE"){
    $item = (array) json_decode((file_get_contents('php://input')), TRUE);
    $deleteID = $item["pip_ID"];

    $conn = new PDO("mysql:host=$servername:dbname=pipper",$username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "DELETE FROM pipper.pips WHERE pip_ID = '$deleteID'";
    $conn->exec($sql);
}

elseif ($requestType == "PUT"){
    $item = (array) json_decode((file_get_contents('php://input')), TRUE);
    $updatePip = $item["message"];
    $pipID = $item["pip_ID"];

    $conn = new PDO("mysql:host=$servername:dbname=pipper",$username,$password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE pipper.pips SET message = '$updatePip' WHERE pip_ID = '$pipID'";
    $conn->exec($sql);
}






?>
