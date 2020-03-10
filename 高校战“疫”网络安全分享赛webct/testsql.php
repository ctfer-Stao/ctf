<?php
error_reporting(0);
include "config.php";
$ip = $_POST['ip'];
$user = $_POST['user'];
$password = $_POST['password'];
$option = $_POST['option'];
$m = new db($ip,$user,$password,$option);
$m->testquery();