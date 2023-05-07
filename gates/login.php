<?php
	include "connect.php";
	include "func.php";
	session_start();
	////////////////////////////////////////////////////////////

	//$position 	 =  $_POST['position'];

	$username 	 =  $_POST['username'];
	$password 	 =  $_POST['password'];
	// $password 	 =  md5($_POST['password']);

		$sql="
				SELECT o.* , r.responsible_area_code , r.responsible_area_title 
				FROM  officers o 
				LEFT JOIN responsible_area r ( r.responsible_area_id =  o.responsibilty_id)
				WHERE
					o.username = '".$username. "'
					AND o.password = '".$password."'
					AND o.deleted = '0'
					AND o.enable = 'Y'
			";
	

		$myquery = mysqli_query($conn, $sql);
		$numr = mysqli_num_rows($myquery);
		while($row = mysqli_fetch_assoc($myquery) ) {
			$result[] = $row;
		}

		$result['found'] = $numr;


		if($numr>0){
		 
			//province_responsibilty_id

			$result['position'] =  $result[0]['position'];; 
			$result['status'] = 'FOUND'; 
			$result['officers_level'] = $result[0]['officers_level'];
			$data_json	=  json_encode($result);



			$membersid = $result[0]['id'] ;
			$sql2="
				INSERT INTO members_log  (members_id) VALUES ('$membersid')
			"; 
			$myquery = mysqli_query($conn, $sql2);
				  

		}
		////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////

		//officers_level 
		//section_id
		//province_responsibilty_id
	if( $numr > 0){
	 

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
		
	}else{

	}

	echo  $data_json;


?>
