<?php

include('Db.php'); 

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $_get = validate_request($_GET);
        $table = isset($_get['table']) ? $_get['table'] : null;

        if ($table == null){
            echo json_encode(false);
        break;
        }

        $id = isset($_get['id']) ? $_get['id'] : null;
        $where = isset($_get['where']) ? $_get['where'] : null;
        $order = isset($_get['order']) ? $_get['order'] : null;

        // echo json_encode($_get);
        echo Db::select($table, $id, $where, $order); 
        break;


    case 'POST':

        // var_dump($_POST);

        // var_dump(file_get_contents('php://input'));

        $_post = json_decode(file_get_contents('php://input'), true);
        // var_dump($_post);

        $_post = validate_request($_post);
        // var_dump($_post);



        $table = isset($_post['table']) ? $_post['table'] : null;

        if ($table == null){
            echo json_encode($_post);
        break;
        }

        $fields = isset($_post['fields']) ? $_post['fields'] : null;
        // echo json_encode($_post);
        echo Db::insert($table, $fields);

        break;


    case 'PUT':
                     
        $_put = json_decode(file_get_contents('php://input'), true);
        $_put = validate_request($_put);

        $table = isset($_put['table']) ? $_put['table'] : null;
        $id = isset($_put['id']) ? $_put['id'] : null;

        if ($table == null || $id == null) {
            echo json_encode(false);
        break;
        }

        $fields = isset($_put['fields']) ? $_put['fields'] : null;
    
        echo Db::update($table, $id, $fields); 

        // echo json_encode($_put);
        break;


    case 'DELETE':


        $_del = json_decode(file_get_contents('php://input'), true);
        $_del = validate_request($_del);

        $table = isset($_del['table']) ? $_del['table'] : null;
        $id = isset($_del['id']) ? $_del['id'] : null;

        if ($table == null || $id == null) {
            echo json_encode(false);
        break;
        }
        
        echo Db::delete($table, $id); 

        // echo json_encode($_del);
        break;

    default:
        echo "La requête n'a pas été reconnue en tant que GET, POST, PUT ou DELETE";
        
}

function validate_request($request) {
    foreach ($request as $k => $v) {
        if(is_array($v)){
            validate_request($v);
        }
        else{
            $request[$k] = htmlspecialchars(strip_tags(stripslashes(trim($v))));
        }
    }
    return $request;
}