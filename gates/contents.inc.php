<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: text/html; charset=utf-8");

require_once "duck.class.php";
require_once "func.php";
require_once "contents.class.php";


function AddDataSet(){
	$clscont = new ContentsClass();

	$table  = $_POST['table'];
	$data  	= $_POST['data'];

	$result = $clscont->AddData($table,$data);

	echo json_encode($result);
}

function EditDataSet(){
	$clscont = new ContentsClass();

	$table  = $_POST['table'];
	$data  	= $_POST['data'];
	$where  = $_POST['where'];

	$result = $clscont->EditData($table,$data,$where);

	echo json_encode($result);
}

function DeleteDataSet(){
	$clscont = new ContentsClass();

	$table  = $_POST['table'];
	$where  = $_POST['where'];

	$result = $clscont->DeleteData($table,$where);

	echo json_encode($result);

}
 
function EditDataContents(){

		$clscont = new ContentsClass();

		$table  = $_POST['table'];
		$data  	= $_POST['data'];
		$data_content  	= $_POST['data_content'];
		$where  = $_POST['where'];

		foreach($data_content as $key => $value ){
			$data_informations = ContentFormat( $value );
			$data[$key] = $data_informations ;
		}

		$result = $clscont->EditData($table,$data,$where);
		echo json_encode($result);
}

function AddDataContents(){

		$clscont = new ContentsClass();

		$table  = $_POST['table'];
		$data  	= $_POST['data'];
		$data_content  	= $_POST['data_content'];

		if($data_content){
			foreach($data_content as $key => $value ){
				$data_informations = ContentFormat( $value );
				$data[$key] = $data_informations ;
			}
		}

		$result = $clscont->AddData($table,$data,$where);
		echo json_encode($result);
}

function LoadAllData(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clscont->Load($table, $where , $orderby,$limit);
	echo json_encode($result);
}

function LoadOneRow(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];


	$result=$clscont->LoadOnce($table, $where  );
	echo json_encode($result);
}

function LoadLikeTitle(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$wherelike = $_POST['wherelike'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clscont->LoadLikeTitle($table, $where , $wherelike, $orderby,$limit );
	echo json_encode($result);
}

function LoadAfterDate(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];
	$date = $_POST['date'];

	$result=$clscont->LoadAfterDate($table, $where , $orderby,$limit,$date); 
	echo json_encode($result);
}

function LoadAfterDateDocETC(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];
	$date = $_POST['date'];

	$result=$clscont->LoadAfterDate($table, $where , $orderby,$limit,$date);
 
	if($result){
		foreach( $result as $k1 => $v1){
			//$result[$k1]['content'] = htmlspecialchars_decode(ContentDisplayEditor($v1['content']) );
			$result[$k1]['content'] = str_replace(array("\\n","\\"),"",html_entity_decode($v1['content']) );

		 
	 	}
	}
  
	echo json_encode($result);
}

function LoadFieldsMaxID(){
	$clscont = new ContentsClass();

	$table  = $_POST['table'];
	$fields  	= $_POST['fields'];

	$result = $clscont->LoadFieldsMaxID($table,$fields);

	echo json_encode($result);
 
}

////////////////////////////////////////////////////////////////////////////////////////////

function LoadMenuMain(){
	$clscont = new ContentsClass();

	$result1 = $clscont->Load('menumain',array('enable'=>'Y','deleted'=>0 , 'menumain_level'=>1 ) ,' orderby DESC '  ,'');
	if($result1){
		foreach( $result1 as $key1 => $val1){
			$result1[$key1]['menumain2'] = $clscont->Load('menumain',array('enable'=>'Y','deleted'=>0 , 'menumain_level'=>2 , 'menumain_id'=> $val1['id'] ) ,' orderby DESC '  ,'');
			if($result1[$key1]['menumain2']){ 
				foreach( $result1[$key1]['menumain2'] as $key2 => $val2){
					$result1[$key1]['menumain2'][$key2]['menumain3'] = $clscont->Load('menumain',array('enable'=>'Y','deleted'=>0 , 'menumain_level'=>3 , 'menumain_id'=> $val2['id'] ) ,' orderby DESC '  ,'');
					
				}
			}
		}
	}
	
	echo json_encode($result1);

}

