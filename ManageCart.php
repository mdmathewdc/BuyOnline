<?php
//session_register("cart");
session_start();
header('Content-Type: text/xml');
?>
<?php // server side processing


	$title = $_GET["bookTitle"];
	//$ISBN = $_GET["bookISBN"];
    $action = $_GET["action"];
	//$price = $_GET["bookPrice"];
	$id = $_GET["id"];
	
		$ISBN = $_GET["bookPrice"];			//Swapping varaibles to get correct Price
		$price = $_GET["bookISBN"];



	
	
if($action == "Add") {
$xmlfile = "../../data/goods.xml";
	$flag = 0;
	
	if (file_exists($xmlfile))
	{
		$dom = DOMDocument::load("../../data/goods.xml");
		$item = $dom->getElementsByTagName("item"); 

		foreach($item as $node) 
		{ 	
			$xmlEmail = $node->getElementsByTagName("itemname");
			$xmlEmail = $xmlEmail->item(0)->nodeValue;
			$node1 = $node;
			
			if($xmlEmail == $title)
			{
				//$y = $node->getElementsByTagName("itemprice")->item(0)->nodeValue + 1		//Increasing 1 Quantity on hold
				//$node->getElementsByTagName("itemprice")->item(0)->nodeValue = $y;
				
				$xx = $node->getElementsByTagName("itemquantity")->item(0)->nodeValue - 1;
				$node->getElementsByTagName("itemquantity")->item(0)->nodeValue = $xx;			//Decreasing 1 quanitity available
				
				$xx = $node->getElementsByTagName("quantityonhold")->item(0)->nodeValue + 1;		//Increasing 1 Quantity on hold
				$node->getElementsByTagName("quantityonhold")->item(0)->nodeValue = $xx;
				//echo $yy;
				//echo $node->getElementsByTagName("itemquantity")->item(0)->nodeValue;


				//echo $xmlEmail;
				
			}

			//$y = $node->getElementsByTagName("itemprice")->item(0)->nodeValue + 1		//Increasing 1 Quantity on hold
			//	$node->getElementsByTagName("itemprice")->item(0)->nodeValue = $y;




		}
		
		
		$dom->save("../../data/goods.xml");
	}

}













/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (!(empty($_SESSION["cart"])))
	//if ($_SESSION["cart"] != "") 					//check the cart
	{
		$cart = $_SESSION["cart"]; 					//read the cart session into local variable
		if ($action == "Add") 						//process add function
		{
			if (!isset($cart[$title]))
			{  
				$qty = 1; 							// increase no of books by 1
				$value = array(); 					//NOT SURE
				$value["qty"] = $qty;
				$value["isbn"] = $ISBN;
				$value["id"] = $id;
				$value["total"] = $price;
				$cart[$title] = $value;
				$_SESSION["cart"] = $cart;  		// save the adjusted cart to session variable 
				echo (toXml($cart));   				// send XML form of CART to client
			}
			else
			{
				
				$value = $cart[$title];
				$value["qty"] = $value["qty"] + 1;
				$value["total"] = $price * $value["qty"];
				$cart[$title] = $value;
				$_SESSION["cart"] = $cart;
				
				echo (toXml($cart));
			}
		}
		else 											//proccess remove function
		{
			$value = $cart[$title];
			//$value["qty"] = $value["qty"] - 1;
			//$value["total"] = $price * $value["qty"];
			
			$value["qty"] = 0;
			$value["total"] = 0;
			
			
			$cart[$title] = $value;
			$_SESSION["cart"] = $cart;
			
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
			$dom = DOMDocument::load("../../data/goods.xml");
		$item = $dom->getElementsByTagName("item"); 						//UPDATE GOODS.XML TO INTITAL STATE

		foreach($item as $node) 
		{ 	
			$xmlEmail = $node->getElementsByTagName("itemname");
			$xmlEmail = $xmlEmail->item(0)->nodeValue;
			$node1 = $node;
			
			if($xmlEmail == $title)
			{

		
				
				$xx = $node->getElementsByTagName("quantityonhold")->item(0)->nodeValue;		//Getting Quantity on hold number
				$node->getElementsByTagName("quantityonhold")->item(0)->nodeValue = 0;			//Setting quantity on hold as 0
				
				$node->getElementsByTagName("itemquantity")->item(0)->nodeValue = $node->getElementsByTagName("itemquantity")->item(0)->nodeValue + $xx;
					//Adding quanitity on hold to item quantity
				
			}

		}
		
		
		$dom->save("../../data/goods.xml");
		
						
		
			
			echo (toXml($cart));

			
		
		}
	}	
	elseif ($action == "Add")											//created a new cart session with the particular book
	{
		$value = array();
		$value["qty"] = "1";
		$value["isbn"] = $ISBN;
		$value["total"] = $price;
		$value["id"] = $id;
		$cart = array();
		$cart[$title] = $value;
		$_SESSION["cart"] = $cart;
		echo (toXml($cart));
	}

    function toXml($shop_cart)
    {   
		$doc = new DomDocument('1.0');
		//to create <cart></cart>
        $cart = $doc->createElement('cart');
        $cart = $doc->appendChild($cart);
		//$Item is a key
		//$ItemName is the value
		//$shop_cart is a assoc array
        foreach ($shop_cart as $Item => $ItemName)
        { 
			
			//to create <book></book>
			$book = $doc->createElement('book');
          	$book = $cart->appendChild($book);
			
			//This is to create <title></title>
          	$title = $doc->createElement('title'); 
          	$book->appendChild($title);
			//and this to append inside <title>$value</title>
          	$value = $doc->createTextNode($Item);
            $title->appendChild($value);
			//or:
			//$title = $doc->createElement('title', $Item);
			//$title->appendChild($value);
			
			$isbn = $doc->createElement('isbn');
          	$book->appendChild($isbn);
          	$value3 = $doc->createTextNode($ItemName["isbn"]);
          	$isbn->appendChild($value3);
			
          	$quantity = $doc->createElement('quantity');
          	$book->appendChild($quantity);
          	$value2 = $doc->createTextNode($ItemName["qty"]);
          	$quantity->appendChild($value2);
			
			$total = $doc->createElement('total');
          	$book->appendChild($total);
          	$value3 = $doc->createTextNode($ItemName["total"]);
          	$total->appendChild($value3);
			
			$idElement = $doc->createElement('id');
          	$book->appendChild($idElement);
          	$value4 = $doc->createTextNode($ItemName["id"]);
          	$idElement->appendChild($value4);
			
			
			
        }
        $strXml = $doc->saveXML(); 
        return $strXml;
    }
?>

