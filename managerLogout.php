<?php

session_start();
$manager = $_SESSION['manager'];
unset($_SESSION['manager']);  

header("Location: logout.htm?customerid=null&customername=null&manager=$manager");


?>