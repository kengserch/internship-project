<?php

/*
//$url_root = $_SERVER['DOCUMENT_ROOT'] ;
//$url_root = "localhost:8050" ;
$path_upload =  "../uploads/summernote/";
//echo $_SERVER['DOCUMENT_ROOT'];

try{
     
    if($_FILES['file']['error'] != 0 )                                         
        throw new Exception('Upload Error');
    
    if(!valid_extension($_FILES['file']))                                        
        throw new Exception('Invalid File');
        
    if(!getimagesize($_FILES['file']['tmp_name']))                               
        throw new Exception('Not Image File');    
    
    $allow_size_image = 8;    
    if(!(valid_size($_FILES['file'],$allow_size_image)))                               
        throw new Exception('File too big');
    
    if(!file_exists($path_upload)){
		if(!mkdir($path_upload.'',0776))
			throw new Exception('Create folder failed');
	} 
    
	$path_info = pathinfo($_FILES['file']['name']);	
	//$hash_name	= MD5( time().rand().$_FILES['file']['name']);
	$hash_name	= MD5( time().$_FILES['file']['name']);
    $save_path 		= $path_upload.$hash_name.'.'.$path_info['extension'];
	
    while(file_exists($save_path))
    {
        $path_info 			= pathinfo($_FILES['file']['name']);
		//$hash_name		= MD5( time().rand().$_FILES['file']['name']);
		$hash_name			= MD5( time().$_FILES['file']['name']);
        $save_path 			=  $path_upload.$hash_name.'.'.$path_info['extension']; 
    } 
    
	// Desktop Resize Image
    if(!imagejpeg(resize_image($_FILES['file']["tmp_name"],1440,1440),$save_path))
	{
		throw new Exception('Save desktop resized file error');
	}
	
    echo json_encode($save_path);
    
} catch (Exception $ex) {
    echo $ex->getMessage();
    // echo "File upload failed";
}
function valid_extension($file)
{
    $image_type = array("image/jpeg","image/jpg","image/png");
    $extension_type = array( 'jpg','jpeg','JPG','JPEG','png','PNG');
    $path_extension = pathinfo($file['name'],PATHINFO_EXTENSION);
    
    return (in_array($file['type'],$image_type) && in_array($path_extension,$extension_type)) ? true : false;
}

function valid_size($file,$size)
{
    return $file['size'] <= $size*1024*1024 ? true : false;
}

function resize_image ($source_file,$accept_width,$accept_height,$memory_limit_set = '1024M')
{
	ini_set('memory_limit',$memory_limit_set);
		
	$imagetype						= pathinfo($source_file);
	list($img_w, $img_h) 			= getimagesize($source_file);
	$source 						= imagecreatefromjpeg($source_file);	
	$multiple						= 1;

	if($img_w > $accept_width || $img_h > $accept_height )
	{
		if($img_w > $img_h)
		{
			$multiple = $img_w / $accept_width;
		}
		else
		{
			$multiple = $img_h / $accept_height;
		}
	}
	
	$new_image_w					= $img_w / $multiple;
	$new_image_h					= $img_h / $multiple;
	
	$thumb 							= imagecreatetruecolor($new_image_w, $new_image_h);
	$source 						= imagecreatefromjpeg($source_file);	
	
	// Resize
	imagecopyresized($thumb, $source, 0, 0, 0, 0, $new_image_w, $new_image_h, $img_w, $img_h);
	
	return $thumb;
	print_r($thumb);
}
*/

?>
<?php

$return_value = "";
$path_upload =  "../uploads/summernote/";

if ($_FILES['image']['name']) {
	if (!$_FILES['image']['error']) {
		$name = md5(rand(100, 200));
		$ext = explode('.', $_FILES['image']['name']);
		$filename = $name . '.' . $ext[1];
		$destination = $path_upload . $filename;
		$location = $_FILES["image"]["tmp_name"];
		move_uploaded_file($location, $destination);
		$return_value = $path_upload  . $filename;
	}else{
		$return_value = 'Ooops! Your upload triggered the following error: '.$_FILES['image']['error'];
	}
}

echo $return_value;
?>