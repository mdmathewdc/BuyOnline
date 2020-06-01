<?php

session_start();
unset($_SESSION["cart"]);
$customerid = $_SESSION["customer"];
$customername = $_SESSION["customername"];
unset($_SESSION["customer"]);  
unset($_SESSION["customername"]);  

header("Location: logout.htm?customerid=$customerid&customername=$customername&manager=null");


?>