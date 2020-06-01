var xhr = false;  
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

var totalSum,totalInt;

	setInterval(displayBooks,10000);			//Refresh catalog every 10 seconds
function getData()
{   
	       // xhr3 = new XMLHttpRequest();			//New XHR object

	if ((xhr1.readyState == 4) &&(xhr1.status == 200))
    	{ 
			//alert(xhr1.responseText);
			var serverResponse = xhr1.responseXML;
        	var header = serverResponse.getElementsByTagName("book");
        	var spantag = document.getElementById("cart");
			var cartButtons = document.getElementById("cartButtons");
			var x;
			totalSum = 0;

        	spantag.innerHTML = "";
			x = "<table id=\"tableYeah\" style=\"margin-left:auto;margin-right:auto\" cellpadding='1' cellspacing='6' border='1'>";
			x += "<tr><th>Item Name</th><th>Quantity</th><th>Total Item Price</th><th>Remove</th></tr>";
        	for (i=0; i<header.length; i++)
        	{  
				var id =  header[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
				var total =  header[i].getElementsByTagName("total")[0].childNodes[0].nodeValue;
				var title =  header[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				//var isbn =  header[i].getElementsByTagName("isbn")[0].childNodes[0].nodeValue;
				var qty =  header[i].getElementsByTagName("quantity")[0].childNodes[0].nodeValue;
				

				if(qty=="0")
				{
					continue;
				}
				
				totalInt = parseInt(total);		//onverting string Total to Integer Total
				//qtyInt = parseInt(qty);
				//multiply = totalInt * qtyInt;
				totalSum += totalInt;
				

				x += "<tr>"
				+ "<td>" + title + "</td>"
				//+ "<td>" + isbn + "</td>"
				+ "<td>" + qty + "</td>"
				+ "<td>" + total + "</td>"
				+ "<td>" + "<a href='#' class=\"btn btn-danger btn-sm\" onclick='AddRemoveItem(\"Remove\","+id+");'>Remove Item</a>" + "</td>"
				+ "</tr>";
        	}

			x += "<tr> <td colspan=\"2\"><b> Total Price&emsp;&emsp;: </b></td> <td id=\"totalSum\" colspan=\"2\"><b>"+totalSum+"</b></td></tr> ";
			x += "</table>";
			//x += "<br> <a href=\"#\" onClick=\"confirmPurchase();\" >Confirm Purchase</a> <a href=\"#\" onClick=\"cancelPurchase();\" >Cancel Purchase</a>"

			if (header.length != 0)
				spantag.innerHTML = x;
				cartButtons.innerHTML = "<br> <a href=\"#\" class=\"btn btn-primary\" onClick=\"confirmPurchase();\" >Confirm Purchase</a> <a href=\"#\" class=\"btn btn-primary\" onClick=\"cancelPurchase();\" >Cancel Purchase</a>";
    	}
		totalSum = 0;
		
					displayBooks();			//Refresh shopping catalog for displaying reduced item quantity

}

function AddRemoveItem(action,id,quantity)
{   
	//alert(action);
	//alert(id);
	if(quantity < 1)		//Item quantity in catalog < 1
	{
		alert("Sorry, this item is not available for sale!");
	}
	
	else{

	var book  = document.getElementById("book"+id).innerHTML;  
	var isbn  = document.getElementById("ISBN"+id).innerHTML;
	var price = document.getElementById("price"+id).innerHTML;
	
	        xhr1 = new XMLHttpRequest();			//New XHR object

	xhr1.open("GET", "ManageCart.php?action=" + action + "&bookTitle=" +  
		encodeURIComponent(book) + "&bookISBN=" + isbn + "&bookPrice=" + price+"&id="+id, true);
	xhr1.onreadystatechange = getData;
	xhr1.send(null); 
	}	
}

function confirmPurchase()
{
	//alert("confirm");
		 xhr2= new XMLHttpRequest();			//New XHR object
	 	xhr2.open("GET", "cartCheckout.php?action=confirm", true);
		xhr2.onreadystatechange = function() {
		if (xhr2.readyState == 4 && xhr2.status == 200) {
			
			//window.location.reload();	
			document.getElementById("msg").innerHTML = "Your purchase has been confirmed and total amount due to pay is $" + document.getElementById("totalSum").innerHTML;
			document.getElementById("shopppingCartDiv").remove();
			document.getElementById("shoppingCartHeadingDiv").remove();
		
			
		}


}
			xhr2.send(null);
	
}

function cancelPurchase()
{
			 xhr2 = new XMLHttpRequest();			//New XHR object
	 	xhr2.open("GET", "cartCheckout.php?action=cancel", true);
			xhr2.send(null);
			xhr2.onreadystatechange = function() {
		if (xhr2.readyState == 4 && xhr2.status == 200) {
			
			displayBooks();
			document.getElementById("msg").innerHTML = "Your purchase request has been cancelled, Welcome to shop next time!";
			document.getElementById("shopppingCartDiv").remove();
			document.getElementById("shoppingCartHeadingDiv").remove();
			
		}
	
}
}


function loadXMLDoc(dname)
{
	if (window.XMLHttpRequest)
	  {
		xhttp=new XMLHttpRequest();
	  }
	else
	  {
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xhttp.open("GET",dname,false);
	xhttp.send();
	return xhttp.responseXML;
}



function displayBooks() 
{	//alert("Refresh catalog");
	        xhr = new XMLHttpRequest();

	//xmlDoc=loadXMLDoc("../../data/customer.xml");
	xhr.open("GET", "getGoodsTable.php?id="+Number(new Date), true);
    xhr.send();
	
	xhr.onreadystatechange = function() 
	{

		if (xhr.readyState == 4 && xhr.status == 200) 
		{		
			var xmlDoc = xhr.responseXML;
	
	var books = xmlDoc.getElementsByTagName("item");
	
	var div = document.getElementById("mainContent");
	
				var table1 = "<tr><th> Item Number </th><th> Name </th> <th> Description </th> <th> Price </th> <th> Quantity </th> <th> Add </th></tr>";
	
	for (i=0; i<books.length; i++) 
	{	
/*

		//Display only if itemquantity > 0
		var img = books[i].getElementsByTagName("itemnumber")[0].childNodes[0].nodeValue;
		var name = books[i].getElementsByTagName("itemname")[0].childNodes[0].nodeValue;
		var authors = books[i].getElementsByTagName("itemdescription")[0].childNodes[0].nodeValue.substring(0, 20);		//Displaying only first 20 chracters of description
		var isbn = books[i].getElementsByTagName("itemprice")[0].childNodes[0].nodeValue;
		var price = books[i].getElementsByTagName("itemquantity")[0].childNodes[0].nodeValue;
		
		div.innerHTML+="<br/><b>Item Number: </b><span id=\"img"+i+"\">"+img+"</span> <br/><b>Name:</b><span id=\"book"+i+"\" >"+name+"</span><br/><b>Description: </b><span id=\"authors"+i+"\">"+authors+"</span><br /><b>Price: </b><span id=\"ISBN"+i+"\">"+isbn+"</span> <br /><b>Quantity: </b><span id=\"price"+i+"\" >"+price+"</span><br/><br/>	<a href=\"#\" onClick=\"AddRemoveItem('Add',"+i+");\" >Add to Shopping Cart</a><br/><br/>";
		
		//"</span><br/><br/>	<a href=\"#\" onClick=\"AddRemoveItem('Add',"+i+");\" >Add to Shopping Cart</a><br/><br/>";
		
		*/
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
						 var img = books[i].getElementsByTagName("itemnumber")[0].childNodes[0].nodeValue;
						
		var name = books[i].getElementsByTagName("itemname")[0].childNodes[0].nodeValue;
		var authors = books[i].getElementsByTagName("itemdescription")[0].childNodes[0].nodeValue.substring(0, 20);		//Displaying only first 20 chracters of description
		var isbn = books[i].getElementsByTagName("itemprice")[0].childNodes[0].nodeValue;
		var price = books[i].getElementsByTagName("itemquantity")[0].childNodes[0].nodeValue;
		

			//if (price > 0) {		//More than 0 quantity available
				table1 += "<tr><td id=\"img"+i+"\">" +
							img +
							"</td>" +
							"<td id=\"book"+i+"\">" +
										name +
							"</td>" +
							"<td id=\"authors"+i+"\">" +
										authors +		//Displaying only first 20 chracters of description
							"</td>" +
							"<td id=\"ISBN"+i+"\">" +
										isbn +
							"</td>" +
							"<td id=\"price"+i+"\">" +
										price +
							"</td>" +
							//"<td>" + "<a href=\"#\" onclick=\"addRemoveItem(\"Remove\","+itemNumber+")\"> Add one to the cart </a>" + "</td>"
							"<td>  <a href=\"#\" class=\"btn btn-success btn-sm\" onClick=\"AddRemoveItem('Add',"+i+","+price+");\" >Add one to cart</a> </td>"
							+ "</tr>";

	
   	//}
}					
				document.getElementById("catalogTable").innerHTML = table1;

	}
	}
			//getData();		//To display shopping cart on first reload
}