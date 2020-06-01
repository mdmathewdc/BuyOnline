
<?php

if(isset($_GET["itemname"]))
{
	$itemname = $_GET["itemname"];
	$xmlfile = "../../data/goods.xml";
	
	if (file_exists($xmlfile))
	{
		$dom = DOMDocument::load("../../data/goods.xml");
		$item = $dom->getElementsByTagName("item"); 

		foreach($item as $node) 
		{ 	
			$xmlItemName = $node->getElementsByTagName("itemname");
			$xmlItemName = $xmlItemName->item(0)->nodeValue;
			
			if($xmlItemName == $itemname)
			{
				echo("1");		//Item name already exists
			}
  
		} 
	}
	
	else
	{
		echo("0");			//Goods.xml does not exist!
		//echo("Goods.xml does not exist!");
	}
}

?>