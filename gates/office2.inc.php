<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: text/html; charset=utf-8");

session_start();
require_once "duck.class.php";
require_once "func.php";
require_once "office2.class.php"; 
 
function AddDataSet(){
	$clsoffice = new OfficeClass2();

	$table  = $_POST['table'];

	$data  	= $_POST['data'];

	$result = $clsoffice->AddData($table,$data);

	echo json_encode($result);
}

function EditDataSet(){
	$clsoffice = new OfficeClass2();

	$table  = $_POST['table'];
	$data  	= $_POST['data'];
	$where  = $_POST['where'];

	$result = $clsoffice->EditData($table,$data,$where);

	echo json_encode($result);
}

function DeleteDataSet(){
	$clsoffice = new OfficeClass2();

	$table  = $_POST['table'];
	$where  = $_POST['where'];

	$result = $clsoffice->DeleteData($table,$where);

	echo json_encode($result);

}
 
function EditDataContents(){

		$clsoffice = new OfficeClass2();

		$table  = $_POST['table'];
		$data  	= $_POST['data'];
		$data_content  	= $_POST['data_content'];
		$where  = $_POST['where'];

		foreach($data_content as $key => $value ){
			//	$data_informations = ContentFormat( $value );
			$data_informations = htmlspecialchars( $value  ); 
			$data_informations = str_replace(array("\n","\\"),"",$data_informations) ;
			$data_informations = str_replace(array("\\n","\\"),"",$data_informations) ;
			$data[$key] = $data_informations ;
		}

		$result = $clsoffice->EditData($table,$data,$where);
		echo json_encode($result);
}

function AddDataContents(){

		$clsoffice = new OfficeClass2();

		$table  = $_POST['table'];
		$data  	= $_POST['data'];
		$data_content  	= $_POST['data_content'];

		if($data_content){
			foreach($data_content as $key => $value ){
				//$data_informations = ContentFormat( $value );
				$data_informations = htmlspecialchars( $value ); 
				$data_informations = str_replace(array("\n","\\"),"",$data_informations) ;
				$data_informations = str_replace(array("\\n","\\"),"",$data_informations) ;
				$data[$key] = $data_informations ;
			}
		}
		
		$result = $clsoffice->AddData($table,$data);
		echo json_encode($result);
}

function AddDataUser(){
	$clsoffice = new OfficeClass2();

	$table  = $_POST['table'];
	$data  	= $_POST['data'];
	$data['password']  	= md5($_POST['password']);

	$result = $clsoffice->AddData($table,$data);

	echo json_encode($result);
}
 

function UploadUser(){
  
	$clsoffice = new  OfficeClass2();
	$dataid	= $_GET['Userid'];
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "members";
  
	 $new_directory = '../uploads/members' ;

  
 
	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

 

			if ($_FILES["file"]["error"] > 0){
				//echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];

        		$new_image = $dataid.$date_now.".".$file_extension ;
				$targetPath =  $new_directory."/".$new_image;


				if (file_exists($targetPath)){
					$flgDelete = unlink($targetPath);
					if($flgDelete){
					  $result['status_img'] = "File Deleted";
					}else{
					  $result['status_img'] = "File can not delete";
					  $result['state'] = "6";
					}
				}

				if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file

				 $image_name = $targetPath ;
				 $result['status_img'] = "  success :: ". $targetPath ;
				 $data_s['avatar'] =  $new_image ;
				 $where['id'] = $dataid;

				 $result['table'] = $clsoffice->EditData($table,$data_s,$where);
				 $result['state'] = "1";
				}else{
				 //echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
				 $result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
				 $result['state'] = "2";
				}
			}
		 
		 
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}

function LoadAllData(){
	$clsoffice = new OfficeClass2();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clsoffice->Load($table, $where , $orderby,$limit);
	echo json_encode($result);
}

function LoadOneRow(){
	$clsoffice = new OfficeClass2();

	$table = $_POST['table'];
	$where = $_POST['where'];


	$result=$clsoffice->LoadOnce($table, $where  );
	echo json_encode($result);
}

function LoadLikeTitle(){
	$clsoffice = new OfficeClass2();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$wherelike = $_POST['wherelike'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clsoffice->LoadLikeTitle($table, $where , $wherelike, $orderby,$limit );
	echo json_encode($result);
}


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
 



////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

switch($_REQUEST["mode"]){ 
	case "AddDataSet" : AddDataSet(); break;
	case "EditDataSet" : EditDataSet(); break;
	case "DeleteDataSet" : DeleteDataSet(); break;
	case "AddDataContents" : AddDataContents(); break;
	case "EditDataContents" : EditDataContents(); break; 
	case "LoadAllData" : LoadAllData(); break;
	case "LoadOneRow" : LoadOneRow(); break;
	case "LoadLikeTitle" : LoadLikeTitle(); break;

	////////////////////////////////////////////////////////////////////////////////////////
	 
	////////////////////////////////////////////////////////////////////////////////////////
	default : echo '{"success":"FAIL INC Office2Class"}';
}
?>
