<?php

header('Content-Type: text/xml');

if(isset($_GET["firstname"]) && isset($_GET["email"]) && isset($_GET["password"]) ){
	
	$customerid = uniqid();
	$email = $_GET["email"];
	$firstname = $_GET["firstname"];
	$lastname = $_GET["lastname"];
	$password = $_GET["password"];
	$phonenumber = $_GET["phonenumber"];
	//$phonenumber = $_GET["phonenumber"];
	/*
	$errMsg = "";
	//////////////////
	if (empty($name)) {
			$errMsg .= "You must enter a name. <br />";
	}
	
	if (empty($email)) {
			$errMsg .= "You must enter an email id. <br />";
	}

	if (empty($password)) {
			$errMsg .= "You must enter a password. <br />";
	}
	
	if ($errMsg != "") {
			echo $errMsg;
	}
	else {
	*/
	//$xmlfile = '/home/students/accounts/s102617305/cos80021/www/data/customer.xml';
	$xmlfile = '../../data/customer.xml';
	
	$doc = new DomDocument();
	
	if (!file_exists($xmlfile)){ // if the xml file does not exist, create a root node $customers
		$customers = $doc->createElement('customers');
		$doc->appendChild($customers);
	}
	else { // load the xml file
		$doc->preserveWhiteSpace = FALSE; 
		$doc->load($xmlfile);  
	}
	
	//create a customer node under customers node
	$customers = $doc->getElementsByTagName('customers')->item(0);
	$customer = $doc->createElement('customer');
	$customers->appendChild($customer);

	//create a Customer ID node ....
	$Customerid = $doc->createElement('customerid');
	$customer->appendChild($Customerid);
	$Value = $doc->createTextNode($customerid);
	$Customerid->appendChild($Value);
	
	//create a Email node ....
	$Email = $doc->createElement('email');
	$customer->appendChild($Email);
	$emailValue = $doc->createTextNode($email);
	$Email->appendChild($emailValue);
	
	// create a First Name node ....
	$Firstname = $doc->createElement('firstname');
	$customer->appendChild($Firstname);
	$nameValue = $doc->createTextNode($firstname);
	$Firstname->appendChild($nameValue);
	
		// create a Last Name node ....
	$Lastname = $doc->createElement('lastname');
	$customer->appendChild($Lastname);
	$nameValue = $doc->createTextNode($lastname);
	$Lastname->appendChild($nameValue);
	
	
	//create a pwd node ....
	$pwd = $doc->createElement('password');
	$customer->appendChild($pwd);
	$pwdValue = $doc->createTextNode($password);
	$pwd->appendChild($pwdValue);
	
	if($phonenumber != "")	
	{		//Create phonenumber node only if the number is provided
		//create a phonenumber node ....
	$Phonenumber = $doc->createElement('phonenumber');
	$customer->appendChild($Phonenumber);
	$phoneValue = $doc->createTextNode($phonenumber);
	$Phonenumber->appendChild($phoneValue);
	}
	//save the xml file	
	$doc->formatOutput = true;
	$doc->save($xmlfile);  
	echo "Successfully registered!";
	} 

?>