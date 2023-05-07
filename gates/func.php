<?php
// header('Access-Control-Allow-Origin: *');
// header("Content-type: text/html; charset=utf-8");

//$_SESSION['LANGCODE']='th' ;

date_default_timezone_set("Asia/Bangkok");
$thaichar = array('ก','ข','ค','ง','จ','ฉ','ช','ซ','ฌ','ญ','ฐ','ฑ','ฒ'
                        ,'ณ','ด','ต','ถ','ท','ธ','น','บ','ป','ผ','ฝ','พ','ฟ','ภ','ม','ย','ร','ล'
                        ,'ว','ศ','ษ','ส','ห','ฬ','อ','ฮ');


$listday = array('MON'=>'วันจันทร์','TUE'=>'วันอังคาร','WED'=>'วันพุธ','THU'=>'วันพฤหัสบดี','FRI'=>'วันศุกร์','SAT'=>'วันเสาร์','SUN'=>'วันอาทิตย์') ;


function SetMenuLinktype($type){
	$txt ="";
	if($type==1){
		$txt ="ลิงก์ภายนอก";
	}else if($type==2){
		$txt ="ลิงก์ภายใน";
	}else if($type==3){
		$txt ="เมนูหลัก";
	}

	return $txt ;
}

function setDeptType($depttype){
	if($depttype==1){
		
		$typename="หน่วยงานส่วนกลาง" ;
	}else{
		$typename="หน่วยงานส่วนภูมิภาค" ;
	}

	return $typename ;
}

function setDisplay( $display ){
	if($display == "Y" ){
		$dv_display = '<span class="label  label-success" >  แสดง  </span>' ;
	}else{
		$dv_display = '<span class="label label-default" > ไม่แสดง </span>'  ;
	}
	return  $dv_display;
}
 
  
function setOfficerLevel( $roles_id ){
	if($roles_id == "1" ){
		$dv_display = '<span class="text-info" >  SuperAdmin </span>' ;
	}else if($roles_id == "2" ){
		$dv_display = '<span class="text-success" > Admin  </span>' ;
	}else if($roles_id == "3" ){
		$dv_display = '<span class="text-danger" > Board </span>' ;
	}else{
		$dv_display = '<span class="text-warning" >  ==  </span>'  ;
	}
	return  $dv_display;
}

function setRoles( $roles_id,$roles_name ){
	if($roles_id == "1" ){
		$dv_display = '<span class="label  label-info" > '.$roles_name.' </span>' ;
	}else if($roles_id == "2" ){
		$dv_display = '<span class="label  label-megna" >  '.$roles_name.'  </span>' ;
	}else if($roles_id == "3" ){
		$dv_display = '<span class="label  label-danger" >  '.$roles_name.'  </span>' ;
	}else{
		$dv_display = '<span class="label label-warning" > '.$roles_name.' </span>'  ;
	}
	return  $dv_display;
}

function setRolesXL( $roles_id,$roles_name ){
	if($roles_id == "1" ){
		$dv_display = '<span class="label  label-info" style="font-size: 14px;padding:6px 26px;"> '.$roles_name.' </span>' ;
	}else if($roles_id == "2" ){
		$dv_display = '<span class="label  label-megna" style="font-size: 14px;padding:6px 26px;">  '.$roles_name.'  </span>' ;
	}else if($roles_id == "3" ){
		$dv_display = '<span class="label  label-danger" style="font-size: 14px;padding:6px 26px;">  '.$roles_name.'  </span>' ;
	}else{
		$dv_display = '<span class="label label-warning" style="font-size: 14px;padding:6px 26px;"> '.$roles_name.' </span>'  ;
	}
	return  $dv_display;
}

/* ////////////////////////////   Function for Date Time //////////////////// */

function DateTimeDisplay($Date, $Style=2){

	$day=substr($Date, 8, 2);
	$month=substr($Date, 5, 2);
	$year=substr($Date, 0, 4);
	$Hour=substr($Date, 11, 2);
	$Minute=substr($Date, 14, 2);
	$Second=substr($Date, 17, 2);
	if($year=="0000"){
		$result="";
	}else{
		if( $_SESSION['LANGCODE'] =="th" ){
			$result=DateDisplay($Date, $Style)."   $Hour:$Minute น. ";
		}else{
			$result=DateDisplay($Date, $Style)."  $Hour:$Minute:$Second";
		}
		
	}
	return $result;
}

