var xhr = false;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

function checkListing()
{
	//alert("clicked!");
	var x1,x2,x3,x4;
            x1 = document.getElementById("itemname").value;
            x2 = document.getElementById("itemprice").value;
            x3 = document.getElementById("itemquantity").value;
            x4 = document.getElementById("itemdescription").value;
			//alert(x1);

            
            if ((x1 == "" ) || (x2 == "" ) || (x3 == "" ) || (x4 == "" ))
            {
				alert("All fields must be filled!");
                    //return false;
            }

			else
			{
				var regEx= /^\d+$/; 
					if(!regEx.test(x2))
					{
						alert("Entered Item Price is invalid!");						
					}
					else if(!regEx.test(x3))
					{
						alert("Entered Item Quantity is invalid!");
					}
					else
					{
						checkDuplicateItemName();
					}
			}
						
}

function checkDuplicateItemName()
{
	//alert("Going to check for duplicate item name!");
	var itemname = document.getElementById('itemname').value;
	xhr.open("GET", "checkDuplicateItemName.php?itemname=" + itemname + "&id=" + Number(new Date), true);
	xhr.send(null);

	xhr.onreadystatechange = function()
	{
		if ((xhr.readyState == 4) && (xhr.status == 200)) 
		{
			var flag = xhr.responseText;
			//alert(xhr.responseText);
			if (flag == "1")
			{
				alert("Item name already exists!");
			}
			else
			{
				addListing();
			}
		}
		
	}	
}
function addListing()
{
	//alert("Going to add the listing!");
	var x1,x2,x3,x4;
    itemname = document.getElementById("itemname").value;
    itemprice = document.getElementById("itemprice").value;
    itemquantity = document.getElementById("itemquantity").value;
    itemdescription = document.getElementById("itemdescription").value;
	xhr.open("GET", "listing.php?itemname=" + itemname + "&itemprice=" + itemprice + "&itemquantity=" + itemquantity + "&itemdescription=" + itemdescription + "&id=" + Number(new Date), true);
	xhr.send(null);

	xhr.onreadystatechange = function()
	{
		if ((xhr.readyState == 4) && (xhr.status == 200)) 
		{
			var flag = xhr.responseText;
			//alert(flag);
			document.getElementById("msg").innerHTML = flag;

		}
		
	}
}
		