<?php
// header('Access-Control-Allow-Origin: *');
// header("Content-type: text/html; charset=utf-8");

class ContentsClass extends DuckClass{
	////////////////////////////////////////////////////////////////////////////////////////////
	public function LoadSetCode($table, $where=array(), $orderby='', $limit=''){
		$qrywhere = '';
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= " $i = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}
			$sql="
					SELECT *
					FROM `$table`
					WHERE
					$qrywhere
					1 = 1
					$orderby
					$limit
		";
			// echo '------------------------------------------------------------'.$sql;
		//$result['sql'] = $sql;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[$row['langcode']] = $row;
		}
		$myquery->free();

		return $result;
	}
	//////////////////////////////////////////////////////////////
	public function LoadMenuExecutive(){
			$sql="
					SELECT *
					FROM boardtype_display


		";
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}

	public function LoadExecutive(){
		$sql="
				SELECT *
				FROM boardtype_display


		";
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}

	public function LoadExecutiveName(){
		$sql="
				SELECT *
				FROM board


		";
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}

	public function LoadExecutivePosition(){
		$sql="
				SELECT *
				FROM boardtype


		";
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}

	public function LoadExecutivePhone(){
		$sql="
				SELECT *
				FROM board


		";
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}

	public function LoadExecutiveAll($where = array(),$orderby='', $limit=''){
		$qrywhere="";
		if(!empty($where)){
			
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= " $i = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}
			$sql="	
					SELECT  b.* , bt.boardtype_name_th , bt.boardtype_name_en 
					FROM `board` b 
					LEFT JOIN `boardtype` bt ON bt.id = b.boardtype_id 
					WHERE 
					b.deleted = '0' 
					AND 
					$qrywhere 
					1=1  
					$orderby
					$limit
					;
		"; 
		//echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	} 
	
	public function LoadExecutiveContact($where = array(),$orderby='', $limit=''){
		$qrywhere="";
		if(!empty($where)){
			
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= " $i = '$item' AND ";
			}
		}
		if(!empty($orderby)){
			$orderby = "ORDER BY $orderby";
		}
		if(!empty($limit)){
			$limit = "LIMIT $limit";
		}
			$sql="	
					SELECT  b.* , bt.boardtype_name_th , bt.boardtype_name_en 
					FROM `board` b 
					LEFT JOIN `boardtype` bt ON bt.id = b.boardtype_id 
					WHERE 
					b.deleted = '0' 
					AND 
					$qrywhere 
					1=1  
					$orderby
					$limit
					;
		"; 
		//echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	} 


		///////////////////////////////////earth/////////////////////////////////////////
		public function Loadsurveymain(){
			$datenow = Date('Y-m-d');
			$sql = "
			SELECT sm.* , sq.qname , sq.answernum FROM surveymain sm
			LEFT JOIN survey_questions sq ON ( sm.id = sq.survey_id ) 
			WHERE '$datenow' BETWEEN sm.startsurvey AND sm.endsurvey AND sm.enable_w = 'Y' AND sm.deleted = 0
			" ;
			// echo $sql;
			$myquery = $this->mysqli->query($sql);
			while($row = $myquery->fetch_assoc() ) {
			 $result[] = $row;
			}
			$myquery->free();
		  
			return $result;
		}


		// public function Loadsurveymain(){
		// 	$datenow = Date('Y-m-d');
		// 	$sql = "
		// 	SELECT sm.* , sq.qname , sq.answernum FROM surveymain sm
		// 	LEFT JOIN survey_questions sq ON ( sm.id = sq.survey_id ) 
		// 	WHERE 
		// 	'$datenow' BETWEEN startsurvey AND endsurvey 
		// 	AND enable_w = 'Y' 
		// 	AND deleted = 0
		// 	" ;
		// 	// echo $sql;
		// 	$myquery = $this->mysqli->query($sql);
		// 	while($row = $myquery->fetch_assoc() ) {
		// 	 $result[] = $row;
		// 	}
		// 	$myquery->free();
		  
		// 	return $result;
		// }
	
		////////////////////////////////end earth//////////////////////////////////////////
		public function LoadSurveyMainById($id){
			$datenow = Date('Y-m-d');
			$sql = "
			SELECT sm.* , sq.qname , sq.answernum 
			FROM surveymain sm
			LEFT JOIN survey_questions sq ON ( sm.id = sq.survey_id ) 
			WHERE 
			 
			 enable_w = 'Y' 
			AND deleted = 0
			AND sm.id = '$id'
			" ;
			
			//echo $sql;
			$myquery = $this->mysqli->query($sql);
			while($row = $myquery->fetch_assoc() ) {
			 $result = $row;
			}
			$myquery->free();
		  
			return $result;
		}
	////////////////////////////////////////////////////////////

	public function LoadOfficeByDeptTypeId($deptid){
		if(isset($deptid)){

		 
				$sql="
						SELECT  d.* , dc.department_address_th , dc.department_address_en ,dc.department_tel_th ,dc.department_tel_en ,dc.department_fax_th ,dc.department_fax_en 
						FROM department d
						INNER JOIN department_contacts dc  ON d.id = dc.department_id
						WHERE 
						d.deleted = 0 
						AND d.enable = 'Y'
						AND dc.deleted = 0 
						AND dc.enable = 'Y'
						AND d.department_type ='$deptid'
						ORDER BY d.orderby DESC 
						;
			"; 
				
			
		} else{
			
			$sql="
			SELECT  d.* , dc.department_address_th , dc.department_address_en ,dc.department_tel_th ,dc.department_tel_en ,dc.department_fax_th ,dc.department_fax_en 
			FROM department d
			INNER JOIN department_contacts dc  ON d.id = dc.department_id
			WHERE 
			d.deleted = 0 
			AND d.enable = 'Y'
			AND dc.deleted = 0 
			AND dc.enable = 'Y' 
			ORDER BY d.orderby DESC 
			;
		"; 
		}
		//echo $deptid.$sql;
		$myquery = $this->mysqli->query($sql);
			while($row = $myquery->fetch_assoc() ) {
				$result[] = $row;
			}
			$myquery->free();
		return $result;
	}

	public function LoadOffice($where = array() ){
		if(!empty($where)){
			foreach((array)$where as $i => $item){
			$item = mysqli_real_escape_string($this->mysqli,$item);
			$qrywhere .= " `$i` = '$item' AND ";
			}
		}
			$sql="
					SELECT  d.* , dc.department_address_th , dc.department_address_en ,dc.department_tel_th ,dc.department_tel_en ,dc.department_fax_th ,dc.department_fax_en 
					FROM department d
					INNER JOIN department_contacts dc  ON d.id = dc.department_id
					WHERE 
					d.deleted = 0 
					AND d.enable = 'Y'
					AND dc.deleted = 0 
					AND dc.enable = 'Y'
					 AND 
					$qrywhere
					1=1 
					ORDER BY d.orderby DESC 
					;
		";
		//	 echo '------------------------------------------------------------'.$sql;
		//$result['sql'] = $sql;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}

	//////////////////////////////////////////////////////////////////////////////////////////// 

	public function LoadHomeNewsAuction($table, $where=array(), $orderby='', $limit=''){
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
			  $sql="
					SELECT $table.* , d.department_name_th ,  d.department_name_en  ,d.department_namemini_th ,  d.department_namemini_en , d.department_type, d.department_style, d.folderpath_name , d.department_dbname 
					FROM `$table`  
					LEFT JOIN `department` d ON ( d.department_code_ch = $table.office ) 
					WHERE
					  $qrywhere
					  1 = 1
					$orderby
					$limit
		  ";
		//  echo $sql ;
		//	  $result['sql'] =$sql;
	 
  
		  $myquery = $this->mysqli->query($sql);
		  while($row = $myquery->fetch_assoc() ) {
			  $result[] = $row;
		  }
		  $myquery->free();
  
		  return $result;
	}

	public function LoadHomeNewsList($table, $where=array(), $orderby='', $limit=''){
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
		  if($table == "news"){
			$sql="
			SELECT $table.* , d.department_name_th ,  d.department_name_en  ,d.department_namemini_th ,  d.department_namemini_en , d.department_type, d.department_style, d.folderpath_name , d.department_dbname 
			FROM `$table`  
			LEFT JOIN `department` d ON ( d.department_code_ch = $table.news_office ) 
			WHERE
			  $qrywhere 
				news.enable = 'Y' 
			  AND 
			  1 = 1
			$orderby
			$limit ";
		  }else{
			$sql="
			SELECT $table.* , d.department_name_th ,  d.department_name_en  ,d.department_namemini_th ,  d.department_namemini_en , d.department_type, d.department_style, d.folderpath_name , d.department_dbname 
			FROM `$table`  
			LEFT JOIN `department` d ON ( d.department_code_ch = $table.department_code_ch ) 
			WHERE
			  $qrywhere 
				aunctions.enable = 'Y' 
			  AND 
			  1 = 1
			$orderby
			$limit ";
		  }
			 
	 
		 // echo $sql ;
		 //	  $result['sql'] =$sql;
	 
  
		  $myquery = $this->mysqli->query($sql);
		  while($row = $myquery->fetch_assoc() ) {
			  $result[] = $row;
		  }
		  $myquery->free();
  
		  return $result;
	}


	//////////////////////////////////////////////////////////////////////////////////////////// 
	public function LoadAuctionsList($table, $where=array(), $orderby='', $limit=''){
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
			  $sql="
					SELECT $table.* , d.department_name_th ,  d.department_name_en  ,d.department_namemini_th ,  d.department_namemini_en , d.department_type, d.department_style, d.folderpath_name , d.department_dbname ,ac.auctions_category_th , ag.auctions_group_th
					FROM `$table`  
					LEFT JOIN `department` d ON ( d.department_code_ch = $table.department_code_ch ) 
					LEFT JOIN `auctions_category` ac ON ( ac.auctions_category_code = $table.auctions_category_code ) 
					LEFT JOIN `auctions_group` ag ON ( ag.auctions_group_code = $table.auctions_group_code ) 
					WHERE
					  $qrywhere 
					  1 = 1
					$orderby
					$limit
		  ";
		//  echo $sql ;
	 	//  $result['sql'] =$sql;
	 
  
		  $myquery = $this->mysqli->query($sql);
		  while($row = $myquery->fetch_assoc() ) {
			  $result[] = $row;
		  }
		  $myquery->free();
  
		  return $result;
	}	

	//////////////////////////////////////////////////////////////////////////////////////////// 
	public function LoadAuctionsCategoryByType(  $typecode ){
	
			$sql="
					SELECT ac.*   
					FROM    `auctions_category` ac
					LEFT JOIN  auctions_typecate    atc   ON ( ac.id =  atc.auctions_category_id )  
					LEFT JOIN  auctions_type    at   ON ( at.id =  atc.auctions_type_id )  
					
					WHERE
					
					
					atc.auctions_type_id
					AND  at.auctions_type_code = '$typecode'
					AND ac.deleted = 0 
					AND ac.enable = 'Y'  
					ORDER BY  CONVERT (   auctions_category_th  USING tis620 ) ASC 
				
		";
		//  echo $sql ;
		//  $result['sql'] =$sql;
	

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
	}

	public function LoadContactFromDepartCode($deptcode){
		$sql = "
		SELECT 

		d.id as did ,  d.department_name_th  , dc.*  
		
		FROM `department`  d  
		
		LEFT JOIN  department_contacts  dc ON   d.`id`  = dc.department_id
		
		WHERE d.department_code_ch  = '$deptcode'
		";

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result = $row;
		}
		$myquery->free();

		return $result;

	}


	////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////

	public function InsertDaily($deptcode){
		$sql = "
		INSERT INTO daily (daily_date,daily_num,department_code_ch) 
			SELECT '".date('Y-m-d',strtotime("-1 day"))."' ,COUNT(*) AS intYesterday , '$deptcode'  
		FROM  counter WHERE 1 AND counter_date = '".date('Y-m-d',strtotime("-1 day"))."' 
		

		";  

		$myquery = $this->mysqli->query($sql);
		if($myquery){
			$result['success'] = 'COMPLETE';
		
		}else{
			$result['success'] = 'FAIL';
			$result['sql'] = $sql;
			$this->error[] = 'QUERY ERROR';
		}

		return $result;

	}

	public function DeleteCounter( $deptcode , $counterdate ){
		if(!empty( $deptcode)  || !empty( $counterdate) ){
			
			$sql="
			  DELETE FROM
				counter
			  WHERE
			  department_code_ch = '$deptcode' 

			  AND 
			  counter_date != '$counterdate'
			";
			//$result['sql'] = $sql;

		   $myquery = $this->mysqli->query($sql);
			if($myquery){
			  $result['success'] = 'COMPLETE';
			}else{
			  $result['success'] = 'FAIL';
			}

	  }else{
		  $result['success'] = 'FAIL';

	  }

	  return $result;
	}


	////////////////////////////////////////////////////////////////////////////////////////////
	
	

	public function  LoadLiveShow( $where =array(), $orderby='', $limit='' ){
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
			SELECT b.* , bt.live_type_title_th , bts.live_typesub_title_th
			
			FROM `broadcastlive`  b
			LEFT JOIN  `broadcastlive_type`  bt ON ( bt.id  = b.live_type_id ) 
			LEFT JOIN  `broadcastlive_type_sub`  bts ON ( bts.id  = b.live_type_sub_id ) 
			  
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

	public function  LoadNewsShow( $where =array(), $orderby='', $limit='' ){
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
			SELECT n.* , nt.news_type_title_th , nts.news_typesub_title_th
			
			FROM `news`  n
			LEFT JOIN  `news_type`  nt ON ( nt.id  = n.news_type_id ) 
			LEFT JOIN  `news_type_sub`  nts ON ( nts.id  = n.news_type_sub_id ) 
			  
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

	public function  LoadNewsShow3( $where =array(), $orderby='', $limit='' ,$createdate_s,$createdate_e,$news_title_th){

		// $datetime3 = Date('Y-m-d H:i:s',strtotime("-3 days"));
		//echo date("Y-m-d",strtotime("-5 days"));
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

		  if($createdate_s || $createdate_s){
			$newsdate = "n.public_date BETWEEN '$createdate_s' AND '$createdate_e' AND";
		  }else if($news_title_th){
			$newsdate = " n.news_title_th LIKE '%$news_title_th%'  OR  n.tagsearch LIKE '%$news_title_th%' AND";
		  } 

	 

		   

		$sql = "
			SELECT n.* , nt.news_type_title_th , nts.news_typesub_title_th
			
			FROM `news`  n
			LEFT JOIN  `news_type`  nt ON ( nt.id  = n.news_type_id ) 
			LEFT JOIN  `news_type_sub`  nts ON ( nts.id  = n.news_type_sub_id ) 
			  
			WHERE 
			$qrywhere 
			$newsdate
			 1=1 
 			 $orderby
			 $limit

		";
//  AND n.create_date >= '$datetime3' 
		// echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadNewsShow3Else( $where =array(), $orderby='', $limit=''){

		$datetime3 = Date('Y-m-d H:i:s',strtotime("-3 days"));
		//echo date("Y-m-d",strtotime("-5 days"));
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
			SELECT n.* , nt.news_type_title_th , nts.news_typesub_title_th
			
			FROM `news`  n
			LEFT JOIN  `news_type`  nt ON ( nt.id  = n.news_type_id ) 
			LEFT JOIN  `news_type_sub`  nts ON ( nts.id  = n.news_type_sub_id ) 
			  
			WHERE 
			$qrywhere 
 			 1=1 
			 AND n.create_date >= '$datetime3' 
			 $orderby
			 $limit

		";
//  AND n.create_date >= '$datetime3' 
		// echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadNewsAll( $where =array(), $orderby='', $limit='' ){
		$qrywhere='';
		$datelist = date('Y-m-d');
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
		SELECT * FROM news 
		LEFT JOIN news_image 
		ON news.id = news_image.news_id 
		WHERE 
		news.news_type_id ='1' 
		AND news.deleted='0' 
		AND news_image.display_cover='Y'
		AND news.public_date <= '$datelist'
		ORDER BY news.create_date DESC

		";

		//echo $sql ;
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadNewsAll2( $where =array(), $orderby='', $limit='' ){
		$qrywhere='';
		$datelist = date('Y-m-d');
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
			SELECT n.* , 
			( SELECT news_img_picname FROM news_image WHERE display_cover = 'Y' AND news_id =  n.id AND deleted=0 and enable='Y'   LIMIT 0,1 )   as news_img_picname 
			 , ni.news_id 
			FROM news  n
			LEFT JOIN  news_image  ni ON ( ni.news_id  = n.id )
			WHERE 
			$qrywhere
			n.public_date <= '$datelist'
			AND 
			 1=1 
			 GROUP BY  n.id 
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
	


	public function  LoadNewsImgGal( $where =array(), $orderby='', $limit='' ){
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
		SELECT n.id,n.news_type_id,news_type_sub_id ,ni.id, ni.news_id, ni.news_img_picname
		FROM news  n
		LEFT JOIN  news_image  ni ON ( ni.news_id  = n.id )
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



	public function  LoadNewsCover( $where =array(), $orderby='', $limit='' ){
		$table = "n";
		$datelist = date('Y-m-d H:i:s');
		
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
		 
			 SELECT n.* , n.id as news_id , 
			 ( SELECT news_img_picname FROM news_image WHERE display_cover = 'Y' AND news_id =  n.id AND deleted=0 and enable='Y'   LIMIT 0,1 )   as news_img_picname 
			 FROM news  n
			 
			 WHERE 
			 $qrywhere
			  
			 n.public_date <= '$datelist'
			 AND  1=1 
			 $orderby
			 $limit
		 

		";
		//$result['sql'] = $sql;
		  	/*
		$sql = "
			SELECT n.* , ( SELECT news_img_picname FROM news_image ) ni.news_img_picname, ni.news_id
			FROM news  n
			LEFT JOIN  news_image  ni ON ( ni.news_id  = n.id )
			WHERE 
			$qrywhere
			ni.display_cover = 'Y' 
			AND
			 1=1 
			 $orderby
			 $limit

		"; */

 	  //	echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}
	 
	public function  LoadProgramSchPrv( $where =array(), $orderby='', $limit='' ){
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
		SELECT ppr.* , pd.* , p.*
		FROM `programsch_detail_vdoperv`  ppr
		LEFT JOIN  `programsch_detail`  pd ON ( pd.id  = ppr.programsch_detail_id ) 
		LEFT JOIN  `programsch`  p ON ( p.id  = pd.programsch_id) 
		
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
  
	public function  LoadProgramSchProgPrev( $where =array(), $orderby='', $limit='' ){

		$datelist = date('Y-m-d');
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
		SELECT pp.* , pimg.picname 
		FROM `progprev`  pp
		LEFT JOIN  `progprev_image`  pimg ON ( pimg.progprev_id  = pp.id )  
		AND pimg.display_cover = 'Y' 
		
		WHERE 
		$qrywhere 
		 
		1=1  AND  
		pp.public_date <= '$datelist'

		GROUP BY pp.id 
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

	public function  LoadPro( $where =array(), $orderby='', $limit='' ){
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
		SELECT p.* , pd.*
		FROM `programsch`  p
		LEFT JOIN  `programsch_detail`  pd ON ( pd.programsch_id  = p.id )
		WHERE 
		$qrywhere
		1=1 
		$orderby
		$limit
		";
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}
	
	public function  LoadChart( $where =array(), $orderby='', $limit='' ){
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
		SELECT p.* , pd.*
		FROM `programsch`  p
		LEFT JOIN  `programsch_detail_plan`  pd ON ( pd.programsch_id = p.id )
		WHERE 
		$qrywhere
		1=1 
		$orderby
		$limit
		";
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;
		// SELECT pd.* , p.*
		// FROM `programsch_detail_plan`  pd
		// LEFT JOIN  `programsch`  p ON ( p.id  = pd.programsch_id )

	}

	public function  LoadProgramSchPrv2( $where =array(), $orderby='', $limit='' ){
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
		SELECT p.* , pd.* , pg.*
		FROM `programsch_detail_vdoperv` p
		LEFT JOIN  `programsch_detail`  pd ON ( pd.id  = p.programsch_detail_id ) 
		LEFT JOIN  `programsch`  pg ON ( pg.id  = pd.programsch_id)
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

	public function  LoadProgramPlan( $programtype_id ){
		$querywhere = '';
			if(!empty($programtype_id)){
				$querywhere = " AND pp.programtype_id = '$programtype_id' " ;
			}
		
			/* 
				SELECT pg.* , pt.id,title_th,cover_file, pl.pdf_file
			
			FROM `programschplan_detail`  pg
			LEFT JOIN  `programsch`  pt ON ( pt.id  = pg.programsch_id ) 
			LEFT JOIN  `programschplan`  pl ON ( pl.id  = pg.programschplan_id ) 


			WHERE 
			pt.programtype_id = '$programtype_id'	
			AND	
			pg.enable ='Y'
			AND
			pg.`deleted` ='0'

			ORDER BY pg.starttime
		
			*/
		$sql = "

			SELECT pg.id as ppdetail_id , pg.programdate,  pg.starttime,     pt.id, pt.title_th,cover_file, pl.pdf_file   

			FROM `programschplan_detail` pg 
			LEFT JOIN `programsch` pt ON ( pt.id = pg.programsch_id ) 
			LEFT JOIN `programschplan` pl ON ( pl.id = pg.programschplan_id ) 
			WHERE 
			pt.programtype_id = '$programtype_id' AND	
			pl.enable ='Y' AND 
			pl.deleted ='0' AND 
			pg.enable ='Y' AND 
			pg.`deleted` ='0' 
			ORDER BY pg.starttime
		
			";

		//  echo $sql;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadProgramPlanByID( $planid ){
	 
		$sql = "

			SELECT pg.id as ppdetail_id , pg.program_name_th , pg.programdate,  pg.starttime,pt.id, pt.title_th  ,pt.cover_file   ,pg.vdo_promote  

			FROM `programschplan_detail` pg 
			LEFT JOIN `programsch` pt ON ( pt.id = pg.programsch_id )
			WHERE 
			pg.programschplan_id = '$planid' AND 
			pg.enable ='Y' AND 
			pg.deleted ='0' 
			ORDER BY pg.starttime
		
			";

		//   echo $sql;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadPlanByType($typeid,$datetoday ){
	 
		$sql = "

			SELECT * FROM `programschplan` WHERE `enable` ='Y' AND deleted = '0'  AND programschplan_type_id = '$typeid' AND '$datetoday' BETWEEN (startdate) AND (enddate) LIMIT 0,1 
		
			";

		/// echo $sql;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result = $row;
		}
		$myquery->free();

		return $result;

	}
	

	

	////////////////////////////////////////////////////////////////////////////////////////////
	
	public function  LoadMenuWeb(){
	 
		 
		$sql =  "
			SELECT id, menumain_name_th, menumain_otherlink ,menumain_linktype
			FROM menumain 
			WHERE menumain_level = 1 AND menumain_id = 0
			 ORDER BY orderby DESC
		";

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function  LoadMenuSubWeb($menuid){ 
		$sql =  "
			SELECT menumain_name_th, menumain_otherlink , menumain_linktype
			FROM menumain 
			WHERE 
			menumain_level = 2 AND 
			menumain_id = $menuid AND 
			enable = 'Y' 
			ORDER BY orderby DESC
		";

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function LoadIntroPage(){
		$actdate = date('Y-m-d');
		$sql = "
			SELECT * 
			FROM intropage 
			WHERE 
			'$actdate' BETWEEN  startdate 
			AND enddate  
			AND enable_w = 'Y' 
			AND active = 'Y' 
			AND deleted = '0'
		";
		// echo $sql;
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result = $row;
		}
		$myquery->free();

		return $result;

	}
	
	public function LoadIntroPage_PW(){
		$actdate = date('Y-m-d');
		$sql = "
			SELECT * 
			FROM intropage 
		";
		// echo $sql;
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result = $row;
		}
		$myquery->free();

		return $result;

	}
	
	public function LoadNewsHeader( $where =array(), $orderby='', $limit='' ){
		$table = "n";
		$today = date('Y-m-d h:m:s');
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
			SELECT n.* , ni.news_img_picname, ni.news_id
			FROM news  n
			LEFT JOIN  news_image  ni ON ( ni.news_id  = n.id )
			WHERE 
			$qrywhere
			ni.display_header = 'Y' 
			AND ni.deleted = '0'
			AND ni.enable = 'Y' 
			AND
		  
			 1=1 
			 $orderby
			 $limit

		";
		//	'$today' BETWEEN n.startdisp_date  AND n.enddisp_date  
		//	AND 

		// echo $sql ;

		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();

		return $result;

	}

	public function LoadSearchNews( $datatype_type , $datatype_typesub,$keyword ){
		$qwhere = "" ;

		if($datatype_type ){
			$where['news_type_id'] = $datatype_type ;
			$qwhere .= "AND news_type_id  = '$datatype_type' " ; 
		}
		if($datatype_typesub ){ 
			$qwhere .= "AND news_type_sub_id  = '$datatype_typesub' " ; 
		}
		if( $keyword ){
			$where['keyword'] = $keyword;
			$qwhere .= "AND ( ( news_title_th LIKE '%$keyword%' ) OR (tagsearch  LIKE '%$keyword%' ) )" ; 
		}

		$sql = "
			SELECT n.id, n.news_title_th , n.news_type_id , n.news_type_sub_id ,  n.public_date , 
 
			(  SELECT  news_img_picname FROM news_image  WHERE  display_cover ='Y' AND enable='Y' AND deleted = '0' AND news_id =n.id   ORDER BY orderby DESC  LIMIT 0,1 ) AS news_img_picname 

			FROM news  n
		
			WHERE 1=1 
				$qwhere 
			AND n.enable_w ='Y'  
			AND n.deleted = 0  
			GROUP BY  n.id
		";
		//	LEFT JOIN news_image ni ON ( ni.id = n.news_id )
	 	//echo $sql;
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();
		return $result;

	}

	public function LoadSearchProgPrev( $datatype_type , $datatype_typesub,$keyword ){
		$qwhere = "" ;
		
		if($datatype_type ){ 
			$qwhere .= "AND progprev_type_id  = '$datatype_type' " ; 
		}
		if($datatype_typesub ){ 
			$qwhere .= "AND progprev_type_sub_id  = '$datatype_typesub' " ; 
		}
		if( $keyword ){ 
			$qwhere .= "AND ( ( progprev_title_th LIKE '%$keyword%' ) OR ( list_name LIKE '%$keyword%' ) OR  ( prolist_name LIKE '%$keyword%' ) OR  (tagsearch  LIKE '%$keyword%' ) )" ; 
		}

		$sql = "
			SELECT p.id, p.progprev_title_th ,  p.programtype_id ,  p.programsch_id , p.progprev_type_id ,  p.progprev_type_sub_id , p.progprev_intro_th ,  p.list_name ,  p.prolist_name ,  p.tagsearch , public_date ,
 
			(  SELECT  picname FROM progprev_image  WHERE  display_cover ='Y' AND enable='Y' AND deleted = '0' AND progprev_id = p.id   ORDER BY orderby DESC  LIMIT 0,1 ) AS picname 

			FROM progprev  p
		
			WHERE 1=1 
				$qwhere 
			AND p.enable_w ='Y'  
			AND p.deleted = 0  

			GROUP BY  p.id
		";
		//	LEFT JOIN news_image ni ON ( ni.id = n.news_id )
	  	//echo $sql;
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();
		return $result;

	}

	public function LoadSearchProgRec( $datatype_type , $datatype_typesub,$keyword ){
		$qwhere = "" ;
		
		if($datatype_type ){ 
			$qwhere .= "AND progrec_type_id  = '$datatype_type' " ; 
		}
		if($datatype_typesub ){ 
			$qwhere .= "AND progrec_type_sub_id  = '$datatype_typesub' " ; 
		}
		if( $keyword ){ 
			$qwhere .= "AND ( ( progrec_title_th LIKE '%$keyword%' ) OR  ( progrec_content_th LIKE '%$keyword%' ) OR  (tagsearch  LIKE '%$keyword%' ) )" ; 
		}

		$sql = "
			SELECT p.id, p.progrec_title_th ,  p.programtype_id ,  p.programsch_id , p.progrec_type_id ,  p.progrec_type_sub_id , p.progrec_content_th , p.tagsearch ,  p.pic_cover , p.vdo_link , p.linkprov 

			FROM progrec  p
		
			WHERE 1=1 
				$qwhere 
			AND p.enable_w ='Y'  
			AND p.deleted = 0  

			GROUP BY  p.id
		";
		//	LEFT JOIN news_image ni ON ( ni.id = n.news_id )
	  	//	 echo $sql;
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();
		return $result;

	}
	
	public function LoadSearchProgPlan( $datatype_type , $datatype_typesub,$keyword ){
		$qwhere = "" ;
		
		if($datatype_type ){ 
			$qwhere .= "AND programschplan_type_id  = '$datatype_type' " ; 
		}
		if($datatype_typesub ){ 
			$qwhere .= "AND programschplan_id  = '$datatype_typesub' " ; 
		}
		 
		if( $keyword ){ 
			$qwhere .= "AND ( ( program_name_th LIKE '%$keyword%' ) OR  ( detail_th LIKE '%$keyword%' ) OR  (tagsearch  LIKE '%$keyword%' ) )" ; 
		}

		$sql = "
			SELECT p.id, p.program_name_th ,  p.programtype_id ,  p.programsch_id , p.detail_th ,  p.progrec_type_sub_id , p.progrec_content_th , p.tagsearch ,  p.pic_cover  

			FROM progrec  p
		
			WHERE 1=1 
				$qwhere 
			AND p.enable_w ='Y'  
			AND p.deleted = 0  

			GROUP BY  p.id
		";
		//	LEFT JOIN news_image ni ON ( ni.id = n.news_id )
	  	//	 echo $sql;
		$myquery = $this->mysqli->query($sql);
		while($row = $myquery->fetch_assoc() ) {
			$result[] = $row;
		}
		$myquery->free();
		return $result;

	}


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////   ///////////////  MILE 
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


	
	
	
}
?>