function DateOnlyDisplay($Date, $Style=8){

	$day=substr($Date, 8, 2);
	$month=substr($Date, 5, 2);
	$year=substr($Date, 0, 4);
	if($year=="0000"){
		$result="";
	}else{
		$result=DateDisplay($Date, $Style)."";
	}
	return $result;
}

function TimeOnlyDisplay($Date, $Style=2){

	$day=substr($Date, 8, 2);
	$month=substr($Date, 5, 2);
	$year=substr($Date, 0, 4);
	$Hour=substr($Date, 11, 2);
	$Minute=substr($Date, 14, 2);
	$Second=substr($Date, 17, 2);
	if($year=="0000"){
		$result="";
	}else{
			$result= "$Hour:$Minute:$Second";
	}
	return $result;
}

function Today(){

	date_default_timezone_set("Asia/Bangkok");

	return date('Y-m-d');

}

function GetTimeNow($type){
	if($type=="mini"){
		return date('H:i');
	}else{
		return date('H:i:s');
	}
	
}

function GetToday($type){
	date_default_timezone_set("Asia/Bangkok");

	if($type == 'Y'){
		return date('Y');
	}else if( $type =='m'){
		return date('m');
	}else if( $type =='d'){
		return date('d');
	}else {
		return date('Y-m-d H:i:s');
	}
}

function GetTodayTH($type){
	date_default_timezone_set("Asia/Bangkok");

	if($type == 'Y'){
		return date('Y')+543;
	}else if( $type =='m'){
		return date('m');
	}else if( $type =='d'){
		return date('d');
	}else {
		return date('Y-m-d H:i:s');
	}
}

function DateNowBKK(){

	date_default_timezone_set("Asia/Bangkok");

	return date('Y-m-d H:i:s');

}

function DateNow(){

	date_default_timezone_set("Asia/Bangkok");

	return date('Y-m-d H:i:s');

}

function DateNowS(){

	date_default_timezone_set("Asia/Bangkok");

	return date('YmdHis');

}

