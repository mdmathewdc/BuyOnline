<?php

if(isset($_GET["email"]))
{
	$email = $_GET["email"];
	$xmlfile = "../../data/customer.xml";
	
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
				echo("1");		//E-mail ID already in use
			}
  
		} 
	}
	
	else
	{
		echo("0");			//Customer.xml does not exist!
		//echo("Customer.xml does not exist!");
	}
}

	





?>