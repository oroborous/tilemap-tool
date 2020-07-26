<?php

/* Getting file name */
$filename = $_FILES['file']['name'];

/* Rename file */
$temp = explode(".", $filename);
$newfilename = round(microtime(true)) . '.' . end($temp);

/* Location */
$location = "uploads/" . $newfilename;

$uploadOk = 1;
$imageFileType = pathinfo($location,PATHINFO_EXTENSION);


/* Valid Extensions */
$valid_extensions = array("jpg","jpeg","png");
/* Check file extension */
if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
   $uploadOk = 0;
}

if($uploadOk == 0){
   echo 0;
}else{
   if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
      echo $location;
   }else{
      echo "Filename: " . $location;
      echo 0;
   }
}