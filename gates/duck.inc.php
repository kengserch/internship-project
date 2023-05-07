<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: text/html; charset=utf-8");

require_once "duck.class.php";
require_once "duck.func.php";


switch($_REQUEST["mode"]){
	case "CheckLogin" : LoadDataLoginInc(); break;    
	case "ConvertThaiDate" : ConvertThaiDate(); break;    
	default : echo '{"success":"FAIL"}';
}
?>