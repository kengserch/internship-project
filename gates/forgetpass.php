<?php
	include "connect.php";
	include "func.php";
	require '../assets/phpmailer/PHPMailerAutoload.php';
	date_default_timezone_set('Asia/Bangkok');

	////////////////////////////////////////////////////////////
	$date = DateOnlyDisplay(date("Y-m-d"),7);
	$time = TimeDisplay(date("H:i:s"),'mini','th');
	//$position 	 =  $_POST['position'];

	$username 	 =  $_POST['username'];
	
		$sql="
				SELECT s.*  , sp.positionname , m.positionname_mini AS mposition 
				FROM `staff` s
				LEFT JOIN  staff_position sp ON ( sp.id = s.staff_position_id )
				LEFT JOIN  militaryrank2 m ON ( m.id = s.militaryrank_id )
				WHERE
						s.email = '".$username. "'
				AND s.deleted = '0'
				AND s.enable = 'Y'
			"; 
	//	$result['sql'] = $sql ;

		$myquery = mysqli_query($conn, $sql);
		$numr = mysqli_num_rows($myquery);
		while($row = mysqli_fetch_assoc($myquery) ) {
			$result[] = $row;
		}

		$result['found'] = $numr;
		
		
		if($numr==1){
			
			
			$result['position'] = '1';
			
			$ptoken = '1'.md5($result[0]['id'].DateNowS()) ; 
			$result['ptoken'] = $ptoken ; 
			$result['position'] = '1';
			$result['status'] = 'FOUND';
			
			$sqlupdate = "UPDATE staff SET `password_token` = '".$ptoken."' WHERE id= '".$result[0]['id']."' " ; 
			
			$data_json	=  json_encode($result);
			
			
		}else{
		  
			//////////////////////////////////////////////////////////// 
			$sql="
					SELECT l.* , ap.positionname , ap.positionname_mini , m.positionname_mini AS mposition 
					FROM `lecturer` l
					LEFT JOIN `academic_position` ap  ON (ap.id = l.academic_position_id)
					LEFT JOIN  militaryrank m ON ( m.id = l.militaryrank_id )
					WHERE 
					l.email = '".$username. "'
					AND l.deleted = '0'
					AND l.enable = 'Y'
				"; 
			//	$result['sql'] = $sql ;

			$myquery = mysqli_query($conn, $sql);
			$numr = mysqli_num_rows($myquery);
			while($row = mysqli_fetch_assoc($myquery) ) {
				$result[] = $row;
			}

			$result['found'] = $numr;
		
		
			if($numr==1){
				$result['position'] = '2';
				$result['status'] = 'FOUND';
				$ptoken = '2'.md5($result[0]['id'].DateNowS()) ; 
				$result['ptoken'] = $ptoken ; 
				$sqlupdate = "UPDATE lecturer SET `password_token` = '".$ptoken."' WHERE id= '".$result[0]['id']."' " ; 
				$data_json	=  json_encode($result);
			}else{
				
		 
				//////////////////////////////////////////////////////////// 
				 
				$sql="
					SELECT 
						sp.* , 
						se.student_id  , 
						se.student_year ,  
						se.collegeyear , 
						se.collegebatch  ,
						st.titlename ,
						st.titlename_mini 
						
						FROM `student_profile` sp 
						LEFT JOIN `student_education` se  ON (se.student_profile_id = sp.id) 
						LEFT JOIN student_titlename  st ON ( st.id = sp.student_titlename_id )
						WHERE
						sp.email = '".$username. "' 
						AND sp.deleted = '0'
						AND sp.enable = 'Y'
					"; 
				//	$result['sql'] = $sql ;

				$myquery = mysqli_query($conn, $sql);
				$numr = mysqli_num_rows($myquery);
				while($row = mysqli_fetch_assoc($myquery) ) {
					$result[] = $row;
				}

				$result['found'] = $numr;
				
				if($numr==1){
				$result['position'] = '3';
				$result['status'] = 'FOUND';
				$ptoken = '3'.md5($result[0]['id'].DateNowS()) ; 
				$result['ptoken'] = $ptoken ; 
				$sqlupdate = "UPDATE student_profile SET `password_token` = '".$ptoken."' WHERE id= '".$result[0]['id']."' " ; 
				
				$data_json	=  json_encode($result);
				}else{
					//////////////////////////////////////////////////////////// 
				 
					$sql="
						SELECT  m.* , mt.medictypename_th , mt.medictypename_en  
						FROM medic m 
						LEFT JOIN medictype mt ON (mt.id = m.medictype_id) 
							m.email = '".$username. "' 
							AND m.deleted = '0' 
							AND m.enable = 'Y' 
							AND m.approve = 'Y' 
						"; 
					//	$result['sql'] = $sql ;

					$myquery = mysqli_query($conn, $sql);
					$numr = mysqli_num_rows($myquery);
					while($row = mysqli_fetch_assoc($myquery) ) {
						$result[] = $row;
					}

					$result['found'] = $numr;
						
						if($numr==1){
							$result['position'] = '4';
							$result['status'] = 'FOUND';
							$ptoken = '4'.md5($result[0]['id'].DateNowS()) ; 
							$result['ptoken'] = $ptoken ; 
							$sqlupdate = "UPDATE medic SET `password_token` = '".$ptoken."' WHERE id= '".$result[0]['id']."' " ; 
							$data_json	=  json_encode($result);
						}else{
							$result['status'] = 'NOT FOUND';
							$data_json	=  json_encode($result);
						}
						
					}
				
				
			}
		}
		////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////
	
	
	if( $numr > 0){
		
		  
		$myqueryupdate = mysqli_query($conn, $sqlupdate ); // update password_token
		if($myqueryupdate ){
			
			$link = "http://www.medpcm.com/resetpass.html?link=".$ptoken; 
		//	$link = "http://localhost:8031/resetpass.php?link=".$ptoken; 
			
			$mail = new PHPMailer;
			$mail->CharSet = "utf-8";
			
			$email_content = '
				<html>
					<head>
						<meta charset="utf-8"/>
						<title> MedPCM ภาควิชาอายุรกรรม วิทยาลัยแพทยศาสตร์พระมงกุฎเกล้า  </title>
					</head>
					<body>
						<div style="margin-top:40px; font-size: 12px; ">
							<hr style="border-color: #ffffff;color: #FFF;margin-bottom:20px;"> 
							<b>  ผู้ใช้งานหรืออีเมล์  <span style="color:#2196F3">'.$username.'</span> </b>
							<b>ได้มีการร้องขอรีเซ็ตรหัสผ่าน เมื่อ '.$date.' &nbsp;&nbsp; เวลา&nbsp; '.$time.'</b>
							
							<h4> สามารถเข้ากำหนดรหัสผ่านใหม่ได้ที่นี่  <a href="'.$link.'"> รีเซ็ตรหัสผ่าน  </a> </h4>
						</div>
						<div class="footer" style="margin-top:40px;color:#CCC;font-size: 12px;"> 
							<hr style="border-color: #ffffff;color: #FFF;">
							<img src="http://www.medpcm.com/images/medpmk.png" style="width:70px;margin-top:10px;margin-left:0px;">
							<br>
						 
							ภาควิชาอายุรกรรม 
							<br>
							วิทยาลัยแพทยศาสตร์พระมงกุฎเกล้า  
						</div>
					</body>
				</html>
			';

			
			$email_receiver = "pongkwan@ducklab.co.th"; // เมล์ผู้รับ
			$email_receiver = $username ;  // เมล์ผู้รับ

			// ตั้งค่าอนุญาตการใช้งาน email admin ได้ที่นี่ https://myaccount.google.com/lesssecureapps?pli=1

			$mail->msgHTML($email_content);

			$mail->isSMTP();                                      // Set mailer to use SMTP
			$mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
			$mail->SMTPAuth = true; // Enable SMTP authentication
			$mail->Username = "zaejao@gmail.com"; // SMTP username
			$mail->Password = 'zuang343924'; // SMTP password
			$mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
			$mail->Port = 587; // TCP port to connect to
			$mail->setFrom('admin@pcm.ac.th', 'ภาควิชาอายุรศาสตร์ วิทยาลัยแพทยศาสตร์พระมงกุฎเกล้า'); // Admin ID
			$mail->addAddress($email_receiver); // Business Owner ID
			$mail->addReplyTo($email, $fullname); // Form Submitter's ID
			$mail->isHTML(false); // Set email format to HTML
			$mail->Subject = 'กำหนดรหัสผ่านใหม่ || MedPCM  ';
			$mail->Body    = $email_content;
			if(!$mail->send()) {
			  $result['error']='Mailer Error: ' . $mail->ErrorInfo;

				// echo 'Message could not be sent.';
				// echo 'Mailer Error: ' . $mail->ErrorInfo;
			} else {
				$result['success']='success';
				// echo 'Message has been sent';
			}
		//	echo json_encode($result);
			
			

			/*
			session_start();
			if($result['position'] == '1'){
				$_SESSION['userid'] 	= $result[0]['id'] ;
				$_SESSION['usertype'] 	=   '1' ;
				$_SESSION['usertypename'] 	= "staff"; 
			}else if($result['position'] == '2'){
			 
				$_SESSION['userid'] 	= $result[0]['id'] ;
				$_SESSION['usertype'] 	=   '2' ;
				$_SESSION['usertypename'] 	= "lecturer"; 
			}else if( $result['position'] == '3' ){
				$_SESSION['userid'] 	= $result[0]['id'] ;
				$_SESSION['usertype'] 	=   '3' ;
				$_SESSION['usertypename'] 	= "student";
				$_SESSION['student_id'] 	= $result[0]['student_id'];
			} 
			$_SESSION['LANG']='th' ;
			*/
		}else{
			
		}
	}else{
		
	}

	echo  $data_json;


?>
