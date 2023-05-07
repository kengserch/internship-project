<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: text/html; charset=utf-8");

session_start();
require_once "duck.class.php";
require_once "func.php";
require_once "office.class.php";
// require_once "office.script.js";



function AddDataSet(){
	$clsoffice = new OfficeClass();

	$table  = $_POST['table'];

	$data  	= $_POST['data'];

	$result = $clsoffice->AddData($table,$data);

	echo json_encode($result);
}

function EditDataSet(){
	$clsoffice = new OfficeClass();

	$table  = $_POST['table'];
	$data  	= $_POST['data'];
	$where  = $_POST['where'];

	$result = $clsoffice->EditData($table,$data,$where);

	echo json_encode($result);
}

function DeleteDataSet(){
	$clsoffice = new OfficeClass();

	$table  = $_POST['table'];
	$where  = $_POST['where'];

	$result = $clsoffice->DeleteData($table,$where);

	echo json_encode($result);

}
 
function EditDataContents(){

		$clsoffice = new OfficeClass();

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

		$clsoffice = new OfficeClass();

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
	$clsoffice = new OfficeClass();

	$table  = $_POST['table'];
	$data  	= $_POST['data'];
	//$data['password']  	= md5($_POST['password']);
	$data['password']  	= $_POST['password'];

	$result = $clsoffice->AddData($table,$data);

	echo json_encode($result);
}
 

function UploadUser(){
  
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['Userid'];
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "officers";
  
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
	$clsoffice = new OfficeClass();

	$table = $_POST['table'];
	$where = $_POST['where'];
	$orderby = $_POST['orderby'];
	$limit = $_POST['limit'];

	$result=$clsoffice->Load($table, $where , $orderby,$limit);
	echo json_encode($result);
}

function LoadOneRow(){
	$clsoffice = new OfficeClass();

	$table = $_POST['table'];
	$where = $_POST['where'];


	$result=$clsoffice->LoadOnce($table, $where  );
	echo json_encode($result);
}

