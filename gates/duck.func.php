<?php 
 
function DateNowBKK(){

	date_default_timezone_set("Asia/Bangkok");

	return date('Y-m-d H:i:s');

}

function Today(){
	date_default_timezone_set("Asia/Bangkok");
	return date('Y-m-d');
}
function DateNow(){
	//date_default_timezone_set("Asia/Bangkok");
	return date('Y-m-d H:i:s');
}
function Month($inp){
	switch($inp){
		case "01" : return "มกราคม"; break;
		case "02" : return "กุมภาพันธ์"; break;
		case "03" : return "มีนาคม"; break;
		case "04" : return "เมษายน"; break;
		case "05" : return "พฤษภาคม"; break;
		case "06" : return "มิถุนายน"; break;
		case "07" : return "กรกฎาคม"; break;
		case "08" : return "สิงหาคม"; break;
		case "09" : return "กันยายน"; break;
		case "10" : return "ตุลาคม"; break;
		case "11" : return "พฤศจิกายน"; break;
		case "12" : return "ธันวาคม"; break;
	}
}

function MonthMini($inp){
	switch($inp){
		case "01" : return "ม.ค."; break;
		case "02" : return "ก.พ."; break;
		case "03" : return "มี.ค."; break;
		case "04" : return "เม.ย."; break;
		case "05" : return "พ.ค."; break;
		case "06" : return "มิ.ย."; break;
		case "07" : return "ก.ค."; break;
		case "08" : return "ส.ค."; break;
		case "09" : return "ก.ย."; break;
		case "10" : return "ต.ค."; break;
		case "11" : return "พ.ย."; break;
		case "12" : return "ธ.ค."; break;
	}
}
function MonthEn($i){
  $m = array(
    '01' => 'January', 
    '02' => 'February', 
    '03' => 'March', 
    '04' => 'April', 
    '05' => 'May', 
    '06' => 'June', 
    '07' => 'July', 
    '08' => 'August', 
    '09' => 'September', 
    '10' => 'October', 
    '11' => 'November',
    '12' => 'December'
  );
  return $m[$i];
}
function MonthMiniEn($i){			
  $m = array(
    '01' => 'Jan', 
    '02' => 'Feb', 
    '03' => 'Mar', 
    '04' => 'Apr', 
    '05' => 'May', 
    '06' => 'Jun', 
    '07' => 'Jul', 
    '08' => 'Aug', 
    '09' => 'Sep', 
    '10' => 'Oct', 
    '11' => 'Nov',
    '12' => 'Dec'
  );
  return $m[$i];
}
function NowFormat(){
  date_default_timezone_set("Asia/Bangkok");
	$result = date('YmdHis');
  
  return $result;
}
function DateFormat($Date){
	/* :: DATE FORMAT '00/00/0000' :: */
	list($day, $month, $year) = explode("/", $Date);
	if(!empty($day)){
		return "$year-$month-$day";
	}
}
function DateTimeFormat($Date, $Time){
	/*==============================*\
		:: DATE FORMAT '00/00/0000' ::
		:: TIME FORMAT '00:00'      ::
	\*==============================*/
	list($day, $month, $year) = explode("/", $Date);
	if(!empty($day)){
		return "$year-$month-$day $Time:00";
	}
}
function DateTimeDisplay($Date, $Style=9){
	$day=substr($Date, 8, 2);
	$month=substr($Date, 5, 2);
	$year=substr($Date, 0, 4);
	$Hour=substr($Date, 11, 2);
	$Minute=substr($Date, 14, 2);
	$Second=substr($Date, 17, 2);
	if($year=="0000"){
		$result="";
	}else{
		$result=DateDisplay($Date, $Style)."  $Hour:$Minute";
	}
	return $result;
}
function DateDisplay($Date, $Style){
	$day=substr($Date, 8, 2);
	$month=substr($Date, 5, 2);
	$year=substr($Date, 0, 4);
	if($year=="0000"){
		$result="";
	}else{
		switch($Style){
			case 1 : /* 00/00/00 */
        if($_SESSION['LANG']=='th'){
          $year = $year-1957;
        }
				$year = ($year<10)?"0".$year:$year;
				$result = "$day/$month/$year";
				break;
			case 2 : /* 00-00-00 */
        if($_SESSION['LANG']=='th'){
          $year = $year-1957;
        }
				$year = ($year<10)?"0".$year:$year;
				$result = "$day-$month-$year";
				break;
			case 3 : /* 00/00/0000 */
        if($_SESSION['LANG']=='th'){
          $year+=543;
        }
				$result = "$day/$month/$year";
				break;
			case 4 : /* 00-00-0000 */
        if($_SESSION['LANG']=='th'){
          $year+=543;
        }
				$result = "$day-$month-$year";
				break;
			case 5 : /* 00 xx 00 */
        if($_SESSION['LANG']=='en'){
          $result = "$day ".MonthMiniEn($month)." $year";
        }else{
          $year = $year-1957;
          $result = "$day ".MonthMini($month)." $year";
        }
				break;
			case 6 : /* 00 xx 0000 */
        if($_SESSION['LANG']=='en'){
          $result = "$day ".MonthMiniEn($month)." $year";
        }else{
          $year+=543;
          $result = "$day ".MonthMini($month)." $year";
        }
				break;
			case 7 : /* 00 xxxxx 00 */
			$day = intval($day);
        if($_SESSION['LANG']=='en'){
          $result = "$day ".MonthEn($month)." $year";
        }else{
        //  $year = $year-1957;
		  $year+=543;
          $result = "$day ".Month($month)." $year";
        }
				break;
		case 8 : /* 00 xxxxx 0000 */
			if($_SESSION['LANG']=='en'){
			$result = "$day ".MonthEn($month)." $year";
			}else{
			$year+=543;
			$result = "$day ".Month($month)." $year";
			}
			break;
		case 81 : /* 00 xxxxx xxxx */
			if($_SESSION['LANGCODE']=='en'){
			  $result = "$day";
			}else{
			  $year+=543;
			  $result = "$day";
			}
			break;
		case 82 : /* xx 00 xx */
			if($_SESSION['LANGCODE']=='en'){
			  $result = MonthEn($month);
			}else{
			  $year+=543;
			  $result = Month($month);
			}
			break;
		case 83 : /* xx 00 xx */
			if($_SESSION['LANGCODE']=='en'){
			  $result = MonthMiniEn($month);
			}else{
			  $year+=543;
			  $result = MonthMini($month);
			}
			break;
		case 84 : /* xx xx 00 */
			if($_SESSION['LANGCODE']=='en'){
			  $result = substr($year,2,2);
			}else{
			  $year+=543;
			  $result = substr($year,2,2);
			}
			break;
		case 85 : /* xx xx 0000 */
				if($_SESSION['LANGCODE']=='en'){
				$result = $year;
				}else{
				$year+=543;
				$result = $year;
				}
			break;




		case 10 : /* 00 xxxxx 00 */
		//$day = date('j');
		$day = intval($day);
        if($_SESSION['LANG']=='en'){
          $result = "$day ".MonthEn($month)." $year";
        }else{
           $year+=543;
          $result = "$day ".Month($month)." $year";
        }
			
		}
			
			
		
	}					
	return $result;
}
function ConvertThaiDate($data_date){ 
	$thai_day_arr=array("อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์");  
	$thai_month_arr=array(  
		"0"=>"",  
		"1"=>"มกราคม",  
		"2"=>"กุมภาพันธ์",  
		"3"=>"มีนาคม",  
		"4"=>"เมษายน",  
		"5"=>"พฤษภาคม",  
		"6"=>"มิถุนายน",   
		"7"=>"กรกฎาคม",  
		"8"=>"สิงหาคม",  
		"9"=>"กันยายน",  
		"10"=>"ตุลาคม",  
		"11"=>"พฤศจิกายน",  
		"12"=>"ธันวาคม"                    
	);  
	 
	$eng_date=strtotime($data_date);  
	
	$result = $thai_day_arr[date("w",$eng_date)] ;
	
	return  $result ;
}
function ConvertDateToThai($data_date,$style,$lang=''){ 
	$year =  substr($data_date,0,4)  ;
	$month =  substr($data_date,5,7)  ;
	$day =  substr($data_date,8,11)  ;
	
	$month =  substr($month,0,2)  ;
	
	$month_cv = "";

	if($lang=="en"){
		
	}else{
		
		
		if($style=="mini"){
			 $year_cv = $year+543; 
			$year_cv =  substr($year_cv,2,4);
				
			switch ($month){
				case '01': $month_cv = "ม.ค." ; break;
				case '02': $month_cv = "ก.พ." ; break;
				case '03': $month_cv = "มี.ค." ; break;
				case '04': $month_cv = "เม.ย." ; break;
				case '05': $month_cv = "พ.ค." ; break;
				case '06': $month_cv = "มิ.ย." ; break;
				case '07': $month_cv = "ก.ค." ; break;
				case '08': $month_cv = "ส.ค." ; break;
				case '09': $month_cv = "ก.ย." ; break;
				case '10': $month_cv = "ต.ค." ; break;
				case '11': $month_cv = "พ.ย." ; break;
				case '12': $month_cv = "ธ.ค." ; break;
				default: break;
			}
			
			
		}else{
			
			$year_cv = $year+543; 
			switch ($month){
				case '01': $month_cv = "มกราคม" ; break;
				case '02': $month_cv = "กุมภาพันธ์" ; break;
				case '03': $month_cv = "มีนาคม" ; break;
				case '04': $month_cv = "เมษายน" ; break;
				case '05': $month_cv = "พฤษภาคม" ; break;
				case '06': $month_cv = "มิถุนายน" ; break;
				case '07': $month_cv = "กรกฎาคม" ; break;
				case '08': $month_cv = "สิงหาคม" ; break;
				case '09': $month_cv = "กันยายน" ; break;
				case '10': $month_cv = "ตุลาคม" ; break;
				case '11': $month_cv = "พฤศจิกายน" ; break;
				case '12': $month_cv = "ธันวาคม" ; break;
				default: break;
			}
		}
		
		$day_cv = $day;
		 
	}
	
	$date_cv = $day_cv.' '.$month_cv.' '.$year_cv; 
	
	return $date_cv;
}
function ContentDisplay($content){
  $url = URL;

  $content = str_replace('src="../../../', 'src="'.$url.'/', $content);
  $content = str_replace('src="../../', 'src="'.$url.'/', $content);
  $content = str_replace('src="../', 'src="'.$url.'/', $content);
  
  $content = str_replace('href="./../../', 'href="'.$url.'/', $content);
  $content = str_replace('href="../../', 'href="'.$url.'/', $content);
  $content = str_replace('href="../', 'href="'.$url.'/', $content);
  
  $content = str_replace('\"', '"', $content);
  $content = str_replace("\'", "'", $content);
  $content = str_replace("\n", "", $content);
  
  return $content;
}