function DateDisplay($Date, $Style){
	$day=substr($Date, 8, 2);


		switch($day){
			case "01" : $day = '1' ;
				break;
			case "02" : $day = '2' ;
				break;
			case "03" : $day = '3' ;
				break;
			case "04" : $day = '4' ;
				break;
			case "05" : $day = '5' ;
				break;
			case "06" : $day = '6' ;
				break;
			case "07" : $day = '7' ;
				break;
			case "08" : $day = '8' ;
				break;
			case "09" : $day = '9' ;
				break;
			default: $day = $day ;
				break;
		}

	$month=substr($Date, 5, 2);
	$year=substr($Date, 0, 4);
	if($year=="0000"){
		$result="";
	}else{
		switch($Style){
			case 1 : /* 00/00/00 */
					if($_SESSION['LANGCODE']=='th'){
					  $year = $year-1957;
					}
					$year = ($year<10)?"0".$year:$year;
					$result = "$day/$month/$year";
				break;
			case 2 : /* 00-00-00 */
					if($_SESSION['LANGCODE']=='th'){
					  $year = $year-1957;
					}
					$year = ($year<10)?"0".$year:$year;
					$result = "$day-$month-$year";
				break;
			case 3 : /* 00/00/0000 */
					if($_SESSION['LANGCODE']=='th'){
					  $year+=543;
					}
					$result = "$day/$month/$year";
				break;
			case 4 : /* 00-00-0000 */
					if($_SESSION['LANGCODE']=='th'){
					  $year+=543;
					}
					$result = "$day-$month-$year";
				break;
			case 5 : /* 00 xx 00 */
					if($_SESSION['LANGCODE']=='en'){
					  $result = "$day ".MonthMiniEn($month)." $year";
					}else{
					  $year = $year-1957;
					  $result = "$day ".MonthMini($month)." $year";
					}
				break;
			case 6 : /* 00 xx 0000 */
					if($_SESSION['LANGCODE']=='en'){
					  $result = "$day ".MonthMiniEn($month)." $year";
					}else{
					  $year+=543;
					  $result = "$day ".MonthMini($month)." $year";
					}
				break;
			case 7 : /* 00 xxxxx 00 */
					$day = intval($day);
					if($_SESSION['LANGCODE']=='en'){
					  $result = "$day ".MonthEn($month)." $year ";
					}else{
					//  $year = $year-1957;
					  $year+=543;
					  $result = "$day ".Month($month)." $year ";
					}
				break;
			case 8 : /* 00 xxxxx 0000 */
					if($_SESSION['LANGCODE']=='en'){
					  $result = "$day ".MonthEn($month)." $year ";
					}else{
					  $year+=543;
					  $result = "$day ".Month($month)." $year ";
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
					if($_SESSION['LANGCODE']=='en'){
					  $result = "$day ".MonthEn($month)." $year ";
					}else{
					   $year+=543;
					  $result = "$day ".Month($month)." $year ";
					}
				break;
			case 11 : /* 00/xx/00 */
					if($_SESSION['LANGCODE']=='en'){
					  $result = "$day/".MonthMiniEn($month)."/$year";
					}else{
					  $year+=543;
					  $result = "$day/".MonthMini($month)."/$year";
					}
				break;
			case 12 : /* 00/xx/00 */
					
					if($_SESSION['LANGCODE']=='en'){
						$year = substr($year, 2, 4);
					  $result = "$day".MonthMiniEn($month)."$year";
					}else{
					  $year+=543;
					   $year = substr($year, 2, 4);
					  $result = "$day".MonthMini($month)."$year";
					}
				break;
		}
	}
	return $result;
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



function ConvertThaiDate($date , $style){
	// $style= mini , full
    $dateeng = strtotime($date) ;

    if( $style=="full") {
        $thai_day_arr = array("อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์");
        $thai_month_arr = array(
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
			
        $thai_date_return = "วัน".$thai_day_arr[date("w",$dateeng)];
		$thai_date_return .= "ที่ ".date("j",$dateeng);
		$thai_date_return .=" เดือน".$thai_month_arr[date("n",$dateeng)];
		$thai_date_return .= " พ.ศ.".(date("Y",$dateeng)+543);
	} else{
        $thai_day_arr = array("อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.");
	//   $thai_day_arr = array("อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์");
        $thai_month_arr = array(
						"0"=>"",
						"1"=>"ม.ค.",
						"2"=>"ก.พ.",
						"3"=>"มี.ค.",
						"4"=>"เม.ย.",
						"5"=>"พ.ค.",
						"6"=>"มิ.ย.",
						"7"=>"ก.ค.",
						"8"=>"ส.ค.",
						"9"=>"ก.ย.",
						"10"=>"ต.ค.",
						"11"=>"พ.ย.",
						"12"=>"ธ.ค."
					);
					
		if($style=="mini1"){
			$thai_date_return= $thai_day_arr[date("w",$dateeng)];
			$thai_date_return.= "".date("j",$dateeng);
			$thai_date_return.="/".$thai_month_arr[date("n",$dateeng)];
			
			$yearth  = (date("Y",$dateeng)+543);
			$thai_date_return.= "/".substr($yearth,-2);
			
			
		}if($style=="mini2"){
			$thai_date_return= $thai_day_arr[date("w",$dateeng)];
			$thai_date_return.= "".date("j",$dateeng);
			$thai_date_return.="/".$thai_month_arr[date("n",$dateeng)];
			
			$yearth  = (date("Y",$dateeng)+543);
			$thai_date_return.= "/".substr($yearth,-2); 
			
		}else{
			$thai_date_return= $thai_day_arr[date("w",$dateeng)];
			$thai_date_return.= " ".date("j",$dateeng);
			$thai_date_return.=" ".$thai_month_arr[date("n",$dateeng)];
			
			
			$yearth  = (date("Y",$dateeng)+543);
			$thai_date_return.= " ".substr($yearth,-2);
		}
		
	}
	// $thai_date_return.= " ".date("H:i",$dateeng)." น.";
	return $thai_date_return;
}

function TimeDisplay($time,$style,$lang){


	$Hour=substr($time, 0, 2);
	$Minute=substr($time, 3, 2);
	$Second=substr($time, 6, 2);
	
 
	if($style =="full" ){
		if($lang == "th"){
			$result= "$Hour $Minute นาที $Second วินาที";
		}else{
			$result= "$Hour:$Minute:$Second";
		}
		
	}else{
		
		if($lang == "th"){
			$result= "$Hour:$Minute น.";
		}else{
			$result= "$Hour:$Minute ";
		}
		
	}
	return $result;
}


/* ////////////////////////////   End Function for Date Time //////////////////// */

function  ContentDisplayEditor($content){
	$content = strip_tags(html_entity_decode($content));
	return $content;
}

function ContentDisplay($content){
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
 
function ContentFormat($content){
 // $url = URL;
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

function getGeoName($geocode){

	switch ($geocode){
		case 1 : $geoname = "ภาคเหนือ" ;break ;
		case 2 : $geoname = "ภาคกลาง" ;break ;
		case 3 : $geoname = "ภาคตะวันออกเฉียงเหนือ" ;break ;
		case 4 : $geoname = "ภาคตะวันตก" ;break ;
		case 5 : $geoname = "ภาคตะวันออก" ;break ;
		case 6 : $geoname = "ภาคใต้" ;break ;
		case 7 : $geoname = "กรุงเทพมหานคร" ;break ;

		default: $geoname ="" ; break;
	}
	return $geoname ;

}

function getGeoCode($geoname){

	switch ($geoname){
		case "north"	: $geocode = 1 ;break ;
		case "central" 	: $geocode = 2 ;break ;
		case "eastn" 	: $geocode = 3 ;break ;
		case "west" 	: $geocode = 4 ;break ;
		case "east" 	: $geocode = 5 ;break ;
		case "south" 	: $geocode = 6 ;break ;
		case "bkk" 		: $geocode = 7 ;break ;

		default: $geocode ="" ; break;
	}
	return $geocode ;

}
// ----------------------------------------------best----------------------------------------------
function GetHourCourse($starttime,$endtime) {

    $Hours=substr($starttime, 0, 2);
    $Houre=substr($endtime, 0, 2);
    $Mins=substr($starttime, 3, 2);
    $Mine=substr($endtime, 3, 2);


    $Hour = ($Houre - $Hours)*60;
    $Min = $Mine - $Mins;

    $coursewight = ($Hour + $Min)/10;
    $gridsubj = $coursewight.';';



  return $gridsubj;
}

function GetHourMobile($starttime,$endtime) {

    $Hours=substr($starttime, 0, 2);
    $Houre=substr($endtime, 0, 2);
    $Mins=substr($starttime, 3, 2);
    $Mine=substr($endtime, 3, 2);


    $Hour = ($Houre - $Hours)*60;
    $Min = $Mine - $Mins;

    $coursewight = ($Hour + $Min)/10;
    $gridsubj = $coursewight;



  return $gridsubj;
}


function GetYoutubeId($link,$height){
	/*
	$linkemb = preg_replace("/\s*[a-zA-Z\/\/:\.]*youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i","<iframe width=\"420\" height=\"315\" src=\"//www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>",$link);
	//$linkemb = '<div><iframe width="100%" height="'.$height.'" src="http://www.youtube.com/embed/'+matches[1]+'?feature=player_embedded&rel=0" frameborder="0" ></iframe></div>' ;
	return $linkemb ; */
 
	$ytarray=explode("/", $link); 
	$ytendstring=end($ytarray);
	//	$ytendarray=explode("?v=", $ytendstring);
	$ytendarray=explode("https://youtu.be/", $ytendstring);
	$ytendstring=end($ytendarray);
	$ytendarray=explode("&", $ytendstring);
	$ytcode=$ytendarray[0];
	//https://youtu.be/NiRSxtTzu1k
	//echo "<iframe width=\"420\" height=\"315\" src=\"http://www.youtube.com/embed/$ytcode\" frameborder=\"0\" allowfullscreen></iframe>";


	return $ytcode ;


}
?>
