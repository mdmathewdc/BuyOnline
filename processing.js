var xhr = false;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
var itemNumber;
function displayProcessingTable()
{
	//alert("Processing Table Display!");
	xhr.open("GET", "getGoodsTable.php?id="+Number(new Date), true);
    xhr.send();
	
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4 && xhr.status == 200) 
		{		
			var i;
			var xmlDoc = xhr.responseXML;
			var table1 = "<tr><th> Item Number </th><th> Item Name </th> <th> Price </th> <th> Quantity Available </th> <th> Quantity on Hold </th> <th> Quantity Sold </th></tr>";
			var x = xmlDoc.getElementsByTagName("item");
			for (i = 0; i <x.length; i++) 
			{	
				itemNumber = x[i].getElementsByTagName("itemnumber")[0].childNodes[0].nodeValue;
				//itemNumber = "cool";
				
				table1 += "<tr><td>" +
							itemNumber +
							"</td>" +
							"<td>" +
							x[i].getElementsByTagName("itemname")[0].childNodes[0].nodeValue +
							"</td>" +
							"<td>" +
							x[i].getElementsByTagName("itemprice")[0].childNodes[0].nodeValue.substring(0, 20) +		//Displaying only first 20 chracters of description
							"</td>" +
							"<td>" +
							x[i].getElementsByTagName("itemquantity")[0].childNodes[0].nodeValue +
							"</td>" +
							"<td>" +
							x[i].getElementsByTagName("quantityonhold")[0].childNodes[0].nodeValue +
							"</td>" +
							//"<td>" + "<a href=\"#\" onclick=\"addRemoveItem(\"Remove\","+itemNumber+")\"> Add one to the cart </a>" + "</td>"
							"<td>" +
							x[i].getElementsByTagName("quantitysold")[0].childNodes[0].nodeValue 
							+ "</td></tr>";
				
			}
				document.getElementById("processingTable").innerHTML = table1;
				
		}
    }	
	
}

function processXML()
{
	xhr1 = new XMLHttpRequest();
	//alert("PROCESS BUTTON CLICKED!");
	xhr1.open("GET", "processing.php?id="+Number(new Date), true);
    xhr1.send();
	
	xhr1.onreadystatechange = function() 
	{
		//alert(xhr1.responseText);
		
	}
	displayProcessingTable();
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

