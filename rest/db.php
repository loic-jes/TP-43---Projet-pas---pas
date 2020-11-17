<?php
class Db {


    private static $db = null;
    private static function connect(){

        if (self::$db === null) {
            // Paramètres de configuration DB
            $dsn = "mysql:host=localhost;port=3306;dbname=db_stepbystep";
            $user = "root";
            $pass = "";
            
            // Création de la connexion
            try {
                self::$db = new PDO(
                    $dsn,
                    $user,
                    $pass,
                    array(
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                        PDO::ATTR_PERSISTENT => true
                    )
                );
            } catch (PDOException $e) {
                var_dump($e);
                exit();
            }
        }
        return self::$db;
    }


    private static $stmt = null;
    public static function query($sql, $params = null)
    {
        $result = false;
        try {
            $stmt = self::connect()->prepare($sql);
            Db::$stmt = $stmt;
            $result = $stmt->execute($params);

        } catch (PDOException $e) {
            var_dump($e);
            exit();
        }
        return $result;
    }



    public static function select ($table, $id, $where, $order){

        if (!isset($where)) {
            $where = "active = ?";
            $params[] = true;
        }

        if (isset($id)) {
            $where .= " AND id=?";
            $params[]=$id;
        }

        if (!isset($order)){
            $orderby = "id ASC";
        }

        $sql = "SELECT * FROM $table WHERE $where ORDER BY $orderby";
        $resp = self::query($sql, $params);
        $rows = Db::$stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($rows);

    }


public static function insert ($table, $fields) {

    $columns = "";
    $values = "";


    if (!isset($fields)){
        $fields = array();
        $fields['id'] = null;
    } else {
          if (isset($fields) && isset($fields['id'])) {
              unset($fields['id']);
             };
    }


    $valuesArray = array();
    foreach ($fields as $k => $v) {
        $columns .= $k . ",";
        $values .= "?,";
        array_push($valuesArray, $v);
    };

    $columns = trim($columns, ",");
    $values = trim($values, ",");



    $sql = "INSERT INTO $table ($columns) VALUES ($values)";
    $resp = self::query($sql, $valuesArray);
    $resp = $resp && Db::$stmt->rowCount() == 1;
    if ($resp) {
        $resp = self::$db->lastInsertId();
    }
    return json_encode($sql);


    // Autre méthode : 

// $keys = '';
// $values = '';

// foreach($fields as $k => $v) {
//     $keys .= $k.", ";
//     $values .= '"'.$v.'", ';
// }

// $keys = substr ($keys, 0, -2);
// $values = substr ($values, 0, -2);
// $sql = "INSERT INTO $table ($key) VALUES ($values) ";

}



}


