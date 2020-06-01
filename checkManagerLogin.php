<?php
session_start();

if(isset($_SESSION['manager']))
{
	echo $_SESSION['manager'];	
}

else
{
	echo "NOTLOGGEDIN";
}
	
?>