function LoadSetCode(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clscont->LoadSetCode($table, $where , $orderby,'');
	echo json_encode($result);

}

function SetLang(){
	session_start();

	$langcode = $_POST['langcode'];
	if( $langcode =="th" ){
		$_SESSION["LANG"] = "TH";
		$_SESSION["LANGCODE"] = "th";
	}else{
		$_SESSION["LANG"] = "EN";
		$_SESSION["LANGCODE"] = "en";
	}
	$result['LANG'] = array($_SESSION["LANG"],$_SESSION["LANGCODE"]);
	echo json_encode($result);
}

function LoadHomeNewsAuction(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clscont->LoadHomeNewsAuction($table, $where , $orderby,$limit);
	echo json_encode($result);
}

function LoadHomeNewsList(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clscont->LoadHomeNewsList($table, $where , $orderby,$limit);
	echo json_encode($result);
}

function LoadAuctionsList(){
	$clscont = new ContentsClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clscont->LoadAuctionsList($table, $where , $orderby,$limit);
	echo json_encode($result);
}

function LoadAuctionsCategoryByType(){
	$clscont = new ContentsClass();

 
	$typecode = $_POST['typecode'];

	$result=$clscont->LoadAuctionsCategoryByType( $typecode);
	echo json_encode($result);
}

function LoadMenuMainEN(){
	$clscont = new ContentsClass();

	$result1 = $clscont->Load('en_menumain',array('enable'=>'Y','deleted'=>0 , 'menumain_level'=>1 ) ,' orderby DESC '  ,'');
	if($result1){
		foreach( $result1 as $key1 => $val1){
			$result1[$key1]['menumain2'] = $clscont->Load('en_menumain',array('enable'=>'Y','deleted'=>0 , 'menumain_level'=>2 , 'menumain_id'=> $val1['id'] ) ,' orderby DESC '  ,'');
			if($result1[$key1]['menumain2']){ 
				foreach( $result1[$key1]['menumain2'] as $key2 => $val2){
					$result1[$key1]['menumain2'][$key2]['menumain3'] = $clscont->Load('en_menumain',array('enable'=>'Y','deleted'=>0 , 'menumain_level'=>3 , 'menumain_id'=> $val2['id'] ) ,' orderby DESC '  ,'');
					if($result1[$key1]['menumain2'][$key2]['menumain3']){ 
						foreach( $result1[$key1]['menumain2'][$key2]['menumain3'] as $key3 => $val3){
							$result1[$key1]['menumain2'][$key2]['menumain3'][$key3]['menumain4'] = $clscont->Load('en_menumain',array('enable'=>'Y','deleted'=>0 , 'menumain_level'=>4 , 'menumain_id'=> $val3['id'] ) ,' orderby DESC '  ,'');
						}
					}
				}
			}
		}
	}
	echo json_encode($result1);

}

