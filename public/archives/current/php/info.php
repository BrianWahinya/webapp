<?php
// set json headers
header("Access-Control-Allow-Methods: GET");
header('Content-Type: application/json;');

    require_once 'conn.php';
    try {

        $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // execute the stored procedure        
        // call the stored procedure
        $q = $pdo->prepare("CALL Info ()");
        $q->execute();
        $q->setFetchMode(PDO::FETCH_ASSOC);
        $total_row = $q->rowCount();
       
        if($total_row <= 0) {   
            $result = 'No data';          
        }else{
            $result = $q->fetchAll();            
        };

        echo json_encode($result); 

    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }



?>