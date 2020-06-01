<?php
//session_register("cart");
session_start();
header('Content-Type: text/xml');
?>

<?php // server side processing
		
		$action = $_GET["action"];
			
			//$cart = array();
			$cart = $_SESSION["cart"];
			//echo (toXml($cart));

if($action == "confirm")
{

        foreach ($cart as $Item => $ItemName)
        { 
		$dom = DOMDocument::load("../../data/goods.xml");
		$item = $dom->getElementsByTagName("item"); 

		foreach($item as $node) 
		{ 	
			$xmlEmail = $node->getElementsByTagName("itemname");
			$xmlEmail = $xmlEmail->item(0)->nodeValue;
			$node1 = $node;
			
			if($xmlEmail == $Item)
			{

				
				$xx = $node->getElementsByTagName("quantityonhold")->item(0)->nodeValue;		//Getting Quantity on hold value
				$node->getElementsByTagName("quantityonhold")->item(0)->nodeValue = 0;			//Setting quantity on hold to 0
				
				$node->getElementsByTagName("quantitysold")->item(0)->nodeValue = $xx;			//Setting quantity sold = quantity on hold
				
				//echo $yy;
				//echo $node->getElementsByTagName("itemquantity")->item(0)->nodeValue;


				//echo $xmlEmail;
				
			}

			//$y = $node->getElementsByTagName("itemprice")->item(0)->nodeValue + 1		//Increasing 1 Quantity on hold
			//	$node->getElementsByTagName("itemprice")->item(0)->nodeValue = $y;




		}
		
		
		$dom->save("../../data/goods.xml");
			
            
			
			
			
        }
		unset($_SESSION["cart"]);  
		header("Location: buying.htm");
		
		//echo("Your purchase has been confirmed and total amount due to pay is $<totalAmountDue> ".$Item);
		
	
}


else if($action == "cancel")
{

        foreach ($cart as $Item => $ItemName)
        { 
		$dom = DOMDocument::load("../../data/goods.xml");
		$item = $dom->getElementsByTagName("item"); 

		foreach($item as $node) 
		{ 	
			$xmlEmail = $node->getElementsByTagName("itemname");
			$xmlEmail = $xmlEmail->item(0)->nodeValue;
			$node1 = $node;
			
			if($xmlEmail == $Item)
			{

				
				$xx = $node->getElementsByTagName("quantityonhold")->item(0)->nodeValue;		//Getting Quantity on hold value
				$node->getElementsByTagName("quantityonhold")->item(0)->nodeValue = 0;			//Setting quantity on hold to 0
				
				$node->getElementsByTagName("itemquantity")->item(0)->nodeValue += $xx ;			//Adding quantity on hold to item quantity
				
				//echo $yy;
				//echo $node->getElementsByTagName("itemquantity")->item(0)->nodeValue;


				//echo $xmlEmail;
				
			}

			//$y = $node->getElementsByTagName("itemprice")->item(0)->nodeValue + 1		//Increasing 1 Quantity on hold
			//	$node->getElementsByTagName("itemprice")->item(0)->nodeValue = $y;




		}
		
		
		$dom->save("../../data/goods.xml");
			
            
			
			
			
        }
		
		unset($_SESSION["cart"]);  
		header("Location: buying.htm");
		//echo("Your purchase request has been cancelled, welcome to shop next time");
	
}

	
?>