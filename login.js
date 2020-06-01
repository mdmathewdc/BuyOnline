var xhr = false;
if (window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}
else if (window.ActiveXObject) {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}


function validateCustomer()
        {
            var x1,x2;
            x1 = document.getElementById("emailid").value;
            x2 = document.getElementById("password").value;

           
            if ((x1 == "" ) || (x2 == "" ))
                { 	
					//document.getElementById("lastname").style.borderColor = "red";
                    alert("All fields must be filled!");
                    //return false;
                }
			else
			{
				//alert("yeah");
				xhr.open("GET", "login.php?emailid=" + x1 + "&password=" + x2 + "&id=" + Number(new Date), true);
				xhr.send(null);

				xhr.onreadystatechange = function()
				{
					if ((xhr.readyState == 4) && (xhr.status == 200)) 
					{
						var flag = xhr.responseText;
						//alert(xhr.responseText);
						
						if(flag == 1)
						{
							alert("Customer Validated!");
							window.location.replace("buying.htm");

						}
						
						else if(flag == 2)
						{
							alert("Wrong Password!");
						}
						
						else if(flag == 0)
						{
							alert("Invalid E-mail address!");
						}
						
						else
						{
							alert(flag);
						}
					}
	
				}					
			}
		}