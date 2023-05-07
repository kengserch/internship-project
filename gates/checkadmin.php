<?php
	session_start();
	if(   $_SESSION['userlevel'] == "Admin" ){
      
 
	}else{
		?>
		<script>
           // alert(' <?php echo $_SESSION['userlevel'];?> ') ;
          //  alert(` You don't have permission !  `) ;
		 	//window.location = "/logout.php";
			 window.location = "/index.php"; 
		</script>
		<?php
	}

?>
