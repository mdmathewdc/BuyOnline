<?php

header('Content-Type: text/xml');

if(isset($_GET["itemname"]) && isset($_GET["itemprice"]) && isset($_GET["itemquantity"]) && isset($_GET["itemdescription"]))
{
	$itemnumber = uniqid();
	
	$itemname = $_GET["itemname"];
	$itemprice = $_GET["itemprice"];
	$itemquantity = $_GET["itemquantity"];
	$itemdescription = $_GET["itemdescription"];
	
	//echo("Reached listing.php");
	$xmlfile = '../../data/goods.xml';
	$doc = new DomDocument();
	
	if (!file_exists($xmlfile))
	{ // if the xml file does not exist, create a root node $goods
		$goods = $doc->createElement('goods');
		$doc->appendChild($goods);
	}
	else 
	{ // load the xml file
		$doc->preserveWhiteSpace = FALSE; 
		$doc->load($xmlfile);  
	}
	
	$goods = $doc->getElementsByTagName('goods')->item(0);
	$item = $doc->createElement('item');
	$goods->appendChild($item);

		//create a itemnumber node ....
	$itemnumber1 = $doc->createElement('itemnumber');
	$item->appendChild($itemnumber1);
	$Value = $doc->createTextNode($itemnumber);
	$itemnumber1->appendChild($Value);
	
		//create a quantityonhold node ....
	$Quantityonhold = $doc->createElement('quantityonhold');
	$item->appendChild($Quantityonhold);
	$Value = $doc->createTextNode(0);
	$Quantityonhold->appendChild($Value);
	
		//create a quantitysold ID node ....
	$Quantitysold = $doc->createElement('quantitysold');
	$item->appendChild($Quantitysold);
	$Value = $doc->createTextNode(0);
	$Quantitysold->appendChild($Value);
	
		//create a itemname node ....
	$Itemname1 = $doc->createElement('itemname');
	$item->appendChild($Itemname1);
	$Value = $doc->createTextNode($itemname);
	$Itemname1->appendChild($Value);
	
		//create a itemprice node ....
	$Itemprice1 = $doc->createElement('itemprice');
	$item->appendChild($Itemprice1);
	$Value = $doc->createTextNode($itemprice);
	$Itemprice1->appendChild($Value);
	
		//create a itemquantity node ....
	$Itemquantity1 = $doc->createElement('itemquantity');
	$item->appendChild($Itemquantity1);
	$Value = $doc->createTextNode($itemquantity);
	$Itemquantity1->appendChild($Value);
	
		//create a itemdescription node ....
	$Itemdescription1 = $doc->createElement('itemdescription');
	$item->appendChild($Itemdescription1);
	$Value = $doc->createTextNode($itemdescription);
	$Itemdescription1->appendChild($Value);
	
	//save the xml file	
	$doc->formatOutput = true;
	$doc->save($xmlfile);  
	echo "The item has been listed in the system, and the item number is ".$itemnumber."";
	//echo $itemprice;

}
?>