function Uploadfilecomplaint(){
	$clscont = new ContentsClass(); 
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "complaint";

 
    $new_directory = '../uploads/complaint' ;
  

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png","zip", "rar", "pdf","doc","docx" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "application/octet-stream") || ($_FILES["file"]["type"] == "application/pdf")
		||  ($_FILES["file"]["type"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
	)
	&& in_array($file_extension, $validextensions)) {

			if ($_FILES["file"]["error"] > 0){
				//echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];

                $new_image = $source_id.$date_now.".".$file_extension ;
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
				 $data_s['file_complaint'] =  $new_image ;
				 $where['id'] = $source_id;

				 $result['table'] = $clscont->EditData($table,$data_s,$where);
				 $result['state'] = "1";
				}else{
				 //echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
				 $result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
				 $result['state'] = "2";
				}
			}
			
		}else{ 
			$result['status_img'] = "Invalid file Size or Type (Only jpeg, jpg, png,zip, rar, pdf,doc ,docx): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}
///////////////////////////////////////////////////////////////////////////////////////////////

function LoadNewsCover(){
	$clscont = new ContentsClass();  
	$where = $_POST['where']; 
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit']; 
	$result = $clscont->LoadNewsCover($where,$orderby,$limit);
	/*
	$result = array();
	if($result1){
		foreach($result1 as $k1 => $v1){
			$public_date  = $v1['public_date'];
			$public_date1 = substr($public_date,0,4);
			$public_date2 = substr($public_date,4,19);  
			$result[$k1] = $v1  ;
			$pyear = $public_date1+543;  
			$result[$k1]['public_date'] = $pyear."".$public_date2  ;  
		}
	}*/
	echo json_encode($result);
}

function LoadSearchData(){
	$clscont = new ContentsClass();

 
	$datatype = $_POST['datatype']; 
	$datatype_type = $_POST['datatype_type'];
	$datatype_typesub = $_POST['datatype_typesub'];
	$keyword = $_POST['keyword'];
	 

	$result['news'] = $clscont->LoadSearchNews( $datatype_type , $datatype_typesub,$keyword  );
	$result['progprev'] = $clscont->LoadSearchProgPrev( $datatype_type , $datatype_typesub,$keyword  );
	$result['progrec'] = $clscont->LoadSearchProgRec( $datatype_type , $datatype_typesub,$keyword  );
	//$result['progplan'] = $clscont->LoadSearchProgPlan( $datatype_type , $datatype_typesub,$keyword  );

	
	
	//$result ;
	echo json_encode($result);
}

function EditView(){
	$clscont = new ContentsClass();

	$table = $_POST['table']; 
	$fieldviews = $_POST['fieldviews']; 
	$id = $_POST['id']; 

	$data1 = $clscont->LoadOnce($table,array('id'=>$id ));
	$view_new = $data1[$fieldviews]+1  ; 
	$result = $clscont->EditData($table,array($fieldviews=>$view_new ),array('id'=>$id ));
	echo json_encode($result);
}

function LoadSurveyMainById(){
	$clscont = new ContentsClass();
 
	$id = $_POST['dataid'];  
	$result = $clscont->LoadSurveyMainById($id); 
	echo json_encode($result);
}

///// MILE

function LoadProgRec(){
	$clscont = new ContentsClass();  
	$where = $_POST['where']; 
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit']; 
	$result = $clscont->LoadProgRec($where,$orderby,$limit);
	/*
	$result = array();
	if($result1){
		foreach($result1 as $k1 => $v1){
			$public_date  = $v1['public_date'];
			$public_date1 = substr($public_date,0,4);
			$public_date2 = substr($public_date,4,19);  
			$result[$k1] = $v1  ;
			$pyear = $public_date1+543;  
			$result[$k1]['public_date'] = $pyear."".$public_date2  ;  
		}
	}*/
	echo json_encode($result);
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
switch($_REQUEST["mode"]){
	case "AddDataSet" : AddDataSet(); break;
	case "EditDataSet" : EditDataSet(); break;
	case "DeleteDataSet" : DeleteDataSet(); break;
	case "AddDataContents" : AddDataContents(); break;
	case "EditDataContents" : EditDataContents(); break; 
	case "LoadAllData" : LoadAllData(); break;
	case "LoadOneRow" : LoadOneRow(); break;
	case "LoadLikeTitle" : LoadLikeTitle(); break;
	case "LoadAfterDate" : LoadAfterDate(); break; 

	case "LoadFieldsMaxID" : LoadFieldsMaxID(); break; 



	
	////////////////////////////////////////////////////////////////////////////////////////
	case "LoadMenuMain" : LoadMenuMain(); break; 
	case "LoadSetCode" : LoadSetCode(); break; 
	case "LoadHomeNewsAuction" : LoadHomeNewsAuction(); break; 
	case "LoadHomeNewsList" : LoadHomeNewsList(); break; 


	case "LoadNewsCover" : LoadNewsCover(); break; 
	case "LoadSearchData" : LoadSearchData(); break; 

	case "EditView" : EditView(); break; 
	case "LoadSurveyMainById" : LoadSurveyMainById(); break; 
	case "LoadAfterDateDocETC" : LoadAfterDateDocETC(); break; 
	
	
	// MILE 

	case "LoadProgRec" : LoadProgRec(); break; 
	
	
	////////////////////////////////////////////////////////////////////////////////////////
	default : echo '{"success":"FAIL INC contentClass"}';
}
?>
