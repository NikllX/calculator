<?php
$body = json_decode(file_get_contents('php://input') , true);

$res = null;
$error = [];
$firstNumber = htmlspecialchars($body["firstNumber"]);
$secondNumber = htmlspecialchars($body["secondNumber"]);
$operations = htmlspecialchars($body["operations"]);

if(!is_numeric($firstNumber)){
    $error[] = "Первая переменная является не числом";
}
if(!is_numeric($secondNumber)){
    $error[] = "Вторая переменная является не числом";
}
if(empty($error) && isset($operations)){
    switch ($body["operations"]){
        case "+":
            $res = $firstNumber + $secondNumber;
            break;
        case "-":
            $res = $firstNumber - $secondNumber;
            break;
        case "*":
            $res = $firstNumber * $secondNumber;
            break;
        case "/":
            if($secondNumber == 0){
                $error[] = "На ноль делить нельзя";
                break;
            }
            $res = $firstNumber / $secondNumber;
            break;
        default:
            $error[] = "Такой операции нету";
            break;
    }
}

if(!empty($error)){
    http_response_code(400);
    echo json_encode($error);
}else{
    http_response_code(200);
    echo json_encode($res);
}