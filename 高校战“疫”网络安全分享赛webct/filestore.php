<?php
error_reporting(0);
include "config.php";
//var_dump($_FILES["file"]);
$file = new File($_FILES["file"]);
$fileupload = new Fileupload($file);
$fileupload->deal();
echo "存储的图片:"."<br>";
$ls = new Listfile('./uploads/'.md5($_SERVER['REMOTE_ADDR']));
echo $ls->listdir()."<br>";
?>