function ContentFormat($content){
  //$url = URL; 
  $url = ""; 
  $content = str_replace('src="../../../', 'src="'.$url.'/', $content);
  $content = str_replace('src="../../', 'src="'.$url.'/', $content);
  $content = str_replace('src="../', 'src="'.$url.'/', $content);
  
  $content = str_replace('href="./../../', 'href="'.$url.'/', $content);
  $content = str_replace('href="../../', 'href="'.$url.'/', $content);
  $content = str_replace('href="../', 'href="'.$url.'/', $content);
  
  $content = str_replace('\"', '"', $content);
  $content = str_replace("\'", "'", $content);
  $content = str_replace("\n", "", $content);
  
  return $content;
}

function GetIP(){
	return get_client_ip();
}

function get_client_ip() {
  $ipaddress='';
  if($_SERVER['HTTP_CLIENT_IP'])
    $ipaddress=$_SERVER['HTTP_CLIENT_IP'];
  else if($_SERVER['HTTP_X_FORWARDED_FOR'])
    $ipaddress=$_SERVER['HTTP_X_FORWARDED_FOR'];
  else if($_SERVER['HTTP_X_FORWARDED'])
    $ipaddress=$_SERVER['HTTP_X_FORWARDED'];
  else if($_SERVER['HTTP_FORWARDED_FOR'])
    $ipaddress=$_SERVER['HTTP_FORWARDED_FOR'];
  else if($_SERVER['HTTP_FORWARDED'])
    $ipaddress=$_SERVER['HTTP_FORWARDED'];
  else if($_SERVER['REMOTE_ADDR'])
    $ipaddress=$_SERVER['REMOTE_ADDR'];
  else
    $ipaddress='UNKNOWN';
  return $ipaddress;
}

?>