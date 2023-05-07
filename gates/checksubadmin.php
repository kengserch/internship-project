<?php
	session_start();

	//if(!$_SESSION['ses_userid'] || ($_SESSION['ses_userstate']) !="SUBADMIN"){
	//	echo $_SESSION['ses_userstate'] ;
	if(!$_SESSION['ses_userid']){  
		?>
		<script>
			window.location = "logout.php";
		</script>
		<?php
	}

?>