function LoadLikeTitle(){
	$clsoffice = new OfficeClass();

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

function LoginOfficer(){
	$clsoffice = new OfficeClass();

	$username 	 =  $_POST['username'];
	$password 	 =  $_POST['password'];
 
	$result = $clsoffice->LoginOfficer($username, $password );
	$result['found'] =  0 ; 
	if($result ){
		$result['found'] =  count($result);
		$numr =  count($result);

	 
			////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////

			//officers_level 
			//section_id
			//province_responsibilty_id
			if( $numr > 0){
			
				$result['status'] = 'FOUND'; 
 
			
				$officersid = $result[0]['id'] ; 
				$datalog['officers_id'] = $officersid ; 
				$datalog['actions'] = 'LOGIN' ; 
				$clsoffice->AddData('officers_log', $datalog  ) ;
				

				$_SESSION['userid'] = $result[0]['id'];
				$_SESSION['userdisplayname'] =$result[0]['titlename'].$result[0]['firstname']." ".$result[0]['lastname'];
				$_SESSION['userinfo'] = $result[0]['titlename'].$result[0]['firstname']." ".$result[0]['lastname'] ;
				$_SESSION['positionname'] = $result[0]['position']; 
				$_SESSION['usertype'] = $result[0]['userlevel']; 
				$_SESSION['user_resname'] = $result[0]['responsible_area_title']; 
				$_SESSION['user_rescode'] = $result[0]['responsible_area_code']; 

				
				$_SESSION['useravatar'] = $result[0]['avatar'];

				$_SESSION['user_secid'] = $result[0]['section_id'];

				 
				
				if($result[0]['section_id']==1){
					$_SESSION['user_secname'] = "ส่วนกลาง";
				}else if($result[0]['section_id']==2){
					$_SESSION['user_secname'] = "วิทยาเขต";
					
				}

				if($result[0]['officers_level']==1){
					$_SESSION['usertypename'] = "ผู้ดูแลระบบ";
					$_SESSION['userlevel'] = "SuperAdmin";
					$_SESSION['usersupid'] = $result[0]['id'];
				} else if($result[0]['officers_level']==2){
					$_SESSION['usertypename'] = "เจ้าหน้าที่";
					$_SESSION['userlevel'] = "Admin";
					$_SESSION['usersupid'] = $result[0]['id'];
				}  else if($result[0]['officers_level']==3){
					$_SESSION['usertypename'] = "ผู้บริหาร";
					$_SESSION['userlevel'] = "Board";
					$_SESSION['usersupid'] = $result[0]['id'];
				} 
				
			}
	} else{ 
	}
 
	echo json_encode($result);
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function UploadImgNews(){
 
 
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "radionews";
  
	 $new_directory = '../uploads/radionews' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['news_img'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}


function UploadImgRadioChart(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "radiochart";
  
	 $new_directory = '../uploads/radiochart' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['rac_img'] =  $new_image ;
				 $where['rac_id'] = $dataid;

				 $result['table'] = $clsoffice->EditData($table,$data_s,$where);
				 $result['state'] = "1";
				}else{
				 //echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
				 $result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
				 $result['state'] = "2";
				}
			}
		 
		}else{ 
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}

function UploadFileRadioChart(){
 
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid'];
	$date_now = date("YmdHis");
	$table = "radiochart";
	$new_directory = '../uploads/files/';
	
 
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
				 $data_s['rac_file'] =  $new_image ;
				 $where['rac_id'] = $dataid;

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




function UploadFileNews(){
 
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid'];
	$source_id	= $_POST['source_id'];
	$date_now = date("YmdHis");
	$table = "radionews";
  
	 $new_directory = '../uploads/files/';

  
 
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
				 $data_s['news_file'] =  $new_image ;
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


function UploadImgLiveType(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "broadcastlive_type";
  
	 $new_directory = '../uploads/livetype' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['live_type_picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}

function UploadImgLiveTypeSub(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "broadcastlive_type_sub";
  
	 $new_directory = '../uploads/livetypesub' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['live_typesub_picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}

function UploadImgLive(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "broadcastlive";
  
	 $new_directory = '../uploads/live' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['live_picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}


function UploadImgNewsType(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "news_type";
  
	 $new_directory = '../uploads/newstype/' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['news_type_picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}


function UploadImgNewsTypeSub(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "news_type_sub";
  
	$new_directory = '../uploads/newstypesub/' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['news_typesub_picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}


function UploadImgProgPrevTypes(){
  
	$clsoffice = new  OfficeClass();
	$source_id	= $_GET['source_id'];
	$dataid = $_GET['newsid'];
	$date_now = date("YmdHis");
	$table = "progprevtype";
  
	 $new_directory = '../uploads/progprevtype/' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}

function UploadImgProgPrevTypeSub(){
  
	$clsoffice = new  OfficeClass();
	$source_id	= $_GET['source_id'];
	$dataid = $_GET['newsid'];
	$date_now = date("YmdHis");
	$table = "progprevtypesub";
  
	 $new_directory = '../uploads/progprevTypeSub/' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}



function UploadFileLaws(){
  
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['lawdetailid'];
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "law_detail";
  
	 $new_directory = '../uploads/files' ;

  
 
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
				 $data_s['lawfiles'] =  'files/'.$new_image ;
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


function UploadFileGalleries(){
	$clsoffice = new  OfficeClass();
	$table	= $_GET['table_name'];
	$source_id	= $_GET['source_id'];
	$news_id = $_GET['news_id'];
	$date_now = date("YmdHis");

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
		)
		&& in_array($file_extension, $validextensions)) {

			if ($_FILES["file"]["error"] > 0){
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];
				$new_image = $source_id."_g_".$date_now.".".$file_extension;


				$pathfolder =  "../uploads/news/".$news_id ;
				if(!file_exists($pathfolder)){
					mkdir($pathfolder) ;
					chmod($pathfolder, 0755);
				}


				$targetPath = $pathfolder."/".$new_image;

				if (file_exists($targetPath)) {
					//echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
					$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
					$result['state'] = "6";
				}else{
					if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file

						$image_name = $targetPath ;

						$result['status_img'] = "  success :: ". $targetPath ;


						$data_s['news_img_picname'] =  $new_image ;
						$where['id'] = $source_id; 
						$result['table'] = $clsoffice->EditData($table,$data_s,$where);


						$result['state'] = "1";

					}else{
						//echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
						$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
						$result['state'] = "2";
					}

				}
			}
		}else{
		//	echo "<span id='invalid'>***Invalid file Size or Type***<span>";
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}


function UploadFileVideo(){
	$clsoffice = new  OfficeClass();
	$table	= $_GET['table_name'];
	$source_id	= $_GET['source_id'];
	$news_id = $_GET['news_id'];
	$date_now = date("YmdHis");

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
		)
		&& in_array($file_extension, $validextensions)) {

			if ($_FILES["file"]["error"] > 0){
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];
				$new_image = $source_id."_g_".$date_now.".".$file_extension;


				$pathfolder =  "../uploads/news/".$news_id ;
				if(!file_exists($pathfolder)){
					mkdir($pathfolder) ;
					chmod($pathfolder, 0755);
				}


				$targetPath = $pathfolder."/".$new_image;

				if (file_exists($targetPath)) {
					//echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
					$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
					$result['state'] = "6";
				}else{
					if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file

						$image_name = $targetPath ;

						$result['status_img'] = "  success :: ". $targetPath ;


						$data_s['news_vdo_picname'] =  $new_image ;
						$where['id'] = $source_id; 
						$result['table'] = $clsoffice->EditData($table,$data_s,$where);


						$result['state'] = "1";

					}else{
						//echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
						$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
						$result['state'] = "2";
					}

				}
			}
		}else{
		//	echo "<span id='invalid'>***Invalid file Size or Type***<span>";
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}

function UploadNewsFile(){
	
	$clsoffice = new  OfficeClass();
	$table	= $_GET['table_name'];
	$source_id	= $_GET['source_id'];
	$news_id = $_GET['news_id'];
	$date_now = date("YmdHis");

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png","zip", "rar", "pdf","doc","docx" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

	/*	if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "application/octet-stream") || ($_FILES["file"]["type"] == "application/pdf")
      ||  ($_FILES["file"]["type"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
		)
		&& in_array($file_extension, $validextensions)) {
*/
			if ($_FILES["file"]["error"] > 0){
				//echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];
			//	$sourcePath = $_FILES['file']['name'];

				$new_image = $source_id."_f_".$date_now.".".$file_extension;
				$pathfolder =  "../uploads/news/".$news_id ;

				if(!file_exists($pathfolder)){
					mkdir($pathfolder) ;
					chmod($pathfolder, 0755);
				}


				$targetPath = $pathfolder."/".$new_image;

				if (file_exists($targetPath)) {
					//echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
					$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
					$result['state'] = "6";
				}else{
					if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file

						$image_name = $targetPath ;

						$result['status_img'] = "  success :: ". $targetPath ;


						$data_s['news_filename'] =  $new_image ;
						$where['id'] = $source_id;

						$result['table'] = $clsoffice->EditData($table,$data_s,$where);


						$result['state'] = "1";

					}else{
						//echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
						$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
						$result['state'] = "2";
					}

				}
			}
		// }else{
		 
		// 	$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
		// 	$result['state'] = "3";
		// }
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}

///////////////////////////////////////////////////////////////////////////////////////////////



function UploadNewsAudio(){
	
	$clsoffice = new  OfficeClass();
	$table	= $_GET['table_name'];
	$source_id	= $_GET['source_id'];
	$news_id = $_GET['news_id'];
	$date_now = date("YmdHis");

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png","zip", "rar", "pdf","doc","docx" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

	/*	if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "application/octet-stream") || ($_FILES["file"]["type"] == "application/pdf")
      ||  ($_FILES["file"]["type"] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
		)
		&& in_array($file_extension, $validextensions)) {
*/
			if ($_FILES["file"]["error"] > 0){
				//echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];
			//	$sourcePath = $_FILES['file']['name'];

				$new_image = $source_id."_f_".$date_now.".".$file_extension;
				$pathfolder =  "../uploads/news/".$news_id ;

				if(!file_exists($pathfolder)){
					mkdir($pathfolder) ;
					chmod($pathfolder, 0755);
				}


				$targetPath = $pathfolder."/".$new_image;

				if (file_exists($targetPath)) {
					//echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
					$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
					$result['state'] = "6";
				}else{
					if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file

						$image_name = $targetPath ;

						$result['status_img'] = "  success :: ". $targetPath ;


						$data_s['news_audio_name'] =  $new_image ;
						$where['id'] = $source_id;

						$result['table'] = $clsoffice->EditData($table,$data_s,$where);


						$result['state'] = "1";

					}else{
						//echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
						$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
						$result['state'] = "2";
					}

				}
			}
		// }else{
		 
		// 	$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
		// 	$result['state'] = "3";
		// }
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}


/////////////////////-----earth-----/////////////////////////////


function UploadFileFlowch(){
  
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['flowid'];
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "programschplan";
  
	 $new_directory = '../uploads/files' ;

  
 
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
				 $data_s['pdf_file'] =  $new_image ;
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

function UploadImgFlowch(){
  
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['flowid'];
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "programsch";
  
	 $new_directory = '../uploads/listprogram' ;

  
 
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
				 $data_s['cover_file'] =  $new_image ;
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

function UploadImgRecType(){
  
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid'];
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "progrectype";
  
	 $new_directory = '../uploads/progrectype' ;

  
 
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
				 $data_s['type_picname'] =  $new_image ;
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

function UploadImgRecTypeSub(){
  
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid'];
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "progrectypesub";
  
	 $new_directory = '../uploads/progrectypeSub' ;

  
 
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
				 $data_s['picname'] =  $new_image ;
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

function UploadImgListProgType(){
  
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid'];
	$source_id	= $_GET['source_id'];
	$date_now = date("YmdHis");
	$table = "programschtype";
  
	 $new_directory = '../uploads/programType' ;

  
 
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
				 $data_s['type_picname'] =  $new_image ;
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

function UploadFileAllProg(){
 
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid'];
	$source_id	= $_POST['source_id'];
	$date_now = date("YmdHis");
	$table = "programsch";
  
	 $new_directory = '../uploads/files/';

  
 
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
				 $data_s['pdf_file'] =  $new_image ;
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


function UploadImgAllProg(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "programsch";
  
	 $new_directory = '../uploads/listprogram' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['cover_file'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}

function UploadInTroPage(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['newsid']; 
	$date_now = date("YmdHis");
	$table = "intropage";
  
	 $new_directory = '../uploads/intro/' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png","html");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")|| ($_FILES["file"]["type"] == "text/html"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['filename'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}



///////////////////////////-----earth-----//////////////////////////////////////////////


function EditPasswordUser(){
	$clsoffice = new  OfficeClass();
 
	$table  = $_POST['table'];
	$data  	= $_POST['data'];
	$where  = $_POST['where'];
	
	$data['password'] = $data['password']; 
	//$data['password'] = md5($data['password']); 
	$result['pass'] = $data['password'] ;
	$result = $clsoffice->EditData($table,$data,$where); 
	echo json_encode($result);
}


///////////////////////////////////////////////////////////////////////////////////////////////

function UploadImgProgPrev(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['dataid']; 
	$date_now = date("YmdHis");
	$table = "progprev";
  
	 $new_directory = '../uploads/progprevs' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['progprev_cover'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}

function UploadProgprevGalleries(){
	$clsoffice = new  OfficeClass();
	$table	= $_GET['table_name'];
	$source_id	= $_GET['source_id'];
	$dataid = $_GET['dataid'];
	$date_now = date("YmdHis");

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
		)
		&& in_array($file_extension, $validextensions)) {

			if ($_FILES["file"]["error"] > 0){
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];
				$new_image = $source_id."_g_".$date_now.".".$file_extension;


				$pathfolder =  "../uploads/progprev/".$dataid ;
				if(!file_exists($pathfolder)){
					mkdir($pathfolder) ;
					chmod($pathfolder, 0777);
				}


				$targetPath = $pathfolder."/".$new_image;

				if (file_exists($targetPath)) {
					//echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
					$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
					$result['state'] = "6";
				}else{
					if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file

						$image_name = $targetPath ;

						$result['status_img'] = "  success :: ". $targetPath ;

						
						$data_s['picname'] =  $new_image ;  
						$where['id'] = $source_id; 

						$result['table'] = $clsoffice->EditData($table,$data_s,$where);


						$result['state'] = "1";

					}else{
						//echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
						$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
						$result['state'] = "2";
					}

				}
			}
		}else{
		//	echo "<span id='invalid'>***Invalid file Size or Type***<span>";
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}
 
function UploadProgPrevVideo(){
	$clsoffice = new  OfficeClass();
	$table	= $_GET['table_name'];
	$source_id	= $_GET['source_id'];
	$dataid = $_GET['dataid'];
	$date_now = date("YmdHis");

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
		)
		&& in_array($file_extension, $validextensions)) {

			if ($_FILES["file"]["error"] > 0){
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];
				$new_image = $source_id."_g_".$date_now.".".$file_extension;


				$pathfolder =  "../uploads/progprev/".$dataid ;
				if(!file_exists($pathfolder)){
					mkdir($pathfolder) ;
					chmod($pathfolder, 0755);
				}


				$targetPath = $pathfolder."/".$new_image;

				if (file_exists($targetPath)) {
					//echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
					$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
					$result['state'] = "6";
				}else{
					if(move_uploaded_file($sourcePath,$targetPath)){ 
						// Moving Uploaded file

						$image_name = $targetPath ;

						$result['status_img'] = "  success :: ". $targetPath ;


						$data_s['progprev_vdo_file'] =  $new_image ;
						$where['id'] = $source_id; 
						$result['table'] = $clsoffice->EditData($table,$data_s,$where);


						$result['state'] = "1";

					}else{
						//echo "Can't move_uploaded_file : : " .$targetPath. "<br/><br/>";
						$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
						$result['state'] = "2";
					}

				}
			}
		}else{
			//	echo "<span id='invalid'>***Invalid file Size or Type***<span>";
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}

function UploadProgPrevFile(){
	
	$clsoffice = new  OfficeClass();
	$table	= $_GET['table_name'];
	$source_id	= $_GET['source_id'];
	$dataid = $_GET['dataid'];
	$date_now = date("YmdHis");

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png","zip", "rar", "pdf","doc","docx" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

 
			if ($_FILES["file"]["error"] > 0){ 
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{ 
				$sourcePath = $_FILES['file']['tmp_name'];  
				$new_image = $source_id."_f_".$date_now.".".$file_extension;
				$pathfolder =  "../uploads/progprev/".$dataid ; 
				if(!file_exists($pathfolder)){
					mkdir($pathfolder) ;
					chmod($pathfolder, 0755);
				}


				$targetPath = $pathfolder."/".$new_image;

				if (file_exists($targetPath)) { 
					$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
					$result['state'] = "6";
				}else{
					if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file

						$image_name = $targetPath ;

						$result['status_img'] = "  success :: ". $targetPath ; 

						$data_s['progprev_filename'] =  $new_image ;
						$where['id'] = $source_id;

						$result['table'] = $clsoffice->EditData($table,$data_s,$where);


						$result['state'] = "1";

					}else{ 
						$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
						$result['state'] = "2";
					}

				}
			}
	 
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}

function UploadProgPrevAudio(){ 

		$clsoffice = new  OfficeClass();
		$table	= $_GET['table_name'];
		$source_id	= $_GET['source_id'];
		$dataid = $_GET['dataid'];
		$date_now = date("YmdHis");
	
		if(isset($_FILES["file"]["type"])){
			$validextensions = array("jpeg", "jpg", "png","zip", "rar", "pdf","doc","docx" );
			$temporary = explode(".", $_FILES["file"]["name"]);
			$file_extension = end($temporary);
			$filename_original = $_FILES["file"]["name"] ;
	
			$result['extension'] = $file_extension;
			$result['temporary'] = $temporary;
	
			$result['size_img'] = $_FILES["file"]["size"]; 
				if ($_FILES["file"]["error"] > 0){
					//echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
					$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
					$result['state'] = "5";
				}else{
	
					$sourcePath = $_FILES['file']['tmp_name'];
				//	$sourcePath = $_FILES['file']['name'];
	
					$new_image = $source_id."_f_".$date_now.".".$file_extension;
					$pathfolder =  "../uploads/progprev/".$dataid ;
	
					if(!file_exists($pathfolder)){
						mkdir($pathfolder) ;
						chmod($pathfolder, 0755);
					}
	
	
					$targetPath = $pathfolder."/".$new_image;
	
					if (file_exists($targetPath)) { 
						$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
						$result['state'] = "6";
					}else{
						if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file
	
							$image_name = $targetPath ;
	
							$result['status_img'] = "  success :: ". $targetPath ;
	
	
							$data_s['progprev_audio_name'] =  $new_image ;
							$where['id'] = $source_id;
	
							$result['table'] = $clsoffice->EditData($table,$data_s,$where);
	
	
							$result['state'] = "1";
	
						}else{ 
							$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
							$result['state'] = "2";
						}
	
					}
				} 
		}else{
			$result['status_img'] = "Can't read your file,try again later";
			$result['state'] = "4";
		}
	
		echo json_encode($result); 

}



function UploadImgFlowType(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['dataid']; 
	$date_now = date("YmdHis");
	$table =  $_GET['tablename']; 
  
	 $new_directory = '../uploads/schplantype/' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['type_picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}

function UploadImgSchDetail(){
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['dataid']; 
	$date_now = date("YmdHis");
	$table =  $_GET['tablename']; 
  
	$new_directory = '../uploads/schplandetail/' ;

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['type_picname'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}


function UploadImgProgRec(){
 
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['source_id']; 
	$date_now = date("YmdHis");
	$table = "progrec";
  
	 $new_directory = '../uploads/progrec/'.$dataid;

	 if(!file_exists($new_directory)){
		mkdir($new_directory) ;
		chmod($new_directory, 0755);
	}

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

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
				 $data_s['pic_cover'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}


function UploadAudioProgRec(){
 
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['source_id']; 
	$date_now = date("YmdHis");
	$table = "progrec";
  
	 $new_directory = '../uploads/progrec/'.$dataid ;
 
	 if(!file_exists($new_directory)){
		 mkdir($new_directory) ;
		 chmod($new_directory, 0755);
	 }


	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		// if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		// && in_array($file_extension, $validextensions)) {

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
				 $data_s['audiofile'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	// }else{
	// 	$result['status_img'] = "Can't read your file,try again later";
	// 	$result['state'] = "4";
	// }
 

	echo json_encode($result);
}

function CopySchDetail(){
	$clsoffice = new  OfficeClass();
	$id_copy	= $_POST['id_copy']; 
	$dataid	= $_POST['dataid']; 
	$create_by	= $_POST['create_by']; 
	$create_date	= $_POST['create_date']; 
	
	$plan_detail = $clsoffice->Load('programschplan_detail',array('programschplan_id'=> $id_copy),'  id asc','');

	$result = array();
	$result['plan_detail'] =$plan_detail;

	if($plan_detail ){
		foreach($plan_detail as $k1 => $v1 ){
			$datasave['programschplan_id'] =  $dataid	 ;
			$datasave['programdate'] = $v1['programdate'] ;
			$datasave['programsch_id'] = $v1['programsch_id'] ;
			$datasave['starttime'] = $v1['starttime'] ;
			$datasave['endtime'] = $v1['endtime'] ;
			$datasave['program_name_th'] = $v1['program_name_th'] ;
			$datasave['program_name_en'] = $v1['program_name_en'] ; 
			$datasave['detail_th'] = $v1['detail_th'] ;
			$datasave['detail_en'] = $v1['detail_en'] ;
			$datasave['vdo_promote'] = $v1['vdo_promote'] ;
			$datasave['vdo_link'] = $v1['vdo_link'] ;
			$datasave['tagsearch'] = $v1['tagsearch'] ;
			$datasave['enable'] = $v1['enable'] ;
			$datasave['deleted'] = $v1['deleted'] ;
			$datasave['create_by'] =  $create_by;
			$datasave['update_by'] =  $create_by;
			$datasave['create_date'] =  $create_by;
			$datasave['update_date'] =  $create_date;

			$result[] = $clsoffice->AddData('programschplan_detail', $datasave );
		}
		$result['state'] = 'COMPLETE';
	}else{
		$result['state'] = 'NODATA';
	}
	echo json_encode($result); 
}



function UploadImgDoc(){
 
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['source_id']; 
	$date_now = date("YmdHis");
	$table = "documents";
  
	 $new_directory = '../uploads/documents';

	 if(!file_exists($new_directory)){
		mkdir($new_directory) ;
		chmod($new_directory, 0755);
	}

	 if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png");
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

		if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg"))
		&& in_array($file_extension, $validextensions)) {

			if ($_FILES["file"]["error"] > 0){
				//echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{

				$sourcePath = $_FILES['file']['tmp_name'];

        		$new_image = $dataid.'_'.$date_now.".".$file_extension ;
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
				 $data_s['pic_cover'] =  $new_image ;
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
			$result['status_img'] = "Invalid file Size or Type (Only jpeg ,jpg, png): ".$_FILES["file"]["type"] .":". $_FILES["file"]["size"] ;
			$result['state'] = "3";
		}
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}
 

	echo json_encode($result);
}


function UploadFileDoc(){
	
	$clsoffice = new  OfficeClass();
	$dataid	= $_GET['source_id']; 
	$date_now = date("YmdHis");
	$table = "documents";

	if(isset($_FILES["file"]["type"])){
		$validextensions = array("jpeg", "jpg", "png","zip", "rar", "pdf","doc","docx" );
		$temporary = explode(".", $_FILES["file"]["name"]);
		$file_extension = end($temporary);
		$filename_original = $_FILES["file"]["name"] ;

		$result['extension'] = $file_extension;
		$result['temporary'] = $temporary;

		$result['size_img'] = $_FILES["file"]["size"];

 
			if ($_FILES["file"]["error"] > 0){ 
				$result['status_img'] = "Return Code: " . $_FILES["file"]["error"] ;
				$result['state'] = "5";
			}else{ 
				$sourcePath = $_FILES['file']['tmp_name'];  
				$new_image = $dataid."_".$date_now.".".$file_extension;
				$pathfolder =  "../uploads/documents" ; 
				if(!file_exists($pathfolder)){
					mkdir($pathfolder) ;
					chmod($pathfolder, 0755);
				}


				$targetPath = $pathfolder."/".$new_image;

				if (file_exists($targetPath)) { 
					$result['status_img'] =  $_FILES["file"]["name"] . " already exists ";
					$result['state'] = "6";
				}else{
					if(move_uploaded_file($sourcePath,$targetPath)){ // Moving Uploaded file

						$image_name = $targetPath ;

						$result['status_img'] = "  success :: ". $targetPath ; 

						$data_s['docfile'] =  $new_image ;
						$where['id'] = $dataid;

						$result['table'] = $clsoffice->EditData($table,$data_s,$where);


						$result['state'] = "1";

					}else{ 
						$result['status_img'] = "Can't move_uploaded_file : " .$targetPath." Source:".$sourcePath ;
						$result['state'] = "2";
					}

				}
			}
	 
	}else{
		$result['status_img'] = "Can't read your file,try again later";
		$result['state'] = "4";
	}

	echo json_encode($result);
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

function AddDatasurveymain(){
	$clsoffice = new OfficeClass();

	$table  = $_POST['table'];
	$data  	= $_POST['data'];
	$table1  = $_POST['table1'];
	$data1 	= $_POST['data1'];

	$result[$table] = $clsoffice->AddData($table,$data);

	//$lastid = $result['code'] ; 

	$data1['survey_id'] = $result[$table]['code'] ;
	$result[$table1] = $clsoffice->AddData($table1,$data1);

	
	if($result[$table]['success'] == "COMPLETE" &&  $result[$table1]['success'] =="COMPLETE"){
		$result['success'] = "COMPLETE" ;
	}else{
		$result['success'] = "FAIL" ;
	}
	
	echo json_encode($result);
}

function EditDatasurveymain(){
	$clsoffice = new OfficeClass();

	$table  = $_POST['table'];
	$data  	= $_POST['data'];
	$where  = $_POST['where'];

	$table1  = $_POST['table1'];
	$data1 	= $_POST['data1'];
	$where1  = $_POST['where1'];

 
	$result[$table] = $clsoffice->EditData($table,$data,$where );
 
	$result[$table1] = $clsoffice->EditData($table1,$data1,$where1);

	
	if($result[$table]['success'] == "COMPLETE" &&  $result[$table1]['success'] =="COMPLETE"){
		$result['success'] = "COMPLETE" ;
	}else{
		$result['success'] = "FAIL" ;
	}
	
	echo json_encode($result);
}

function CreateNewsNoti(){
	$clsoffice = new OfficeClass();

	$table  = $_POST['table'];
	$news_id  = $_POST['news_id'];

	$datadevice=$clsoffice->Load('devices',array(),'','');
	foreach( $datadevice as $k1 => $v1){
		$data1['devicecode'] = $v1['devicecode'];
		$data1['news_id'] = $news_id;

		$result = $clsoffice->AddData('news_noti',$data1);
	}

	echo json_encode($result);
}

switch($_REQUEST["mode"]){
	case "CreateNewsNoti" : CreateNewsNoti(); break;
	case "AddDataSet" : AddDataSet(); break;
	case "EditDataSet" : EditDataSet(); break;
	case "DeleteDataSet" : DeleteDataSet(); break;
	case "AddDataContents" : AddDataContents(); break;
	case "EditDataContents" : EditDataContents(); break; 
	case "LoadAllData" : LoadAllData(); break;
	case "LoadOneRow" : LoadOneRow(); break;
	case "LoadLikeTitle" : LoadLikeTitle(); break;

	////////////////////////////////////////////////////////////////////////////////////////
	case "LoginOfficer" : LoginOfficer(); break; 
	////////////////////////////////////////////////////////////////////////////////////////
 
	case "AddDataUser" : AddDataUser(); break; 
	case "EditPasswordUser" : EditPasswordUser(); break;
	////////////////////////////////////////////////////////////////////////////////////////
	case "UploadImgDisease" : UploadImgDisease(); break;
	case "UploadImgBanners" : UploadImgBanners(); break;
	case "UploadImgBannersSystem" : UploadImgBannersSystem(); break;
	case "UploadImgNews" : UploadImgNews(); break;
	case "UploadImgRadioChart" : UploadImgRadioChart(); break;
	case "UploadImgLiveType" : UploadImgLiveType(); break;
	case "UploadImgLiveTypeSub" : UploadImgLiveTypeSub(); break;
	case "UploadImgLive" : UploadImgLive(); break;
	case "UploadUser" : UploadUser(); break;
	
	case "UploadImgNewsType" : UploadImgNewsType(); break;
	case "UploadImgNewsTypeSub" : UploadImgNewsTypeSub(); break;
	//case "UploadImgNews" : UploadImgLive(); break;
	///////////////////////earth/////////////////////////////
	case "UploadImgProgPrevTypes" : UploadImgProgPrevTypes(); break;
	case "UploadImgProgPrevTypeSub" : UploadImgProgPrevTypeSub(); break;
	case "UploadImgRecType" : UploadImgRecType(); break;
	case "UploadImgRecTypeSub" : UploadImgRecTypeSub(); break;
	case "UploadImgListProgType" : UploadImgListProgType(); break;
	case "UploadFileAllProg" : UploadFileAllProg(); break;
	case "UploadImgAllProg" : UploadImgAllProg(); break;
	case "UploadInTroPage" : UploadInTroPage(); break;

	
	///////////////////////earth/////////////////////////////

	case "UploadFileNews" : UploadFileNews(); break;
	case "UploadFileRadioChart" : UploadFileRadioChart(); break;
	case "UploadFileLaws" : UploadFileLaws(); break;
	

	case "UploadFileGalleries" : UploadFileGalleries(); break;
	case "UploadFileVideo" : UploadFileVideo(); break;
	case "UploadNewsFile" : UploadNewsFile(); break;
	case "UploadNewsAudio" : UploadNewsAudio(); break;


	
 
	
	///////////earth///////////////////
	case "UploadFileFlowch" : UploadFileFlowch(); break;
	case "UploadImgFlowch" : UploadImgFlowch(); break;

	//UploadImgFlowType
	////////////////////////////////////////////////////////////////////////////////////////
	
	case "UploadProgprevGalleries" : UploadProgprevGalleries(); break;
	case "UploadProgPrevVideo" : UploadProgPrevVideo(); break;
	case "UploadProgPrevFile" : UploadProgPrevFile(); break;
	case "UploadProgPrevAudio" : UploadProgPrevAudio(); break;


	case "UploadImgFlowType" : UploadImgFlowType(); break;
	case "UploadImgSchDetail" : UploadImgSchDetail(); break;


	case "UploadImgProgRec" : UploadImgProgRec(); break;
	case "UploadAudioProgRec" : UploadAudioProgRec(); break;

	case "UploadImgDoc" : UploadImgDoc(); break;
	case "UploadFileDoc" : UploadFileDoc(); break;
	
	

	case "CopySchDetail" : CopySchDetail(); break;
 

	
	////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////
	case "AddDatasurveymain" : AddDatasurveymain(); break;
	case "EditDatasurveymain" : EditDatasurveymain(); break;
	
	 
	
	////////////////////////////////////////////////////////////////////////////////////////
	default : echo '{"success":"FAIL INC officeClass"}';
}
?>
