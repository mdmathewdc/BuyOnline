<?php 

session_start();

if( isset($_GET["emailid"]) && isset($_GET["password"]) )
{
	$email = $_GET["emailid"];
	$password = $_GET["password"];
	$xmlfile = "../../data/customer.xml";
	$flag = 0;
	
	if (file_exists($xmlfile))
	{
		$dom = DOMDocument::load("../../data/customer.xml");
		$customer = $dom->getElementsByTagName("customer"); 

		foreach($customer as $node) 
		{ 	
			$xmlEmail = $node->getElementsByTagName("email");
			$xmlEmail = $xmlEmail->item(0)->nodeValue;
			
			if($xmlEmail == $email)
			{
				$xmlPassword = $node->getElementsByTagName("password");
				$xmlPassword = $xmlPassword->item(0)->nodeValue;
				
				if($xmlPassword == $password)
				{
					//echo("Customer Validated!");
					$xmlCustomerName = $node->getElementsByTagName("firstname")->item(0)->nodeValue;
					$xmlCustomerID = $node->getElementsByTagName("customerid");
				    $xmlCustomerID = $xmlCustomerID->item(0)->nodeValue;
					$_SESSION['customer'] = $xmlCustomerID; 			//Setting session variable to Customer ID
					$_SESSION['customername'] = $xmlCustomerName;
					$flag = 1;
				}
				
				else
				{
					//echo("Wrong Password!");
					$flag = 2;
				}
				
			}
  
		} 
	
		echo $flag;		
		
	}
	
	else
	{
		echo "No customers registered!";
	}
	
}
?>
