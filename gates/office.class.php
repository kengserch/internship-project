<?php
// header('Access-Control-Allow-Origin: *');
// header("Content-type: text/html; charset=utf-8");

class OfficeClass extends DuckClass{
	////////////////////////////////////////////////////////////////////////////////////////////
	public function LoginOfficer($username, $password){
		$sql="
			SELECT o.* , r.responsible_area_code , r.responsible_area_title 
			FROM  officers o 
			LEFT JOIN responsible_area r ON ( r.responsible_area_id =  o.responsibilty_id)
			WHERE
			o.username = '".$username. "'
			AND o.password = '".$password."'
			AND o.deleted = '0'
			AND o.enable = 'Y'
		";
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}


	public function LoadMenuSubByDept($deptcode , $level , $menusub_id ){
		$querywhere = '';
		if(!empty($menusub_id)){
			$querywhere = " AND ms.menusub_id = '$menusub_id' " ;
		}

		$sql ="
			SELECT ms.id , msd.id as menusubd_id ,ms.menusub_name_th , ms.menusub_name_en ,ms.menusub_code , ms.menusub_id , ms.menusub_level , ms.menusub_link , ms.menusub_otherlink , msd.enable 
			FROM `menusub` ms 
			LEFT JOIN `menusub_department` msd ON (msd.menusub_id = ms.id ) 
			WHERE 
			msd.department_codech = '$deptcode' 
			AND msd.deleted = 0 
			AND ms.deleted = 0  
			AND ms.menusub_level = '$level' 
			$querywhere
			ORDER BY msd.orderby DESC , ms.orderby DESC
		" ; 

	 
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}

	public function LoadProgPrev( $where =array(), $orderby='', $limit='' ){
		$qrywhere=''; 
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			  $item = mysqli_real_escape_string($this->mysqli,$item);
			  $qrywhere .= "  $i  = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}

		$sql = "
			SELECT p.* , pt.title_th , pts.title_th as titlesub  
			FROM progprev p   
			LEFT JOIN  progprevtype  pt ON ( pt.id  = p.progprev_type_id )
			LEFT JOIN  progprevtypesub  pts ON ( pts.id  = p.progprev_type_sub_id )
			WHERE 
			$qrywhere
			 1=1 
			 $orderby
			 $limit
		";  
		//echo $sql ; 
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		} 
		$myquery->free();

