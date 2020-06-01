<?php 

session_start();

if( isset($_GET["managerid"]) && isset($_GET["password"]) )
{	
	$managerid = $_GET["managerid"];
	$password = $_GET["password"];
	$flag = 0;
	
	$file = "../../data/manager.txt";
    if(!file_exists($file))
    {
      echo "No Managers registered!";
    }
    else 
    {
      $managers = file($file);
      for($i=0; $i<count($managers); $i++) 
	  {
        $curManager = explode(", ",$managers[$i]);
        //echo "<tr><td>".$curManager[0]."</td>";
        //echo "<td>".$curManager[1]."</td></tr>";
		$curManager[1] = preg_replace("/\r|\n/", "", $curManager[1]);
	    if($managerid == $curManager[0])
		{		
			$flag = 1;
			if($password == $curManager[1])
			{
				//echo "Manager Validated!";
				$flag = 2;
			}
			
			else
			{
				echo "Wrong Password!";
			}
  
		}
      }
	  
	  if($flag == 0)
	  {
		  echo "Invalid Manager ID!";
	  }
	  
	  if($flag == 2)
	  {
		  echo "2";
		  $_SESSION['manager'] = $managerid; // Initializing Session variable

	  }
	}
}
?>
