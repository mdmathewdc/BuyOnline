<?php

$xmlfile = "../../data/goods.xml";
	$flag = 0;
	
	if (file_exists($xmlfile))							//SETTING QUANTITY SOLD = 0
	{
		$dom = DOMDocument::load("../../data/goods.xml");
		$item = $dom->getElementsByTagName("item"); 

		foreach($item as $node) 
		{ 	
			$xmlQS = $node->getElementsByTagName("quantitysold");
			$xmlQS = $xmlQS->item(0)->nodeValue;
			$node1 = $node;
			
			if($xmlQS != 0)
			{

				$node->getElementsByTagName("quantitysold")->item(0)->nodeValue = 0;			//Setting quantity sold = 0
				
				
			}

		}
				
		$dom->save("../../data/goods.xml");
	}


	if (file_exists($xmlfile))									//DELETING ITEMS WITH QUANTITY ON HOLD  = ITEM QUANTITY = 0
	{
		$i = 0;
		$dom = DOMDocument::load("../../data/goods.xml");
		$item = $dom->getElementsByTagName("item"); 
		$thedocument = $dom->documentElement;


		foreach($item as $node) 
		{ 	
			$xmlQH = $node->getElementsByTagName("quantityonhold")->item(0)->nodeValue;
			$xmlIQ = $node->getElementsByTagName("itemquantity")->item(0)->nodeValue;
			if($xmlIQ == 0)
			{
				if($xmlQH == 0)
				{
					$nodesToRemove[$i] = $node;		//Finding nodes/items to be deleted
					++$i;
					
				}				
				
			}

		}
		
		if($i != 0)
		{
			for($j = 0; $j < $i; ++$j)
			{
				$thedocument->removeChild($nodesToRemove[$j]);		//Removing items
			
			}
		
		}
				
		$dom->save("../../data/goods.xml");
	}

echo("Updated");


?>