		return $result;

	}
	

	public function LoadProgRec( $where =array(), $orderby='', $limit='' ){
		$qrywhere=''; 
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			  $item = mysqli_real_escape_string($this->mysqli,$item);
			  $qrywhere .= "  $i  = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}

		$sql = "
			SELECT p.* , pt.type_title_th as title_th , pts.title_th as titlesub  
			FROM progrec p   
			LEFT JOIN  progrectype  pt ON ( pt.id  = p.progrec_type_id )
			LEFT JOIN  progrectypesub  pts ON ( pts.id  = p.progrec_type_sub_id )
			WHERE 
			$qrywhere
			 1=1 
			 $orderby
			 $limit
		";  
	 // echo $sql ; 
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		} 
		$myquery->free();

		return $result;

	}
	///////////////////-----earth-----/////////////////////////////////

		
	public function  LoadFlowch( $where =array(), $orderby='', $limit='' ){
		$qrywhere='';
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= "  $table.$i  = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}

		$sql = "
			SELECT f.* , ft.title_type_th 
			
			FROM `programsch`  f
			LEFT JOIN  `programschtype`  ft ON ( ft.id  = f.programtype_id ) 
			
			WHERE 
			$qrywhere
			1=1 
			$orderby
			$limit

		";

		//echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadAllProg( $where =array(), $orderby='', $limit='' ){
		$qrywhere='';
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= "   $i  = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}

		$sql = "
			SELECT p.* , pt.type_title_th 
			
			FROM `programsch`  p
			LEFT JOIN  `programschtype`  pt ON ( pt.id  = p.programtype_id ) 
		
			
			WHERE 
			$qrywhere
			1=1 
			$orderby
			$limit

		";

		 //echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadFlowchDetail( $where =array(), $orderby='', $limit='' ){
		$qrywhere='';
		if(!empty($where)){
			foreach((array)$where as $i => $item){
				$item = mysqli_real_escape_string($this->mysqli,$item);
				//$qrywhere .= "  $table.$i  = '$item' AND ";
				$qrywhere .= "  $i  = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}

		$sql = "
			SELECT p.* , pp.title_th 
			
			FROM `programschplan_detail`  p
			LEFT JOIN  `programschplan`  pp ON ( pp.id  = p.programschplan_id ) 
			
			WHERE 
			$qrywhere
			1=1 
			$orderby
			$limit

		";

		// $sql = "
		// 	SELECT p.* , pt.title_th 
			
		// 	FROM `programsch_detail`  p
		// 	LEFT JOIN  `programsch`  pt ON ( pt.id  = p.programsch_id ) 
			
		// 	WHERE 
		// 	$qrywhere
		// 	1=1 
		// 	$orderby
		// 	$limit

		// ";

		// echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadFlowchPromote( $where =array(), $orderby='', $limit='' ){
		$qrywhere='';
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= "  $table.$i  = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}

		$sql = "
			SELECT h.* , ht.program_name_th 
				
			FROM `programsch_detail_vdopromote`  h
			LEFT JOIN  `programsch_detail`  ht ON ( ht.id  = h.programsch_detail_id ) 
		
			WHERE 
			$qrywhere
			1=1 
			$orderby
			$limit

		";

		//echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadFlowchPerv( $where =array(), $orderby='', $limit='' ){
		$qrywhere='';
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= "  $table.$i  = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}

		$sql = "
			SELECT m.* , mt.program_name_th 
					
			FROM `programsch_detail_vdoperv`  m
			LEFT JOIN  `programsch_detail`  mt ON ( mt.id  = m.programsch_detail_id ) 
	
			WHERE 
			$qrywhere
			1=1 
			$orderby
			$limit

		";

		//echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}	

	public function LoadAdminById( $memberid ){

		if($memberid){
			// $sql = "
			// SELECT m.* , r.rolename 
			// FROM  members m 
			// LEFT JOIN role r ON (r.id  = m.role_id) 
	
			// WHERE 
			// m.id = '$memberid' 
		 

			// ";

			$sql = "
			SELECT o.*  
			FROM  officers o  
	
			WHERE 
			o.id = '$memberid' 
		 

			";

			//echo $sql;

			$myquery = $this->mysqli->query($sql);
			while($row = $myquery->fetch_assoc() ) {
				$result = $row;
				$result['display_name'] = $row['titlename'].$row['firstname'].' '.$row['lastname'] ;
			}
			$myquery->free();
		}else{
			$result ='';
		}
		return $result;

	}


	public function LoadLikeUserDetails( $where=array(), $wherelike=array(),  $orderby='', $limit=''){
		if(!empty($where)){
		  foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= " $i = '$item' AND ";
		  }
		}
		if(!empty($wherelike)){
		  foreach((array)$wherelike as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= " $i LIKE '%$item%' AND ";
		  }
		}
		if(!empty($orderby)){
		  $orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
		  $limit = "LIMIT $limit";
		}

		$sql="
			SELECT  u.user_detail_id , u.title , u.user_detail_name , u.status_del,
			u.last_name ,u.address_province , u.nickname ,u.temple , 
			u.mobile , u.school , u.school_province , u.receive_register ,
			u.approve_register , u.approve_monk ,u.user_status ,
			r.responsible_area_code , r.responsible_area_id, u.user_schoolcode   , p.*
			FROM  user_detail u
			LEFT JOIN province p ON (u.school_province = p.PROVINCE_ID)
			LEFT JOIN responsible_area r ON (p.responsible_area_id = r.responsible_area_id)

			WHERE
			$qrywhere
			1 = 1
			$orderby
			$limit
		";
		// 	$sql="
		// 		  SELECT *
		// 		  FROM `$table`
		// 		  WHERE
		// 			$qrywhere
		// 			1 = 1
		// 		  $orderby
		// 		  $limit
		// ";
		// echo "<br>".$sql;
		//$result['sql'] = $sql;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}
/*
	public function  LoadCount( $where =array(), $orderby='', $limit='' ){
		$qrywhere='';
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= "  $table.$i  = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}

		$sql = "
			SELECT answer, COUNT(answer) AS count
			FROM answer_surveymain
			GROUP BY answer
			
			UNION ALL
			
			SELECT 'SUM' answer, COUNT(answer)
			FROM answer_surveymain

		";

		// echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}*/

	public function LoadAdminDetail( $memberid ){
		if($memberid!=0){ 
			$result =$this->LoadAdminById($memberid);
		}else{
			$result['display_name'] = "-";
		}
		return $result['display_name'];

	}
	

	// public function  LoadProgramSchPrv( $where =array(), $orderby='', $limit='' ){
	// 		$qrywhere='';
	// 		if(!empty($where)){
	// 			foreach((array)$where as $i => $item){
	// 			  $item = mysqli_real_escape_string($this->mysqli,$item);
	// 			  $qrywhere .= "  $table.$i  = '$item' AND ";
	// 			}
	// 		  }
	// 		  if(!empty($orderby)){
	// 			$orderby = "ORDER BY $orderby";
	// 		  }
	// 		  if(!empty($limit)){
	// 			$limit = "LIMIT $limit";
	// 		  }

	// 		$sql = "
	// 		SELECT ppr.* , pd.* , p.*
				
	// 		FROM `programsch_detail_vdoprv`  ppr
	// 		LEFT JOIN  `programsch_detail`  pd ON ( pd.id  = ppr.programsch_detail_id ) 
	// 		LEFT JOIN  `programsch`  p ON ( p.id  = ppr.programsch_id) 
			
	// 		WHERE 
	// 		$qrywhere
	// 		 1=1 
	// 		 $orderby
	// 		 $limit


	// 		";

	// 		echo $sql ;

	// 		$myquery = $this->mysqli->query($sql);
	// 		while($row = $myquery->fetch_assoc() ) {
	// 			$result[] = $row;
	// 		}
	// 		$myquery->free();

	// 		return $result;

	// 	}




	////////////////////////-----earth-----/////////////////////////////////////

}


?>
